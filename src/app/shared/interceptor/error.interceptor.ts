import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   */
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(`${environment.url}/user/auth`)) {
      return next.handle(request).pipe(
        catchError(err => {
          if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized
            if(err.status == 401){
              localStorage.clear();
              this.router.navigate(['login']);
            }
          }
          // throwError
          const error = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }
}
