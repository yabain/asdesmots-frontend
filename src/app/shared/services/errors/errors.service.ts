import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { User } from 'src/app/shared/entities/user';
// import { AuthService } from 'src/app/shared/services/auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public currentUser: User = new User();

  currentUserSubject: Subject<User> = new Subject<User>();
  public static isUser = true;

  listUser: User[] = [];

  params: any;
  userData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    // private authService: AuthService
  ) { }

  /*
*  Set the user informations.
*/
  errorsInformations(error: any, action?: string, errorType?: string) {
    console.log("Errors service: " + action, error.status);
    // if (action) {
    //   this.toastr.error("Can not " + action, 'Sorry', { timeOut: 10000 });
    // }
    if (errorType && errorType === '0') {
      this.toastr.warning("This fonction is not available. Try later", "Sorry", { timeOut: 10000 });
    }

    if (error.status === 500) {
      this.error500(action);
    } else if (error.status === 400) {
      this.error400(action);
    } else if (error.status === 401) {
      this.error401(action);
    } else if (error.status === 403) {
      this.error403(action);
    } else if (error.status === 404) {
      this.error404(action);
    } else {
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
    }

  }

  error400(action) {
    if (action === 'login') { this.toastr.error("Email address is not verified. Check your email-box and confirm your email", 'Warning', { timeOut: 10000 }); }
    else if (action === 'logout') { }
    // else if (action === 'create account') { this.toastr.error("Expected field was not submitted or does not have the correct type.", 'Error', { timeOut: 10000 })}
    // else if (action === 'reset password') { this.toastr.error("expected field was not submitted or does not have the correct type", 'Error', { timeOut: 10000 });}
    else { this.toastr.error("Unknow error, try again later please", 'Warning', { timeOut: 10000 });}
  }

  error401(action) {
    console.log("error401: ", action);
    if (action === 'login') { this.toastr.error("Incorrect email or password! Please verify your information.", 'Error', { timeOut: 10000 });}
    else if (action === 'create account') { this.toastr.error("This email address is already used.", 'Error', { timeOut: 10000 })}
    else if (action === 'logout') {
      this.toastr.warning('Your session has been disconnected!', 'Success', { timeOut: 10000 });
      this.router.navigate(["/login"]);
      localStorage.clear();
    }
    else if (action === 'reset password') {
      this.toastr.error('Your reset password request has expired. You can try to reset your password', 'Success', { timeOut: 10000 });
      this.router.navigate(["/forgot-pwd"]);
     }
     else if (action === 'session expired') {
      localStorage.clear();
      this.router.navigate(["/login"]);
      this.toastr.error("Your session has been expire", 'error', { timeOut: 10000 });
      }
    else {
      localStorage.clear();
      this.router.navigate(["/login"]);
      this.toastr.error("Your session has been expire", 'error', { timeOut: 10000 });
      // this.toastr.error("Unknow error, try again later please", 'Warning', { timeOut: 10000 });
    }
  }

  error403(action) {
    if (action === 'login') { this.toastr.error("Email address not verified. Check your email.", 'Error', { timeOut: 10000 });}
    else if (action === 'logout') { }
    else if (action === 'create account') { }
    else if (action === 'reset password') { }
    else if (action === 'confirm email') {this.toastr.warning("The email has been already confirme", 'Warning', { timeOut: 10000 });}
    else {this.toastr.warning("The email has been already confirme", 'Warning', { timeOut: 10000 });}
  }

  error404(action) {
    if (action === 'login') { }
    else if (action === 'logout') { }
    else if (action === 'create account') { }
    else if (action === 'reset password') {this.toastr.error("Unknown email address.", 'Error', { timeOut: 10000 });}
    else { this.toastr.error("Unknow error, try again later please", 'Warning', { timeOut: 10000 });}
  }

  error500(action) {
    if (action === 'login') { this.toastr.error("Try again later please.", 'Server Error', { timeOut: 10000 }); }
    else if (action === 'logout') { this.toastr.error("Try again later please.", 'Server Error', { timeOut: 10000 });}
    else if (action === 'reset password') { this.toastr.error("Try again later please.", 'Server Error', { timeOut: 10000 });}
    else { this.toastr.error("Try again later please.", 'Server Error', { timeOut: 10000 });}
  }
}
