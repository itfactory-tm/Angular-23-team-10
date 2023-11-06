import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
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

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // Function to toggle the menu and apply the lock-screen class
  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
