import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesComponentComponent } from './detalles-component.component';

describe('DetallesComponentComponent', () => {
  let component: DetallesComponentComponent;
  let fixture: ComponentFixture<DetallesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
