import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Location } from '../locations/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  location: Location = {
    id: 0,
    city: undefined,
    country: undefined,
    consultants: undefined
  }

  consultants: any[]=[]

  constructor(
    private route: ActivatedRoute, 
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      this.locationService.getLocation(myid).subscribe(payload => {
        console.log("this is payload on bond", payload)
        this.location = payload
        this.consultants = this.location.consultants
        console.log("this is consultants array", this.consultants)
      })
    })
  }

}
