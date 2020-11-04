import { AccessComponent } from './access.component';
import { LoggedInGuard } from '../../modules/shared/_guards/logged-in.guard';

export const AccessRoutes: Array<any> = [
  {
    path       : 'access',
    component  : AccessComponent,
    canActivate: [LoggedInGuard]
  }
];
