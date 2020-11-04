// app
import { AccessRoutes } from './access/access.routes';
import { CustomerRoutes } from './customer/customer.routes';
import { HomeRoutes } from './home/home.routes';
import { LoginRoutes } from './login/login.routes';
import { OfficeRoutes } from './contact/contact.routes';
import { ProviderRoutes } from './provider/provider.routes';
import { PlanRoutes } from './plan/plan.routes';

export const routes: Array<any> = [
  ...AccessRoutes,
  ...CustomerRoutes,
  ...HomeRoutes,
  ...LoginRoutes,
  ...OfficeRoutes,
  ...PlanRoutes,
  ...ProviderRoutes,
];
