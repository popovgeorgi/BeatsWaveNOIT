import { AfterViewInit, Component, OnInit, ɵConsole } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from 'src/app/core/models/Profile';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SimpleModalService } from 'ngx-simple-modal';
import { PhotoResizeComponent } from 'src/app/content/partials/photo-resize/photo-resize.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    public userProfileForm: FormGroup;
    public uploadSaveUrl: string = environment.apiUrl + '/FileUpload/SaveProfilePhoto';
    public userPicture: string;
    public userSubscription: string;

    private profile: Profile;

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private spinner: NgxSpinnerService,
        private simpleModalService: SimpleModalService,
        private authService: AuthService) {
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
            this.spinner.hide('routing');
        })
        this.userSubscription = this.authService.user.value.subscription;
    }

    ngAfterViewInit() {
        this.spinner.hide('primary');
    }

    onPhotoUploading() {
        this.spinner.show("photoUploader");
    }

    onPhotoUploaded(e) {
        this.userPicture = e.originalEvent.body.uri;
        this.spinner.hide("photoUploader");
    }

    public editProfile() {
        this.spinner.show("editProfile");
        this.profileService.editProfile(this.userProfileForm.value).subscribe(res => {
            this.spinner.hide("editProfile");
        })
    }

    public openImageResizeModal() {
      const modal = this.simpleModalService.addModal(PhotoResizeComponent, {})
        .subscribe((isConfirmed) => {
            if (isConfirmed) {
              debugger;
              modal.remove;
            } else {
            }
        });
    }
}
