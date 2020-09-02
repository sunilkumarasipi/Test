import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SchoolService } from '../../../Services/school.service';
import { School } from 'src/app/Models/school';
import { StudentService } from "../../../Services/student.service";
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from 'src/app/Models/student';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Utility } from "../../../helpers/utility-functions";
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-student',
  templateUrl:'./student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  previewUrl;
  studentForm: FormGroup;
  subjectForm: FormGroup;
  loading = false;
  submitted = false;
  //model: NgbDateStruct;
  fileData: File = null;
  schoolList: School[];
  //utility: Utility;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};

  constructor(private formBuilder: FormBuilder
    , private schoolService: SchoolService
    , private studentService: StudentService
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private spinnerService:NgxSpinnerService) { }


  ngOnInit(): void {

    this.bindSubjects();
    this.initializeStudentForm();
    this.getAllSchools();
    
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    //Edit mode
    if (id != null) {
      this.getStudentById(id);
    }
  }

  bindSubjects(){
    this.dropdownList = [
      { item_id: 1, item_text: 'English' },
      { item_id: 2, item_text: 'Maths' },
      { item_id: 3, item_text: 'Telugu' }
    ];
    // this.studentForm.value.subst.patchValue([
    //   { item_id: 1, item_text: 'English' },
    //   { item_id: 3, item_text: 'Telugu' }
    // ]);

    this.selectedItems = [
      { item_id: 1, item_text: 'English' },
      { item_id: 3, item_text: 'Telugu' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  initializeStudentForm() {
    this.studentForm = this.formBuilder.group({
      studentId: [0],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      code: [{value:null, disabled:false }],
      address: [null, [Validators.required, Validators.maxLength(50)]],
      class: [null, [Validators.required, Validators.maxLength(5)]],
      dateOfBirth: [null],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      schoolId: [null, Validators.required],
      guardianName: [null, [Validators.required, Validators.maxLength(50)]],
      mobile: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[6-9]\d{9}/)]],
      email: [null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      fees: [null, [Validators.required, Validators.pattern(/^(\d+)?([.]?\d{0,2})?$/)]],
      comments: [null],
      photo: [null],
      insBy: [null],
      insDate: [null],
      modiBy: [null],
      modiDate: [null],
      delStatus: ['N'],
     // subst:[ this.selectedItems,[Validators.required]],
      // subjects: this.formBuilder.array([this.formBuilder.group({
      //   subjectId: [0],
      //   name: ['',Validators.required]
      // })])
    });
  }


  addSubjects(){
    this.studentForm.value.subjects.push(this.formBuilder.group({
      subjectId: [0],
      name: ['',Validators.required]
    }))
  }

  get f() { return this.studentForm.controls; }

  getStudentById(id: any) {
    this.studentService.getById(id)
      .subscribe(
        data => {
          this.setStudent(data)
        },
        error => {
          console.error(error);
        }
      )
  }

  setStudent(student: Student) {
    this.studentForm.setValue({
      studentId: student.studentId,
      name: student.name,
      code: student.code,
      address: student.address,
      class: student.class,
      dateOfBirth: student.dateOfBirth,
      dob: Utility.convertJsonDateToNgbDate(student.dateOfBirth),
      gender: student.gender,
      schoolId: student.schoolId,
      guardianName: student.guardianName,
      mobile: student.mobile,
      email: student.email,
      fees: student.fees,
      comments: student.comments,
      photo: student.photo,
      insBy: student.insBy,
      insDate: student.insDate,
      modiBy: student.modiBy,
      modiDate: student.modiDate,
      delStatus: student.delStatus
    });
  }

  getAllSchools() {
    this.schoolService.getAll().subscribe(
      data => {
        this.schoolList = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  fileProgress(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData);
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.f.photo.patchValue(reader.result);
    }
  }

  onSubmit() {

    this.spinnerService.show();

    this.submitted = true;
    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }
    this.f.dateOfBirth.setValue(Utility.convertNgbDateToJsonDate(this.f.dob.value));

    this.f.schoolId.setValue(parseInt(this.f.schoolId.value));
    this.f.fees.setValue(parseFloat(this.f.fees.value));
    this.f.code.setValue("NA");
    this.loading = true;

    if (this.f.studentId.value == 0) {
      this.studentService.submit(this.studentForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.router.navigate(['home/student']);
            this.spinnerService.hide();
          },
          error => {
            window.alert(error);
            console.error(error);
            this.loading = false;
            this.spinnerService.hide();
            //this.router.navigate(['home/student']);
          },
        );
    }
    else {

      this.studentService.update(this.studentForm.value, this.f.studentId.value)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.router.navigate(['home/student']);
            this.spinnerService.hide();
          },
          error => {
            window.alert("error");
            this.loading = false;
            this.spinnerService.hide();
          },
        );

    }
  }


}

// function ValidateFees(control: AbstractControl) : {[key: string]: any} | null {
//   let fees = control.value;
//   if (!isNumber(fees)) {
//     return { 'isNumber': false };
//   }
//   return null;
// }