import { ComponentFixture, TestBed } from '@angular/core/testing';

import { charactersComponentComponent } from './characters-component.component';

describe('charactersComponentComponent', () => {
  let component: charactersComponentComponent;
  let fixture: ComponentFixture<charactersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ charactersComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(charactersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
