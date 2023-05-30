import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { User } from '../entities/user';
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
  errorsInformations(error: any, action?: string) {
    console.log("Errors service: " + action, error);
    if (action) {
      this.toastr.warning("Can not " + action, 'Warning', { timeOut: 8000 });
    }

    if (error.status == 500) {
      this.error500();
    } else if (error.status == 400) {
      this.error400();
    } else if (error.status == 401) {
      this.error401();
    } else if (error.status == 403) {
      this.error403();
    } else if (error.status == 404) {
      this.error404();
    } else {
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
    }

  }

  error400() {
    this.toastr.warning("Email address is not verified. Check your email-box and confirm your email", 'Warning', { timeOut: 8000 });
  }

  error401() {
    // this.authService.logOut();
    localStorage.clear();
    this.router.navigate(["/login"]);
    this.toastr.error("Your session has been expire", 'error', { timeOut: 8000 });
  }

  error403() {
    this.toastr.warning("The email has already been confirmed", 'Warning', { timeOut: 8000 });
  }

  error404() {
    this.toastr.error("Unknown email address.", 'Error', { timeOut: 8000 });
  }

  error500() {
    // setTimeout(() => {
    this.toastr.error("Try again later please.", 'Server Error', { timeOut: 8000 });
    // }, 3000);
  }
}
