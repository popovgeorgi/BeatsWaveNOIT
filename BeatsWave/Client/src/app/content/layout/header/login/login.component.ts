import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { Config } from '../../../../config/config';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: FormGroup;
    formSubmitted = false;

    constructor(
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private snotifyService: SnotifyService,
        private localStorageService: LocalStorageService) {
        super();
    }

    ngOnInit() {
        this.login = new FormGroup({
            userName: new FormControl('listen_app@kri8thm.com', [
                Validators.required,
            ]),
            password: new FormControl('123456789', [
                Validators.required
            ]),
        });
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
            this.localStorageService.setLocalStorage('currentUser', data);
            this.spinner.hide('loginModal');
            this.snotifyService.success('You are successfully logged in!');
        }, error => {
            this.spinner.hide('loginModal');
            this.snotifyService.error("You asda");
        });

        this.close();
    }

}
