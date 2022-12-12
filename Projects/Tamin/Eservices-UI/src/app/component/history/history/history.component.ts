import {Component, ViewChild} from '@angular/core';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryViewComponent} from './history-view/history-view.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../settings/app-helper';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends TaminPageBaseComponent {

  @ViewChild('historyListComponent') historyListComponent: HistoryListComponent;
  @ViewChild('historyViewComponent') historyViewComponent: HistoryViewComponent;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'کلیه سوابق';
  }

  loadPageData() {
    this.historyViewComponent.loadData().then(value => {
      this.historyListComponent.loadData()
        .catch(reason => {
          this.showError(reason.error);
        });
    }).catch(reason => {
      this.showError(reason.error);
    });
  }

  showError(message) {
    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
      this.redirectTo('/');
    });
  }

  backToPanelClick() {
    this.redirectTo('/');
  }
}

