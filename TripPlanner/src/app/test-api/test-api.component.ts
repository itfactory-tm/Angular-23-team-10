import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../models/api/testAPI';
import { APIService } from '../services/test-api.service';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestAPIComponent implements OnInit{
  users$ : Observable<User[]> = new Observable<User[]>
  constructor(private apiService : APIService) {
  }

  ngOnInit(): void {
    this.users$ = this.apiService.getUsers();
  }
}
