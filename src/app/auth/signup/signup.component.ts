import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initFormGroup();
  }


  initFormGroup() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  signUp() {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      const body = {
        email: this.form.value.email,
        username: this.form.value.username,
        password: this.form.value.password
      }
      this.authService.signup(body)
        .subscribe( res => {
          console.log(res);
          if (res.errorCode=== 0) {
            this.router.navigate(['']);
          }
        }, err => {
          console.log(err);
        })
    }
  }

}
