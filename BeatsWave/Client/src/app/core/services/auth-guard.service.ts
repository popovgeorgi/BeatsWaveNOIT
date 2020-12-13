import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private snotifyService: SnotifyService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authService.user.value;
      if (currentUser) {
        if(route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          this.snotifyService.info('You are not permitted to access this page!');
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      }

      this.router.navigate(['/home']);
      return false;
    }
}
