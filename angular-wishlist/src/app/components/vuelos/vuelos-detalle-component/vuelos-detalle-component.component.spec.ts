import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetalleComponentComponent } from './vuelos-detalle-component.component';

describe('VuelosDetalleComponentComponent', () => {
  let component: VuelosDetalleComponentComponent;
  let fixture: ComponentFixture<VuelosDetalleComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VuelosDetalleComponentComponent]
    });
    fixture = TestBed.createComponent(VuelosDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
