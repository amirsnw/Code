import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-special-faild-request',
  templateUrl: './special-faild-request.component.html',
  styleUrls: ['./special-faild-request.component.css']
})

export class SpecialFaildRequestComponent extends TaminPageBaseComponent {
  public router: ActivatedRoute;
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() { }
  onredirect() {
    const systemType = this.router.snapshot.params['sysType'];
    switch (systemType) {
      case '01':
        this.redirectTo('/optional-insurance/pay-premium');
        break;
      case '02':
        this.redirectTo('/conscription');
        break;
      case '03':
        this.redirectTo('/optional-insurance/freelance-pay-premium');
        break;
      case '04':
        this.redirectTo('/optional-insurance/fraction-pay-premium');
        break;
      case '05':
        this.redirectTo('/sso/agent-conscription');
        break;
      default:
        this.redirectTo('/main');
        break;
    }
  }
}
