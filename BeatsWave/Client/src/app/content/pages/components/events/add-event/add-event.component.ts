import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements AfterViewInit {

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
      "conductDate": ['', [Validators.required, Validators.pattern(/^\d{4}-[01]{1}[\d]{1}-[0123]{1}[\d]$/)]],
      "description": ['', [Validators.maxLength(500)]],
      "price": ['']
    })
  }

  get name() {
    return this.eventForm.get('name');
  }

  get venue() {
    return this.eventForm.get('venue');
  }

  get phoneNumber() {
    return this.eventForm.get('phoneNumber');
  }

  get email() {
    return this.eventForm.get('email');
  }

  get conductDate() {
    return this.eventForm.get('conductDate');
  }

  get description() {
    return this.eventForm.get('description');
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
