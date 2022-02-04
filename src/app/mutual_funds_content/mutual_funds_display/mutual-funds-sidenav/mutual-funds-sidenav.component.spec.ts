import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsSidenavComponent } from './mutual-funds-sidenav.component';

describe('MutualFundsSidenavComponent', () => {
  let component: MutualFundsSidenavComponent;
  let fixture: ComponentFixture<MutualFundsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
