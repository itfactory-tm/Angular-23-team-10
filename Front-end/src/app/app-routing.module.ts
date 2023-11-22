import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetstartedComponent } from './components/getstarted/getstarted.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CategoryListComponent } from './components/category/category.component';
import { PublicTripsComponent } from './components/public-trips/public-trips.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ActivityFormComponent } from './components/calender-activity-form/calender-activity-form.component';
import { TripComponent } from './components/trip/trip.component';
import { ActivityListComponent } from './components/activity/activity.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'getstarted', component: GetstartedComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/activity', component: ActivityFormComponent },
  { path: 'admin/category', component: CategoryListComponent },
  { path: 'admin/category/form', component: CategoryFormComponent },
  { path: 'admin/activity', component: ActivityListComponent },
  { path: 'admin/activity/form', component: ActivityFormComponent },
  { path: 'trips', component: TripComponent },
  { path: 'public-trips', component: PublicTripsComponent },
  { path: 'aboutus', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
