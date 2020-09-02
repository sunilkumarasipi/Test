import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../../Services/student.service";
import { Student } from '../../../Models/student';
import { School } from '../../../Models/school';
import { Router } from "@angular/router";
import { SchoolService } from '../../../Services/school.service';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-student-manage',
  templateUrl: './student-manage.component.html',
  styleUrls: ['./student-manage.component.css']
})
export class StudentManageComponent implements OnInit {

  studentList: Student[];
  pagingList: Student[];
  schoolList: School[];
  totalRecords: number = 0;
  recordsPerPage: number = 1;
  viewType: string="T";

  constructor(public studentService: StudentService
    , private schoolService: SchoolService
    , private router: Router
    , private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    //alert('ngOnInit');
    this.spinnerService.show();
    this.loadAllStudents();
  }

  activePage:number = 0;  
  
  displayActivePage(pagingList: Student[]) {
    //alert(activePageNumber);
    //this.activePage = activePageNumber;
    //this.pageNumber = pageNumber;
    //console.log(this.studentList);
    //this.pagingList = this.studentList ? this.studentList.slice((activePageNumber - 1) * this.recordsPerPage, activePageNumber * this.recordsPerPage):[];
    this.pagingList = pagingList;
  }

  selectViewType(event: any){
    this.viewType = event.target.value;
    if ( this.viewType == "L") {
      this.recordsPerPage = 2;
    }
    else {
      this.recordsPerPage = 1;
    }
    console.log(event.target.value);
  }

  loadAllStudents() {
    this.studentService.getAll().subscribe(data => {
      this.studentList = data;
      this.totalRecords = data.length;
      //this.recordsPerPage = 2;

      this.loadSchools();
    },
      error => {
        console.error(error);
      });
  }

  loadSchools(){
    this.schoolService.getAll().subscribe(data => {
      this.schoolList = data;
      this.studentList.forEach(x => x.schoolName = (this.schoolList.find(y => y.schoolId == x.schoolId).name));
      this.spinnerService.hide();
    },
      error => {
        console.error(error);
      });
  }

  editStudent(id: any) {
    console.log(id);
    this.router.navigate(['home/student', id]);
  }

  deleteStudent(id: any) {
    this.router.navigate(['/student-create]']);
  }

}
