import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';
import { Controls } from '../../core/models';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): Controls {
    return this.loginForm.controls;
  }

  onSubmit(loginFormValue: any): void {
    this.submitted = true;
    const { email, password } = loginFormValue;
    this.userService.loginUser(email, password).subscribe(data => {
      this.reset();
      this.toastr.success(data.status.toLowerCase(), data.message);
    });
  }

  private reset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  ngOnInit(): void {
  }
}
