import { QuestionsComponent } from './components/questions/questions.component.js';
import { QuestionViewComponent } from './components/question-view/question-view.components.js';
import { ConnectComponent } from './components/connect/connect.component.js';
import { LoginComponent } from './components/login/login.component.js';

export const routes = [
  { path: '', component: QuestionsComponent, pathMatch: 'full' },
  { path: 'questions/:user/:repository', component: QuestionsComponent },
  { path: 'questions/:user/:repository/:id', component: QuestionViewComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent }
];

