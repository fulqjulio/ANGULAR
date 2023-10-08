import { Injectable } from '@angular/core';
import { DestinoViaje } from "./destino-viaje.model";
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viaje-state.model';

@Injectable()
export class DestinosApiClient {
    // destinos: DestinoViaje[];
    // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(new DestinoViaje('', ''));

    constructor(private store: Store<AppState>) {
        // this.destinos = [];
    }

    add(d:DestinoViaje){
        // this.destinos.push(d);
        this.store.dispatch(new NuevoDestinoAction(d));
    }

    /* getAll(): DestinoViaje[] {
        return this.destinos;
    }

    getById(id: string): DestinoViaje {
        return this.destinos.filter(function(d) {return d.id.toString() === id; })[0];
    } */

    elegir(d: DestinoViaje) {
        // this.destinos.forEach(x => x.setSelected(false));
        // d.setSelected(true);
        // this.current.next(d);
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

    /* subscribeOnChance(fn: any) {
        this.current.subscribe(fn);
    } */
}
