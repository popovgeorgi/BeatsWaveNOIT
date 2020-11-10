import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends SimpleModalComponent<any, any> implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private loader: NgxSpinnerService,
    private simpleModalService: SimpleModalService) {
    super();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'userName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
      'role': ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator })
  }

  submitRegister() {
    this.loader.show('register');
    this.authService.register(this.registerForm.value).subscribe(res => {
      this.loader.hide('register');
    })
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  private passwordsMatchValidator(group: FormGroup): { [s: string]: boolean } {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { 'notSame': true }
  }
}
