import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../../Services/student.service";
import { Student } from '../../../Models/student';
import { School } from '../../../Models/school';
import { Router } from "@angular/router";
import { SchoolService } from '../../../Services/school.service';

@Component({
  selector: 'app-student-manage',
  templateUrl: './student-manage.component.html',
  styleUrls: ['./student-manage.component.css']
})
export class StudentManageComponent implements OnInit {

  studentList: Student[];
  schoolList: School[];
  constructor(public studentService: StudentService
    , private schoolService: SchoolService
    , private router: Router) { }

  ngOnInit(): void {
    this.loadAllStudents();
  }

  loadAllStudents() {
    this.studentService.getAll().subscribe(data => {
      this.studentList = data;
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
