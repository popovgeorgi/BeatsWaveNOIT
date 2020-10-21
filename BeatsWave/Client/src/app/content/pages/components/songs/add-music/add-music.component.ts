import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../core/services/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BeatService } from 'src/app/core/services/beat.service';

@Component({
    selector: 'app-add-music',
    templateUrl: './add-music.component.html'
})
export class AddMusicComponent implements OnInit, AfterViewInit {

    public beatForm: FormGroup;
    public uploadSaveImageUrl: string = environment.apiUrl + '/FileUpload/SavePhoto';
    public uploadSaveBeatUrl: string = environment.apiUrl + '/FileUpload/SaveBeat';


    constructor(private loadingService: LoadingService,
        private fb: FormBuilder,
        private beatService: BeatService,
        private loaderService: LoadingService) {
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

    public uploadBeat() {
        this.loadingService.startLoading();
        this.beatService.uploadBeat(this.beatForm.value).subscribe(res => {
            console.log(this.beatForm.value);
            this.loadingService.stopLoading();
        })
    }

    public onPhotoUploading() {
        this.loadingService.startLoading();
    }

    public onPhotoUploaded(e) {
        this.beatForm.value.imageUrl = e.originalEvent.body.uri;
        this.loadingService.stopLoading();
    }

    public onBeatUploading() {
        this.loadingService.startLoading();
    }

    public onBeatUploaded(e) {
        this.beatForm.value.beatUrl = e.originalEvent.body.uri;
        this.loadingService.stopLoading();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}
