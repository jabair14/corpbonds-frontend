import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetcalcComponent } from './retcalc.component';

describe('RetcalcComponent', () => {
  let component: RetcalcComponent;
  let fixture: ComponentFixture<RetcalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetcalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
