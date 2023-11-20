import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTrip } from 'src/app/models/api/UserTrip';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserTripService {
  constructor(private httpClient: HttpClient) {}

  getUserTrips(): Observable<UserTrip[]> {
    return this.httpClient.get<UserTrip[]>(environment.api_url + '/UserTrips');
  }

  postUserTrip(userTrip: UserTrip): Observable<UserTrip> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<UserTrip>(
      'https://localhost:7113/api/UserTrips',
      userTrip,
      { headers: headers }
    );
  }
}