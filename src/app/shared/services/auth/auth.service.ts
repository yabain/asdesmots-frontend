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
import { TranslateService } from '@ngx-translate/core';


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
    private errorsService: ErrorsService,
    private translate: TranslateService, 
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
          if (response) {
            this.translate.get('form.passwordResetLinkSent').subscribe((res: string) => {
              this.toastr.success(res, 'Success');
            });
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          switch(error.status) {
            case(404) :
              this.translate.get('errorResponse.userNotFound').subscribe((res: string) => {
                this.toastr.error(res, 'error');
              });
              break;
            default:
              this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
          }
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
          this.translate.get('form.passwordReset').subscribe((res: string) => {
            this.toastr.success(res, 'Success');
          });
          return resolve(response);
        }, (error: any) => {
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
          return reject(error);
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
          this.translate.get('form.loggedOut').subscribe((res: string) => {
            this.toastr.success(res, 'Success');
          });
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
              this.translate.get('form.accountCreated').subscribe((res: string) => {
                this.toastr.success(res, 'Success');
              });
            }
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          switch(error.status) {
            case(409):
              this.translate.get('errorResponse.emailAlreadyUsed').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
            default:
              this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
          }
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

          if (response.data.user && response.data.access_token) {
            this.api.setAccessToken(response.data.access_token);
            this.router.navigate(['/index']);
            this.translate.get('form.loggedIn').subscribe((res: string) => {
              this.toastr.success(res, 'Success');
            });
          }
          resolve(response);
        }, error => {
          switch(error.status) {
            case(401):
              this.translate.get('errorResponse.invalidCredentials').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
            case(403):
              this.translate.get('errorResponse.accountDisactivated').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
            case(406):
              this.translate.get('errorResponse.emailNotConfirmed').subscribe((res: string) => {
                this.toastr.warning(res, 'Warning');
              });
              break;
            default :
              this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
              break;
          }
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
            this.toastr.success('form.emailVerified', 'Success');
            this.router.navigateByUrl('/login');
            resolve(response);
          }, error => {
            switch(error.status) {
              case(401) :
                this.translate.get('errorResponse.expiredEmailValidationLink').subscribe((res: string) => {
                  this.toastr.success(res, 'Error');
                });
              case(404) :
                this.translate.get('errorResponse.userNotFound').subscribe((res: string) => {
                  this.toastr.error(res, 'error');
                });
                break;
              case(403) :
                this.translate.get('errorResponse.emailAlreadyConfirmed').subscribe((res: string) => {
                  this.toastr.error(res, 'error');
                });
                break;
              case(500) :
                this.translate.get('errorResponse.internalServerError').subscribe((res: string) => {
                  this.toastr.error(res, 'error');
                });
                break;
              default:
                this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
                break;
            }
            
            reject(error);
          });
      })
    }
  }
  
  emailVerificationRequest(data: any) {
    const header = {
      'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
      this.api.post(`email/send-confirmation`, data,  header)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log('erreur: ', error)
          if (error.status == 406) {
            this.translate.get('errorResponse.userNotFound').subscribe((res: string) => {
              this.toastr.error(res, 'error');
            });
          }
          else if (error.status == 403) {
            this.translate.get('errorResponse.emailAlreadyConfirmed').subscribe((res: string) => {
              this.toastr.error(res, 'error');
            });
          }
          
          else if (error.status == 500) {
            this.translate.get('errorResponse.internalServerError').subscribe((res: string) => {
              this.toastr.error(res, 'error');
            });
          } else {
            this.toastr.error(error.message, 'Error');
          }
          
          reject(error);
        });
    })
  }

}
