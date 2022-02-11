import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsInvestmentsComponent } from './mutual-funds-investments.component';

describe('MutualFundsInvestmentsComponent', () => {
  let component: MutualFundsInvestmentsComponent;
  let fixture: ComponentFixture<MutualFundsInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
