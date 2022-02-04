import { Component, OnInit, ElementRef  } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Review } from './review.model';
import { Consultant } from './consultant.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {

  review: Review = {
    id: undefined,
    rating: undefined,
    userId: undefined,
    consultantId: undefined,
    text: undefined
  }

  consultant: Consultant = {
    id: undefined,
    name: undefined,
    email: undefined,
    locationId: undefined,
    picture: undefined
  }

  reviews: any[]=[]
  five: number = 0
  four: number = 0
  three: number = 0
  two: number = 0
  one: number = 0

  fivepercent: number = 0
  fourpercent: number = 0
  threepercent: number = 0
  twopercent: number = 0
  onepercent: number = 0

  reviewsTable = false;
  noReviews = true;

  currentUserId = ''

  constructor(
    private route: ActivatedRoute, 
    private reviewsService: ReviewsService,
    private locationService: LocationService,
    private userService: UserService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      console.log('my id is', myid)
      this.locationService.getConsultant(myid).subscribe(payload => {
        console.log("this is payload on consultant", payload)
        this.consultant = payload
        this.reviewsService.getReviews().subscribe(payload => {
          // this.reviews = payload
          let consultantReviews = payload.filter((review: { consultantId: any; }) => review.consultantId == this.consultant.id)
          this.reviews = consultantReviews
          if (this.reviews.length > 0) {
            this.reviewsTable = true
            this.noReviews = false
          } else {
            this.noReviews = true
            this.reviewsTable = false
          }
          console.log('reviews are', consultantReviews)

          let fives = this.reviews.filter(review => review.rating == 5)
          this.five = fives.length
          let fours = this.reviews.filter(review => review.rating == 4)
          console.log('fours array', fours)
          this.four = fours.length
          let threes = this.reviews.filter(review => review.rating == 3)
          this.three = threes.length
          let twos = this.reviews.filter(review => review.rating == 2)
          this.two = twos.length
          let ones = this.reviews.filter(review => review.rating == 1)
          this.one = ones.length

          if (this.five == 0) {
            this.fivepercent = 0
          } else {
            this.fivepercent = (this.five/this.reviews.length)*100
          }
    
          if (this.four == 0) {
            this.fourpercent = 0
          } else {
            this.fourpercent = (this.four/this.reviews.length)*100
          }
    
          if (this.three == 0) {
            this.threepercent = 0
          } else {
            this.threepercent = (this.three/this.reviews.length)*100
          }
    
          if (this.two == 0) {
            this.twopercent = 0
          } else {
            this.twopercent = (this.two/this.reviews.length)*100
          }
    
          if (this.one == 0) {
            this.onepercent = 0
          } else {
            this.onepercent = (this.one/this.reviews.length)*100
          }
          let style5: string = `
          .five {width :${this.fivepercent}%; }
          `;
         this.createStyle(style5)

          let style4: string = `
          .four {width :${this.fourpercent}%; }
          `;
          this.createStyle(style4)
      
          let style3: string = `
          .three {width :${this.threepercent}%; }
          `;
          this.createStyle(style3)

          let style2: string = `
          .two {width :${this.twopercent}%; }
          `;
          this.createStyle(style2)

          let style1: string = `
          .one {width :${this.onepercent}%; }
          `;
          this.createStyle(style1)

          this.userService.postAccount().subscribe(payload => this.currentUserId = payload.body.data.uniqueID)
        })
      })
    })

  }
  createStyle(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.el.nativeElement.appendChild(styleElement);
  }
}