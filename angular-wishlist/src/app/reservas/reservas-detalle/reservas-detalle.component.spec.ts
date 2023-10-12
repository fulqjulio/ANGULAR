import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDetalleComponent } from './reservas-detalle.component';

describe('ReservasDetalleComponent', () => {
  let component: ReservasDetalleComponent;
  let fixture: ComponentFixture<ReservasDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasDetalleComponent]
    });
    fixture = TestBed.createComponent(ReservasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
