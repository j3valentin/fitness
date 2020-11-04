import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterExtensions, Config } from '../../../modules/core/index';
import { PersonService } from '../../../modules/api/services/person.service';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../../modules/models/person.model';
import { RegisterService } from '../../../modules/api/services/register.service';

@Component({
  selector: 'fit-customer-list',
  moduleId: module.id,
  templateUrl: 'customer-list.component.html',
  styleUrls: ['customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Observable<Person[]>;
  providerId: number;
  public URL: String;

  constructor(
    private personService: PersonService,
    private loginService: RegisterService,
    private params: ActivatedRoute
  ) {
    this.URL = `${Config.ENVIRONMENT().API}/..`;
    this.providerId = this.loginService.currentUser.providerId;
  }

  ngOnInit() {
    this.customers = this.personService.getCustomers(this.providerId);
  }
}
