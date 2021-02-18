import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/core/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements AfterViewInit {

  public isImageUploaded: boolean = false;
  public isEventPaid: boolean = false;
  public eventForm: FormGroup;
  public uploadSaveImageUrl: string = environment.apiUrl + '/FileUpload/SavePhoto';

  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private eventService: EventService,
    private snotifyService: SnotifyService,
    private router: Router) {
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
    this.snotifyService.config = ToastDefaults;
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
    this.snotifyService.success('Successfully uploaded', '', {
      showProgressBar: false
    });
    this.isImageUploaded = true;
  }

  public onPaidEvent() {
    this.isEventPaid = true;
  }

  public onFreeEvent() {
    this.isEventPaid = false;
  }

  public uploadEvent() {
    this.spinner.show('eventPhotoUploaded');
    if (this.eventForm.controls['price'].value == '') {
      this.eventForm.removeControl('price');
    }
    this.eventService.uploadEvent(this.eventForm.value).subscribe(res => { }, (err) => {
      this.spinner.hide('eventPhotoUploaded');
      this.snotifyService.error('You have got an error within your data!');
    }, () => {
      this.spinner.hide('eventPhotoUploaded');
      this.snotifyService.success('Event successfully created!');
      this.router.navigate(['/events']);
    })
  }

  ngAfterViewInit() {
    this.spinner.hide('routing');
  }
}
