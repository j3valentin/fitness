// app
import { ProviderDetailRoutes } from './provider-detail/provider-detail.routes';
import { ProviderListRoutes } from './provider-list/provider-list.routes';
import { ProviderNewRoutes } from './provider-new/provider-new.routes';

export const ProviderRoutes: Array<any> = [
  ...ProviderListRoutes,
  ...ProviderDetailRoutes,
  ...ProviderNewRoutes
];
