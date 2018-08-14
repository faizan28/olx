import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpServiceService } from './http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap/alert/alert-config';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NgbAlertConfig,
    HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
