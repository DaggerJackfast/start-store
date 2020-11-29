import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Controls } from '../../core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ['', [Validators.required]]
      },
      {
        validator: this.passwordConfirm
      }
    );
  }

  // TODO extract to validator
  passwordConfirm(control: AbstractControl): void {
    const password: string = control.get('password').value;
    const passwordRepeat: string = control.get('passwordRepeat').value;
    if (password !== passwordRepeat) {
      control.get('passwordRepeat').setErrors({ noPasswordMatch: true});
    }
  }

  get f(): Controls {
    return this.registerForm.controls;
  }

  onSubmit(registerFormValue: any): void {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    const { email, password } = registerFormValue;
    this.userService.registerUser(email, password).subscribe(data => {
      this.reset();
      this.toastr.success(data.status.toLowerCase(), data.message);
    });
  }

  private reset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  ngOnInit(): void {
  }
}
