import { Component, Input, HostBinding, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { VoteDownAction, VoteUpAction } from 'src/app/models/destinos-viaje-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  // @Output() voteup: EventEmitter<DestinoViaje>;
  // @Output() votedown: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>){
    this.clicked = new EventEmitter();
    // this.voteup = new EventEmitter();
    // this.votedown = new EventEmitter();
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
