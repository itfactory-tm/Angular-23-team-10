import { Component, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ToastComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  faLocation = faLocationDot;


  isSuccess: boolean = false;
  isError: boolean = false;

  subscribe(emailInput: any, email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(emailRegex)) {
      // Email is valid, you can proceed with further actions
      console.log('Email is valid:', email);
      this.isSuccess = true;
    } else {
      // Email is not valid
      console.log('Invalid email:', email);
      this.isError = true;
    }

    // Clear messages after a delay
    setTimeout(() => {
      this.isSuccess = false;
      this.isError = false;
    }, 5000); // Clear messages after 5 seconds
  }
}
