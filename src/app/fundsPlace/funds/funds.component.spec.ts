import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Fund } from '../fund/fund.model';
import { FundService } from '../fund.service';


describe('FundService', () => {
  let fundService: FundService,
  httpTestingController: HttpTestingController;
  let baseUrl = "https://francs.herokuapp.com/funds";
  let fund: Fund;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[FundService]
    });

    fundService = TestBed.inject(FundService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fund = {
      id: 0,
      symbol: '',
      name: ''
    };
  });

  it('should be created', () => {
    expect(fundService).toBeTruthy();
  });

  it('should retrieve all courses', ()=>{

    let result: Fund[];
    fundService.getFunds().subscribe(t=> {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });

    req.flush([fund]);
 
  httpTestingController.verify();
});
})
//     fundService.getFunds().subscribe(funds=>{
//         expect(funds).toBeTruthy('No Courses Returned');
//         expect(funds.length).toBe(454, "incorrect number of courses");
//         let fund = funds.find(((fund: { id: number; }) =>fund.id ===454));
//         expect(fund.symbol.description).toBe('Angular Testing Course');
//     })

//     const req = httpTestingController.expectOne("https://francs.herokuapp.com/funds");
//     expect(req.request.method).toEqual('GET');

//     req.flush({payload:Object.values(FundService)})

//     httpTestingController.verify();

// });
// })

