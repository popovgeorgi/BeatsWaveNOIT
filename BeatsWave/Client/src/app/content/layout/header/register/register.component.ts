import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends SimpleModalComponent<any, any> implements OnInit {

  registerForm: FormGroup;
  forbiddenEmails: Array<string>;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService,
    private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.fetchAllEmails().subscribe(emails => {
      this.forbiddenEmails = emails;
    })
    this.registerForm = this.fb.group({
      'userName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email, this.validateEmails.bind(this)]],
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

  private fetchAllEmails(): Observable<Array<string>> {
    return this.userService.getAllEmails();
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

  private validateEmails(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenEmails) {
      if (this.forbiddenEmails.includes(control.value.toLowerCase())) {
        return {'emailIsForbidden': true};
      }
      return null;
    }
  }

  private passwordsMatchValidator(group: FormGroup): { [s: string]: boolean } {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { 'notSame': true }
  }
}
