import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BondService } from '../bond.service';


import { BondsComponent } from './bonds.component';



describe('BondsComponent', () => {
  let component: BondsComponent;
  let fixture: ComponentFixture<BondsComponent>;
  let httpTestingController: HttpClientModule;
  let router: RouterTestingModule;
  let filter: Ng2SearchPipeModule

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
        Ng2SearchPipeModule
      ],
      declarations: [ BondsComponent ],
      providers: [ BondService, HttpClientModule, RouterTestingModule, Ng2SearchPipeModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpClientModule)
    router = TestBed.inject (RouterTestingModule)
    filter = TestBed.inject(Ng2SearchPipeModule)
    fixture = TestBed.createComponent(BondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
