import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestAPIComponent } from './test-api/test-api.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CategoryListComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent }, 
  {path: 'users', component: TestAPIComponent},
  {path: 'getstarted', component: GetstartedComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'admin/category', component: CategoryListComponent},
  {path: 'admin/category/form', component: CategoryFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
