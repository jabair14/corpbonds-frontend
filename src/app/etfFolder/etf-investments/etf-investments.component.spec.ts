import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtfInvestmentsComponent } from './etf-investments.component';

describe('EtfInvestmentsComponent', () => {
  let component: EtfInvestmentsComponent;
  let fixture: ComponentFixture<EtfInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtfInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtfInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
