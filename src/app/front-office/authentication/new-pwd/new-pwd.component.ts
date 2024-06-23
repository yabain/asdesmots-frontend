import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';
import { PasswordFunctions } from '../../shared/helpers/password/functions';
import { PasswordMatch } from '../../shared/helpers/password/password-match';

@Component({
  selector: 'app-new-pwd',
  templateUrl: './new-pwd.component.html',
  styleUrls: ['./new-pwd.component.css'],
  providers: [PasswordFunctions]
})
export class NewPwdComponent implements OnInit {
  input1: string = '';
  input2: string = '';
  submitted = false;
  waitingResponse = false;
  error = false;
  errorMsg = '';
  success = false;

  textDir: String = 'ltr';
  public Toggledata = true;
  public CustomControler: any
  public subscription: Subscription;
  form: FormGroup;
  
  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    public translationService: TranslationService,
    public passwordFunctions: PasswordFunctions,
  ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != 0) {
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.waitingResponse = false;
    this.error = false;

    this.storage.Checkuser();
    // console.log('111 Venant du service: ', this.translationService.getCurrentLanguage());    
    this.form = this.formLog.group({
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?&$*,.';+-@#\$%\^&\*])(?=.{8,})/)])
      ],
      'password_confirm': ['', Validators.required]
    },{validator: PasswordMatch.MatchingPasswords('password', 'password_confirm')});
  }

  submit() {
    // stop here if form is invalid
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.waitingResponse = true;

    console.log('user datas: ', this.form.value.password);
    this.authService.reNewPassword(this.form.value.password, localStorage.getItem('pwd_email_datas'))
      .then((result) => {
        this.submitted = false;
        this.success = true;
        this.form.reset();
        this.waitingResponse = false;
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
    this.passwordFunctions.hashedPassword = false;
    this.subscription.unsubscribe();
  }
  
}
