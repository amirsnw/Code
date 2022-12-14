import {Component, Input, ViewChild} from '@angular/core';
import {InsuranceSpecModel} from '../../../../../models/base-info/insuranceSpec.model';
import {SsoOccupationListComponent} from './sso-occupation-list/sso-occupation-list.component';
import {SsoOccupationViewComponent} from './sso-occupation-view/sso-occupation-view.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../../../settings/app-helper';

@Component({
  selector: 'app-sso-occupation',
  templateUrl: './sso-occupation.component.html',
  styleUrls: ['./sso-occupation.component.css']
})
export class SsoOccupationComponent extends TaminPageBaseComponent {
  @ViewChild('ssoOccupationListComponent') ssoOccupationListComponent: SsoOccupationListComponent;
  @ViewChild('ssoOccupationViewComponent') ssoOccupationViewComponent: SsoOccupationViewComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'سابقه به تفکیک شغل';
  }

  // loadPageData() {
  onSearchSubmit(param: any) {
    this.ssoOccupationViewComponent
      .loadData(param).then(value => {
        this.ssoOccupationListComponent.loadData(param).then(value1 => {
        })
          .catch(reason => {
            this.showError(reason.error);
          });
      })
      .catch(reason => {
        this.showError(reason.error);
      });
  }

  onClearForm (param: any) {
    this.ssoOccupationViewComponent.viewForm.reset();
    this.ssoOccupationListComponent.dataGrid.dataItems = [];
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

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }
}
