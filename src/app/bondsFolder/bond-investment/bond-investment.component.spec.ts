import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondInvestmentComponent } from './bond-investment.component';

describe('BondInvestmentComponent', () => {
  let component: BondInvestmentComponent;
  let fixture: ComponentFixture<BondInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
