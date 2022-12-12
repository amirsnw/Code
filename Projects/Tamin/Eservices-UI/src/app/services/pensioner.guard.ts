import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TaminRestService} from 'tamin-framework';
import {Urls} from '../settings/urls';
import {AuthGuard} from '../guards/auth.guard';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class PensionerGuard implements CanActivate {

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
          // if (value.data.list.length === 0) {
          //   alertify.alert('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
          //   this.router.navigate(['/']);
          //   reject(false);
          // } else {
            resolve(true);
          //}
        }).catch(reason => {
        const theTitle = `<span style="color: red">خطا</span>`;
        alertify.alert(theTitle, 'خطا در دریافت اطلاعات');
        // this.router.navigate(['/']);
        reject(false);
      });
    });
  }


}
