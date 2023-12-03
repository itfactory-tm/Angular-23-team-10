import { Component, OnDestroy, OnInit } from '@angular/core';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip/trip.service';
import { Subscription, filter } from 'rxjs';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-public-trips',
  standalone: true,
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  imports: [PageLoaderComponent, FontAwesomeModule, FormsModule, CommonModule, MatTooltipModule],
  providers: [DatePipe],
})
export class PublicTripsComponent implements OnInit, OnDestroy {
  trips$: Subscription = new Subscription();
  categories$: Subscription = new Subscription();
  trips: Trip[] = [];
  categories: Category[] = [];
  isLoading = false;
  faCircle = faCircle;
  faCross = faXmark;
  searchName: string = '';
  searchCategories: number[] = [];
  filteredTrips: Trip[] = [];
  sidebar: boolean = false;
  trip: Trip | undefined;

  constructor(
    private tripService: TripService,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPublicTrips();
    this.getCategories();
  }

  ngOnDestroy() {
    this.trips$.unsubscribe();
    this.categories$.unsubscribe();
  }

  getPublicTrips() {
    this.isLoading = true;
    this.trips$ = this.tripService.getPublicTrips().subscribe((result) => {
      this.trips = this.formatDates(result); // Format dates before assigning
      this.filteredTrips = this.trips;
      this.isLoading = false;
    });
  }

  getCategories() {
    this.isLoading = true;
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => {
        this.categories = result;
      });
  }

  formatDates(trips: any[]): any[] {
    return trips.map((trip) => ({
      ...trip,
      startDate: this.transformDate(trip.startDate),
      endDate: this.transformDate(trip.endDate),
      activities: this.formatActivities(trip.activities),
    }));
  }

  formatActivities(activities: any[]): any[] {
    return activities.map((activity) => ({
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

  isImageValid(imageName: string): boolean {
    const img = new Image();
    img.src = `${imageName}`;
    return img.complete && img.naturalHeight !== 0;
  }

  filterTrips() {
    this.filteredTrips = this.trips.filter((trip) => {
      this.isLoading = true
      const nameMatch = trip.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());

      if (this.searchCategories.length === 0) {
        return nameMatch;
      } else {
        return (
          nameMatch &&
          trip.categories.some((category) =>
            this.searchCategories.includes(category.categoryId)
          )
        );
      }
    });
    this.isLoading = false;
  }

  clearSearch() {
    this.searchName = '';
    this.filterTrips();
  }

  setCategory(id: number) {
    if (this.searchCategories.includes(id)) {
      const index = this.searchCategories.indexOf(id);
      this.searchCategories.splice(index, 1);
      this.filterTrips();
    } else {
      this.searchCategories.push(id);
      this.filterTrips();
    }
  }

  isInSearchCategories(id: number) {
    if (this.searchCategories.includes(id)) {
      return true
    } else {
      return false
    }
  }

  showActivities(trip: Trip) {
    if (this.trip === trip) {
      this.trip = undefined;
      this.sidebar = false;
    } else {
      this.trip = trip;
      this.sidebar = true;
    }
  }
}
