import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastComponent } from './shared/toast/toast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FooterComponent } from './shared/footer/footer.component';
import { ActivityFormComponent } from './components/calender-activity-form/calender-activity-form.component';

@NgModule({
  declarations: [AppComponent, ActivityFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      //domain: 'dev-2ki8nim0a3vrbww1.us.auth0.com',
      domain: environment.AUTH0_DOMAIN,
      //clientId: 'jGOPQttdT71dyPnd7zJUepi46zGNoihE',
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        audience: environment.AUTH0_AUDIENCE,
        redirect_uri: window.location.origin
      },      
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [
          `${environment.api_url}/trip`,
          `${environment.api_url}/trip/*`,
        ],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
