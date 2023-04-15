import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class TranslationService {
    private keyLanguage = 'userLanguage';
    public userLanguage: string;
    private supportedLanguages = ['fr', 'en'];

    constructor(
        translate: TranslateService,
    ) {

		translate.addLangs(this.supportedLanguages);
		translate.setDefaultLang(this.initLanguage());
		translate.use(this.initLanguage());
        
        this.initLanguage();
    }

    initLanguage() {
        this.userLanguage = localStorage.getItem(this.keyLanguage);
        console.log('get storage valeur initaile de la langue: ', this.userLanguage);

        if (!this.userLanguage) {
            this.userLanguage = 'fr';
        } else if (this.userLanguage == '') {
            this.userLanguage = 'fr';
        }
        return this.userLanguage;

    }

    setLanguage(language) {
        this.userLanguage = language;
        localStorage.setItem(this.keyLanguage, this.userLanguage);
        console.log('valeur set de la langue: ', this.userLanguage);
        window.location.reload();
    }

    getLanguage() {
        return this.userLanguage;
    }

    getAvailableLanguage() {
        return this.supportedLanguages;
    }
}
