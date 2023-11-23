// city.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private username = 'matlocky';

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    const country = 'BE'; // ISO country code for Belgium
    const url = `http://api.geonames.org/searchJSON?country=${country}&featureClass=P&maxRows=10&username=${this.username}`;
    return this.http.get(url);
  }
}
