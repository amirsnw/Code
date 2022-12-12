import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TaminRestService} from 'tamin-framework';
import {AuthGuard} from './auth.guard';
import {Urls} from '../settings/urls';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class InsuredGuard implements CanActivate {
  constructor(private taminRestService: TaminRestService, private router: Router, private authGuard: AuthGuard) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authGuard.canActivate(next, state);
    return this.checkUserAccess();
  }

  private checkUserAccess(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.taminRestService.getAll(Urls.loginInfo)
        .then(value => {
          debugger;
          if (value.data.list.length !== 0) {
            setTimeout(() => {
              alertify.alert('پیام سیستم', value.data.list[1]);
            }, 0);
            if (value.data.list[0] === '1') {
              resolve(true);
            } else {
              reject(false);
            }
          } else {
            resolve(true);
          }
        }).catch(reason => {
        const theTitle = `<span style="color: red">خطا</span>`;
        alertify.alert(theTitle, 'خطا در دریافت اطلاعات');
        reject(false);
      });
    });
  }

}
