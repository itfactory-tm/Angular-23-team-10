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
  activityId: number = 0;
  tripId: number = 0;

  activityTypeId: string = '0';
  date: string = '';
  startTime: string = '12:00';
  endTime: string = '12:00';
  activityTypeName: string = '';
  activityName: String = '';
  errorMessage: String = '';

  isAdd: boolean = false;
  isEdit: boolean = false;
  isActivityTypeError: boolean = false;
  isTimeError: boolean = false;
  isParticipantsError: boolean = false;
  isSubmitted: boolean = false;

  activity: Activity = {
    tripActivityId: 0,
    activityId: 0,
    tripId: 0,
    name: '',
    description: null,
    participants: 0,
    startDate: new Date(),
    endDate: new Date(),
    activity: {
      activityId: 0,
      name: ""
    }
  };

  activityTypes: ActivityType[] = [];

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

    this.activityTypes$ = this.activityTypeService
      .getActivityTypes()
      .subscribe((result) => (this.activityTypes = result));

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
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.postActivity$.unsubscribe();
    this.putActivity$.unsubscribe();
    this.activityTypes$.unsubscribe();
  }

  setVariables(): void {
    this.startTime = this.setTime(this.activity.startDate);
    this.endTime = this.setTime(this.activity.endDate);
    this.activityName = this.activity.name;
    this.activityTypeId = this.activity.activityId.toString();

    let foundActivity = this.activityTypes.find(
      (obj) => obj.activityId === Number(this.activityTypeId)
    );

    this.activityTypeName = foundActivity ? foundActivity.name : '';
  }

  setTime(activityDate: Date): string {
    let date = new Date(activityDate);

    let time =
      date.getHours() < 10
        ? '0' + date.getHours().toString()
        : date.getHours().toString();
    time += ':';
    time +=
      date.getMinutes() < 10
        ? '0' + date.getMinutes().toString()
        : date.getMinutes().toString();

    return time;
  }

  onSubmitValidate(): void {
    this.isActivityTypeError = this.activityTypeId === '0' ? true : false;
    this.isTimeError = this.startTime > this.endTime ? true : false;
    this.isParticipantsError = this.activity.participants <= 0 ? true : false;

    if (!this.hasErrors()) {
      this.submit();
    }
  }

  hasErrors(): boolean {
    return this.isActivityTypeError || this.isTimeError || this.isParticipantsError;
  }

  submit(): void {
    this.isSubmitted = true;
    this.activity.activityId = Number(this.activityTypeId);

    if (this.isAdd) {
      this.activity.tripId = this.tripId;
      this.activity.startDate = this.setDateTime(this.startTime);
      this.activity.endDate = this.setDateTime(this.endTime);

      this.postActivity$ = this.activityService
        .postActivity(this.activity)
        .subscribe({
          next: (v) =>
            this.router.navigate(['/calendar'], { state: { mode: 'add' } }),
          error: (e) =>
            (this.errorMessage =
              'Something went wrong with creating the activity.'),
        });
    }
    if (this.isEdit) {
      this.activity.startDate = this.setDateTime(this.startTime);
      this.activity.endDate = this.setDateTime(this.endTime);

      this.putActivity$ = this.activityService
        .putActivity(this.activityId, this.activity)
        .subscribe({
          next: (v) =>
            this.router.navigate(['/calendar'], { state: { mode: 'edit' } }),
          error: (e) =>
            (this.errorMessage =
              'Something went wrong with updating the activity.'),
        });
    }
  }

  setDateTime(time: String): Date {
    let date: Date;

    date = this.isAdd ? new Date(this.date) : new Date(this.activity.startDate);

    date.setHours(Number(time.slice(0, 2)) + 1, Number(time.slice(3, 5)), 0, 0);

    return date;
  }

  goToCalendar(): void {
    this.router.navigateByUrl('/calendar');
  }
}
