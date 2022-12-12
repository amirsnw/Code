import {Component, Input, ViewChild} from '@angular/core';
import {CombinedListComponent} from './combined-list/combined-list.component';
import {CombinedViewComponent} from './combined-view/combined-view.component';
import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.css']
})
export class CombinedComponent extends TaminPageBaseComponent {
  @ViewChild('combinedListComponent') combinedListComponent: CombinedListComponent;
  @ViewChild('combinedViewComponent') combinedViewComponent: CombinedViewComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'سوابق تلفیقی';
  }

  loadPageData() {
    this.combinedViewComponent
      .loadData()
      .then(value => {
        this.combinedListComponent
          .loadData()
          .then(value1 => {
          })
          .catch(reason => {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
              this.redirectTo('/');
            });
          });
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('/');
        });
      });
  }
}

