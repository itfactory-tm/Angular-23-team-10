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
import { PublicApiTestComponent } from './components/public-api-test/public-api-test.component';
import { adminGuard } from './guards/admin.guard';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'getstarted', component: GetstartedComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/activity', component: ActivityFormComponent },
  { path: 'admin/category', component: CategoryListComponent, canActivate: [adminGuard] },
  { path: 'admin/category/form', component: CategoryFormComponent, canActivate: [adminGuard] },
  { path: 'admin/activity', component: ActivityListComponent, canActivate: [adminGuard] },
  { path: 'admin/activity/form', component: ActivityFormComponent, canActivate: [adminGuard] },
  { path: 'trips', component: TripComponent, canActivate: [AuthGuard] },
  { path: 'public-trips', component: PublicTripsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'api', component: PublicApiTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
