import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.css"]
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ["", [Validators.required]]
      },
      {
        validator: this.passwordConfirm
      }
    );
  }
  passwordConfirm(control: AbstractControl) {
    const password: string = control.get("password").value;
    const passwordRepeat: string = control.get("passwordRepeat").value;
    if (password !== passwordRepeat) {
      control.get("passwordRepeat").setErrors({ noPasswordMatch: true });
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit(registerFormValue: any) {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    const { email, password } = registerFormValue;
    this.userService.registerUser(email, password).subscribe(data => {
      this.reset();
      this.notifier.notify(data.status.toLowerCase(), data.message);
    });
  }
  private reset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  ngOnInit() {}
}
