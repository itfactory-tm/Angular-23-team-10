import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent {
  constructor(private router: Router) {}

  add() {
    this.router.navigate(["activity/form"]);
  }
}
