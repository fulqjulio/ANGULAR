import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDestinosComponent } from './lista-destinos.component';

describe('ListaDestinosComponent', () => {
  let component: ListaDestinosComponent;
  let fixture: ComponentFixture<ListaDestinosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDestinosComponent]
    });
    fixture = TestBed.createComponent(ListaDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
