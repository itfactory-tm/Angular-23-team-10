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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
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
  isUpdated: boolean = false;
  isLoading = false;
  isCopied = false;
  isShared: boolean = false;
  startDate: Date | null = null; // or undefined
  endDate: Date | null = null; // or undefined

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

        timer(5000)
          .pipe(take(1))
          .subscribe(() => {
            this.isDeleted = false;
          });
      },
      () => {
        this.isError = true;
      }
    );
    this.warning = false;
  }

  editModal(tripId: number): void {
    let trip = this.allTripsFromUser.find(
      (trip: any) => trip.tripId === tripId
    );

    this.tripUpdate = trip;
    this.tripName = this.tripUpdate.name;
    this.startDate = this.tripUpdate.startDate;
    this.endDate = this.tripUpdate.endDate;
    this.isShared = this.tripUpdate.isShared;
    this.edit = true;
    this.tripId = tripId;
  }

  updateTrip(): void {
    this.tripFormSubmitted = true;
    if (this.tripForm && this.tripForm.form.valid) {
      this.startDate = new Date(this.tripForm.controls['start'].value);
      this.endDate = new Date(this.tripForm.controls['end'].value);

      let newStartDate = new Date(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        this.startDate.getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      );
      let newEndDate = new Date(
        this.endDate.getFullYear(),
        this.endDate.getMonth(),
        this.endDate.getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      );

      this.tripUpdate.name = this.tripName;
      this.tripUpdate.startDate = newStartDate;
      this.tripUpdate.endDate = newEndDate;
      this.tripUpdate.isShared = this.isShared;

      this.tripService
        .updateTrip(this.tripUpdate.tripId, this.tripUpdate)
        .subscribe(() => {
          this.fetchTripsFromUser(this.userId);
        });

      this.edit = false;
      this.isUpdated = true;

      timer(5000)
        .pipe(take(1))
        .subscribe(() => {
          this.isUpdated = false;
        });
    }
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
