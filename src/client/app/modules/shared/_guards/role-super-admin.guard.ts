import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from '../../core/index';
import { RegisterService } from '../../api/services/register.service';

@Injectable()
export class RoleSuperAdminGuard implements CanActivate {
  constructor(
    private nav: RouterExtensions,
    private loginService: RegisterService
  ) {}

  canActivate() {
    let role = JSON.parse(localStorage.getItem('currentUser')).role;
    // console.log(role);
    if (
      role.indexOf('ROLE_SUPER_ADMIN') !== -1 &&
      !this.loginService.isTokenExpired()
    ) {
      return true;
    }

    this.nav.navigate(['']);
    window.location.reload();

    return false;
  }
}
