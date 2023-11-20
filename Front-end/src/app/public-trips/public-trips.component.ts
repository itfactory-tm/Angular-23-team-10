import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/api/Trip';
import { TripService } from '../services/trip/trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css']
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
