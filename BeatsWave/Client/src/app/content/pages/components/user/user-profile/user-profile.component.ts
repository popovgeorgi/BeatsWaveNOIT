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
    public userPic: string;

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
            this.userProfileForm = this.fb.group({
                'firstName': [this.profile.firstName],
                'lastName': [this.profile.lastName],
                'mainPhotoUrl': [this.profile.mainPhotoUrl],
                'displayName': [this.profile.displayName, [Validators.required]],
                'location': [this.profile.location],
                'biography': [this.profile.biography]
            })
        })
    }

    onPhotoUploaded(e) {
        this.userProfileForm.value.mainPhotoUrl = e.originalEvent.body.uri;
    }

    editProfile() {
        this.profileService.editProfile(this.userProfileForm.value).subscribe(res => {
            console.log(this.userProfileForm)
        })
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
