import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvestmentsComponent } from './stock-investments.component';

describe('StockInvestmentsComponent', () => {
  let component: StockInvestmentsComponent;
  let fixture: ComponentFixture<StockInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
