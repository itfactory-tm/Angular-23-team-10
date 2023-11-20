import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivityType } from 'src/app/models/api/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type/activity-type.service';
import { Subscription } from 'rxjs';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ToastComponent } from '../toast/toast.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-activity-list',
    standalone: true,
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css'],
    imports: [
        CommonModule,
        PageLoaderComponent,
        FontAwesomeModule,
        ActivityFormComponent,
        ToastComponent,
        SidebarComponent
    ]
})
export class ActivityListComponent implements OnInit, OnDestroy {
  activities: ActivityType[] = [];
  activities$: Subscription = new Subscription();
  deleteActivity$: Subscription = new Subscription();

  errorMessage: string = '';
  isLoading: boolean = true;
  faChevron = faChevronDown;

  currentSort: string = 'id';
  isModalOpen: boolean = false;
  mode: string = 'add';
  activityId: number = 0;
  isSubmitted: boolean = false;

  constructor(
    private activitTypeService: ActivityTypeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getActivities();
  }

  ngOnDestroy(): void {
    this.activities$.unsubscribe();
    this.deleteActivity$.unsubscribe();
  }

  delete(id: number) {
    this.deleteActivity$ = this.activitTypeService.deleteActivityType(id).subscribe({
      next: (v) => {
        // Delete was successful, update activities and set mode to 'delete'
        this.getActivities();
        this.mode = 'delete';
      },
      error: (e) => {
        // Handle error if deletion fails
        this.errorMessage = e.message;
      },
    });
  }
  

  getActivities() {
    this.isLoading = true;
    this.activities$ = this.activitTypeService
      .getActivityTypes()
      .subscribe((result) => {
        (this.activities = result), (this.isLoading = false);
      });
  }

  
  sort(filter: string) {
    if (filter !== this.currentSort) {
      this.currentSort = filter;
    }
    this.activities$ = this.activitTypeService
      .getActivityTypes()
      .subscribe((result) => {
        if (filter == 'name') {
          this.activities = result.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          this.activities = result.sort();
        }
        this.isLoading = false;
      });
  }
  
  openModal(mode: string, id: number) {
    this.isSubmitted = false;
    this.mode = mode;
    if (id !== 0) {
      this.activityId = id;
    }
    this.isModalOpen = true;
  }

  onUpdateOrCreate() {
    this.isSubmitted = true;
    this.getActivities();
  }
}
