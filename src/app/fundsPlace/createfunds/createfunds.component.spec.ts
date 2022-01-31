import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFundsComponent } from './createfunds.component';

describe('CreateFundsComponent', () => {
  let component: CreateFundsComponent;
  let fixture: ComponentFixture<CreateFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
