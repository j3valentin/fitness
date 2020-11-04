// angular
import { Injectable } from '@angular/core';

// app
import { RegisterService } from './register.service';

/**
 * Created by Javier Fonseca <reivaj8904@gmail.com>
 on 09/05/2017.
 */

@Injectable()
export class SecurityService {
  constructor(private loginService: RegisterService) {}

  hasRole(role: string) {
    return (
      this.loginService.currentUser &&
      this.loginService.currentUser.role.indexOf(role) !== -1
    );
  }
}
