import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {

  form: FormGroup;
  
  waitingResponse = false;
  submitted = false;
  error = false;
  errorMsg = '';
  linkSent: boolean = false;
  lang: string;
  en: boolean = false;
  fr: boolean = false;

  textDir: String = 'ltr';
  public hashedPassword=true;
  public CustomControler:any
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {  
    this.form = this.fb.group({
        email: ['', 
          Validators.compose([
            Validators.required,
            Validators.email
          ])
        ]
    });
  }

  submit() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    this.waitingResponse = true;

    this.authService.emailVerificationRequest(this.form.value)
    .then((result) => {
      this.submitted = false;
      this.waitingResponse = false;
      this.linkSent = true;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.errorMsg = error.message;
      this.error = true;
      this.submitted = false;
    });
  }
}
