import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CategoryListComponent } from './category/category.component';
import { PublicTripsComponent } from './public-trips/public-trips.component';

const routes: Routes = [
  {path: '', component: HomeComponent }, 
  {path: 'getstarted', component: GetstartedComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'admin/category', component: CategoryListComponent},
  {path: 'public-trips', component: PublicTripsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
