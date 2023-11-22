import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTrip } from 'src/app/models/UserTrip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserTripService {
  constructor(private httpClient: HttpClient) {}

  GetTripsByUserId(userId: string): Observable<UserTrip[]> {
    return this.httpClient.get<UserTrip[]>(
      environment.api_url + '/UserTrips/' + userId
    );
  }

  postUserTrip(userTrip: UserTrip): Observable<UserTrip> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<UserTrip>(
      environment.api_url + '/UserTrips',
      userTrip,
      { headers: headers }
    );
  }

  deleteUserTrip(userId: string, tripId: number): Observable<UserTrip> {
    return this.httpClient.delete<UserTrip>(
      environment.api_url + '/UserTrips/' + userId + '/' + tripId
    );
  }
}
