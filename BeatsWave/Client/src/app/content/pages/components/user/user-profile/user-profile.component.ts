import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from 'src/app/core/models/Profile';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { GoogleAnalyticsService } from 'src/app/core/services/google-analytics.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  public userProfileForm: FormGroup;
  public uploadSaveUrl: string = environment.apiUrl + '/FileUpload/SaveProfilePhoto';
  public userPicture: string;
  public userSubscription: string;

  private profile: Profile;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private snotifyService: SnotifyService,
    public googleAnalyticsService: GoogleAnalyticsService) {
    this.userProfileForm = this.fb.group({
      'firstName': [''],
      'lastName': [''],
      'mainPhotoUrl': [''],
      'displayName': [''],
      'location': [''],
      'biography': ['']
    })
    this.snotifyService.config = ToastDefaults;
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
    }, () => { }, () => {
      this.spinner.hide('routing');
    })
    this.userSubscription = this.authService.user.value.subscription;
  }

  onPhotoUploading() {
    this.spinner.show("photoUploader");
  }

  onPhotoUploaded(e) {
    this.userPicture = e.originalEvent.body.uri;
    this.spinner.hide("photoUploader");
    this.snotifyService.info('Successfully uploaded', '', {
      showProgressBar: false
    });
  }

  public editProfile() {
    this.googleAnalyticsService.eventEmitter("user_changing_his_profile", "profile", "change", "click", 1);
    this.spinner.show("editProfile");
    this.profileService.editProfile(this.userProfileForm.value).subscribe(res => { }, () => { }, () => {
      this.spinner.hide("editProfile");
      this.snotifyService.info('Successfully updated', '', {
        showProgressBar: false
      });
    })
  }
}
