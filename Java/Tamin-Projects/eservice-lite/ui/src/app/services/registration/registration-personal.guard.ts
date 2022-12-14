import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Urls} from '../../settings/urls';
import {TaminRestService, TaminSecurityService} from 'tamin-framework';
import {AuthGuard} from '../../guards/auth.guard';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class RegistrationPersonalGuard implements CanActivate {
  constructor(private taminRestService: TaminRestService, private taminSecurityService: TaminSecurityService, private router: Router, private authGuard: AuthGuard) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authGuard.canActivate(next, state);

    return this.checkUserAccess();
  }

  private checkUserAccess(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      this.taminSecurityService.getCurrentUser()
        .then(data => {
          const today = new Date();
          const birthDate = new Date(Number(data.birthDate));
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          // return age;

          if (age < 12) {
            alertify.alert('پیام سیستم', 'کاربر گرامی، به دلیل شرایط سنی (سن باید بزرگتر از 12 سال باشد)دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
            reject(false);
          } else {
            this.taminRestService.getAll(Urls.personal)
              .then(value => {
                alertify.alert('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
                resolve(true);
                // reject(false);

              }).catch(reason => {
              resolve(true);
            });
          }
        }).catch(error => {
        reject(false);
      });


    });
  }
}
