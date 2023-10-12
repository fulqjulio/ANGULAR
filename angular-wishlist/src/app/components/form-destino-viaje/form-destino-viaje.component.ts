import { Component, Output, EventEmitter, OnInit, Inject, forwardRef } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { APP_CONFIG, AppConfig } from 'src/app/app.module';

@Component({
	selector: 'app-form-destino-viaje',
	templateUrl: './form-destino-viaje.component.html',
	styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit{
	@Output() onItemAdded: EventEmitter<DestinoViaje>;
	fg: FormGroup;
	minLongitudNombre = 3;
	searchResults: string[];

	constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
		this.onItemAdded = new EventEmitter();
		this.fg = fb.group({
			nombre: new FormControl('', [Validators.required,
										this.nombreValidator,
										this.nombreValidatorParametrizable(this.minLongitudNombre)
									]),
			url: new FormControl('', [Validators.required])
		});

		this.fg.valueChanges.subscribe((form: any) => {
			console.log('Cambio el formulario:', form);
		});
	}
	
	guardar(nombre: string, url: string) {
		const d = new DestinoViaje(nombre, url);
		this.onItemAdded.emit(d);
		return false;
	}
	
	nombreValidator(control: AbstractControl): ValidationErrors | null {
		const l = control.value.toString().trim().length;
		if (l > 0 && l < 5) {
			return { invalidNombre: true };
		}
		return null;
	}
	
	nombreValidatorParametrizable(minLong: number): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const l = control.value.toString().trim().length;
			if (l > 0 && l < minLong) {
				return { minLongNombre: true };
			}
			return null
		}
	}

	ngOnInit(): void {
		const elemNombre = <HTMLInputElement>document.getElementById('nombre');
		fromEvent(elemNombre, 'input').pipe(
			map((e: Event) => (e.target as HTMLInputElement).value),
			filter(text => text.length > 2),
			debounceTime(200),
			distinctUntilChanged(),
			// Para obtener los datos definidos de forma local
			/* switchMap(() => ajax('/assets/datos.json'))
		).subscribe(ajaxResponse => {
			console.log(ajaxResponse.response);
			this.searchResults = ajaxResponse.response as string[];
		}); */

			// Haciendo uso de la api
			switchMap((text: string) => ajax(this.config.apiEdnpoint + '/ciudades?q=' + text))
		).subscribe(ajaxResponse => {
			console.log(ajaxResponse.response);
			this.searchResults = ajaxResponse.response as string[];
		});
	}
}
