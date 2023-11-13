import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  faCalendarDay = faCalendar;

  constructor(private router: Router) {}



  show_detail() {
    this.router.navigate(["calendar/detail"]);
  }
}
