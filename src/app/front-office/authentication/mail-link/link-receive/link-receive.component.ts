import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-link-receive',
  templateUrl: './link-receive.component.html',
  styleUrls: ['./link-receive.component.css'],
})
export class LinkReceiveComponent implements OnInit {
  token = '';

  textDir: String = 'ltr';
  public Toggledata = true;
  public CustomControler: any
  public subscription: Subscription;
  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private translate: TranslateService,
    public translationService: TranslationService,
    private toastr: ToastrService,
    private router: Router) {

    const urlData = this.router.url.split('token=');
    if (urlData[1]) {
      this.token = urlData[1];
      localStorage.setItem('email_datas', this.token);
      console.log ('token in locale storage: ', this.token)
      this.router.navigateByUrl('/mail/mail-confirm');
    } else {
      const urlDataPwd = this.router.url.split('resetTokenPwd=');
      if (urlDataPwd[1]) {
        this.token = urlDataPwd[1];
        localStorage.setItem('pwd_email_datas', this.token);
        this.router.navigateByUrl('/new-pwd');
      } else {
        console.log('no token');
        this.router.navigateByUrl('/login');
        this.toastr.error('Link error !')
      }
    }

    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });

    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != 0) {
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
    this.translate.use(this.translationService.getCurrentLanguage());
  }

  submit() {
  }
}
