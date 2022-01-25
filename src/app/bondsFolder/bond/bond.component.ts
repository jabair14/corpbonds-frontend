import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondService } from '../bond.service';
import { Bond } from './bond.model';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss']
})
export class BondComponent implements OnInit {

  bond: Bond = {
    id: 0
  }

  constructor(private route: ActivatedRoute, private bondService: BondService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      this.bondService.getBond(myid).subscribe(payload => {
        console.log("this is payload on bond", payload)
        this.bond = payload
      })
    })
  }

}
