import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path:'', component: LoginComponent, pathMatch: "full" },
  { path:'create', component: HomeComponent, pathMatch: "full" },
  { path:'course/:id', component: HomeComponent, pathMatch: "full" },
  { path:'show/:id', component: CourseComponent },
  { path:'courses/:id', component: CreateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
