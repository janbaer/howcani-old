import { QuestionsComponent } from './components/questions/questions.component.js';
import { ConnectComponent } from './components/connect/connect.component.js';
//import { EditComponent } from './components/post/edit';
//import { AboutComponent } from './components/about';
//import { LoginComponent } from './components/login';

export const router = {
  config: [
    { path: '/questions', name: 'Questions', component: QuestionsComponent, useAsDefault: true },
    { path: '/connect', name: 'Connect', component: ConnectComponent }
    //{ path: '/edit/:id', component: EditComponent, name: 'Edit' },
    //{ path: '/about', component: AboutComponent, name: 'About' },
    //{ path: '/login', component: LoginComponent, name: 'Login' }
  ]
};
