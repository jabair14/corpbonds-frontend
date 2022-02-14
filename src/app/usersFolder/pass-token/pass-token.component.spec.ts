import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassTokenComponent } from './pass-token.component';

describe('PassTokenComponent', () => {
  let component: PassTokenComponent;
  let fixture: ComponentFixture<PassTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
