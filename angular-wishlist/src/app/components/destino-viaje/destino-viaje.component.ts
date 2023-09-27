import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  constructor(){
  }

}
