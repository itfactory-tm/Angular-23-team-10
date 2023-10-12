import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faChevronLeft,
  faChevronRight,
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

  constructor() {}

  faGlass = faMagnifyingGlass;
  faLocation = faLocationDot;
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;

  currentIndex = 0;

  imageUrls = [
    'assets/place1.jpg',
    'assets/place2.jpg',
    'assets/place3.jpg',
  ];

  ngOnInit() {
    setInterval(() => {
      this.showNextImage();
    }, 10000);
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
  }

  showPreviousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
  }
}
