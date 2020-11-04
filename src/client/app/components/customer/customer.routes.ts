// app
import { CustomerNewRoutes } from './customer-new/customer-new.routes';
import { CustomerListRoutes } from './customer-list/customer-list.routes';

export const CustomerRoutes: Array<any> = [
  ...CustomerNewRoutes,
  ...CustomerListRoutes
];
