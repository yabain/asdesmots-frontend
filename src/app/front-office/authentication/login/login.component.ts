import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';
import { PasswordFunctions } from '../../shared/helpers/password/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PasswordFunctions]
})
export class LoginComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  error = false;
  errorMsg = '';
  userNotVerified: boolean = false;

  public CustomControler:any
  public subscription: Subscription;
  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    public passwordFunctions: PasswordFunctions
    ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.CustomControler = data;
      }
    });

    this.authService.isConnected();
  }

  ngOnInit() {
    this.storage.Checkuser();   
    this.form = this.formLog.group({
        'password': ['', 
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
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.waitingResponse = true;

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
      this.userNotVerified = error?.status == 406 ? true : false;
    });
    // this.storage.Login(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
