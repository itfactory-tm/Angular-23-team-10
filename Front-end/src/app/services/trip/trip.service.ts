import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/api/Trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private httpClient: HttpClient) {}

  postTrip(trip: Trip): Observable<Trip> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Trip>(
      'https://localhost:7113/api/Trips',
      trip,
      { headers: headers }
    );
  }
}
