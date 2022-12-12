import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TaminRestService} from 'tamin-framework';
import {AuthGuard} from '../../guards/auth.guard';
import {Urls} from '../../settings/urls';
import {TaminValidators, TaminSecurityService} from 'tamin-framework';

declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class RegistrationRelationGuard implements CanActivate {
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
          /*const birthday = data.birthDate;
          const ageDifMs = Date.now() - birthday;
          const ageDate = new Date(ageDifMs); // miliseconds from epoch
          const t = Math.abs(ageDate.getUTCFullYear() - 1970);*/

          const today = new Date();
          const birthDate = new Date(Number(data.birthDate));
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 12) {
            alertify.alert('پیام سیستم', 'کاربر گرامی، به دلیل شرایط سنی (سن باید بزرگتر از 12 سال باشد)دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
            reject(false);
          } else {
            this.taminRestService.getAll(Urls.personal)
              .then(value => {
                resolve(true);
              }).catch(reason => {
              alertify.alert('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید.');
              reject(false);
            });
          }
        }).catch(error => {
        reject(false);
      });


    });
  }

}
