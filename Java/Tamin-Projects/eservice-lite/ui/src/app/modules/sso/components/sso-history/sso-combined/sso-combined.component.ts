import {Component, Input, ViewChild} from '@angular/core';
import {SsoCombinedListComponent} from './sso-combined-list/sso-combined-list.component';
import {SsoCombinedViewComponent} from './sso-combined-view/sso-combined-view.component';
// import {InsuranceSpecModel} from '../../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
// import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-sso-combined',
  templateUrl: './sso-combined.component.html',
  styleUrls: ['./sso-combined.component.css']
})
export class SsoCombinedComponent extends TaminPageBaseComponent {
  @ViewChild('ssoCombinedListComponent') ssoCombinedListComponent: SsoCombinedListComponent;
  @ViewChild('ssoCombinedViewComponent') ssoCombinedViewComponent: SsoCombinedViewComponent;
  // @Input() insuranceSpecModel: InsuranceSpecModel;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'سوابق تلفیقی';
  }

  // loadPageData() {
    // this.ssoCombinedViewComponent
    //   .loadData()
      // .then(value => {
      //   this.ssoCombinedListComponent
      //     .loadData()
      //     .then(value1 => {
      //     })
      //     .catch(reason => {
      //       this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
      //         this.redirectTo('/');
      //       });
      //     });
      // })
      // .catch(reason => {
      //   this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
      //     this.redirectTo('/');
      //   });
      // });
 // }
  onSearchSubmit(param: any) {
    this.ssoCombinedViewComponent.loadData(param)
      .then(value => {
        this.ssoCombinedListComponent.loadData(param)
          .then(value1 => {
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
    this.ssoCombinedViewComponent.viewForm.reset();
    this.ssoCombinedListComponent.dataGrid.dataItems = [];
    this.ssoCombinedListComponent.showSummary = false ;

    // this.ssoCombinedListComponent.
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

