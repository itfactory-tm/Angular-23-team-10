import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(emailAddress: string) {
    const emailData = { emailAddress };
    console.log(emailData);
    return this.http.post(environment.api_url + '/Email/', emailData);
  }
}
