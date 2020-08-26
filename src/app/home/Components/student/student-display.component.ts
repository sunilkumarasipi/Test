import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/Models/student';

@Component({
  selector: 'app-student-display',
  templateUrl: './student-display.component.html',
  styleUrls: ['./student-display.component.css']
})
export class StudentDisplayComponent implements OnInit {

  @Input() student : Student;
  constructor() { }

  ngOnInit(): void {
  }

}
