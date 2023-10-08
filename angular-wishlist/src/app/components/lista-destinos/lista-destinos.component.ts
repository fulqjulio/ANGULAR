import { Component, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/app.module';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, NuevoDestinoAction } from 'src/app/models/destinos-viaje-state.model';

@Component({
    selector: 'app-lista-destinos',
    templateUrl: './lista-destinos.component.html',
    styleUrls: ['./lista-destinos.component.css'],
    providers: [DestinosApiClient],
})
export class ListaDestinosComponent {
    @Output() onItemAdded: EventEmitter<DestinoViaje>;
    updates: string[];
    all;

    constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
        this.onItemAdded = new EventEmitter();
        this.updates = [];
        this.store.select(state => state.destinos.favorito).subscribe(d => {
            if (d.nombre != '' && d.imageUrl != ''){
                this.updates.push('Se ha elegido a ' + d.nombre);
            }
        });
        /* // Older
        this.destinosApiClient.subscribeOnChance((d: DestinoViaje) => {
            if (d.nombre != '' && d.imageUrl != ''){
                this.updates.push('Se ha elegido a ' + d.nombre);
            }
        }); */

        store.select(state => state.destinos.items).subscribe(items => this.all = items);
    }

    agregado(d: DestinoViaje){
        this.destinosApiClient.add(d);
        this.onItemAdded.emit(d);
    }

    elegido(d: DestinoViaje) {
        this.destinosApiClient.elegir(d);
    }

}
