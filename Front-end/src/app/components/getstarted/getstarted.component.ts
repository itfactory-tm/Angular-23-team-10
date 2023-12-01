import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '../../shared/toast/toast.component';
import { TripService } from '../../services/trip/trip.service';
import { NgForm } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UserTripService } from '../../services/user-trip/user-trip.service';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs';
import { Trip } from '../../models/Trip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

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
    FooterComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AutocompleteComponent,
  ],
})
export class GetstartedComponent implements OnInit {
  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

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
  tripCountry: string = '';
  tripCity: string = '';

  isSubmitted: boolean = false;
  isError: boolean = false;

  tripFormSubmitted = false; // Flag to track form submission
  tripFormSubmitted2 = false; // Flag to track form submission

  fileInput: HTMLInputElement | null = null;
  file: File | undefined;
  imageUrl: string | undefined;

  @ViewChild('tripForm') tripForm!: NgForm;
  @ViewChild('tripForm2') tripForm2!: NgForm;

  constructor(
    private tripService: TripService,
    private userTripService: UserTripService,
    public _auth: AuthService,
    private storageService: StorageService
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
    let newStartDate = new Date(
      this.startDate!.getFullYear(),
      this.startDate!.getMonth(),
      this.startDate!.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );
    let newEndDate = new Date(
      this.endDate!.getFullYear(),
      this.endDate!.getMonth(),
      this.endDate!.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );

    let trip = await this.tripService
      .postTrip({
        tripId: 0,
        name: this.tripName,
        startDate: newStartDate,
        endDate: newEndDate,
        picture: this.imageUrl!,
        description: this.tripDescription,
        isShared: this.isShared!,
        city: this.tripCity,
        country: this.tripCountry,
        activities: [],
        categories: [],
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
        });
    }

    return loggedInUser;
  }

  async submit() {
    try {
      let loggedInUser = await this.checkUserLoggedIn();

      if (loggedInUser !== null) {
        await this.uploadImage();

        let trip = await this.postNewTrip();

        await this.postNewUserTrip(trip.tripId, loggedInUser.sub);

        this.isSubmitted = true;
      } else {
        this._auth.loginWithPopup();
      }
    } catch (error) {
      this.isError = true;
    }
  }

  async uploadImage(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.file) {
        const path = 'assets/' + this.file.name;

        // Upload image
        this.storageService.uploadImage(this.file, path).subscribe(
          (url) => {
            this.imageUrl = url;
            resolve(); // Resolve the promise when image upload is complete, even if imageUrl is undefined
          },
          (error) => {
            console.error('Error uploading image', error);
            reject(error); // Reject the promise if there's an error during upload
          }
        );
      } else {
        // No file selected, resolve the promise without setting imageUrl
        resolve();
      }
    });
  }

  isPrevButtonDisabled(): boolean {
    return this.currentStep === 1;
  }

  selectChoose(choice: string) {
    this.selectedChoice = choice;
  }

  updateFileName(event: any): void {
    this.fileInput = event.target;
    this.file = this.fileInput?.files?.[0];

    if (this.file) {
      this.selectedFileName = this.file.name;

      // Create a FileReader
      const reader = new FileReader();

      // Set up the FileReader to handle the file's data
      reader.onload = (e: any) => {
        // e.target.result contains the data URL representing the image
        this.imagePreviewUrl = e.target.result;
      };

      // Read the file as a data URL
      reader.readAsDataURL(this.file);
    }
  }

  removeImage(): void {
    this.selectedFileName = undefined;
    this.imagePreviewUrl = undefined;
  }

  selectSharingOption(isShared: boolean): void {
    this.isShared = isShared;
  }

  handleCitySelection(city: any) {
    this.tripCountry = city.country;
    this.tripCity = city.name;
  }
}
