import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { ActivityType } from 'src/app/models/ActivityType';
import { ActivityTypeService } from 'src/app/services/activity-type/activity-type.service';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-calender-activity-form',
  templateUrl: './calender-activity-form.component.html',
  styleUrls: ['./calender-activity-form.component.css'],
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  activityId: number = 0;
  tripId: number = 0;
  activityTypeId: string = '0';
  isActivityTypeError: boolean = false;
  date: string = '';
  startTime: string = '12:00';
  endTime: string = '12:00';

  activity: Activity = {
    tripActivityId: 0,
    activityId: 0,
    tripId: 0,
    name: '',
    price: 0,
    startDate: new Date(),
    endDate: new Date(),
  };

  activityTypes: ActivityType[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = '';

  activity$: Subscription = new Subscription();
  postActivity$: Subscription = new Subscription();
  putActivity$: Subscription = new Subscription();
  activityTypes$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private activityTypeService: ActivityTypeService
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.activityId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.tripId = +this.router.getCurrentNavigation()?.extras.state?.['tripId'];
    this.date = this.router.getCurrentNavigation()?.extras.state?.['date'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.activityId != null && this.activityId > 0) {
      this.activity$ = this.activityService
        .getActivityById(this.activityId)
        .subscribe((result) => {
          this.activity = result;
          this.setVariables();
        });
    }

    this.activityTypes$ = this.activityTypeService
      .getActivityTypes()
      .subscribe((result) => (this.activityTypes = result));
  }
  ngOnInit(): void {
    if (this.isEdit) {
    }
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.postActivity$.unsubscribe();
    this.putActivity$.unsubscribe();
    this.activityTypes$.unsubscribe();
  }

  setVariables() {
    let startDate = new Date(this.activity.startDate);
    let endDate = new Date(this.activity.endDate);

    this.startTime =
      startDate.getHours().toString() +
      ':' +
      (startDate.getMinutes() < 10
        ? '0' + startDate.getMinutes().toString()
        : startDate.getMinutes().toString());

    this.endTime =
      endDate.getHours().toString() +
      ':' +
      (endDate.getMinutes() < 10
        ? '0' + endDate.getMinutes().toString()
        : endDate.getMinutes().toString());

    this.activityTypeId = this.activity.activityId.toString();
  }

  onSubmit() {
    if (this.activityTypeId == '0') {
      this.isActivityTypeError = true;
    } else {
      this.isActivityTypeError = false;
      this.isSubmitted = true;

      this.activity.activityId = Number(this.activityTypeId);

      if (this.isAdd) {
        this.activity.tripId = this.tripId;

        this.activity.startDate = new Date(this.date);
        this.activity.startDate.setHours(
          Number(this.startTime.slice(0, 2)) + 1,
          parseInt(this.startTime.slice(3, 5)),
          0,
          0
        );

        this.activity.endDate = new Date(this.date);
        this.activity.endDate.setHours(
          Number(this.endTime.slice(0, 2)) + 1,
          parseInt(this.endTime.slice(3, 5)),
          0,
          0
        );

        this.postActivity$ = this.activityService
          .postActivity(this.activity)
          .subscribe({
            next: (v) => this.router.navigateByUrl('/calendar'),
            error: (e) => (this.errorMessage = e.message),
          });
      }
      if (this.isEdit) {
        this.activity.startDate = new Date(this.activity.startDate);
        this.activity.endDate = new Date(this.activity.endDate);

        this.activity.startDate.setHours(
          Number(this.startTime.slice(0, 2)) + 1,
          parseInt(this.startTime.slice(3, 5)),
          0,
          0
        );

        this.activity.endDate.setHours(
          Number(this.endTime.slice(0, 2)) + 1,
          parseInt(this.endTime.slice(3, 5)),
          0,
          0
        );
        console.log(this.activity);

        this.putActivity$ = this.activityService
          .putActivity(this.activityId, this.activity)
          .subscribe({
            next: (v) => this.router.navigateByUrl('/calendar'),
            error: (e) => (this.errorMessage = e.message),
          });
      }
    }
  }
}
