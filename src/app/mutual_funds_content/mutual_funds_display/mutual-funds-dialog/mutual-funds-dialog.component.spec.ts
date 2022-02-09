import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsDialogComponent } from './mutual-funds-dialog.component';

describe('MutualFundsDialogComponent', () => {
  let component: MutualFundsDialogComponent;
  let fixture: ComponentFixture<MutualFundsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
