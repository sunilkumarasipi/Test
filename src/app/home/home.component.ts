import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../Services/authentication.service';
import { UserService } from '../Services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { CommonPagingComponent } from './../helpers/common-paging/common-paging.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: User;
  currentUserSubscription: Subscription;
    users: User[] = [];
    usersPaging: User[] = [];
    totalRecords: number=0;
    recordsPerPage: number=1;
    @ViewChild(CommonPagingComponent) cpComp: CommonPagingComponent;

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  displayActivePage(pagingList: User[]) {
    
    this.usersPaging = pagingList;
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  ngAfterViewInit(){
    this.cpComp.totalRecords = 5;
    this.cpComp.recordsPerPage = 1;
    this.cpComp.listArr = this.users;
      //console.log(this.users);
      //console.log(this.cpComp.listArr);
      console.log('ngAfterViewInit');
      console.log(this.cpComp);
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
      if (confirm("Are you sure you want to delete?")) {
          this.userService.delete(id).pipe(first()).subscribe(() => {
              this.loadAllUsers()
          });
      }
  }
  editUser(id: number) {
    this.router.navigate(['/register']);
}

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
          console.log(this.users);
          this.usersPaging=users;
          this.totalRecords = users.length;
      });
  }
}