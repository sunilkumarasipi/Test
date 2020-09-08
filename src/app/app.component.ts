import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Models/user';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  addActiveClass(evt:any){
    evt.target.classList.addActiveClass
console.log(evt.target.classList.add('active'));
  }
  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
