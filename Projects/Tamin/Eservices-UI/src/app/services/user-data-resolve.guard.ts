import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TaminSecurityService} from 'tamin-framework';

@Injectable({
  providedIn: 'root'
})


export class UserDataResolve implements Resolve<any> {
  constructor(private taminSecurityService: TaminSecurityService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (this.taminSecurityService.checkToken()) {
      return this.taminSecurityService.getCurrentUser();
    }
    return undefined;
  }
}
