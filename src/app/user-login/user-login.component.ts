import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../user.service';

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(loginFormValue: any) {
    console.log("aaa");
    this.submitted = true;
    const { email, password } = loginFormValue;
    this.userService.loginUser(email, password).subscribe(data => {
      this.reset();
      this.notifier.notify(data.status.toLowerCase(), data.message);
    });
  }
  private reset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  ngOnInit() {}
}
