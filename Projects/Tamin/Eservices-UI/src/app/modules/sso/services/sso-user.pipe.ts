import {Pipe} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OverlayService, TaminSecurityService} from 'tamin-framework';
import {AuthGuard} from '../../../guards/auth.guard';

declare var alertify: any;

@Pipe({
  name: 'ssoUser'
})
export class SsoUserPipe implements CanActivate {
  private _overlay: any;

  constructor(
    private taminSecurityService: TaminSecurityService,
    private authGuard: AuthGuard,
    private overlayService: OverlayService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authGuard.canActivate(next, state);
    return this.checkAccess(state);
  }

  private checkAccess(state) {
    return new Promise<boolean>((resolve, reject) => {
      // this._overlay = this.overlayService.show();
      this.taminSecurityService
        .getCurrentUser()
        .then(value => {
          if (value.organization.code === 'request') {
            alertify.alert('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
            reject(false);
          }
          resolve(true);
        })
        .catch(reason => {
          alertify.alert('پیام سیستم', 'خطا در بررسی مجوز های دسترسی');
          reject(false);
        });
    });
  }
}
