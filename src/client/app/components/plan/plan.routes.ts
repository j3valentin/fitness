// app
import { PlanNewRoutes } from './plan-new/plan-new.routes';
import { PlanDetailRoutes } from './plan-detail/plan-detail.routes';

export const PlanRoutes: Array<any> = [...PlanNewRoutes, ...PlanDetailRoutes];
