import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-photo-resize',
  templateUrl: './photo-resize.component.html'
})
export class PhotoResizeComponent extends SimpleModalComponent<any, any> implements OnInit {
  photo: any;
  isBrowseClicked: boolean = false;

  constructor(private fileUploadService: FileUploadService,
    private spinner: NgxSpinnerService) {
    super()
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToUpload: FormData = new FormData();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = base64ToFile(event.base64);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  getImageData() {
    this.spinner.show('profilePhoto-upload');
    this.fileToUpload.append('file', this.croppedImage, Guid.create().toString());
    this.fileUploadService.uploadProfilePicture(this.fileToUpload).subscribe(res => {
      this.spinner.hide('profilePhoto-upload');
    });
  }
  onClicked() {
    this.isBrowseClicked = true;
  }

  ngOnInit() {

  }

}
