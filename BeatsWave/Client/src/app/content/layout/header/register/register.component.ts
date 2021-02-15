import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends SimpleModalComponent<any, any> implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService) {
    super();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'userName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', [Validators.required]],
      'role': ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator })
  }

  submitRegister() {
    this.spinner.show('register');
    this.authService.register(this.registerForm.value).subscribe(res => {
    }, (err) => {
      this.spinner.hide('register');
      this.snotifyService.error(err.error[0].description, '', {
        showProgressBar: false
      });
    }, () => {
      this.spinner.hide('register');
      this.snotifyService.info('You are registered now', '', {
        showProgressBar: false
      });
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
