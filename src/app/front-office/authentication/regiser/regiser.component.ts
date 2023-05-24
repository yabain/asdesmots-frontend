import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/shared/storage/web.storage';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LocationService } from 'src/app/shared/services/location/location.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})

export class RegiserComponent implements OnInit {
  sexe: string = '';
  input1: string = '';
  input2: string = '';
  waitingResponse = false;
  submitted = false;
  error = false;
  errorMsg = '';
  mailSended = false;
  lang: string;
  en: boolean = false;
  fr: boolean = false;
  form: FormGroup;
  textDir: String = 'ltr';
  country: any = [];
  city: any = [];
  public Toggledata = true;

  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;

  get f() {
    return this.form.controls;
  }

  comparer() {
    if (this.input1 === this.input2) {
      console.log('Les deux champs sont identiques');
    } else {
      console.log('Les deux champs sont différents');
    }
  }

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private location: LocationService,
    public translationService: TranslationService
  ) {
    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });
    this.lang = this.translationService.initLanguage();

    if (this.lang == 'en') {
      this.en = true;
      this.fr = false;
    } else if (this.lang == 'fr') {
      this.en = false;
      this.fr = true;
    } else {
      this.lang = 'en';
      this.en = true;
      this.fr = false;
    }

    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {
    this.country = this.location.country();
    this.mailSended = false;
    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    this.form = this.formLog.group({
      'field_firstName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'field_lastName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'field_phone': ['', Validators.compose([
        Validators.minLength(6)])],
      'field_date': ['', Validators.required],
      'field_Sexe': ['', Validators.required],
      'field_password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?&$*,.';+-@#\$%\^&\*])(?=.{8,})/)])
      ],
      'field_email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'field_profilPicture': ['assets/img/ynkap-user-profile.png'],
      'field_country': ['', Validators.required],
      'field_location': ['', Validators.required],
      'field_agree': ['', Validators.required],
    });
  }
  etape = 1;

  suivant() {
    this.etape++;
  }
  precedent() {
    this.etape--;
  }

  submit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    if (this.form.value.field_country == '1') {
      this.form.value.field_country = 'Cameroon'
    } else if (this.form.value.field_country == '2') {
      this.form.value.field_country = 'Congo'
    } else if (this.form.value.field_country == '3') {
      this.form.value.field_country = 'Gabon'
    } else if (this.form.value.field_country == '4') {
      this.form.value.field_country == 'EqGuinee'
    }

    console.log("User Datas from reg: ", this.form.value)

    this.authService.createAccount(this.form.value)
      .then((result) => {
        this.submitted = false;
        this.waitingResponse = false;
        this.mailSended = true;
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.waitingResponse = false;
        this.errorMsg = error.message;
        this.error = true;
        this.submitted = false;

      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(country) {
    this.city = this.location.city()
      .filter(e =>
        e.id == country.target.value);
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata
  }

  setEnLang() {
    this.translationService.setLanguage('en');
  }

  setFrLang() {
    this.translationService.setLanguage('fr');
  }


}
