import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OverlayService, TaminSecurityService} from 'tamin-framework';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private taminSecurityService: TaminSecurityService, private overlayService: OverlayService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const hasToken = this.taminSecurityService.checkToken();
    if (!hasToken) {
      this.overlayService.show();
      this.taminSecurityService.redirectToLogin(state.url);
    }
    return hasToken;
  }
}
