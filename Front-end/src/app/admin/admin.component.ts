import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity/activity.service'; // Replace 'path-to-activity-service' with the actual path

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activities: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    // Fetch and store activities
    this.activityService.getCategories().subscribe((data) => {
      this.activities = data;
    });
  }

  editActivity(id: number) {
    // Implement edit logic here
  }

  deleteActivity(id: number) {
    // Implement delete logic here
  }
}
