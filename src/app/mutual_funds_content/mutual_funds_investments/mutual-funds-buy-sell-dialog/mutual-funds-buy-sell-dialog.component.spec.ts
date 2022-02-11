import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsBuySellDialogComponent } from './mutual-funds-buy-sell-dialog.component';

describe('MutualFundsBuySellDialogComponent', () => {
  let component: MutualFundsBuySellDialogComponent;
  let fixture: ComponentFixture<MutualFundsBuySellDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsBuySellDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsBuySellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
