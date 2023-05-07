import { Injectable, ɵConsole } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { WebStorage } from '../storage/web.storage';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static currentUser: User = new User();

  userData?: User;
  isLoggedIn = false;
  authStatus?: boolean;
  params: any;
  registResult = false;


  constructor(
    // private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private user: UserService,
    private webStorage: WebStorage
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
            setTimeout(() => {
              this.toastr.success('A password reset link has been sent to your email.', 'Success', { timeOut: 7000 });
              resolve(response);
              return 0;
            }, 3000);
          }
        }, (error: any) => {
          console.error('Erreur00: ', error.message);
          if (error.status == 500) {
            setTimeout(() => {
              this.toastr.error("Try again later please.", 'Server Error', { timeOut: 5000 });
            }, 3000);
          } else if (error.status == 400) {
            this.toastr.warning("Email address is not verified. Check your email-box and confirm your email", 'Warning', { timeOut: 7000 });
          } else if (error.status == 401) {
            this.logOut();
            this.toastr.error("Your session has been expire", 'error', { timeOut: 5000 });
          } else if (error.status == 403) {
            this.toastr.warning("The email has already been confirmed", 'Warning', { timeOut: 7000 });
          } else if (error.status == 404) {
            this.toastr.error("Unknown email address.", 'Error', { timeOut: 5000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
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
              this.toastr.success('Your password has been updated successfully !', 'Success', { timeOut: 7000 });
              this.router.navigate(['login']);
              resolve(response);
              return 0;
            }
            reject(response);
            return 0;
          }
          reject(response);
          return 0;
        }, (error: any) => {
          if (error.status == 401) {
            this.toastr.error("Your reset request email has expired. Try to send the reset password request agian", 'Error', { timeOut: 10000 });
            this.router.navigate(['auth/forgot-pwd']);
          }
          else if (error.status == 400) {
            this.toastr.error("Expected field was not submitted or does not have the correct type.", 'Error', { timeOut: 7000 });

          }
          else if (error.status == 500) {
            this.toastr.error("Internal Server Error.", 'Error', { timeOut: 5000 });

          } else {
            this.toastr.error(error.error, 'Error', { timeOut: 5000 });
          }
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
          }), (error: any) =>  {
            this.toastr.error("Can't disconnect to your session", 'Error', {timeOut: 5000});
            console.log(error);
            reject(error);
          };
      });
    
  }

  /**
   *  Create an account
   *
   */
  createAccount(user: any): Promise<any> {

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
        'profilePicture': 'https://drive.google.com/uc?id=11TtmwsTdlQk2A4x3pn7FMmGKAkXbQdwI',
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
              this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success', { timeOut: 7000 });
            }
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          if (error.status == 400) {
            this.registResult = false;
            this.toastr.error("This email address is already used.", 'Error', { timeOut: 5000 });
            // console.log('Error message: ', error.message);
            reject(error);
          } else if (error.status == 401) {
            this.registResult = false;
            this.toastr.error("This email address is already used.", 'Error', { timeOut: 5000 });
            // console.log('Error message: ', error.message);
            reject(error);
          } else if (error.status == 500) {
            this.registResult = false;
            this.toastr.error('Intternal server error: ' + error.message, 'Error', { timeOut: 7000 });
            // console.log('Error message: ', error.message);
            reject(error);
          }
          else {
            this.registResult = false;
            this.toastr.error(error.message, 'Unknown error', { timeOut: 7000 });
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
  authLogin(userIdentifiants: any): Promise<any> {
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
          const profilePicture = response.data.user.profilePicture;
          console.log('img url: ', profilePicture)
          const words = profilePicture.split('.io/');
          response.data.user.profilePicture = words[1];
          // console.log('img url words: ', words[1])

          // if (response.status === 200) {
          //   this.toastr.success('Welcome !', 'Success');
          // }
          console.log('img url words: ', 1)

          // this.webStorage.Login(userIdentifiants);
          this.api.setAccessToken(response.data.access_token);
          console.log('User infos: ', response.data.user);
          this.user.setUserInformations(response.data.user)
          this.router.navigate(['home']);
          setTimeout(()=>{
            this.toastr.success('Welcome !!', null, { timeOut: 5000 });
          }, 3000);
          resolve(response);
        }, error => {
          if (error.status == 500) {
            this.registResult = false;

            this.toastr.error("Error server", 'Error', { timeOut: 5000 });
            reject(error);
          } else if (error.error.statusCode == 403) {

            this.registResult = false;
            this.toastr.error("Email address not verified. Check your email.", 'Error', { timeOut: 7000 });
            reject(error);
          } else if (error.error.statusCode == 401) {

            this.registResult = false;
            this.toastr.error("Incorrect email or password! Please verify your information.", 'Error', { timeOut: 7000 });
            reject(error);
          } else {

            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
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
            this.toastr.success('Your email has been verified.', 'Success', { timeOut: 10000 });
            this.router.navigateByUrl('/login');
            resolve(response);
          }, error => {
            console.log('erreur: ', error)

            if (error.status == 401) {
              this.toastr.error("Your verification link has expired. Try resending your mail confirmation again", 'Error', { timeOut: 10000 });
              // this.router.navigateByUrl('/login');
            }
            else if (error.status == 404) {
              this.toastr.error("User not found. Try resending your mail confirmation again", 'Error', { timeOut: 10000 });
              // this.router.navigateByUrl('/login');

            }
            else if (error.status == 403) {
              this.toastr.warning("The email has already been confirmed.", null, { timeOut: 5000 });
              this.router.navigateByUrl('/login');

            }
            else if (error.status == 500) {
              this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 5000 });
              this.router.navigateByUrl('/login');

            } else {
              this.toastr.error(error, 'Error', { timeOut: 5000 });
              this.router.navigateByUrl('/login');
            }
            reject(error);
          });
      })
    }
  }

  reSendMailLink(email: string) {
    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
      };

      const params = {
        'email': email,
      };

      this.api.post('email/send-confirmation', params, headers)
        .subscribe((response: any) => {
          // this.router.navigate(['/login']);
          if (response) {
            console.log('Success00: ', response);
            this.toastr.success('Your email validation has been sent back', 'Success', { timeOut: 10000 });
            this.router.navigate(['login']);
            resolve(response);
            return 0;
          }
        }, (error: any) => {
          console.error('Erreur00: ', error.message);
          if (error.status == 500) {
            this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
          } else if (error.status == 400) {
            this.toastr.error("User email not supplied", 'Error', { timeOut: 10000 });
          } else if (error.status == 401) {
            this.toastr.error("User not found. Try resending your mail confirmation again.", 'error', { timeOut: 10000 });
          } else if (error.status == 403) {
            this.toastr.warning("The email has already been confirmed", 'Warning', { timeOut: 10000 });
            this.router.navigate(['login']);
          } else if (error.status == 404) {
            this.toastr.error("User not found. Try resending your mail confirmation again.", 'Error', { timeOut: 10000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });

          }
          reject(error);
        });
    });

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
            this.toastr.success(error.message, 'Success', { timeOut: 5000 });
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
