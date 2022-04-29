import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsComponentComponent } from './comics-component.component';

describe('ComicsComponentComponent', () => {
  let component: ComicsComponentComponent;
  let fixture: ComponentFixture<ComicsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
