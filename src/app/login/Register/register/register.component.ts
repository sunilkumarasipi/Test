import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuider: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    ) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
     }

  ngOnInit(): void {
    this.registerForm = this.formBuider.group(
      {
        userId:[0],
        fullName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        comments:[null],
        delStatus:['N']
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    
    this.loading = true;
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                window.alert('Registration successful');
                this.router.navigate(['/login']);
            },
            error => {
              window.alert(error);
                //this.alertService.error(error);
                this.loading = false;
            });
}

}
