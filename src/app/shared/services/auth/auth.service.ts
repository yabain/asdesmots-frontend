import { Injectable, ɵConsole } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../entities/user';
import { async } from '@angular/core/testing';
import { WebStorage } from '../../storage/web.storage';
import { ApiService } from 'src/app/shared/api/api.service';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static currentUser: User = new User();

  userData: User;
  isLoggedIn = false;
  authStatus: boolean;
  params: any;
  registResult = false;


  constructor(
    // private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private webStorage: WebStorage,
    private errorsService: ErrorsService
  ) {

    // this.registResult = false;
    // this.loginResult = false;

  }

  isConnected() {
    if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
      this.router.navigate(['/index']);
      setTimeout(() => { location.reload() }, 500);

    }
  }

  /*
   *  Get local user profile data.
   */
  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem('user-data') ? localStorage.getItem('user-data') : null);
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  /*
   * resetPassword is used to reset your password.
   */
  resetPassword(email: string) {
    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
      };

      const params = {
        'email': email,
      };

      this.api.post('user/auth/reset-password-link', params, headers)
        .subscribe((response: any) => {
          // this.router.navigate(['/login']);
          if (response) {
            console.log('Success00: ', response);
            // this.router.navigate(['login']);
            this.toastr.success('A password reset link has been sent to your email.', 'Success');
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          this.errorsService.errorsInformations(error, 'reset password');
          reject(error);
        });
    });

  }

  /*
   * resetPassword is used to reset your password.
   */
  reNewPassword(password: string, token: string) {
    return new Promise((resolve, reject) => {

      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      };

      const params = {
        'password': password,
      };

      this.api.put('user/auth/reset-password', params, header)
        .subscribe((response: any) => {
          if (response) {
            if (response.statusCode == 200) {
              this.toastr.success('Your password has been updated successfully !', 'Success');
              this.router.navigate(['/login']);
              resolve(response);
              return 0;
            }
            reject(response);
            return 0;
          }
          reject(response);
          return 0;
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "reset password");
          reject(error);
        });
    });

  }

  /*
   * logOut function is used to sign out .
   */
  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/ld+json',
        'Authorization': 'Bearer ' + localStorage.getItem("access-token"),
      };

      this.api.delete('user/auth/logout', headers)
        .subscribe(result => {
          localStorage.clear();
          this.isLoggedIn = false;
          this.toastr.success('Your session has been disconnected!', 'Success', { timeOut: 5000 });
          this.router.navigate(["/login"]);
          resolve(result);
        }, (error: any) => {
          this.errorsService.errorsInformations(error, 'logout')
          this.isLoggedIn = false;
          reject(error);
        });
    });

  }

  /**
   *  Create an account
   *
   */
  createAccount(user): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94',
        // 'Accept': 'application/json'
      };

      const params = {
        'firstName': user.field_firstName,
        'lastName': user.field_lastName,
        'password': user.password,
        'email': user.field_email,
        'profilePicture': '' + user.field_profilPicture,
        'country': user.field_country,
        'phoneNumber': user.field_phone,
        'location': user.field_location,
      };

      this.api.post('user/auth/register', params, headers)
        .subscribe((response: any) => {
          if (response) {
            if (response.statusCode === 201) {
              this.registResult = true;
              // this.router.navigate(['login']);
              this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success');
            }
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          this.toastr.error(error.message, 'Error', {timeOut: 5000});
          this.errorsService.errorsInformations(error, 'create account');
          if (error.status == 400) {
            this.registResult = false;
            this.toastr.error(error, 'Error', {timeOut: 5000});
            reject(error);
          } else if (error.status == 401) {
            this.registResult = false;
            this.toastr.error("This email address is already used.", 'Error');
            reject(error);
          } else if (error.status == 500) {
            this.registResult = false;
            this.toastr.error('Internal server error: ' + error.message, 'Error');
            reject(error);
          }
          this.registResult = false;
          reject(error);
        });
    });

  }

  /**
   *  Get authentification status
   *
   */
  getAuthStatus(authStatus) {
    if (authStatus == 'true') {
      this.authStatus = true;
    } else {
      this.authStatus = false;
    }

  }

  // Login into your account
  authLogin(user): Promise<any> {
    let email = user.field_email;
    let password = user.password;

    const param = {
      'email': email,
      'password': password,
    };
    const header = {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };

    return new Promise((resolve, reject) => {
      this.api.post('user/auth/login', param, header)
        .subscribe(response => {
          // const profilePicture = response.data.user.profilePicture;
          // const words = profilePicture.split('yaba-in.com/');
          // response.data.user.profilePicture = words[1];

          if (response.data.user.emailConfirmed === false) {
            this.logOut();
            this.toastr.warning('Your email was not verified. Go to your mail box.', null, { timeOut: 10000 });
            // return false;
          } else if (response.data.user.isDisabled === true) {
            this.logOut();
            this.toastr.warning('Your account was desabled. Please contact administrator at support@asdesmots.com', null, { timeOut: 10000 });
            // return false;
          } else {
            // this.webStorage.Login(user);
            this.api.setAccessToken(response.data.access_token);
            // console.log('User infos: ', response.data.user);
            this.router.navigate(['index']);
            this.toastr.success('Welcome !!');
          }
          resolve(response);
        }, error => {
          this.errorsService.errorsInformations(error, 'login');
          this.registResult = false;
          reject(error);

        });
    });
  }

  verifyEmail(token?: string) {
    const param = {
    };
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };
    if (token) {
      return new Promise((resolve, reject) => {
        this.api.post('email/confirm', param, header)
          .subscribe(response => {
            this.toastr.success('Your email has been verified.', 'Success');
            this.router.navigateByUrl('/login');
            resolve(response);
          }, error => {
            console.log('erreur: ', error)

            if (error.status == 401) {
              this.toastr.error("Your verification email has expired.", 'Error');
            }
            else if (error.status == 404) {
              this.toastr.error("User not found.");

            }
            else if (error.status == 403) {
              this.toastr.error("The email has been already confirme.", 'Error');

            }
            else if (error.status == 500) {
              this.toastr.error("Internal Server Error.", 'Error');

            } else {
              this.toastr.error(error, 'Error');
            }
            reject(error);
          });
      })
    }
  }

}
