import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { PersonService } from '../../../modules/api/services/person.service';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../../modules/models/person.model';

@Component({
  selector: 'fit-customer-detail',
  moduleId: module.id,
  templateUrl: 'customer-detail.component.html',
  styleUrls: ['customer-detail.component.css']
})
export class CustomerDetailComponent {
  customer: Person;

  constructor(
    private personService: PersonService,
    private params: ActivatedRoute
  ) {
  }

}
