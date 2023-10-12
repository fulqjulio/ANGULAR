import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// import { APP_CONFIG_VALUE, APP_CONFIG } from './app.module';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    /* providers: [
      { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
    ] */
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-wishlist'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-wishlist');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-wishlist app is running!');
  });
});
