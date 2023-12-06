import { Component, OnDestroy, OnInit } from '@angular/core';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip/trip.service';
import { Subscription } from 'rxjs';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { PublicTripCardComponent } from '../public-trip-card/public-trip-card.component';
import { ActivitySidebarComponent } from '../activity-sidebar/activity-sidebar.component';

@Component({
  selector: 'app-public-trips',
  standalone: true,
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  providers: [DatePipe],
  imports: [
    PageLoaderComponent,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    TripFilterComponent,
    PublicTripCardComponent,
    ActivitySidebarComponent
  ],
})
export class PublicTripsComponent implements OnInit, OnDestroy {
  trips$: Subscription = new Subscription();
  trips: Trip[] = [];
  isLoading = false;
  searchName: string = '';
  searchCategories: number[] = [];
  filteredTrips: Trip[] = [];
  sidebar: boolean = false;
  trip: Trip | undefined;
  datesWithActivities: string[] = [];

  constructor(
    private tripService: TripService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getPublicTrips();
  }

  ngOnDestroy() {
    this.trips$.unsubscribe();
  }

  getPublicTrips() {
    this.isLoading = true;
    this.trips$ = this.tripService.getPublicTrips().subscribe((result) => {
      this.trips = result;
      this.filteredTrips = this.trips;
      this.isLoading = false;
    });
  }

  navigateToTrip(tripId: number) {
    this.tripService.setTripId(tripId);
    this.router.navigate(['/calendar'], { state: { isPublic: 'true' } });
  }

  handleSearchNameChange(value: string) {
    this.searchName = value;
    this.filterTrips();
  }

  filterTrips() {
    this.filteredTrips = this.trips.filter((trip) => {
      this.isLoading = true;
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

  setCategory(ids: number[]) {
    this.searchCategories = ids;
    this.filterTrips();
  }

  handleTripChange(trip: Trip) {
    if (!this.trip || (this.trip.tripId !== trip.tripId)) {
      this.trip = trip;
      this.sidebar = true;
    } else {
      this.sidebar = !this.sidebar;
    }
  }
}
