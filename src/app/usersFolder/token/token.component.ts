import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.user.getEmailConf(param).subscribe((data) => {
        console.log(data);
        if (data.message === 'success') this.router.navigate(['/login']);
      });
    });
  }
}
