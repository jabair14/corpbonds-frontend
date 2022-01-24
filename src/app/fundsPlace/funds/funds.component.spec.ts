import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsComponent } from './funds.component';

describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
