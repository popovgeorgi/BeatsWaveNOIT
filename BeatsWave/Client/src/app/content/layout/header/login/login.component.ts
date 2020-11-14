import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { Config } from '../../../../config/config';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: FormGroup;
    formSubmitted = false;

    constructor(
        private authService: AuthService,
        private loadingService: LoadingService,
        private snotifyService: SnotifyService) {
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
        this.loadingService.startLoading();
        this.formSubmitted = true;
        this.authService.login(this.login.value).subscribe(data => {
            this.authService.saveToken(data['token']);
            this.loadingService.stopLoading();
            this.snotifyService.success('You are successfully logged in!');
        }, error => {
            this.snotifyService.error("You asda");
        });

        this.close();
    }

}
