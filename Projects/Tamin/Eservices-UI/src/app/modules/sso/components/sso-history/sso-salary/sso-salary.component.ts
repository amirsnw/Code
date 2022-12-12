import {Component, Input, ViewChild} from '@angular/core';
// import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {SsoSalaryListComponent} from './sso-salary-list/sso-salary-list.component';
import {SsoSalaryViewComponent} from './sso-salary-view/sso-salary-view.component';
// import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-sso-salary',
  templateUrl: './sso-salary.component.html',
  styleUrls: ['./sso-salary.component.css']
})
export class SsoSalaryComponent extends TaminPageBaseComponent {
  @ViewChild('ssoSalaryListComponent') ssoSalaryListComponent: SsoSalaryListComponent;
  @ViewChild('ssoSalaryViewComponent') ssoSalaryViewComponent: SsoSalaryViewComponent;
  // @Input() insuranceSpecModel: InsuranceSpecModel;
  private _onerlay: any;

  initializePage() {
    this.title = 'سوابق و ریز دستمزد بعد از سال 86';
  }

  loadPageData() {
    // this.ssoSalaryViewComponent
    //   .loadData()
    //   .then(value => {
    //     this.ssoSalaryListComponent.loadData().then(value1 => {
    //     })
    //       .catch(reason => {
    //         this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
    //           this.redirectTo('/');
    //         });
    //       });
    //   })
    //   .catch(reason => {
    //     this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
    //       this.redirectTo('/');
    //     });
    //   });
  }

  onSearchSubmit(param: any) {
    this.ssoSalaryViewComponent.loadData(param)
      .then(value => {
        this.ssoSalaryListComponent.loadData(param).then(value1 => {
        })
          .catch(reason => {
            this.showError(reason.error);
          });
      })
      .catch(reason => {
        this.showError(reason.error);
      });
  }

  showError(message) {
    if (message === 'INTERNAL_SERVER_ERROR') {
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        // this.redirectTo('/');
      });
    } else if ( message.data.cause === 'Exception' || message.data.cause === 'TicketNotFoundException') {
      this.showErrorMessageBox('پیام سیستم', message.data.message);
    } else {
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        // this.redirectTo('/');
      });
    }
  }

  onClearForm (param: any) {
    this.ssoSalaryViewComponent.viewForm.reset();
    this.ssoSalaryListComponent.data = [];
  }

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }
}
