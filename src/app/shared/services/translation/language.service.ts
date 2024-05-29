import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class TranslationService {
    private keyLanguage = 'userLanguage';
    private supportedLanguages = ['fr', 'en'];

    constructor(
        private translateService: TranslateService,
    ) {

		translateService.addLangs(this.supportedLanguages);
		translateService.setDefaultLang('fr');
    }

    getCurrentLanguage() {
        const lang = localStorage.getItem(this.keyLanguage);
        return lang ? lang : this.translateService.currentLang;
    }

    initLanguage(): void {
        // return this.translate.currentLang;
        this.translateService.use(this.getCurrentLanguage());
    }

    getAvailableLanguage() {
        return this.supportedLanguages;
    }
    
    setLanguage(language) {
        localStorage.setItem(this.keyLanguage, language);
    }

    transformMessageLanguage(message :string) {
        return this.translateService.instant(message);
    }
}
