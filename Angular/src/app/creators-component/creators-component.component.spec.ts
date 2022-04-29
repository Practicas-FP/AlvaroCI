import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorsComponentComponent } from './creators-component.component';

describe('CreatorsComponentComponent', () => {
  let component: CreatorsComponentComponent;
  let fixture: ComponentFixture<CreatorsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
