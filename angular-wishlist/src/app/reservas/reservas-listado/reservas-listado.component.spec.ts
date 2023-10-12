import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasListadoComponent } from './reservas-listado.component';

describe('ReservasListadoComponent', () => {
  let component: ReservasListadoComponent;
  let fixture: ComponentFixture<ReservasListadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservasListadoComponent]
    });
    fixture = TestBed.createComponent(ReservasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
