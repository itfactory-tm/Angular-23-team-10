import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  // this is the syntax to call a toast
  // <app-toast [showSuccessToast]="true"/>

  @Input() showSuccessToast?: boolean;
  @Input() showErrorToast?: boolean;
  @Input() message?: string;

  faError = faTriangleExclamation;

  ngOnInit() {
    if (this.showSuccessToast || this.showErrorToast) {
      setTimeout(() => { //mag blijkbaar niet (zie uploadzone)
        this.closeSuccessToast();
        this.closeErrorToast();
      }, 5000);
    }
  }

  closeSuccessToast() {
    this.showSuccessToast = false;
  }

  closeErrorToast() {
    this.showErrorToast = false;
  }
}
