import {
  InjectionToken,
  NgModule,
  APP_INITIALIZER,
  Injectable,
  ApplicationRef,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import {
  ActionReducerMap,
  StoreModule as NgRxStoreModule,
  Store,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Dexie } from 'dexie';
import { TranslateLoader, TranslateService, TranslateModule } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import {
  DestinosViajesEffects,
  DestinosViajesState,
  initializeDestinosViajesState,
  reducerDestinosViajes,
  DestinosViajesActions,
  InitMyDataAction,
} from './models/destinos-viaje-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinoViaje } from './models/destino-viaje.model';
import { EspiameDirective } from './espiame.directive';
import { TrackearClickDirective } from './trackear-click.directive';

// app config
export interface AppConfig {
  apiEdnpoint: string;
}
export const APP_CONFIG_VALUE: AppConfig = {
  apiEdnpoint: 'http://localhost:3000',
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent },
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard],
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos,
  },
];

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState, DestinosViajesActions> = {
  destinos: reducerDestinosViajes,
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState(),
};
//

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
export class AppLoadService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-TOKEN': 'token-seguridad',
    });
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEdnpoint + '/my', {
      headers: headers,
    });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// Dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  translations: Dexie.Table<Translation, number>;

  constructor() {
    super('MyDataBase');
    this.version(1).stores({
      destinos: '++id, nombre, iamgenUrl',
    });
    // Versionamiento
    this.version(2).stores({
      destinos: '++id, nombre, iamgenUrl',
      translations: '++id, lang, key, value',
    });
  }
}

export const db = new MyDataBase();

/* // i18n init
class TranlationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
	const promise = db.translations
						.where('lang')
						.equals(lang)
						.toArray()
						.then(results => {
							if (results.length === 0) {
								return this.http
											.get<Translation[]>(APP_CONFIG_VALUE.apiEdnpoint + '/api/translation?lang=' + lang)
											.toPromise()
											.then(apiResults => {
												db.translations.bulkAdd(apiResults);
												return apiResults
											});
							}
							return results;
						}).then((traducciones) => {
							console.log("Traducciones cargadas: ");
							console.log(traducciones);
							return traducciones;
						}).then((traducciones) => {
							return traducciones.map((t) => ({ [t.key]: t.value }));
						});
	return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
	return new TranlationLoader(http);
} */

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
    TrackearClickDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    /* TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
	  }), */
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    DestinosApiClient,
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppLoadService],
      multi: true,
    },
    MyDataBase,
    // TranslateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
