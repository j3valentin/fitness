import { CustomerListComponent } from './customer-list.component';
import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../../modules/shared/_guards/person-exist.guard';
import { RoleAdminGuard } from '../../../modules/shared/_guards/role-admin.guard';

export const CustomerListRoutes: Array<any> = [
  {
    path: 'provider/customer',
    component: CustomerListComponent
    /*,
    canActivate: [LoggedInGuard, PersonExistGuard,RoleAdminGuard]*/
  }
];
