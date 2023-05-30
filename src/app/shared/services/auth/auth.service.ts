import { Injectable, ɵConsole } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../entities/user';
import { UserService } from '../user/user.service';
import { async } from '@angular/core/testing';
import { WebStorage } from '../../storage/web.storage';
import { ApiService } from 'src/app/shared/api/api.service';
import { ErrorsService } from 'src/app/services/errors/errors.service';


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
    private user: UserService,
    private webStorage: WebStorage,
    private errorsService: ErrorsService
  ) {

    // this.registResult = false;
    // this.loginResult = false;

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
          console.error('Erreur00: ', error.message);
          if (error.status == 500) {
            this.toastr.error("Error server, 'Error'");
          } else if (error.status == 400) {
            this.toastr.error("expected field was not submitted or does not have the correct type", 'Error');
          } else if (error.status == 404) {
            this.toastr.error("Unknown email address.", 'Error');
          } else {
            this.toastr.error(error.message, 'Error');

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
        }, (error: any) =>  { 
          console.log("test error: ", error)
          if (error.status === 401) {
            localStorage.clear();
            this.isLoggedIn = false;
            this.toastr.success('Your session has been disconnected!', 'Success', { timeOut: 5000 });
            this.router.navigate(["/login"]);
          reject(error);
        } else {
          this.toastr.error("Can't disconnect to your session", 'Error', {timeOut: 5000});
          console.log(error);
          reject(error);
        }
        });
    });
  
}

  /**
   *  Create an account
   *
   */
  createAccount(user: User): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94',
        // 'Accept': 'application/json'
      };

      const params = {
        'firstName': user.field_firstName,
        'lastName': user.field_lastName,
        'password': user.field_password,
        'email': user.field_email,
        'profilePicture': 'https://yaba-in.com/' + user.field_profilPicture,
        'country': user.field_country,
        // 'location': user.field_location,
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
          if (error.status == 400) {
            this.registResult = false;
            this.toastr.error("This email address is already used.", 'Error');
            // console.log('Error message: ', error.message);
            reject(error);
          } else if (error.status == 401) {
            this.registResult = false;
            this.toastr.error("This email address is already used.", 'Error');
            // console.log('Error message: ', error.message);
            reject(error);
          } else if (error.status == 500) {
            this.registResult = false;
            this.toastr.error('Intternal server error: ' + error.message, 'Error');
            // console.log('Error message: ', error.message);
            reject(error);
          }
          else {
            this.registResult = false;
            this.toastr.error(error.message, 'Unknown error.');
            // console.log('Error message: ', error.message);
            reject(error);
          }
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
  authLogin(userIdentifiants: User): Promise<any> {
    let email = userIdentifiants.field_email;
    let password = userIdentifiants.field_password;

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
            this.toastr.warning('Your email was not verified. Go to your mail box.', null, {timeOut: 10000});
            return false;
          }

          this.webStorage.Login(userIdentifiants);
          this.api.setAccessToken(response.data.access_token);
          // console.log('User infos: ', response.data.user);
          this.user.setUserInformations(response.data.user)
          this.router.navigate(['index']);
          this.toastr.success('Welcome !!');
          resolve(response);
        }, error => {
          if (error.status == 500) {
            this.registResult = false;
            this.toastr.error("Error server", 'Error');
            reject(error);
          } else if (error.error.statusCode == 403) {
            this.registResult = false;
            this.toastr.error("Email address not verified. Check your email.", 'Error');
            reject(error);
          } else if (error.error.statusCode == 401) {
            this.registResult = false;
            this.toastr.error("Incorrect email or password! Please verify your information.", 'Error');
            reject(error);
          } else {
            this.toastr.error(error.message, 'Error');
            reject(error);

          }

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
              this.toastr.error("The email has already been confirmed.", 'Error');

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
  /**
   *  Get the user informations
   */
  authUserInformations(): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };


      this.api.get('requester/profil', headers)
        .subscribe((reponse: any) => {
          if (reponse) {
            resolve(reponse);
            this.user.setUserInformations(reponse);
          }

        }, (error: any) => {

          if (error) {
            this.toastr.success(error.message, 'Success');
            reject(error);
          }
        });

      // this.api.get('requester/profil', headers)
      // .subscribe((reponse: any) => {
      //   if (reponse) {
      //     resolve(reponse);
      //     this.user.setUserInformations(reponse);
      //   }

      // }, (error: any) => {

      //   if (error) {
      //     this.toastr.success(error.message);
      //     reject(error);
      //   }
      // });

    });



  }
}
