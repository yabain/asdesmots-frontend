import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('LoginData')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
