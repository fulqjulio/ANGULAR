import { Injectable } from '@angular/core';
import { Action, createReducer, on, createAction } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

// Estado
export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
} 

export function initializeDestinosViajesState(): DestinosViajesState {
    return {
        items: [],
        loading: false,
        favorito: new DestinoViaje('', '')
    };
}

// Acciones
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down',
    INIT_MY_DATA_ACTION = '[Destinos Viajes] Init My Data',
}

export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}


export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje) {}
}

export class InitMyDataAction implements Action {
    type = DestinosViajesActionTypes.INIT_MY_DATA_ACTION;
    constructor(public destinos: string[]) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction;

// Reducer
export function reducerDestinosViajes (state: DestinosViajesState = initializeDestinosViajesState(), action: DestinosViajesActions): DestinosViajesState {
    switch(action.type){
        case DestinosViajesActionTypes.NUEVO_DESTINO: {
            console.log([...state.items, (action as NuevoDestinoAction).destino] as DestinoViaje[])
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino] as DestinoViaje[]
            };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            const _items = state.items.map((item: DestinoViaje) => {
                if (item.id === fav.id) {
                  return DestinoViaje.createDestinoViaje(item).setSelected(true);
                } else {
                  return DestinoViaje.createDestinoViaje(item).setSelected(false);
                }
              });
            return {
                ...state,
                items: _items,
                favorito: fav
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            let d = (action as VoteUpAction).destino;
            const _items = state.items.map((item: DestinoViaje) => {
                if (item.id === d.id) {
                    let clonedItem = DestinoViaje.createDestinoViaje(item);
                    clonedItem.voteUp();
                  return clonedItem
                }
                else {
                    return item
                }
              });
            return { 
                ...state, 
                items: _items
            };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            let d: DestinoViaje = (action as VoteDownAction).destino;
            const _items = state.items.map((item: DestinoViaje) => {
                if (item.id === d.id) {
                    let clonedItem = DestinoViaje.createDestinoViaje(item);
                    clonedItem.voteDown();
                  return clonedItem
                }
                else {
                    return item
                }
              });
            return { 
                ...state, 
                items: _items
            };
        }
        case DestinosViajesActionTypes.INIT_MY_DATA_ACTION: {
            const destinos: string[] = (action as InitMyDataAction).destinos;
            return {
                ...state,
                items: destinos.map((d) => new DestinoViaje(d, ''))
            };
        }
        default: return state;
    }
}

// Effects
@Injectable()
export class DestinosViajesEffects {
    nuevoAgregado$ = createEffect(() =>this.actions$.pipe(
        ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    ));

    constructor(private actions$: Actions) {}
}