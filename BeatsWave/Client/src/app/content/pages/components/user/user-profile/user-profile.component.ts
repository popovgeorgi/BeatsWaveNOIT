import { AfterViewInit, Component, OnInit, ɵConsole } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from 'src/app/core/models/Profile';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    public userProfileForm: FormGroup;
    public uploadSaveUrl: string = environment.apiUrl + '/FileUpload/SaveProfilePhoto';
    public isPhotoUploading: boolean = false;
    public userPicture: string;

    private profile: Profile;

    constructor(
        private loadingService: LoadingService,
        private fb: FormBuilder,
        private profileService: ProfileService) {
        this.userProfileForm = this.fb.group({
            'firstName': [''],
            'lastName': [''],
            'mainPhotoUrl': [''],
            'displayName': [''],
            'location': [''],
            'biography': ['']
        })
    }

    ngOnInit() {
        this.profileService.getProfile().subscribe(res => {
            this.profile = res;
            this.userPicture = this.profile.mainPhotoUrl;
            this.userProfileForm = this.fb.group({
                'firstName': [this.profile.firstName],
                'lastName': [this.profile.lastName],
                'displayName': [this.profile.displayName, [Validators.required]],
                'location': [this.profile.location],
                'biography': [this.profile.biography]
            })
        })
    }

    ngAfterViewInit() {
        debugger;
        this.loadingService.stopLoading();
    }

    onPhotoUploading() {
        this.isPhotoUploading = true;
        this.loadingService.startLoading();
    }

    onPhotoUploaded(e) {
        this.userPicture = e.originalEvent.body.uri;
        this.loadingService.stopLoading();
        this.isPhotoUploading = false;
    }

    public editProfile() {
        this.loadingService.startLoading();
        this.profileService.editProfile(this.userProfileForm.value).subscribe(res => {
            this.loadingService.stopLoading();
        })
    }
}
