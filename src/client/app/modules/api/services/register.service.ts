import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../../models/user.model';
import { Config } from '../../core/utils/index';
import { Observable } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Rx';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 08/05/2017.
 */

@Injectable()
export class RegisterService {
  public currentUser: User;
  public token: string;
  debug: string = '';

  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser && this.currentUser.token;
  }

  createRequestOptions(token?: boolean): RequestOptions {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    if (token === true) {
      headers.append('Authorization', 'Bearer ' + this.token);
    }

    let myParams = new URLSearchParams();
    if (Config.ENVIRONMENT().ENV === 'DEV') {
      myParams.set('XDEBUG_SESSION_START', 'netbeans-xdebug');
    }

    let options = new RequestOptions({
      headers: headers,
      params: myParams
    });

    return options;
  }

  login(u: User) {
    let options = this.createRequestOptions(false);
    // console.log('hola');
    let body = JSON.stringify({
      _username: u.email.trim(),
      _password: u.password.trim()
    });

    return this.http
      .post(`${Config.ENVIRONMENT().API}/login_check`, body, options)
      .map(response => {
        // if (Config.isWeb) {
        let respon = response.json();
        let token = respon && respon.token;

        if (token) {
          let user = new User(
            u.email.trim(),
            u.password.trim(),
            respon.roles,
            respon.token.trim(),
            respon.image,
            respon.name,
            respon.provider_id
          );
          this.token = token;
          this.currentUser = user;
          let storageTime = new Date().getTime();

          localStorage.setItem(
            'storageTime',
            JSON.stringify({ time: storageTime })
          );
          localStorage.setItem('currentUser', user.toJson());
        }
        return respon;
      })
      .catch(this.handleError);
  }

  getPersonRole() {
    let options = this.createRequestOptions(true);
    return this.http
      .get(`${Config.ENVIRONMENT().API}/person/role`, options)
      .map(response => response.json());
  }

  register(user: User) {
    let options = this.createRequestOptions(false);

    // console.log('hola');
    let body = JSON.stringify({
      username: user.email.trim(),
      password: user.password.trim(),
      mail: user.email.trim()
    });

    return this.http
      .post(`${Config.ENVIRONMENT().API}/register`, body, options)
      .map(response => response.json());
  }

  getPersonByUser(user: User) {
    let options = this.createRequestOptions(false);

    // console.log('hola');
    let body = JSON.stringify({
      username: user.email.trim(),
      password: user.password.trim(),
      mail: user.email.trim()
    });

    return this.http
      .post(`${Config.ENVIRONMENT().API}/register`, body, options)
      .map(response => response.json());
  }

  logOut(): void {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isTokenExpired() {
    const now = new Date().getTime();
    const storageTime = JSON.parse(localStorage.getItem('storageTime')).time;
    const time = (storageTime / 1000 + 3600) * 1000;
    if (now > time) {
      this.logOut();
      return true;
    }
    return false;
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 0 || error.status === 500) {
      return Promise.reject(Observable.of('SERVER_ERROR'));
    }
    if (error.status === 404) {
      return Promise.reject(Observable.of('NOT_FOUND'));
    }
    return Promise.reject(
      Observable.of('BAD_CREDENTIALS' || error.json().message || error)
    );
  }
}
