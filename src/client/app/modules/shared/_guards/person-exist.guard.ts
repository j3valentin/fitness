import { RegisterService } from './../../api/services/register.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { RouterExtensions } from '../../core/index';
import { PersonService } from '../../api/services/person.service';
import { Person } from '../../models/person.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonExistGuard implements CanActivate {
  person: Person;
  constructor(
    private nav: RouterExtensions,
    private loginService: RegisterService,
    public providerService: PersonService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const personId = this.loginService.currentUser.providerId;
    return this.providerService
      .getProviderById(personId)
      .map(x => {
        this.person = x;
        if (
          this.person.name.length > 0 &&
          !this.loginService.isTokenExpired()
        ) {
          return true;
        }
        this.nav.navigate(['/']);
        return false;
      })
      .catch(error => {
        this.nav.navigate(['/']);
        return error;
      });
  }
}
