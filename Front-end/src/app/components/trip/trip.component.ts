import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UserTripService } from 'src/app/services/user-trip/user-trip.service';
import { AuthService } from '@auth0/auth0-angular';
import { Trip } from 'src/app/models/Trip';
import { TripService } from 'src/app/services/trip/trip.service';
import { ToastComponent } from '../../shared/toast/toast.component';

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
    ToastComponent,
  ],
})
export class TripComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  public loggedInUser: any;
  userId: string = '';
  tripId: number = 0;
  isError: boolean = false;
  warning: boolean = false;
  isDeleted: boolean = false;

  allTripsFromUser: any = [];

  constructor(
    private tripService: TripService,
    private userTripService: UserTripService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.user$) {
      this.authService.user$.subscribe((data) => {
        this.loggedInUser = data;
        this.fetchTripsFromUser(this.loggedInUser.sub);
        this.userId = data?.sub || '';
      });
    }
  }

  fetchTripsFromUser(userId: string): void {
    this.userTripService.GetTripsByUserId(userId).subscribe((trips) => {
      this.allTripsFromUser = trips;
      console.log(this.allTripsFromUser);
    });
  }

  showModal(tripId: number): void {
    this.warning = true;
    this.tripId = tripId;
  }

  hideModal(): void {
    this.warning = false;
  }

  deleteTrip(): void {
    this.tripService.deleteTrip(this.tripId).subscribe(
      () => {
        this.deleteUserTrip(this.userId, this.tripId);
        this.fetchTripsFromUser(this.userId);
        this.isDeleted = true;
      },
      () => {
        this.isError = true;
      }
    );
    this.warning = false;
  }

  deleteUserTrip(userId: string, tripId: number) {
    this.userTripService.deleteUserTrip(userId, tripId);
  }
}
