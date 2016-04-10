import { QuestionsComponent } from './components/questions/questions.component.js';
import { ConnectComponent } from './components/connect/connect.component.js';
import { LoginComponent } from './components/login/login.component.js';

export const router = {
  config: [
    { path: '/', name: 'Questions', component: QuestionsComponent, useAsDefault: true },
    { path: '/connect', name: 'Connect', component: ConnectComponent },
    { path: '/login', name: 'Login', component: LoginComponent }
  ]
};
