import {Component, ViewChild} from '@angular/core';
import {SsoCompleteListComponent} from './sso-complete-list/sso-complete-list.component';
import {SsoCompleteViewComponent} from './sso-complete-view/sso-complete-view.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../../../settings/app-helper';


@Component({
  selector: 'app-sso-complete',
  templateUrl: './sso-complete.component.html',
  styleUrls: ['./sso-complete.component.css']
})
export class SsoCompleteComponent extends TaminPageBaseComponent {

  @ViewChild('ssoCompleteListComponent') ssoCompleteListComponent: SsoCompleteListComponent;
  @ViewChild('ssoCompleteViewComponent') ssoCompleteViewComponent: SsoCompleteViewComponent;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'کلیه سوابق';
  }

  // loadPageData() {
  //   this.ssoCompleteViewComponent.loadData().then(value => {
  //     this.ssoCompleteListComponent.loadData()
  //       .catch(reason => {
  //         this.showError(reason.error);
  //       });
  //   }).catch(reason => {
  //     this.showError(reason.error);
  //   });
  // }

  onSearchSubmit(param: any) {
    this.ssoCompleteViewComponent.loadData(param).then(value => {
          this.ssoCompleteListComponent.loadData(param)
            .catch(reason => {
              this.showError(reason.error);
            });
        }).catch(reason => {
            this.showError(reason.error);
        });
  }

  onClearForm (param: any) {
    this.ssoCompleteViewComponent.viewForm.reset();
    this.ssoCompleteListComponent.dataGrid.dataItems = [];
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

