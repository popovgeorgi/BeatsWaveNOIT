import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent extends SimpleModalComponent<any, any> implements OnInit {

  public currentLanguage: string;

  constructor(private translate: TranslateService) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang;
  }

  public onLangChange(event) {
    const language = event.target.defaultValue;
    localStorage.setItem('locale', language);
    this.translate.use(language);
    this.close();
  }
}
