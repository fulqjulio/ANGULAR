import { Component, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-lista-destinos',
    templateUrl: './lista-destinos.component.html',
    styleUrls: ['./lista-destinos.component.css'],
    providers: [DestinosApiClient],
})
export class ListaDestinosComponent {
    updates: string[];
    // all;

    constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
        this.updates = [];
        this.store.select(state => state.destinos.favorito).subscribe(d => {
            if (d.nombre != '' || d.imageUrl != ''){
                this.updates.push('Se ha elegido a ' + d.nombre);
            }
        });
        // Older
        /* this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
            if (d.nombre != '' && d.imageUrl != ''){
                this.updates.push('Se ha elegido a ' + d.nombre);
            }
        }); */

        // store.select(state => state.destinos.items).subscribe(items => this.all = items);
    }

    agregado(d: DestinoViaje){
        this.destinosApiClient.add(d);
    }

    elegido(d: DestinoViaje) {
        this.destinosApiClient.elegir(d);
    }
}
