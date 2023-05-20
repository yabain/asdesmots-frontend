import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';


@Component({
  selector: 'app-Welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent implements OnInit {
  textDir: String = 'ltr';
  

  constructor(
    private renderer: Renderer2,
    private storage: WebStorage,
    private formLog: FormBuilder,
    private translate: TranslateService,
    public translationService: TranslationService
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/vendor/jquery/jquery.min.js';
    script.src = 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
    script.src = 'assets/js/owl-carousel.js';
    script.src = 'assets/js/animation.js';
    script.src = 'assets/js/imagesloaded.js';
    script.src = 'assets/js/custom.js';
    script.onload = () => {

    };
    this.renderer.appendChild(document.body, script);

  }
}
