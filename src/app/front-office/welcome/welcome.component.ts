import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';

@Component({
  selector: 'app-Welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private translate: TranslateService,
    public translationService: TranslationService
    ) {
  }

  ngOnInit() {
  }
}
