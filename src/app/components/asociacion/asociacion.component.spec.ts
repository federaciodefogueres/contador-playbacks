import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionComponent } from './asociacion.component';

describe('AsociacionComponent', () => {
  let component: AsociacionComponent;
  let fixture: ComponentFixture<AsociacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociacionComponent]
    });
    fixture = TestBed.createComponent(AsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
