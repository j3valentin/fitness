import { AccessComponent } from './access/access.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CUSTOMER_COMPONENTS } from './customer/index';
import { PLAN_COMPONENTS } from './plan/index';
import { PROVIDER_COMPONENTS } from './provider/index';

export const APP_COMPONENTS: any[] = [
  AccessComponent,
  AppComponent,
  ContactComponent,
  HomeComponent,
  LoginComponent,
  ...CUSTOMER_COMPONENTS,
  ...PLAN_COMPONENTS,
  ...PROVIDER_COMPONENTS
];

export * from './app.component';
export * from './access/access.component';
export * from './customer/index';
export * from './contact/contact.component';
export * from './home/home.component';
export * from './login/login.component';
export * from './plan/index';
export * from './provider/index';
