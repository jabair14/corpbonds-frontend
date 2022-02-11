import { Component, OnInit, ElementRef } from '@angular/core';
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
  users: any[] = []
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

  reviewsTable = true;
  noReviews = false;
  yesReviews = false;
  loggedinCheck = false;
  loggedoutCheck = false

  currentUserId = ''
  consultantId:number = 0;

  text = '';
  starList: boolean[] = [true,true,true,true,true];
  rating: number = 0; 

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
      this.consultantId = myid
      console.log('my id is', myid)
      this.locationService.getConsultant(myid).subscribe(payload => {
        console.log("this is payload on consultant", payload)
        this.consultant = payload
        this.reviewsService.getReviews().subscribe(payload => {
          // this.reviews = payload
          let consultantReviews = payload.filter((review: { consultantId: any; }) => review.consultantId == this.consultant.id)
          this.reviews = consultantReviews
          this.userService.whoAmI().subscribe(payload => {this.currentUserId = payload.body.userID
            this.loginChecker()
          })


          console.log('reviews are', consultantReviews)
          if (this.reviews.length > 0) {
            this.reviewsTable = true
            this.noReviews = false
            this.yesReviews = true
            console.log('this is reviews length', this.reviews.length)
          } else {
            this.reviewsTable = false
            this.noReviews = true
            this.yesReviews = false
          }
          
          

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

          console.log('the current user id is', this.currentUserId, 'this is the reviews length', this.reviews.length)


        })
      })
    })
  }



  createStyle(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.el.nativeElement.appendChild(styleElement);
  }

  setStar(data:any){
    this.rating=data+1;                               
    for(var i=0;i<=4;i++){  
      if(i<=data){  
        this.starList[i]=false;  
      }  
      else{  
        this.starList[i]=true;  
      }  
    }  
  }  

  loginChecker(){
    if (this.currentUserId == ''){
      this.loggedinCheck = false
      this.loggedoutCheck = true
    } else {
      this.loggedinCheck = true
      this.loggedoutCheck = false
    }
  }
  
  postReview(){
    let user = {
      id: this.currentUserId
    }
    let review = {
      rating: this.rating,
      userId: this.currentUserId,
      consultantId: this.consultantId,
      text: this.text
    }
    let thisUsersReview = this.reviews.map(review => review.userId == this.currentUserId)
    let containsReview = thisUsersReview.find(value => value == true)
    if (containsReview == true){
      alert('You have already left a review for this consultant')
      console.log('this users revies for this consultant', containsReview)
    }else {
    this.reviewsService.getUsers().subscribe(payload => {
      this.users = payload
      console.log('users array is', this.users)
      const doesUserExist = this.users.find(user => user.id == this.currentUserId)
      if (doesUserExist == undefined) {
        this.reviewsService.addUser(user).subscribe(payload => {
          console.log(payload)
        })
        this.reviewsService.addReview(review).subscribe(payload => {
          if(payload){
            console.log(payload)
            window.location.reload()
          }
        })
      } else {
        this.reviewsService.addReview(review).subscribe(payload => {
          if(payload){
            console.log(payload)
            window.location.reload()
          }
        }) 
      }
    })
  }
  } 
}

