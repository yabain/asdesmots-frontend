import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/shared/storage/web.storage';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})

export class RegiserComponent implements OnInit {


  firstname!: string;
  lastname!: string;
  minLength: number = 4;
  isFirstnameInvalid: boolean = false;
  isLastnameInvalid: boolean = false;
  isInputInvalid: boolean = false;
  isInputInval: boolean = false;
  isInputInitial: boolean = true;
  isInputInit: boolean = true;
  isInvalidFormat: boolean = false;
  isTyping: boolean = false;


  showMessage!: boolean;
  passwordsMatch!: boolean;
  message!: string;
  phoneModel!: string;
  phoneMessage!:string;
  isPhoneModelInvalid: boolean = false;

  critereMajuscule!: boolean;
  validEmail: boolean = false;
  critereLongueur!: boolean;
  critereMinuscule!: boolean;
  critereCaractereSpecial!: boolean;
  critereChiffre!: boolean;

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
  form1: FormGroup;
  form2: FormGroup;
  textDir: String = 'ltr';
  countries: any = [];
  cities: any = [];
  onlyCountry: string[];
  
  f1Submitted: boolean = false;
  f2Submitted: boolean = false;
  public Toggledata = true;

  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;
  phoneNumberMaxeLength: number = 10;


  emailControl: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ]));

  phoneControl: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^\d+$/)
  ]));

  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCity: string = '';
  currentCountry: any;

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private location: LocationService,
    public translationService: TranslationService,
    private router: Router
  ) {
    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });

    // this.emailControl.valueChanges.subscribe(() => {
    //   this.emailControl.updateValueAndValidity();
    // });

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
    this.authService.isConnected();

    this.critereLongueur = false;
    this.critereMajuscule = false;
    this.critereMinuscule = false;
    this.critereChiffre= false;
    this.critereCaractereSpecial= false;

  }

  ngOnInit() {
    this.countries = this.location.countries();
    this.mailSended = false;
    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    this.form1 = this.formLog.group({
      'field_firstName': ['', [Validators.required, Validators.minLength(4)]],
      'field_lastName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'field_phone': ['',],
      'field_date': ['', Validators.required],
      'field_Sexe': ['', Validators.required],
      'field_profilPicture': ['https://asdesmots.yaba-in.com/assets/img/ynkap-user-profile.png'],
      'field_country': ['', Validators.required],
      'field_location': ['', Validators.required],
      'field_agree': ['', Validators.required],
    });
    this.form2 = this.formLog.group({
      'field_password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?&$*,.';+-@#\$%\^&\*])(?=.{8,})/)])
      ],
      'field_email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
    });
    this.onlyCountry = this.location.countries().map((country: any) => { return country.ISO} );
    this.currentCountry = CountryISO.Cameroon;
    // this.setOnlyCountry(this.currentCountry);
  }
  
  setOnlyCountry(country) {
    this.onlyCountry = [country];
  }
  
  get f1() {
    return this.form1.controls;
  }
  
  get f2() {
    return this.form2.controls;
  }

  comparer() {
    if (this.input1 === this.input2) {
      console.log('Les deux champs sont identiques');
    } else {
      console.log('Les deux champs sont différents');
    }
  }
  etape = 1;

  suivant() {
    if (this.form1.valid)
      this.etape++;
      
    this.f1Submitted = true;
    console.log(this.form1.get('field_firstName').errors)
  }
  precedent() {
    this.etape--;
  }

  submit() {
    // stop here if form is invalid
    if (this.form1.invalid && this.form2.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    if (this.form1.value.field_country == '1') {
      this.form1.value.field_country = 'Cameroon';
      this.form1.value.field_phone = '+237' + this.form1.value.field_phone;
    } else if (this.form1.value.field_country == '2') {
      this.form1.value.field_country = 'Congo';
      this.form1.value.field_phone = '+242' + this.form1.value.field_phone;
    } else if (this.form1.value.field_country == '3') {
      this.form1.value.field_country = 'Gabon';
      this.form1.value.field_phone = '+241' + this.form1.value.field_phone;
    } else if (this.form1.value.field_country == '4') {
      this.form1.value.field_country == 'Guinee-Eq';
      this.form1.value.field_phone = '+240' + this.form1.value.field_phone;
    }

    console.log("User Datas from reg: ", this.form1.value)

    this.authService.createAccount({...this.form1.value, ...this.form2.value})
      .then(() => {
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

  onCountryChanged(e) {
    this.cities = this.location.cities().filter(city =>
      city.id == e.target.value
    );
    let country = this.location.countries().find(
      country => country.id == e.target.value
    ).ISO;
    // this.setOnlyCountry(country);
    this.currentCountry = country;
    this.f1['field_location'].setValue('');
  }

  navigateToHome() {
    this.router.navigate(['welcome']);
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


  verifierCritereMotDePasse(): void {

    console.log("ronice");

    if (this.input1.length >= 8) {
      this.critereLongueur = true;
    } else {
      this.critereLongueur = false;
    }

    if (/[A-Z]/.test(this.input1)) {
      this.critereMajuscule = true;
    } else {
      this.critereMajuscule =false;
    }

    if (/\d/.test(this.input1)) {
      this.critereChiffre = true;
    } else {
      this.critereChiffre = false;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(this.input1)) {
      this.critereCaractereSpecial = true;
    } else {
      this.critereCaractereSpecial = false;
    }
  }


  // isEmailValid(): boolean {
  //   const email: string = this.emailControl.value.toLowerCase();
  //   return this.emailControl.valid && email.endsWith('@gmail.com');
  // }

  isPhoneValid(): boolean {
    return this.phoneControl.valid && this.phoneControl.touched;
  }

  isPhoneModelUser() {
    const digitRegex = /^\d+$/;
    if(digitRegex.test(this.phoneModel) && (this.isPhoneModelInvalid = this.phoneModel.length < 6) ){
      this.isPhoneModelInvalid = true;
    } else {
      this.isPhoneModelInvalid = false;
    }
  }

  clearPhoneNumberUser() {
    this.phoneModel = '';
    this.isPhoneModelInvalid= false;
  }


  isPhoneModel() {
    const invalidCharsRegex = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/;
    if (this.phoneModel.length > 0 && invalidCharsRegex.test(this.phoneModel)) {
      this.isInvalidFormat = true;
    }  else {
       this.isInvalidFormat = false;
    }
  }

  clearPhoneNumber() {
    this.phoneModel = '';
    this.isInvalidFormat = false;
  }

  checkPassword() {
    // Vérification des caractéristiques du mot de passe
    const hasMinLength = this.input1.length >= 8;
    const hasUppercase = /[A-Z]/.test(this.input1);
    const hasNumber = /[0-9]/.test(this.input1);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.input1);

    if (hasMinLength && hasUppercase && hasNumber && hasSpecialChar && this.input1 === this.input2) {
      this.showMessage = true;
      this.passwordsMatch = true;
      this.message = 'Mot de passe valide.';
    } else {
      this.showMessage = true;
      this.passwordsMatch = false;
      this.message = ' Mot de passe distinct et/ou pas conforme aux critéres.';
    }
  }

  // checkPassword() {
  //   // Vérification des caractéristiques du mot de passe
  //   const hasMinLength = this.input1.length >= 8;
  //   const hasUppercase = /[A-Z]/.test(this.input1);
  //   const hasNumber = /[0-9]/.test(this.input1);
  //   const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.input1);

  //   if (this.input1 === '' && this.input2 === '') {
  //     this.showMessage = false;
  //   } else if (hasMinLength && hasUppercase && hasNumber && hasSpecialChar) {
  //     if (this.input1 === this.input2) {
  //       this.showMessage = true;
  //       this.passwordsMatch = true;
  //       this.message = 'Mot de passe valide.';
  //     } else {
  //       this.showMessage = true;
  //       this.passwordsMatch = false;
  //       this.message = 'Les mots de passe ne correspondent pas.';
  //     }
  //   } else {
  //     this.showMessage = true;
  //     this.passwordsMatch = false;
  //     if (this.input1 === this.input2) {
  //       this.message = 'Mot de passe non conforme aux critères.';
  //     } else {
  //       this.message = 'Les mots de passe ne correspondent pas ou ne respectent pas les critères.';
  //     }
  //   }
  // }

}
