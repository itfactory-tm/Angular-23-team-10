import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent {
  faPlus = faPlus;
}
