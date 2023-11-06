import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'calendar/detail', component: CalendarDetailComponent},
  { path: 'activity/form', component: ActivitiesFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
