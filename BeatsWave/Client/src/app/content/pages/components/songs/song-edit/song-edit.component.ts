import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Beat } from 'src/app/core/models/Beat';
import { EditBeat } from 'src/app/core/models/modals/EditBeat';
import { BeatService } from 'src/app/core/services/beat.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html'
})
export class SongEditComponent extends SimpleModalComponent<EditBeat, boolean> implements EditBeat ,OnInit {

  data: Beat;
  public songEditForm: FormGroup;

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private beatService: BeatService,
    private snotifyService: SnotifyService) {
    super();
  }

  ngOnInit() {
    this.songEditForm = this.fb.group({
      'name': [this.data.name, [Validators.required]],
      'price': [this.data.price, [Validators.required]],
      'genre': [this.data.genre, [Validators.required]],
      'bpm': [this.data.bpm],
      'description': [this.data.description]
    })
  }

  get name() {
    return this.songEditForm.get('name');
  }

  get price() {
    return this.songEditForm.get('price');
  }

  get genre() {
    return this.songEditForm.get('genre');
  }

  public edit() {
    this.spinner.show('beatEditter');
    this.beatService.updateBeat(this.data.id ,this.songEditForm.value).subscribe(() => {
    }, () => {
      this.snotifyService.error('You have got an error within your data!');
      this.close();
    }, () => {
      this.snotifyService.info('Successfully edited!', '', {
        showProgressBar: false
      });
      this.spinner.hide('beatEditter');
      this.close();
    })
  }
}
