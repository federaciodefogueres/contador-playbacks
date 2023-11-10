import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionesComponent } from './asociaciones.component';

describe('AsociacionesComponent', () => {
  let component: AsociacionesComponent;
  let fixture: ComponentFixture<AsociacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociacionesComponent]
    });
    fixture = TestBed.createComponent(AsociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
