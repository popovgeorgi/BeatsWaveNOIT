import { AfterViewInit, Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BeatService } from 'src/app/core/services/beat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html'
})
export class AddMusicComponent implements AfterViewInit {

  public beatForm: FormGroup;
  public uploadSaveImageUrl: string = environment.apiUrl + '/FileUpload/SavePhoto';
  public uploadSaveBeatUrl: string = environment.apiUrl + '/FileUpload/SaveBeat';
  public isImageUploaded: boolean = false;
  public isBeatUploaded: boolean = false;


  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private beatService: BeatService,
    private snotifyService: SnotifyService,
    private router: Router) {
    this.beatForm = this.fb.group({
      "name": ['', [Validators.required]],
      "beatUrl": ['', [Validators.required]],
      "imageUrl": ['', [Validators.required]],
      "price": ['', [Validators.required]],
      "genre": ['', [Validators.required]],
      "bpm": [''],
      "description": ['']
    })
  }

  public onPhotoUploading() {
    this.spinner.show('beatUploader');
  }

  public onPhotoUploaded(e) {
    this.beatForm.controls['imageUrl'].setValue(e.originalEvent.body.uri)
    this.spinner.hide('beatUploader');
    this.snotifyService.info('Successfully uploaded', '', {
      showProgressBar: false
    });
    this.isImageUploaded = true;
  }

  public onBeatUploading() {
    this.spinner.show('beatUploader');
  }

  public onBeatUploaded(e) {
    this.beatForm.controls['beatUrl'].setValue(e.originalEvent.body.uri)
    this.spinner.hide('beatUploader');
    this.snotifyService.info('Successfully uploaded', '', {
      showProgressBar: false
    });
    this.isBeatUploaded = true;
  }

  public uploadBeat() {
    this.spinner.show('beatUploader');
    this.beatService.uploadBeat(this.beatForm.value).subscribe(res => { }, () => {
      this.spinner.hide('beatUploader');
      this.snotifyService.error('You have got an error within your data!', '', {
        showProgressBar: false
      });
    }, () => {
      this.spinner.hide('beatUploader');
      this.snotifyService.success('Beat added', '', {
        showProgressBar: false
      });
      this.router.navigate(['/music']);
    })
  }

  get name() {
    return this.beatForm.get('name');
  }

  get price() {
    return this.beatForm.get('price');
  }

  get genre() {
    return this.beatForm.get('genre');
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
