import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip/trip.service';
import { Subscription } from 'rxjs';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
    selector: 'app-public-trips',
    standalone: true,
    templateUrl: './public-trips.component.html',
    styleUrls: ['./public-trips.component.css'],
    imports: [CommonModule, NavbarComponent]
})
export class PublicTripsComponent implements OnInit, OnDestroy {
  trips$: Subscription = new Subscription();
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.trips$ = this.tripService.getPublicTrips().subscribe((result) => {
      this.trips = result;
    });
  }

  ngOnDestroy() {
    this.trips$.unsubscribe();
  }
}
