import {Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {GuardianRequestBothComponent} from '../../../../component/guardian/guardian-request-both/guardian-request-both.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sso-guardian',
  templateUrl: './sso-guardian.component.html',
  styleUrls: ['./sso-guardian.component.css']
})
export class SsoGuardianComponent extends TaminPageBaseComponent {

  isDisabled: boolean;

  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  initializePage() {
    this.isDisabled = false;
  }

  onSearch(otpFields: any) {

    let route = this.router.config.find(r => r.path === 'sso');
    route = route.children.find(r => r.path === 'guardian');
    route = route.children.find(r => r.path === 'guardian-request');
    route.data = {nationalCode: otpFields.nationalCode, ticket: otpFields.ticketCode};
    this.router.navigateByUrl('/sso/guardian/guardian-request');
  }
}
