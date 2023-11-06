import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCoffee,
  faMagnifyingGlass,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faBars = faBars;
  faTimes = faTimes;
  isMenuOpen = false; // Flag to track menu state
  // showNavbar: boolean | undefined;

  // constructor(private router: Router) {
  //   // Subscribe to router events to determine when to show/hide the navbar
  //   router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.showNavbar = !event.url.includes('/getstarted');
  //     }
  //   });
  // }

  // Function to toggle the menu
  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
