import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CategoryListComponent } from './category/category.component';
import { PublicTripsComponent } from './public-trips/public-trips.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { TripComponent } from './trip/trip.component';
import { ActivityListComponent } from './activity/activity.component';
import { TestAPIComponent } from './test-api/test-api.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: TestAPIComponent },
  { path: 'getstarted', component: GetstartedComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/activity', component: ActivityFormComponent },
  { path: 'admin/category', component: CategoryListComponent },
  { path: 'admin/category/form', component: CategoryFormComponent },
  { path: 'admin/activity', component: ActivityListComponent },
  { path: 'admin/activity/form', component: ActivityFormComponent },
  { path: 'trips', component: TripComponent },
  { path: 'public-trips', component: PublicTripsComponent},
  { path: 'aboutus', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
