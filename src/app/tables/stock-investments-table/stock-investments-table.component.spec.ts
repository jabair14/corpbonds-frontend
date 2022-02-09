import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvestmentsTableComponent } from './stock-investments-table.component';

describe('StockInvestmentsTableComponent', () => {
  let component: StockInvestmentsTableComponent;
  let fixture: ComponentFixture<StockInvestmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInvestmentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInvestmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
