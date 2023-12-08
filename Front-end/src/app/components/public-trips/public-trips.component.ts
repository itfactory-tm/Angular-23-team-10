import { Component, OnDestroy, OnInit } from '@angular/core';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip/trip.service';
import { Subscription, of } from 'rxjs';
import { PageLoaderComponent } from '../../shared/page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { PublicTripCardComponent } from '../public-trip-card/public-trip-card.component';
import { ActivitySidebarComponent } from '../activity-sidebar/activity-sidebar.component';
import { PaginatedResult } from 'src/app/models/Pagination';
import { NgxPaginationModule } from 'ngx-pagination';

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
    ActivitySidebarComponent,
    NgxPaginationModule,
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
  config: any;
  pageSizes: number[] = [2, 4, 6, 8, 10];
  selectedPageSize: number = 4;

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit() {
    this.getPublicTrips();
    this.config = {
      itemsPerPage: this.selectedPageSize,
      currentPage: 1,
      totalItems: 5,
    };
  }

  ngOnDestroy() {
    this.trips$.unsubscribe();
  }

  getPublicTrips(pageNumber: number = 1) {
    this.isLoading = true;
    this.tripService
      .getPublicTrips(
        this.searchName.trim(),
        this.searchCategories,
        pageNumber,
        this.selectedPageSize
      )
      .subscribe(
        (response: PaginatedResult<Trip[]>) => {
          this.trips = response.result;
          this.config = {
            itemsPerPage: this.selectedPageSize,
            currentPage: response.pagination.CurrentPage,
            totalItems: response.pagination.TotalItems,
          };
          this.isLoading = false;
        },
        (error) => {
          return of(null);
        }
      );
  }

  navigateToTrip(tripId: number) {
    this.tripService.setTripId(tripId);
    this.router.navigate(['/calendar'], { state: { isPublic: 'true' } });
  }

  /* handleSearchNameChange(value: string) {
    this.searchName = value;
    this.tripService.getPublicTrips(this.searchName.trim(), 1, 3)
      .subscribe((response: PaginatedResult<Trip[]>) => {
        this.trips = response.result;
        this.config = {
          itemsPerPage: 3,
          currentPage: response.pagination.CurrentPage,
          totalItems: response.pagination.TotalItems
        };
      },
        (error) => {
          return of(null);
        }
      );
  } */

  /* filterTrips() {
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
  } */

  /* filterTrips() {
    this.trips = this.trips.filter((trip) => {
      if (this.searchCategories.length !== 0) {
        this.isLoading = true;
        return trip.categories.some((category) =>
        this.searchCategories.includes(category.categoryId)
      )} else {
        return null;
      }
    });
    this.isLoading = false;
  } */

  /* setCategory(ids: number[]) {
    this.searchCategories = ids;
    //this.filterTrips();
  } */

  handleTripChange(trip: Trip) {
    if (!this.trip || this.trip.tripId !== trip.tripId) {
      this.trip = trip;
      this.sidebar = true;
    } else {
      this.sidebar = !this.sidebar;
    }
  }

  pageChanged(event: number) {
    this.getPublicTrips(event);
  }

  submit(search?: string, ids?: number[]) {
    if (search !== undefined) {
      this.searchName = search;
    }
    if (ids !== undefined) {
      this.searchCategories = ids;
    }

    this.getPublicTrips();
  }

  changePageSize(event: number) {
    this.selectedPageSize = event;
    this.getPublicTrips()
  }
}
