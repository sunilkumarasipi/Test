import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { StudentComponent } from './Components/student/student.component';
import { SchoolComponent } from './Components/school/school.component';
import { StudentManageComponent } from './Components/student/student-manage.component';
import { NgbdDatepickerPopup } from '../helpers/date-picker/datepicker-popup';
import { UserComponent } from './Components/user/user.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student-create', component: StudentComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'user', component: UserComponent },
  { path: 'dp', component: NgbdDatepickerPopup },
  { path: 'student', component: StudentManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
