import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { AnyLayer, Layer, Sources } from 'mapbox-gl';
/* import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store'; */

/* class DestinosApiClientViejo {
  getById(de: string): DestinoViaje {
    console.log('Llamado por la clase vieja!');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: 'mi_api.com'
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

class DestinosApiClientDecoreted extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  override getById(id: string): DestinoViaje {
    console.log('Llamado por la clase decorada!');
    console.log('config: ', this.config.apiEndpoint);
    return super.getById(id);
  }
} */

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [  DestinosApiClient,
   /* { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
   { provide: DestinosApiClient, useClass: DestinosApiClientDecoreted }, 
   { provide: DestinosApiClientViejo, useExisting: DestinosApiClient }*/
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  id: number;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    } as Sources,
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }] as AnyLayer[]
  };

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    // this.destino = null;
    // this.destinosApiClient.getById(this.id.toString());
  }

}
