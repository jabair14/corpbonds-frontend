import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondComponent } from './bond.component';

describe('BondComponent', () => {
  let component: BondComponent;
  let fixture: ComponentFixture<BondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
