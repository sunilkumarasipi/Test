import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/user`);
    }

    getById(id: number) {
      return this.http.get<User>(`/user/${id}`);
    }

    register(user: User) {
        return this.http.post(`/user`, user);
    }
    
  
    update(user: User,id: number) {
      return this.http.put(`/user`, user);
    }

    delete(id: number) {
        return this.http.delete(`/user/${id}`);
    }
}
