import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';
import { Trip } from 'src/app/models/Trip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private httpClient: HttpClient) {}

  private tripIdSubject = new BehaviorSubject<number>(0);
  tripId$ = this.tripIdSubject.asObservable();

  setTripId(id: number) {
    this.tripIdSubject.next(id);
  }

  getTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(environment.api_url + '/Trips');
  }

  getTripById(id: number): Observable<Trip> {
    return this.httpClient.get<Trip>(environment.api_url + '/Trips/' + id);
  }

  getPublicTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(
      environment.api_url + '/Trips/public-trips'
    );
  }

  updateTrip(tripId: number, updatedData: Trip): Observable<any> {
    const url = environment.api_url + '/Trips/' + tripId;

    return this.httpClient.put(url, updatedData);
  }

  postTrip(trip: Trip): Observable<Trip> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Trip>(environment.api_url + '/Trips', trip, {
      headers: headers,
    });
  }

  deleteTrip(tripId: number): Observable<Trip> {
    return this.httpClient.delete<Trip>(
      environment.api_url + '/Trips/' + tripId
    );
  }
}
