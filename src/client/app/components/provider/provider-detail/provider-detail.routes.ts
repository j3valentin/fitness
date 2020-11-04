import { ProviderDetailComponent } from './provider-detail.component';
import { PersonExistGuard } from '../../../modules/shared/_guards/person-exist.guard';

export const ProviderDetailRoutes: Array<any> = [
  {
    path: 'provider',
    component: ProviderDetailComponent,
    canActivate: [PersonExistGuard]
  }
];
