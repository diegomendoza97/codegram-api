import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  error: string
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = new FormGroup({
      user: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  login() {
    if(this.form.valid) {
      const body = {
        user: this.form.value.user,
        password: this.form.value.password
      }

      this.authService.login(body)
      .subscribe( res => {
        if (res.errorCode === 0) {
          localStorage.setItem('token', res.token);
          this.authService.isAuth.next(true);
          this.error = undefined;
          this.router.navigate(['feed']);
        } else {
          this.error = res.message;
        }
      }, err => {
        // console.log(err);
        this.error = err.message;
      })
    } else {
      this.error = 'Empty or Invalid Fields';
    }
  }
}
