import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

// export function authenticationGuard(): CanActivateFn {
//   return () => {
    export const authenticationGuard: CanActivateFn = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ) => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (oauthService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };

