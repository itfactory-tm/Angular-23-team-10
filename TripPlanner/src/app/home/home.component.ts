import { Component, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
  faPlaneDeparture,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  constructor() {}

  faGlass = faMagnifyingGlass;
  faLocation = faLocationDot;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faDestination = faPlaneDeparture;
  faStar = faStar;
  faUsers = faUsers;
}
