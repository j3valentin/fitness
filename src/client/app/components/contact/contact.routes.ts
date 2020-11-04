import { ContactComponent } from './contact.component';
import { LoggedInGuard } from '../../modules/shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../modules/shared/_guards/person-exist.guard';
import { RoleSuperAdminGuard } from '../../modules/shared/_guards/role-super-admin.guard';

export const OfficeRoutes: Array<any> = [
  {
    path: 'provider/contact/new',
    component: ContactComponent,
    canActivate: [LoggedInGuard, PersonExistGuard, RoleSuperAdminGuard]
  }
];
