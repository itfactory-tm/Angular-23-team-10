import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TripService } from '../services/trip/trip.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Trip } from '../models/api/Trip';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  user: any;
  trip!: Trip;
  dates: Date[] = [];
  trip$: Subscription = new Subscription();

  faCalendarDay = faCalendar;
  faPlus = faPlus;
  faCircle = faCircle;

  constructor(
    private tripService: TripService,
    private router: Router,
    private auth: AuthService
  ) {
    this.user = {};
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.getTripById(4);
  }

  ngOnDestroy(): void {
    this.trip$.unsubscribe();
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
    let date = new Date(acitivityDate)

    return (
      checkDate.getDate() === date.getDate() &&
      checkDate.getMonth() === date.getMonth()
    );
  }

  isNow(startDate: Date, endDate: Date) {
    const now = new Date();

    return new Date(startDate) <= now && now <= new Date(endDate);
  }

  show_detail() {
    this.router.navigate(['calendar/detail']);
  }
}
