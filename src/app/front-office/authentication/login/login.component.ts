import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  error = false;
  errorMsg = '';
  lang: string;
  en: boolean = false;
  fr: boolean = false;

  textDir: String = 'ltr';
  public Toggledata=true;
  public CustomControler:any
  public subscription: Subscription;
  // form = new FormGroup({
  //   email: new FormControl("admin@dreamguys.in", [Validators.required]),
  //   password: new FormControl('123456', [Validators.required]),
  // });
  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    public translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    ) {

      this.lang = this.translationService.initLanguage();
      
      if (this.lang == 'en'){
        this.en = true;
        this.fr = false;
      } else if (this.lang == 'fr'){
        this.en = false;
        this.fr = true;
      } else {
        this.lang = 'en';
        this.en = true;
        this.fr = false;
      }

      //this is to determine the text direction depending on the selected language
      translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
      });

    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.CustomControler = data;
      }
    });

    this.authService.isConnected();
  }

  ngOnInit() {
    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    // console.log('111 Venant du service: ', this.translationService.getLanguage());    
    this.form = this.formLog.group({
        'field_password': ['', 
          Validators.compose([
            Validators.required
          ])
        ],
        'field_email': ['', 
          Validators.compose([
            Validators.required,
            Validators.email
          ])
        ]
    });
  }

  submit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    // console.log('user datas: ', this.form.value);
    this.authService.authLogin(this.form.value)
    .then((result) => {
      console.log("UserDatas login", result.data.user);
      this.userService.setUserInformations(result.data.user)
      this.submitted = false;
      this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.errorMsg = error.message;
      this.error = true;
      this.submitted = false;
    });
    // this.storage.Login(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToHome() {
    this.router.navigate(['welcome']);
  }

  iconLogle(){
    this.Toggledata = !this.Toggledata
  }

  setEnLang(){
    this.translationService.setLanguage('en');
  }

  setFrLang(){
    this.translationService.setLanguage('fr');
  }
}
