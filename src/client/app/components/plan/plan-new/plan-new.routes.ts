import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../../modules/shared/_guards/person-exist.guard';
import { PlanNewComponent } from './plan-new.component';
import { RoleAdminGuard } from '../../../modules/shared/_guards/role-admin.guard';

export const PlanNewRoutes: Array<any> = [
  {
    path: 'provider/plan/new',
    component: PlanNewComponent,
    canActivate: [LoggedInGuard, PersonExistGuard, RoleAdminGuard]
  }
];
