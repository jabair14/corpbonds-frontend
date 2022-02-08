import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellModalComponent } from './sell-modal.component';

describe('SellModalComponent', () => {
  let component: SellModalComponent;
  let fixture: ComponentFixture<SellModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
