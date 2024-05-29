import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/shared/storage/web.storage';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PasswordFunction } from '../../shared/helpers/password/functions';
import { passwordMatch } from '../../shared/helpers/password/password-match';


@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css'],
  providers: [PasswordFunction]
})

export class RegiserComponent implements OnInit {

  showMessage!: boolean;
  message!: string;

  waitingResponse = false;
  error = false;
  errorMsg = '';
  mailSended = false;
  step = 1;
  form1: FormGroup;
  form2: FormGroup;
  countries: any = [];
  cities: any = [];
  onlyCountry: string[];
  
  f1Submitted: boolean = false;
  f2Submitted: boolean = false;
  public hashedPassword = true;

  public subscription: Subscription;
  public CustomControler: any;

  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCity: string = '';
  currentCountry: any;

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private location: LocationService,
    public passwordFunction : PasswordFunction
  ) {

    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
    this.authService.isConnected();
  }

  ngOnInit() {
    this.countries = this.location.countries();
    this.mailSended = false;
    this.storage.Checkuser();
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
      'field_location': ['', Validators.required]
    });
    this.form2 = this.formLog.group({
      field_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
      ],
      field_password: ['', [Validators.required,Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?&$*,.';+-@#\$%\^&\*])(?=.{8,})/)
      ]],
      field_password_confirm: ['', [Validators.required]],
      field_agree: ['', [Validators.required]],
    }, { validator: passwordMatch.MatchingPasswords('field_password', 'field_password_confirm') });
    this.onlyCountry = this.location.countries().map((country: any) => { return country.ISO} );
    this.currentCountry = this.location.countries().find((country: any) => country.ISO == CountryISO.Cameroon);
  }

  getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  
  passwordsMatch(): boolean {
    return this.form2.get('field_password').value === this.form2.get('field_password_confirm').value;
  }
  
  next() {
    this.f1Submitted = true;
    if (this.form1.valid)
      this.step++;
  }
  
  previous() {
    this.step--;
  }

  onCountryChanged(e) {
    let country = this.location.countries().find(city =>
      city.id == e.target.value
    );
    this.cities = this.location.cities().filter(city =>
      city.id == country.id
    );
    this.currentCountry = country;
    this.form1.get('field_location').setValue('');
  }

  togglePasswordVisibility() {
    this.hashedPassword = !this.hashedPassword
  }
  
  submit() {
    // stop here if form is invalid
    this.f2Submitted = true;
    
    if (this.form1.invalid || this.form2.invalid) {
      return;
    }
    
    this.waitingResponse = true;
    
    let data = {
      ...this.form1.value, 
      ...this.form2.value,
      field_country: this.currentCountry.name,
      field_phone: this.form1.value.field_phone.e164Number
    }

    this.authService.createAccount(data)
      .then(() => {
        this.f2Submitted = false;
        this.waitingResponse = false;
        this.mailSended = true;
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.waitingResponse = false;
        this.errorMsg = error.message;
        this.error = true;
        this.f2Submitted = false;

      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
