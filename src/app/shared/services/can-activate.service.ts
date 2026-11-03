import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {
  constructor() { }
  authService = inject(AuthenticationService);
  router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.profileData) {
      return true
    }else{
      this.router.navigateByUrl('/auth/sign-in')
      return false
    }
  }
}


export const canActivateSignIn = () => {
  const authService = inject(AuthenticationService)
  const roter = inject(Router)
  if (authService.profileData) {
      roter.navigateByUrl('/dashboard/home')
      return false
    }else{
      return true
    }
}
