import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/testAPI';
import { APIService } from '../../services/test-api.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
    selector: 'app-test-api',
    standalone: true,
    templateUrl: './test-api.component.html',
    styleUrls: ['./test-api.component.css'],
    imports: [CommonModule, NavbarComponent, FooterComponent]
})
export class TestAPIComponent implements OnInit{
  users$ : Observable<User[]> = new Observable<User[]>
  constructor(private apiService : APIService) {
  }

  ngOnInit(): void {
    this.users$ = this.apiService.getUsers();
  }
}
