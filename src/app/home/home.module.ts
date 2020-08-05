import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StudentComponent } from './Components/student/student.component';
import { AlertComponent } from './Components/alert/alert.component';
import { SchoolComponent } from './Components/school/school.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from '../helpers/date-picker/datepicker-popup';
import { StudentManageComponent } from './Components/student/student-manage.component';


@NgModule({
  declarations: [HomeComponent, StudentComponent, AlertComponent, SchoolComponent,NgbdDatepickerPopup, StudentManageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class HomeModule { }
