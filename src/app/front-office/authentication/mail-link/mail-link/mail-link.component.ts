import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';

@Component({
  selector: 'app-mail-link',
  templateUrl: './mail-link.component.html',
  styleUrls: ['./mail-link.component.css'],
})
export class MailLinkComponent implements OnInit {
  token = '';
  
  submitted = true;
  waitingResponse = true;
  error = false;
  msg = '';

  textDir: String = 'ltr';
  public Toggledata=true;
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
    private translate: TranslateService,
    public translationService: TranslationService
    ) {
      this.token = localStorage.getItem('email_datas');
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

  }

  ngOnInit() {
    console.log('token: ', this.token);
    
    this.waitingResponse = true;
    this.error = false;

    this.authService.verifyEmail(this.token)
    .then((result) => {
      this.submitted = false;
      this.waitingResponse = false;
    })
    .catch((error) => {
      this.error = true;
      console.error('Erreur: ', error.message);
      this.submitted = false;
      this.waitingResponse = false;
      this.msg = error.message;

    });

  }

  submit() {
  }

}
