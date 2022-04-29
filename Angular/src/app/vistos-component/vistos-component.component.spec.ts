import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistosComponentComponent } from './vistos-component.component';

describe('VistosComponentComponent', () => {
  let component: VistosComponentComponent;
  let fixture: ComponentFixture<VistosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistosComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
