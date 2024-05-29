import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-language-template',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageTemplateComponent implements OnInit {

  textDir: String = 'ltr';
  lang: string;
  
  constructor(
    private translate: TranslateService,
    public translationService: TranslationService,
  ) {
    this.lang = this.translationService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getCurrentLanguage());
  }
  
  setLang(lang: string) {
    this.translationService.setLanguage(lang);
    this.lang = this.translationService.getCurrentLanguage();
    this.translate.use(this.lang);
  }
}
