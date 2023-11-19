import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/fontawesome-free';
import { ScriptLoaderService } from './script-loader.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';



@Component({
  selector: 'app-Welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css',],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  textDir: String = 'ltr';
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  

  constructor(
    private translate: TranslateService,
    public translationService: TranslationService,
    private scriptLoaderService: ScriptLoaderService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isConnected();
  }

  ngOnInit() {
    this.loadScripts();
  }
  
  loadScripts(): void {
    const scriptUrls = [
      '../../../assets/js/owl-carousel.js',
      '../../../assets/vendor/jquery/jquery.min.js',
      '../../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js',      
      '../../../assets/js/animation.js',
      '../../../assets/js/imagesloaded.js',
      '../../../assets/js/custom.js'
    ];

    const scriptPromises = scriptUrls.map(scriptUrl => this.scriptLoaderService.loadScript(scriptUrl));

    Promise.all(scriptPromises)
      .then(() => {
        console.log('Scripts loaded successfully');
        
      })
      .catch(() => {
        console.error('Failed to load scripts');
      });
  }
  
}
