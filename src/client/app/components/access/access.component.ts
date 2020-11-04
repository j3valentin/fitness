import { SecurityService } from './../../modules/api/services/security.service';
import { RegisterService } from '../../modules/api/services/register.service';
import { PersonService } from '../../modules/api/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fit-access',
  moduleId: module.id,
  templateUrl: 'access.component.html',
  styles: ['access.component.scss']
})
export class AccessComponent {
  access: boolean;
  constructor(
    public loginService: RegisterService,
    public personService: PersonService,
    public securityService: SecurityService
  ) { }

  // read(i: any) {
  //   this.personService.canAccess(i).subscribe(x => this.access = x,
  //     err => console.log(err));
  //   console.log(i);
  // }
}
