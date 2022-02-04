import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsTableComponent } from './mutual-funds-table.component';

describe('MutualFundsTableComponent', () => {
  let component: MutualFundsTableComponent;
  let fixture: ComponentFixture<MutualFundsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
