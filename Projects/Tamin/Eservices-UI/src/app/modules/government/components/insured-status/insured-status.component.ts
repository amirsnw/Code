import { Component, ViewChild } from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
// import {AppHelper} from '../../../../../settings/app-helper';
import {InsuredStatusListComponent} from './insured-status-list/insured-status-list.component';
import {InsuredStatusSearchComponent} from './insured-status-search/insured-status-search.component';

@Component({
  selector: 'app-insured-status',
  templateUrl: './insured-status.component.html',
  styleUrls: ['./insured-status.component.css']
})
export class InsuredStatusComponent extends TaminPageBaseComponent {

  // constructor() { }

  // ngOnInit() {
  // }

  @ViewChild('insuredStatusListComponent') insuredStatusListComponent: InsuredStatusListComponent;
  @ViewChild('insuredStatusSearchComponent') insuredStatusSearchComponent: InsuredStatusSearchComponent;

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
    this.insuredStatusListComponent.loadData(param)
      .catch(reason => {
        // this.showError(reason.error);
        if (reason !== null) {
          if ( reason.status === 403) {
            this.showErrorMessageBox('پیام سیستم', 'محدودیت دسترسی');
          } else {
            this.showErrorMessageBox('پیام سیستم', reason.error);
          }
          return;
        }
    });
  }

  onClearForm (param: any) {
    this.insuredStatusListComponent.dataGrid.dataItems = [];
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

