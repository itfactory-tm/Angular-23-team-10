import { Component, ElementRef, Renderer2, OnInit,ChangeDetectionStrategy,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCog,
  faEdit,
  faEnvelope,
  faPlane,
  faQuestion,
  faSignOutAlt,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SignupButtonComponent } from '../signup-button/signup-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserProfileComponent,
    SignupButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  faBars = faBars;
  faTimes = faTimes;
  isMenuOpen = false; // Flag to track menu state
  showDropdown = false;
  faUser = faUser;
  faEdit = faEdit;
  faEnvelope = faEnvelope;
  faCog = faCog;
  faQuestion = faQuestion;
  faSignOutAlt = faSignOutAlt;
  faPlane = faPlane;

  public loggedInUser: any;

  isAuthenticated = signal(false);

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
  }

  /* ngOnInit(): void {
    if (this._auth.user$) {
      this._auth.user$.subscribe((data) => {
        this.loggedInUser = data;
        console.log('Logged in user: ', this.loggedInUser);
      });
    }
  } */

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Function to toggle the menu and apply the lock-screen class
  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
