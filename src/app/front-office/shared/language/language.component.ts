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
    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    }); 
    this.lang = this.translationService.initLanguage();
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());
  }
  
  setLang(lang: string) {
    console.log(lang);
    this.translationService.setLanguage(lang);
  }
}
