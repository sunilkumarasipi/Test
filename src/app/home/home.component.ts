import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../Services/authentication.service';
import { UserService } from '../Services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
      this.loadAllUsers();
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
      });
  }
}