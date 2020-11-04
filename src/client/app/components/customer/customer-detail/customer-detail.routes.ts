import { CustomerDetailComponent } from './customer-detail.component';
import { LoggedInGuard } from '../../../modules/shared/_guards/logged-in.guard';
import { PersonExistGuard } from '../../../modules/shared/_guards/person-exist.guard';

export const CustomerDetailRoutes: Array<any> = [
  {
    path: 'provider/customer/:customerId',
    component: CustomerDetailComponent,
    canActivate: [LoggedInGuard, PersonExistGuard]
  }
];
