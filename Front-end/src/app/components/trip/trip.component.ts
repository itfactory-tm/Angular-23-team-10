import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faEllipsis,
  faPencil,
  faPencilAlt,
  faPlus,
  faShare,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UserTripService } from 'src/app/services/user-trip/user-trip.service';
import { AuthService } from '@auth0/auth0-angular';
import { TripService } from 'src/app/services/trip/trip.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';
import { environment } from 'src/environments/environment';
import { ClipboardService } from 'ngx-clipboard';
import { take, timer } from 'rxjs';
import { NgForm, FormsModule } from '@angular/forms';
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
    ToastComponent,
    PageLoaderComponent,
    FormsModule,
  ],
})
export class TripComponent implements OnInit {
  @ViewChild('tripForm') tripForm!: NgForm;

  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencilAlt;
  faShare = faShare;
  faEllipsis = faEllipsis;
  faUsers = faUsers;

  public loggedInUser: any;
  userId: string = '';
  tripId: number = 0;
  isError: boolean = false;
  warning: boolean = false;
  share: boolean = false;
  edit: boolean = false;
  isDeleted: boolean = false;
  isLoading = false;
  isCopied = false;

  allTripsFromUser: any = [];
  tripName: string = '';
  tripFormSubmitted = false; // Flag to track form submission
  tripUpdate: Trip = {
    tripId: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    picture: '',
    description: '',
    country: '',
    city: '',
    isShared: false,
    activities: [],
  }; // Holds the form data

  constructor(
    private tripService: TripService,
    private userTripService: UserTripService,
    public authService: AuthService,
    private router: Router,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    if (this.authService.user$) {
      this.isLoading = true;
      this.authService.user$.pipe(take(1)).subscribe((data) => {
        this.loggedInUser = data;
        this.fetchTripsFromUser(this.loggedInUser.sub);
        this.userId = data?.sub || '';
        this.isLoading = false;
      });
    }
  }

  fetchTripsFromUser(userId: string): void {
    this.isLoading = true;
    this.userTripService.getTripsByUserId(userId).subscribe((trips) => {
      this.allTripsFromUser = trips;
      console.log(this.allTripsFromUser);
      this.isLoading = false;
    });
  }

  showModal(tripId: number): void {
    this.warning = true;
    this.tripId = tripId;
  }

  shareModal(): void {
    this.share = true;
  }

  editModal(tripId: number): void {
    let trip = this.allTripsFromUser.find(
      (trip: any) => trip.tripId === tripId
    );
    this.tripUpdate = trip;
    this.edit = true;
    this.tripId = tripId;
  }

  hideModal(): void {
    this.warning = false;
    this.share = false;
    this.edit = false;
  }

  deleteTrip(): void {
    this.isLoading = true;
    this.tripService.deleteTrip(this.tripId).subscribe(
      () => {
        this.deleteUserTrip(this.userId, this.tripId);
        this.fetchTripsFromUser(this.userId);
        this.isDeleted = true;
        this.isLoading = false;
      },
      () => {
        this.isError = true;
      }
    );
    this.warning = false;
  }

  updateTrip(): void {
    console.log(this.tripName);

    this.tripUpdate.name = this.tripName;

    this.tripService
      .updateTrip(this.tripUpdate.tripId, this.tripUpdate)
      .subscribe(() => {
        this.fetchTripsFromUser(this.userId);
      });
    this.edit = false;
  }

  deleteUserTrip(userId: string, tripId: number) {
    this.userTripService.deleteUserTrip(userId, tripId);
  }

  navigateToTrip(tripId: number) {
    this.tripService.setTripId(tripId);
    this.router.navigateByUrl('/calendar');
  }

  shareTrip(tripId: number): void {
    const shareTripUrl = environment.api_url + '/share/trip/' + tripId;
    this.clipboardService.copyFromContent(shareTripUrl);
    this.isCopied = true;

    // Reset isCopied after a delay (e.g., 5 seconds)
    timer(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.isCopied = false;
      });
  }
}
