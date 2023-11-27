import { Component, OnDestroy, OnInit } from '@angular/core';
import { Trip } from '../../models/Trip';
import { Activity } from '../../models/Activity';
import { TripService } from '../../services/trip/trip.service';
import { Subscription } from 'rxjs';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-trips',
  standalone: true,
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  imports: [
    PageLoaderComponent,
    FontAwesomeModule,
  ],
  providers: [DatePipe],
})
export class PublicTripsComponent implements OnInit, OnDestroy {
  trips$: Subscription = new Subscription();
  trips: Trip[] = [];
  activities: Activity[] = [];
  isLoading = false;
  faCircle = faCircle;

  constructor(private tripService: TripService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit() {
    this.getPublicTrips();
  }

  ngOnDestroy() {
    this.trips$.unsubscribe();
  }

  getPublicTrips() {
    this.isLoading = true;
    this.trips$ = this.tripService.getPublicTrips().subscribe((result) => {
      console.log(result);
      this.trips = this.formatDates(result); // Format dates before assigning
      this.isLoading = false;
    });
  }

  formatDates(trips: any[]): any[] {
    return trips.map(trip => ({
      ...trip,
      startDate: this.transformDate(trip.startDate),
      endDate: this.transformDate(trip.endDate),
      activities: this.formatActivities(trip.activities),
    }));
  }

  formatActivities(activities: any[]): any[] {
    return activities.map(activity => ({
      ...activity,
      startDate: this.transformHours(activity.startDate), // Format activity startDate
      endDate: this.transformHours(activity.endDate), // Format activity endDate
    }));
  }

  transformDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }

  transformHours(dateString: string): string {
    return this.datePipe.transform(dateString, 'HH:mm') || '';
  }

  navigateToTrip(tripId: number) {
    this.tripService.setTripId(tripId);
    this.router.navigateByUrl('/calendar');
  }
}
