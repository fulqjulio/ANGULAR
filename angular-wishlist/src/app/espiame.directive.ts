import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appEspiame]'
})
export class EspiameDirective implements OnInit, OnDestroy {
  static nextId = 0;
  log = (msg:string) => console.log(`Evento #${EspiameDirective.nextId++} ${msg}`);
  constructor() { }
  ngOnInit(): void {
    this.log('##########************ onInit');
  }
  
  ngOnDestroy(): void {
    this.log('##########************ onDestroy');
  }
}
