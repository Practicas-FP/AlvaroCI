import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosComponentComponent } from './favoritos-component.component';

describe('FavoritosComponentComponent', () => {
  let component: FavoritosComponentComponent;
  let fixture: ComponentFixture<FavoritosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritosComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
