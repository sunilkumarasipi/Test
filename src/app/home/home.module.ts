import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StudentComponent } from './Components/student/student.component';
import { AlertComponent } from './Components/alert/alert.component';
import { SchoolComponent } from './Components/school/school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from '../helpers/date-picker/datepicker-popup';
import { StudentManageComponent } from './Components/student/student-manage.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonPagingComponent } from "../helpers/common-paging/common-paging.component";
import { StudentDisplayComponent } from './Components/student/student-display.component';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { StudentTitlePipe } from '../shared/student-title.pipe';
import{ NgxSpinnerModule } from 'ngx-spinner';
import { UserComponent } from './Components/user/user.component';
//import { NgxSpinnerComponent} from 'ngx-spinner';

@NgModule({
  declarations: [HomeComponent, CommonPagingComponent, StudentComponent,
    AlertComponent, SchoolComponent, NgbdDatepickerPopup,
    StudentManageComponent, StudentDisplayComponent, AccordionComponent,StudentTitlePipe, UserComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class HomeModule { }
