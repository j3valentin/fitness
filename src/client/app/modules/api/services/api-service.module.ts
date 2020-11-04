// angular
import { NgModule } from '@angular/core';
// import { DatePipe } from '@angular/common';

import { LoggedInGuard } from '../../shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../shared/_guards/person-exist.guard';
import { PersonService } from './person.service';
import { RegisterService } from './register.service';
import { RoleAdminGuard } from '../../shared/_guards/role-admin.guard';
import { RoleSuperAdminGuard } from '../../shared/_guards/role-super-admin.guard';
import { TermsConditionsService } from './terms-conditions.service';
import { SecurityService } from './security.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    // DatePipe,
    LoggedInGuard,
    PersonExistGuard,
    RoleAdminGuard,
    RoleSuperAdminGuard,
    PersonService,
    RegisterService,
    SecurityService,
    TermsConditionsService
  ]
})
export class ApiServicesModule {}
