import { Component, OnInit } from '@angular/core';
import { School } from '../../../Models/school';
import { NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { User } from 'src/app/Models/user';
import { SchoolService } from "../../../Services/school.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
  providers: [DatePipe]
})
export class SchoolComponent implements OnInit {

  model: School= new School();
  list: School[]=[];
  submitted = false;
  //paging
  pagingList: School[]=[];
  pageSize = 4;
  pageNumber = 1;
  pageCntArr: number[];
  pageCnt = 0;

  constructor(private datePipe: DatePipe, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.getAllSchools();
  }

  onSubmit(f: NgForm) {
    this.submitted = true;
    if (!f.form.valid) {
      return;
    }

    if (this.model.schoolId === undefined || this.model.schoolId == null || this.model.schoolId === 0) {
      this.schoolService.submit(this.model)
        .pipe(first())
        .subscribe(
          data => {
            // this.model = data;
            console.log(data);
            this.getAllSchools();
          },
          error => {
            window.alert(error);
          }
        );
    } else {
      this.schoolService.update(this.model, this.model.schoolId)
        .pipe(first())
        .subscribe(
          (res:any) => {
            //this.model = data;

           // console.log(data);
            this.getAllSchools();
          },
          error => {
            window.alert(error);
          }
        );
    }

  }

  getAllSchools() {
    this.schoolService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.list = data;
          this.getPages();
          this.getPaginatedData(1);
        },
        error => {
          console.error(error);
        });
  }

  getPaginatedData(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.pagingList = this.list.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
  }

  getPages() {
    this.pageCnt = Math.ceil(this.list.length / this.pageSize);
    let i = 0;
    this.pageCntArr=[];
    for (i = 0; i < this.pageCnt; i++) {
      this.pageCntArr.push(i + 1);
    }
  }

  onEdit(id: any) {
    this.schoolService.getById(id)
      .subscribe(data => {
        this.model = data;
      },
        error => {
          console.error(error);
        });
  }

  getUser(): User {
    let user: User = JSON.parse(localStorage.currentUser);
    return user;
  }

  getCurrentDateTime() {
    let today = new Date();
    let currentdate: any = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    return currentdate;
  }

}
