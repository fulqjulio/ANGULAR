import { Inject, Injectable, forwardRef } from '@angular/core';
import { DestinoViaje } from "./destino-viaje.model";
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { Store } from '@ngrx/store';
import { APP_CONFIG, AppConfig, AppState, db } from 'src/app/app.module'; 
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viaje-state.model';

@Injectable()
export class DestinosApiClient {
    destinos: DestinoViaje[];
    // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(new DestinoViaje('', ''));

    constructor(
        private store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient
        ) {
        // this.destinos = [];
        this.store
                .select(state => state.destinos.items)
                .subscribe(data => this.destinos = data)
    }

    add(d: DestinoViaje){
        // this.destinos.push(d);
        const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
        const req = new HttpRequest('POST', this.config.apiEdnpoint + '/my', { nuevo: d.nombre}, { headers: headers });
        this.http.request(req).subscribe((data: HttpEvent<unknown>) => {
            if ((data as HttpResponse<unknown>).status === 200) {
                this.store.dispatch(new NuevoDestinoAction(d));
                const myDb = db;
                myDb.destinos.add(d);
                console.log('todos los destinos de la db!');
                myDb.destinos.toArray().then(destinos => console.log(destinos));
            } 
        });
    }

    getAll(): DestinoViaje[] {
        return this.destinos;
    }

    getById(id: string): DestinoViaje {
        return this.destinos.filter(function(d) {return d.id.toString() === id; })[0];
    }

    elegir(d: DestinoViaje) {
        // this.destinos.forEach(x => x.setSelected(false));
        // d.setSelected(true);
        // this.current.next(d);
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

    subscribeOnChange(fn: any) {
        // this.current.subscribe(fn);
    }
}

