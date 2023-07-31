import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const currentUser = this.authService.userData;
    if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
      return true;
    } else {
      this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
