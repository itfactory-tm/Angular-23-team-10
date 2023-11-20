import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faImage,
  faPerson,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import flatpickr from 'flatpickr';
import { Options } from 'flatpickr/dist/types/options';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '../../shared/toast/toast.component';
import { TripService } from '../../services/trip/trip.service';
import { NgForm } from '@angular/forms';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { UserTripService } from '../../services/user-trip/user-trip.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { take } from 'rxjs';
import { Trip } from '../../models/Trip';

@Component({
    selector: 'app-getstarted',
    standalone: true,
    templateUrl: './getstarted.component.html',
    styleUrls: ['./getstarted.component.css'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ToastComponent,
        NavbarComponent,
        FooterComponent
    ]
})
export class GetstartedComponent implements OnInit {
  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initDatePickers();
  }

  faImage = faImage;
  faTrash = faTrashAlt;
  faCalendar = faCheckCircle; // Adjusted icon import
  faPerson = faPerson;
  faChecklist = faCheckCircle; // Adjusted icon import
  faUser = faPerson;
  faEnvelope = faCheckCircle; // Adjusted icon import
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  selectedChoice: string = 'choose1';
  currentStep: number = 1;
  tripName: string = '';
  startDate: Date | null = null; // or undefined
  endDate: Date | null = null; // or undefined
  selectedFileName: string | undefined;
  imagePreviewUrl: string | undefined;
  isShared: boolean | null = null;
  tripDescription: string = '';

  isSubmitted: boolean = false;
  isError: boolean = false;

  tripLenght: number = 0;

  tripFormSubmitted = false; // Flag to track form submission
  tripFormSubmitted2 = false; // Flag to track form submission

  @ViewChild('tripForm') tripForm!: NgForm;
  @ViewChild('tripForm2') tripForm2!: NgForm;

  constructor(
    private tripService: TripService,
    private userTripService: UserTripService,
    public _auth: AuthService
  ) {}

  nextStep(): void {
    if (this.currentStep === 2) {
      this.tripFormSubmitted2 = true;
      if (this.tripForm2 && this.tripForm2.form.valid) {
        this.currentStep++;
      }
    }
    if (this.currentStep === 1) {
      this.tripFormSubmitted = true;
      if (this.tripForm && this.tripForm.form.valid) {
        this.currentStep++;
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async postNewTrip(): Promise<Trip> {
    let trip = await this.tripService
      .postTrip({
        tripId: 0,
        name: this.tripName,
        startDate: this.startDate!,
        endDate: this.endDate!,
        picture: this.selectedFileName!,
        description: this.tripDescription,
        isShared: this.isShared!,
        activities: [],
      })
      .toPromise();

    if (!trip) {
      throw new Error('Trip creation failed or returned undefined.'); // Handle undefined case
    }

    return trip;
  }

  async postNewUserTrip(tripId: number, userId: string) {
    this.userTripService
      .postUserTrip({
        tripId: tripId,
        userId: userId,
      })
      .toPromise();
  }

  async checkUserLoggedIn(): Promise<any> {
    let loggedInUser: any;

    if (this._auth.user$) {
      await this._auth.user$
        .pipe(take(1))
        .toPromise()
        .then((data) => {
          loggedInUser = data;
          console.log('Logged in user: ', loggedInUser);
        });
    }

    return loggedInUser;
  }

  async submit() {
    let loggedInUser = await this.checkUserLoggedIn();

    if (loggedInUser !== null) {
      let trip = await this.postNewTrip();
      console.log(trip.tripId, loggedInUser.sub);
      await this.postNewUserTrip(trip.tripId, loggedInUser.sub);
    }
  }

  isPrevButtonDisabled(): boolean {
    return this.currentStep === 1;
  }

  private initDatePickers(): void {
    const startDatePickerOptions: Options = {
      enableTime: false,
      dateFormat: 'Y-m-d',
    };

    const endDatePickerOptions: Options = {
      enableTime: false,
      dateFormat: 'Y-m-d',
    };

    flatpickr(this.startDateInput.nativeElement, startDatePickerOptions);
    flatpickr(this.endDateInput.nativeElement, endDatePickerOptions);
  }

  selectChoose(choice: string) {
    this.selectedChoice = choice;
  }

  updateFileName(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      this.selectedFileName = file.name;

      // Create a FileReader
      const reader = new FileReader();

      // Set up the FileReader to handle the file's data
      reader.onload = (e: any) => {
        // e.target.result contains the data URL representing the image
        this.imagePreviewUrl = e.target.result;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFileName = undefined;
    this.imagePreviewUrl = undefined;
  }
}
