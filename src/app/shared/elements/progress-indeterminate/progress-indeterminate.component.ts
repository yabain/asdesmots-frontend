import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation/language.service';

@Component({
  selector: 'app-progress-indeterminate',
  templateUrl: './progress-indeterminate.component.html',
  styleUrls: ['./progress-indeterminate.component.css']
})
export class ProgressIndeterminateComponent implements OnInit {
  @Input() message: String = '';
  constructor(
    langService: TranslationService,
    translate: TranslateService,
   ) {
     translate.use(langService.getLanguage()); }

  ngOnInit(): void {
  }

}
