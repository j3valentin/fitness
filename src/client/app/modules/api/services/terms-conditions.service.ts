import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TermsConditions } from '../../models/terms-conditions.model';
import { RegisterService } from './register.service';
import { Config } from '../../core/utils/index';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 16/05/2017.
 */

@Injectable()
export class TermsConditionsService {
  // private debug: String;
  private dataStore: {
    plans: TermsConditions[];
  };

  constructor(private http: Http, private loginService: RegisterService) {
    // this.debug = '?XDEBUG_SESSION_START=netbeans-xdebug';
    this.dataStore = { plans: [] };
  }

  createRequestOptions(token?: boolean): RequestOptions {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    if (token === true) {
      headers.append('Authorization', 'Bearer ' + this.loginService.token);
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

  create(plan: TermsConditions) {
    return this.http
      .post(
        `${Config.ENVIRONMENT().API}/plan`,
        plan.toJson(),
        this.createRequestOptions(true)
      )
      .map(response => response.json())
      .catch(this.handleError);
  }

  getPlanById(plan: TermsConditions) {
    return this.http
      .get(
        `${Config.ENVIRONMENT().API}/plan/${plan.id}`,
        this.createRequestOptions(false)
      )
      .map(response => response.json());
  }

  getPlans(providerId: number) {
    return this.http
      .get(
        `${Config.ENVIRONMENT().API}/plan/provider/${providerId}`,
        this.createRequestOptions(false)
      )
      .map(response => <TermsConditions>response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 0 || error.status === 500) {
      return Promise.reject(Observable.of('SERVER_ERROR'));
    }
    if (error.status === 404) {
      return Promise.reject(Observable.of('NOT_FOUND'));
    }

    return Promise.reject(Observable.of(error.json().message || error));
  }
}
