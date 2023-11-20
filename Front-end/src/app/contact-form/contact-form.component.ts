import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm!: NgForm;
  onSubmit() {
    // Handle form submission logic here
    // You can use a service to send the form data to a backend or perform other actions
    // For now, you can log the form data to the console
    console.log('Form submitted:', this.contactForm.value);
  }
}
