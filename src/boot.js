import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/routes.js';

import { APP_COMPONENTS } from './app/components';
import { APP_PIPES } from './app/pipes';
import { APP_SERVICES } from './app/services';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, APP_COMPONENTS, APP_PIPES],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [APP_SERVICES]
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

