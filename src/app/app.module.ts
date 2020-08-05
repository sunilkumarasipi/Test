import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AuthenticationService } from './Services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { UserService } from './Services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdDatepickerPopup } from '../app/helpers/date-picker/datepicker-popup';
import { NgbDateCustomParserFormatter } from "./helpers/date-formatter";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    //NgbdDatepickerPopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgbModule
  ],
  providers: [
    //ReactiveFormsModule,
    //AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
