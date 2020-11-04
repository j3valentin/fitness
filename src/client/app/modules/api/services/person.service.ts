// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

// libs
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/utils/index';
import { Contact } from '../../models/contact.model';
import { Person } from '../../models/person.model';
import { RegisterService } from './register.service';
import { Agreement } from '../../models/agreement.model';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 09/05/2017.
 */

@Injectable()
export class PersonService {
  private dataStore: {
    countries: Object[];
    persons: Person[];
  };

  constructor(private loginService: RegisterService, private http: Http) {
    this.dataStore = {
      countries: [],
      persons: []
    };
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

  getCountries() {
    let options = this.createRequestOptions(false);
    return this.http
      .get(`${Config.ENVIRONMENT().API}/countries`, options)
      .map(res => res.json())
      .reduce((aCountries, oCountries) => {
        return Object.keys(oCountries).reduce((aCountries2, key) => {
          aCountries.push([key, oCountries[key]]);
          return aCountries2;
        }, aCountries);
      }, [])
      .map(c => (this.dataStore.countries = c));
  }

  getCountryCodeByName(s: String) {
    if (this.dataStore.countries.length === 0) {
      this.getCountries();
    }
    let c = this.dataStore.countries.find(x => x[1] === s);
    return c !== undefined ? c[0] : c;
  }

  getCountryNameByCode(s: String) {
    if (this.dataStore.countries.length === 0) {
      this.getCountries();
    }
    let c = this.dataStore.countries.find(x => x[0] === s);
    return c !== undefined ? c[1] : c;
  }

  getDocumentTypes(code: string): Observable<Array<string>> {
    return this.http
      .get(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/document-types.json`)
      .map(res => res.json())
      .map(documents => documents[code]);
  }

  create(person: Person, naturalPerson?: Person) {
    let options = this.createRequestOptions(true);
    let aPerson = JSON.parse(person.toJsonArray());

    if (naturalPerson !== undefined && naturalPerson !== null) {
      naturalPerson.contacts[0].country = this.getCountryCodeByName(
        naturalPerson.contacts[0].country
      );
      let natural = naturalPerson.toJson();
      aPerson.push(JSON.parse(natural));
    }

    let body = JSON.stringify(aPerson);

    return this.http
      .post(`${Config.ENVIRONMENT().API}/person/provider`, body, options)
      .map(response => response.json())
      .catch(this.handlePersonError);
  }

  getProviderById(id: String) {
    let options = this.createRequestOptions(false);
    return this.http
      .get(`${Config.ENVIRONMENT().API}/person/${id}`, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getProviders(position: Coordinates, range: number) {
    let options = this.createRequestOptions(false);
    return this.http
      .get(
        `${Config.ENVIRONMENT()
          .API}/person/providers/${position.latitude}/${position.longitude}/${range}`,
        options
      )
      .map(res => (this.dataStore.persons = <Person[]>res.json().providers));
  }

  get providers() {
    let options = this.createRequestOptions(true);
    return this.http
      .get(`${Config.ENVIRONMENT().API}/person/providers`, options)
      .map(res => (this.dataStore.persons = <Person[]>res.json().providers))
      .catch(this.handlePersonError);
  }

  getPersonRole() {
    let options = this.createRequestOptions(true);
    return this.http
      .get(`${Config.ENVIRONMENT().API}/person/role`, options)
      .map(response => response.json());
  }

  canAccess(email: string) {
    let options = this.createRequestOptions(true);
    // console.log(options);

    return this.http
      .get(`${Config.ENVIRONMENT().API}/person/access/${email}`, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  addOffice(contact: Contact) {
    let options = this.createRequestOptions(true);
    let body = contact.toJson();
    return this.http
      .post(
        `${Config.ENVIRONMENT().API}/person/${contact.personId}/contact`,
        body,
        options
      )
      .map(response => response.json());
  }

  addCustomer(agreement: Agreement, termsId: String) {
    let options = this.createRequestOptions(true);
    let body = agreement.toJson();
    // let body = JSON.stringify(customer);
    // console.log(body);
    return this.http
      .post(
        `${Config.ENVIRONMENT().API}/person/customer/plan/${termsId}`,
        body,
        options
      )
      .map(response => response.json())
      .catch(this.handlePersonError);
  }

  getCustomers(providerId: number) {
    let options = this.createRequestOptions(true);

    return this.http
      .get(
        `${Config.ENVIRONMENT().API}/person/customer/provider/${providerId}`,
        options
      )
      .map(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(Observable.of(false));
  }

  private handlePersonError(error: any): Promise<any> {
    if (error.status === 0 || error.status === 500) {
      return Promise.reject(Observable.of('SERVER_ERROR'));
    }
    if (error.status === 404) {
      return Promise.reject(Observable.of('NOT_FOUND'));
    }
    return Promise.reject(
      Observable.of(error.json().type || error.json().message || error)
    );
  }
}
