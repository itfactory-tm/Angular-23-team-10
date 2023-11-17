import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/api/Trip';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private httpClient: HttpClient) {}

  getTripById(id: number): Observable<Trip> {
    return this.httpClient.get<Trip>(environment.api_url + "/trips/" + id);
  }

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
