import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { WebStorage } from 'src/app/shared/storage/web.storage';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  submitted = false;
  sended = false;
  waitingResponse = false;
  error = false;
  errorMsg = '';

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
    private router: Router
    ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.waitingResponse = false;
    this.error = false;

    this.storage.Checkuser(); 
    this.form = this.formLog.group({
        'field_email': ['', Validators.compose([
          Validators.required,
          Validators.email
        ])
      ]
    });
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
  
  submit() {
    this.submitted = true;
    console.log(this.getFormValidationErrors(this.form));
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.waitingResponse = true;

    // console.log('user mail: ', this.form.value.field_email);
    this.authService.resetPassword(this.form.value.field_email)
    .then((result) => {
      this.submitted = false;
      this.waitingResponse = false;
      this.sended = true;
    })
    .catch((error) => {
      this.sended = false;
      console.error('Erreur: ', error.message);
      this.waitingResponse = false;
      this.errorMsg = error.message;
      this.error = true;
      this.submitted = false;

    });
  }

  ngOnDestroy() {
    this.sended == false;
    this.subscription.unsubscribe();
  }
}
