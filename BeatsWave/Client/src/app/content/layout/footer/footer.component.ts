import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public footerButtons: any = [
    {
      classes: 'btn btn-danger btn-air platform-btn github-button',
      icon: 'ion-logo-github github-icon',
      subtitle: 'BeatsWave'
    }
  ];

  public redirectToGithub() {
    this.document.location.href = "https://github.com/popovgeorgi/BeatsWaveNOIT";
  }

}
