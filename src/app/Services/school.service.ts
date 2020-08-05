import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { School } from "../Models/school";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<School[]>(`/school`);
  }

  getById(id: number) {
    return this.http.get<School>(`/school/${id}`);
  }

  submit(school: School) {
    return this.http.post<School>(`/school`, school);
  }

  update(school: School,id: number) {
    return this.http.put<School>(`/school/${id}`, school);
  }

  delete(id: number) {
    return this.http.delete(`/school`);
  }

}
