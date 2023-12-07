import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take, timer } from 'rxjs';
import { ContactEmailService } from 'src/app/services/contact-email/contact-email.service';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isSend: boolean = false;
  isError: boolean = false;
  email: string='';
  message: string='';
  ngOnInit(): void {
    
  }

  constructor(private contactEmailService: ContactEmailService){}

  submitForm(){
    this.sendEmail
  }

  sendEmail(email:string): void {
    if (email == undefined) {
      console.log('invalid email address');
    } else {
      this.contactEmailService
        .sendContactEmail(this.email,this.message)
        .subscribe((success) => {
          if (success) {
            // Handle success
            console.log('success');
            this.isSend = true;

            timer(5000)
              .pipe(take(1))
              .subscribe(() => {
                this.isSend = false;
              });
          } else {
            // Handle failure
            console.log('Not sucess');
            this.isError = true;
          }
        });
    }
  }
}
