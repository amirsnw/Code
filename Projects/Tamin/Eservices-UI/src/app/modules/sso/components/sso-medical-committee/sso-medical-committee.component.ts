import {Component, Injector} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sso-medical-committee',
  templateUrl: './sso-medical-committee.component.html',
  styleUrls: ['./sso-medical-committee.component.css']
})
export class SsoMedicalCommitteeComponent extends TaminPageBaseComponent {

  isDisabled: boolean;

  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  initializePage() {
    this.isDisabled = false;
  }

  onSearch(otpFields: any) {
    const route = this.router.config.find(r => r.path === 'medical-committee');
    route.data = {nationalCode: otpFields.nationalCode, ticket: otpFields.ticketCode};
    this.router.navigateByUrl('/medical-committee');
  }
}
