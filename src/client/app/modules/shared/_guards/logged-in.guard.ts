import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from '../../core/index';
import { RegisterService } from '../../api/services/register.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private nav: RouterExtensions,
    private loginService: RegisterService
  ) {}

  canActivate() {
    if (
      localStorage.getItem('currentUser') &&
      !this.loginService.isTokenExpired()
    ) {
      return true;
    }

    this.nav.navigate(['/login']);
    // window.location.reload();

    return false;
  }
}
