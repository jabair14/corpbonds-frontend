import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvestModalComponent } from './stock-invest-modal.component';

describe('StockInvestModalComponent', () => {
  let component: StockInvestModalComponent;
  let fixture: ComponentFixture<StockInvestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInvestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInvestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
