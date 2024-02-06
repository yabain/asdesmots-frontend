import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/shared/storage/web.storage';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { Router } from '@angular/router';

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
  form: FormGroup;
  textDir: String = 'ltr';
  country: any = [];
  city: any = [];
  public Toggledata = true;

  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;


  // emailControl: FormControl = new FormControl('', Validators.compose([
  //   Validators.required,
  //   Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  // ]));

  phoneControl: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^\d+$/)
  ]));


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
      'field_profilPicture': ['https://asdesmots.yaba-in.com/assets/img/ynkap-user-profile.png'],
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
      this.form.value.field_country = 'Cameroon';
      this.form.value.field_phone = '+237' + this.form.value.field_phone;
    } else if (this.form.value.field_country == '2') {
      this.form.value.field_country = 'Congo';
      this.form.value.field_phone = '+242' + this.form.value.field_phone;
    } else if (this.form.value.field_country == '3') {
      this.form.value.field_country = 'Gabon';
      this.form.value.field_phone = '+241' + this.form.value.field_phone;
    } else if (this.form.value.field_country == '4') {
      this.form.value.field_country == 'Guinee-Eq';
      this.form.value.field_phone = '+240' + this.form.value.field_phone;
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

  verifyLengthFirstName() {
    this.isFirstnameInvalid = this.firstname.length < this.minLength;
    this.isInputInvalid = this.isFirstnameInvalid;
    this.isInputInitial = this.firstname.length === 0;
  }

  verifyLengthLastName() {
    this.isLastnameInvalid = this.lastname.length < this.minLength;
    this.isInputInval = this.isLastnameInvalid;
    this.isInputInit = this.lastname.length === 0;
  }


}
