import {Component, Input, ViewChild} from '@angular/core';
import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {SalaryListComponent} from './salary-list/salary-list.component';
import {SalaryViewComponent} from './salary-view/salary-view.component';
import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent extends TaminPageBaseComponent {
  @ViewChild('salaryListComponent') salaryListComponent: SalaryListComponent;
  @ViewChild('salaryViewComponent') salaryViewComponent: SalaryViewComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;
  private _onerlay: any;

  initializePage() {
    this.title = 'سوابق و ریز دستمزد بعد از سال 86';
  }

  loadPageData() {
    this.salaryViewComponent
      .loadData()
      .then(value => {
        this.salaryListComponent.loadData().then(value1 => {
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
