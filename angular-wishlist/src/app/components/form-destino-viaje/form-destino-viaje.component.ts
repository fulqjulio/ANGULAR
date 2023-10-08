import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

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

	constructor(fb: FormBuilder) {
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
	
	guardar(nombre: string, url: string): boolean {
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
			filter(text => text.length > 3),
			debounceTime(200),
			distinctUntilChanged(),
			switchMap(() => ajax('/assets/datos.json'))
		).subscribe(ajaxResponse => {
			console.log(ajaxResponse.response);
			this.searchResults = ajaxResponse.response as string[];
		});
	}
}
