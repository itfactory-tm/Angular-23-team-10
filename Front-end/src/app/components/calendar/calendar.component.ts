import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faCircle,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TripService } from '../../services/trip/trip.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Trip } from '../../models/Trip';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    imports: [CommonModule, FontAwesomeModule, NavbarComponent]
})
export class CalendarComponent implements OnInit, OnDestroy {
  user: any;
  trip!: Trip;
  dates: Date[] = [];

  trip$: Subscription = new Subscription();
  deleteActivity$: Subscription = new Subscription();

  errorMessage: string = "";

  faCalendarDay = faCalendar;
  faPlus = faPlus;
  faCircle = faCircle;
  faPencil = faPencil;
  faTrash = faTrash;

  constructor(
    private tripService: TripService,
    private activityService: ActivityService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getTripById(4);
  }

  ngOnDestroy(): void {
    this.trip$.unsubscribe();
    this.deleteActivity$.unsubscribe();
  }

  getTripById(id: number) {
    this.trip$ = this.tripService.getTripById(id).subscribe((result) => {
      this.trip = result;
      this.getDates(result.startDate, result.endDate);
    });
  }

  addDays(currentDate: Date): Date {
    let date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
  }

  getDates(startDate: Date, endDate: Date) {
    console.log(this.trip.activities);
    let currentDate: Date = startDate;

    while (currentDate <= endDate) {
      this.dates.push(new Date(currentDate));
      currentDate = this.addDays(currentDate);
      endDate = new Date(endDate);
    }
  }

  isToday(checkDate: Date): boolean {
    let today = new Date();

    return (
      today.getDate() === checkDate.getDate() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getFullYear() === checkDate.getFullYear()
    );
  }

  isCalendarDay(checkDate: Date, acitivityDate: Date) {
    let date = new Date(acitivityDate);

    return (
      checkDate.getDate() === date.getDate() &&
      checkDate.getMonth() === date.getMonth()
    );
  }

  isNow(startDate: Date, endDate: Date) {
    const now = new Date();

    return new Date(startDate) <= now && now <= new Date(endDate);
  }

  add(activityDate: Date, tripId: number = this.trip.tripId) {
    let date = activityDate.getFullYear() + "-" + (activityDate.getMonth() + 1) + "-" + activityDate.getDate();
    this.router.navigate(['/calendar/activity'], { state: { tripId: tripId, date: date, mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['calendar/activity'], { state: { id: id, mode: 'edit' } });
  }

  deleteActivity(id: number) {
    this.deleteActivity$ = this.activityService.deleteActivity(id).subscribe({
      next: (v) => this.getTripById(4),
      error: (e) => this.errorMessage = e.message
    });
  }

  show_detail() {
    this.router.navigate(['calendar/detail']);
  }
}
