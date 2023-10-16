import { Component, Input, HostBinding, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { VoteDownAction, VoteUpAction } from 'src/app/models/destinos-viaje-state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('1s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  // @Output() voteup: EventEmitter<DestinoViaje>;
  // @Output() votedown: EventEmitter<DestinoViaje>;
  favorito: boolean = false;

  constructor(private store: Store<AppState>){
    this.clicked = new EventEmitter();
    // this.voteup = new EventEmitter();
    // this.votedown = new EventEmitter();
    this.store.select(state => state.destinos.favorito).subscribe((f: DestinoViaje) => {
      if ((this.destino != undefined) && (f.nombre === this.destino.nombre)){
          let favCopy: DestinoViaje = DestinoViaje.createDestinoViaje({...f} as DestinoViaje);
          favCopy.setSelected(true);
          this.destino = favCopy;
          // this.destino.setSelected(true);
      }
    });
  }

  ir() {
    this.clicked.emit(this.destino);
    return false
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    // this.voteup.emit(this.destino);
    return false
  }

  voteDown() {
    // this.votedown.emit(this.destino);
    this.store.dispatch(new VoteDownAction(this.destino));
    return false
  }
}
