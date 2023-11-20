import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UserTripService } from 'src/app/services/user-trip/user-trip.service';
import { AuthService } from '@auth0/auth0-angular';
import { Trip } from 'src/app/models/Trip';

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
export class TripComponent implements OnInit {
  faPlus = faPlus;

  public loggedInUser: any;

  allTripsFromUser: any = [];

  constructor(
    private userTripService: UserTripService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.user$) {
      this.authService.user$.subscribe((data) => {
        this.loggedInUser = data;
        this.fetchTripsFromUser(this.loggedInUser.sub);
      });
    }
  }

  fetchTripsFromUser(userId: string): void {
    this.userTripService.GetTripsByUserId(userId).subscribe((trips) => {
      this.allTripsFromUser = trips;
      console.log(this.allTripsFromUser);
    });
  }
}
