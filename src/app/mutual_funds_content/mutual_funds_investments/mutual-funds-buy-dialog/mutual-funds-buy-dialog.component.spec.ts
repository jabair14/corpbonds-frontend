import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsBuyDialogComponent } from './mutual-funds-buy-dialog.component';

describe('MutualFundsBuyDialogComponent', () => {
  let component: MutualFundsBuyDialogComponent;
  let fixture: ComponentFixture<MutualFundsBuyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsBuyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsBuyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
