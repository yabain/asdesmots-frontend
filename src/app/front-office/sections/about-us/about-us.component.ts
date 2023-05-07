import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  textDir: String = 'ltr';
  lang: string;
  players = 25.3;
  lotteries = 46;
  jackpot = 270
  
  constructor(
    private translationService: TranslationService,
    private translate: TranslateService
    ) {
      this.lang = this.translationService.initLanguage();
      translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
      });
  }

  ngOnInit() {
  }
}
