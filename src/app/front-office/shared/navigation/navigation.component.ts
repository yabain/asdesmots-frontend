import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  textDir: String = 'ltr';

  constructor(
    private translate: TranslateService,
    public translationService: TranslationService,
    public router: Router,
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });
  }

  ngOnInit() {
  }

  setEnLang() {
    this.translationService.setLanguage('en');
  }

  setFrLang() {
    this.translationService.setLanguage('fr');
  }
  
  navigateToHome() {
    this.router.navigate(['/front']);
    // setTimeout(()=>{
    //   location.reload();
    // }, 10)
  }

  navigateToBlog() {
    this.router.navigate(['/front/blog-post']);
  }

  navigateToContact() {
    this.router.navigate(['/front/contact']);
  }

  navigateToAbout() {
    this.router.navigate(['/front/about']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToFaq() {
    this.router.navigate(['/front/faq']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
