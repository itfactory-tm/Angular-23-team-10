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
import { ToastComponent } from '../toast/toast.component';
import { TripService } from '../services/trip/trip.service';
import { NgForm } from '@angular/forms';

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
  ],
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

  tripFormSubmitted = false; // Flag to track form submission
  tripFormSubmitted2 = false; // Flag to track form submission

  @ViewChild('tripForm') tripForm!: NgForm;
  @ViewChild('tripForm2') tripForm2!: NgForm;

  constructor(private tripService: TripService) {}

  inviteFriends() {
    // Add logic for inviting friends
  }

  searchByEmail(): void {
    // Implement your logic to search by email
    alert('Searching by email...');
  }

  copyLink(): void {
    // Implement your logic to copy link
    alert('Copying link...');
  }

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

  submit(): void {
    this.tripService
      .postTrip({
        tripId: 0,
        name: this.tripName,
        startDate: this.startDate!,
        endDate: this.endDate!,
        picture: this.selectedFileName!,
        description: this.tripDescription,
        isShared: this.isShared!,
        activities: []
      })
      .subscribe(
        (response) => {
          console.log(response);
          // Handle success here
          this.isSubmitted = true;
          setTimeout(() => {
            this.isSubmitted = false;
          }, 5000);
        },
        (error) => {
          console.log(error);
          // Handle error here
          this.isError = true;
          // after 3 seconds, remove the error message
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        }
      );
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
