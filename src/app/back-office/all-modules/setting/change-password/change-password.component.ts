import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  userEmail = JSON.parse(localStorage.getItem('user-data')).email;

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());
  }

  resetPwd() {
    this.submitted = true;
    this.waitingResponse = true;

    console.log('user mail: ', this.userEmail);
    this.authService.resetPassword(this.userEmail)
    .then((result) => {
      this.submitted = true;
      this.waitingResponse = false;
      // this.toastr.success('An email has sended to your address: ' + JSON.parse(localStorage.getItem('user-data')).email, 'Success', {timeOut: 7000})

    })
    .catch((error) => {
      console.error('Erreur: ', error.message);
      this.toastr.error('We can t send a reset password mail to your address: ' + JSON.parse(localStorage.getItem('user-data')).email + '. Try again later.', 'Error', {timeOut: 7000})

      this.waitingResponse = false;
      // this.errorMsg = error.message;
      // this.error = true;
      this.submitted = false;

    });
  }
}
