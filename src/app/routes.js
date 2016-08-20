import { QuestionsComponent } from './components/questions/questions.component.js';
import { ConnectComponent } from './components/connect/connect.component.js';
import { LoginComponent } from './components/login/login.component.js';

export const routes = [
  { path: '', component: QuestionsComponent, terminal: true },
  { path: 'questions/:user/:repository', component: QuestionsComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent }
];

