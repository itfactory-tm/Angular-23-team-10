import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faLocation,
  faLocationDot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faGlass = faMagnifyingGlass;
  faLocation = faLocationDot;
}
