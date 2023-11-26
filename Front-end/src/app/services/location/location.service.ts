// city.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private username = 'matlocky';
  url: string = '';

  constructor(private http: HttpClient) {}

  getCities(city: string): Observable<any> {
    if (city.length > 1){
      this.url = `http://api.geonames.org/searchJSON?name_startsWith=${city}&featureClass=P&maxRows=5&username=${this.username}`;
    } else {
      // For cities with only one letter
      this.url = `http://api.geonames.org/searchJSON?name_equals=${city}&featureClass=P&maxRows=5&username=${this.username}`;
    }
    
    return this.http.get(this.url).pipe(
      map((response: any) => {
        if (response && response.geonames) {
          return response.geonames.map((cityInfo: any) => ({
            name: cityInfo.toponymName,
            country: cityInfo.countryName,
            adminName: cityInfo.adminName1
          }));
        }
        return [];
      })
    );
  }
}
