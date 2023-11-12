import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ToastComponent } from './toast/toast.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    AuthModule.forRoot({
      domain: 'dev-2ki8nim0a3vrbww1.us.auth0.com',
      clientId: 'jGOPQttdT71dyPnd7zJUepi46zGNoihE',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }), AppRoutingModule, NavbarComponent, FooterComponent, ToastComponent, BrowserAnimationsModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
