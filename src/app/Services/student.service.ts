import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from "../Models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`/student`);
  }

  getById(id: number) {
    return this.http.get<Student>(`/student/${id}`);
  }

  submit(student: Student) {
    return this.http.post(`/student`, student);
  }

  update(student: Student,id: number) {
    return this.http.put(`/student/${id}`, student);
  }

  delete(id: number) {
    return this.http.delete(`/student/${id}`);
  }
}
