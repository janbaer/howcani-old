import { provideRouter, RouterConfig } from '@angular/router';

import { QuestionsComponent } from './components/questions/questions.component.js';
import { ConnectComponent } from './components/connect/connect.component.js';
import { LoginComponent } from './components/login/login.component.js';

export const appRoutes: RouterConfig = [
  { path: '', component: QuestionsComponent, terminal: true },
  { path: 'connect', component: ConnectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent }
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);

export const router = {
  config: [
  ]
};
