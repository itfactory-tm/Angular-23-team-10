import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { User } from '../models/testAPI';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private httpClient: HttpClient) {} //private makes httpClient a property

  getUsers(): Observable<User[]> {
    //HttpClient
    return this.httpClient.get<User[]>('https://localhost:7113/api/users'); // local development
    // return this.httpClient.get<User[]>('https://app-tripplanner-web-westeurope-dev-001.azurewebsites.net/api/users') // production
  }
  getUsersById(id: number): Observable<User[]> {
    //HttpClient
    return this.httpClient.get<User[]>(
      'https://localhost:7113/api/users/' + id
    ); // local development
    // return this.httpClient.get<User[]>('https://app-tripplanner-web-westeurope-dev-001.azurewebsites.net/api/users/' + id) // production
  }
}
