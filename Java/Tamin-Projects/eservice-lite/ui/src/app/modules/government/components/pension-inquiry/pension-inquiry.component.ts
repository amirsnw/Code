import { Component, ViewChild } from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
// import {AppHelper} from '../../../../../settings/app-helper';
import {PensionInquiryListComponent} from './pension-inquiry-list/pension-inquiry-list.component';
import {PensionInquirySearchComponent} from './pension-inquiry-search/pension-inquiry-search.component';

@Component({
  selector: 'app-pension-inquiry',
  templateUrl: './pension-inquiry.component.html',
  styleUrls: ['./pension-inquiry.component.css']
})
export class PensionInquiryComponent extends TaminPageBaseComponent {

  @ViewChild('pensionInquiryListComponent') pensionInquiryListComponent: PensionInquiryListComponent;
  @ViewChild('pensionInquirySearchComponent') pensionInquirySearchComponent: PensionInquirySearchComponent;

  initializePage() {
  }

  onSearchSubmit(param: any) {
    debugger;
    //  this.ssoCompleteViewComponent.loadData(param).then(value => {
    this.pensionInquiryListComponent.loadData(param)
      .catch(reason => {
        debugger;
        this.showError(reason.error);
      });
    // }).catch(reason => {
    //     this.showError(reason.error);
    // });
  }

  onClearForm (param: any) {
    // this.insuredStatusSearchComponent.viewForm.reset();
    this.pensionInquiryListComponent.dataGrid.dataItems = [];
  }

  showError(message) {
    if (message === 'INTERNAL_SERVER_ERROR') {
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        // this.redirectTo('/');
      });
    } else if ( message.data.cause === 'Exception' ) {
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
