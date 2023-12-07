import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {
  constructor(private httpClient: HttpClient) {}

  sendContactEmail(
    email: string,
    message: string,
  ): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    const requestData = {
      email: email,
      message: message,
    };

    return this.httpClient
      .post<string>(`${environment.api_url}/Email/contact-email`, requestData, {
        headers: headers,
      })
      .pipe(
        map(() => {
          console.log('Email sent successfully');
          return true;
        }),
        catchError((error) => {
          console.error('Error sending email:', error);
          return of(false);
        })
      );
  }
}
