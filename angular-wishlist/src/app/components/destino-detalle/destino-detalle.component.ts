import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
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

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    // this.destino = null;
    // this.destinosApiClient.getById(id);
  }


}
