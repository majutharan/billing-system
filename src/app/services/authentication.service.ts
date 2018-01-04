import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {retry} from 'rxjs/operator/retry';


@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    return this.http.post(environment.apiUrl + '/user/authenticate', {username: username, password: password}, this.jwt()).map((response: Response) => {
  const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private jwt() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

}


