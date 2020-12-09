import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { environment } from 'src/environments/environment';

import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit, AfterViewInit {

  public eventForm: FormGroup;
  public uploadSaveImageUrl: string = environment.apiUrl + '/FileUpload/SavePhoto';

  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private eventService: EventService) {
      this.eventForm = this.fb.group({
        "name": ['', [Validators.required]],
        "imageUrl": ['', [Validators.required]],
        "venue": ['', [Validators.required]],
        "phoneNumber": ['', [Validators.required]],
        "email": ['', [Validators.required, Validators.email]],
        "conductDate": ['', [Validators.required]],
        "description": [''],
        "price": ['']
      })
  }

  ngOnInit() {
  }

  public onPhotoUploading() {
    this.spinner.show('eventPhotoUploaded');
  }

  public onPhotoUploaded(e) {
    this.eventForm.controls['imageUrl'].setValue(e.originalEvent.body.uri);
    this.spinner.hide('eventPhotoUploaded');
  }

  public uploadEvent() {
    this.spinner.show('eventPhotoUploaded');
    this.eventService.uploadEvent(this.eventForm.value).subscribe(res => {
      this.spinner.hide('eventPhotoUploaded');
    })
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }

}
