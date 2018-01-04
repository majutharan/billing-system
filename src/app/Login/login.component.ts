import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {retry} from 'rxjs/operator/retry';
import {observable} from 'rxjs/symbol/observable';

@Component({
  templateUrl: 'login.component.html',
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationServices: AuthenticationService) {

  }

  ngOnInit() {
    this.authenticationServices.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

  }

  login() {
    this.authenticationServices.login(this.model.username, this.model.password).subscribe(
      data => {
        console.log(data);
        this.check(data);
      },
      error => {
        console.log('server error');
      }
    );
  }

  check(data) {
    if (data.username == null) {
      console.log('fuck off');
    }else {
      this.router.navigate([this.returnUrl]);
    }
  }
}
