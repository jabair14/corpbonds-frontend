import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDialogComponent } from './verify-dialog.component';

describe('VerifyDialogComponent', () => {
  let component: VerifyDialogComponent;
  let fixture: ComponentFixture<VerifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
