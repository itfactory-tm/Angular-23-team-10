import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: '<button (click)="login()">Log in</button>'
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect();
  }
}

