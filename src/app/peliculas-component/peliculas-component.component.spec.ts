import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasComponentComponent } from './peliculas-component.component';

describe('PeliculasComponentComponent', () => {
  let component: PeliculasComponentComponent;
  let fixture: ComponentFixture<PeliculasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculasComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
