import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-trip',
  standalone: true,
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NavbarComponent,
    FooterComponent,
  ],
})
export class TripComponent {
  faPlus = faPlus;
}
