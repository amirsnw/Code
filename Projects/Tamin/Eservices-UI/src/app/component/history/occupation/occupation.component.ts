import {Component, Input, ViewChild} from '@angular/core';
import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {OccupationListComponent} from './occupation-list/occupation-list.component';
import {OccupationViewComponent} from './occupation-view/occupation-view.component';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent extends TaminPageBaseComponent {
  @ViewChild('occupationListComponent') occupationListComponent: OccupationListComponent;
  @ViewChild('occupationViewComponent') occupationViewComponent: OccupationViewComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'سابقه به تفکیک شغل';
  }

  loadPageData() {
    this.occupationViewComponent
      .loadData()
      .then(value => {
        this.occupationListComponent.loadData().then(value1 => {
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
