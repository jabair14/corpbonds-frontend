import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondprofileComponent } from './bondprofile.component';

describe('BondprofileComponent', () => {
  let component: BondprofileComponent;
  let fixture: ComponentFixture<BondprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
