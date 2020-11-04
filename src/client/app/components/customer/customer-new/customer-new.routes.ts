import { CustomerNewComponent } from './customer-new.component';
import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../../modules/shared/_guards/person-exist.guard';
import { RoleAdminGuard } from '../../../modules/shared/_guards/role-admin.guard';

export const CustomerNewRoutes: Array<any> = [
  {
    path: 'provider/customer/new',
    component: CustomerNewComponent,
    canActivate: [LoggedInGuard, PersonExistGuard, RoleAdminGuard]
  }
];
