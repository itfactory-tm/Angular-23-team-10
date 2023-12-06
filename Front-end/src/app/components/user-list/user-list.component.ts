import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { PageLoaderComponent } from 'src/app/shared/page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, PageLoaderComponent, FontAwesomeModule, SidebarComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = true;
  users$: Observable<any[]> | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

}
