import { RoleSuperAdminGuard } from '../../../modules/shared/_guards/role-super-admin.guard';
import { ProviderNewComponent } from './provider-new.component';
import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';

export const ProviderNewRoutes: Array<any> = [
  {
    path: 'person/provider',
    component: ProviderNewComponent,
    canActivate: [LoggedInGuard, RoleSuperAdminGuard]
  }
];
