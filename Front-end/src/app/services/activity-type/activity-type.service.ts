import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityType } from 'src/app/models/api/ActivityType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {

  constructor(private httpClient: HttpClient) { }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.httpClient.get<ActivityType[]>(environment.api_url + "/activities/");
  }

  deleteActivityTpe(id: number): Observable<ActivityType> {
    return this.httpClient.delete<ActivityType>(environment.api_url + "/activities/" + id);
  }

  getActivityTypeById(id: number): Observable<ActivityType> {
    return this.httpClient.get<ActivityType>(environment.api_url + "/activities/" + id);
  }

  postActivityType(activity: ActivityType): Observable<ActivityType> {
    return this.httpClient.post<ActivityType>(environment.api_url + "/activities/", activity);
  }

  putActivityType(id: number, activity: ActivityType): Observable<void> {
    return this.httpClient.put<void>(environment.api_url + "/activities/" + id, activity);
  }
}
