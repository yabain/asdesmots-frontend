import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    private translate: TranslateService,
    private translationService: TranslationService
    ) {
  }

  ngOnInit() {
  }
}
