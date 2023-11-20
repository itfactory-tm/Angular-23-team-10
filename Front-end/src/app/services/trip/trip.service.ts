import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/Trip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private httpClient: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(environment.api_url + '/Trips');
  }

  getTripById(id: number): Observable<Trip> {
    return this.httpClient.get<Trip>(environment.api_url + '/trips/' + id);
  }

  getPublicTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(
      environment.api_url + '/trips/public-trips'
    );
  }

  postTrip(trip: Trip): Observable<Trip> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Trip>(environment.api_url + '/Trips', trip, {
      headers: headers,
    });
  }
}
