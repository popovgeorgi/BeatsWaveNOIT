import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Beat } from 'src/app/core/models/Beat';
import { Contact } from 'src/app/core/models/modals/contact';
import { EmailService } from 'src/app/core/services/email.service';
import { GoogleAnalyticsService } from 'src/app/core/services/google-analytics.service';

@Component({
  selector: 'app-song-buy',
  templateUrl: './song-buy.component.html'
})
export class SongBuyComponent extends SimpleModalComponent<Contact, boolean> implements Contact, OnInit {

  public contactForm: FormGroup;

  constructor(private fb: FormBuilder,
    private emailService: EmailService,
    private spinner: NgxSpinnerService,
    public googleAnalyticsService: GoogleAnalyticsService) {
    super();
  }

  data: Beat;

  ngOnInit() {
    this.contactForm = this.fb.group({
      'to': [this.data.producerEmail],
      'htmlContent': ['', [Validators.required]]
    })
  }

  public send() {
    this.googleAnalyticsService.eventEmitter("user_sending_email", "contact", "connect", "click", 1);
    this.spinner.show('onSendEmail');
    this.emailService.sendEmail(this.contactForm.value).subscribe(() => { }, () => { }, () => {
      this.close();
      this.spinner.hide('onSendEmail');
    });
  }

  get htmlContent() {
    return this.contactForm.get('htmlContent');
  }

}
