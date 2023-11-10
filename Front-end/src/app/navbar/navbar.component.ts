import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCog,
  faEdit,
  faEnvelope,
  faQuestion,
  faSignOutAlt,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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

  public loggedInUser: any;

  constructor(public _auth: AuthService) {}

  ngOnInit(): void {
    if (this._auth.user$) {
      this._auth.user$.subscribe((data) => {
        this.loggedInUser = data;
        console.log('Logged in user: ', this.loggedInUser);
      });
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Function to toggle the menu and apply the lock-screen class
  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
