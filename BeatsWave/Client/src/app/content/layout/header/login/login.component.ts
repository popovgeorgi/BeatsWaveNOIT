import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { AuthService } from 'src/app/core/services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

  login: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private snotifyService: SnotifyService) {
    super();
  }

  ngOnInit() {
    this.login = this.fb.group({
      'userName': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  get userName() {
    return this.login.get('userName');
  }

  get password() {
    return this.login.get('password');
  }

  submitLogin() {
    this.spinner.show('loginModal');
    this.formSubmitted = true;
    this.authService.login(this.login.value).subscribe(data => {
      this.authService.saveToken(data['token']);
      this.spinner.hide('loginModal');
      this.snotifyService.info('You are successfully logged in!', '', {
        showProgressBar: false
      });
    },
      error => {
        this.spinner.hide('loginModal');
        this.snotifyService.error("Your data is not valid");
      });

    this.close();
  }
}
