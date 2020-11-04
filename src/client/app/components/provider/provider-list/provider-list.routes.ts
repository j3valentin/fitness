import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';
import { ProviderListComponent } from './provider-list.component';
import { RoleSuperAdminGuard } from '../../../modules/shared/_guards/role-super-admin.guard';

export const ProviderListRoutes: Array<any> = [
  {
    path: 'provider/list',
    component: ProviderListComponent,
    canActivate: [LoggedInGuard, RoleSuperAdminGuard]
  }
];
