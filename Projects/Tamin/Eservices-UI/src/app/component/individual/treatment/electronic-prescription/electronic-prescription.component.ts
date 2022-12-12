import {Component, Input, ViewChild} from '@angular/core';
import {ElectronicPrescriptionListComponent} from './electronic-prescription-list/electronic-prescription-list.component';
import {ElectronicPrescriptionViewComponent} from './electronic-prescription-view/electronic-prescription-view.component';
import {InsuranceSpecModel} from '../../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../../settings/app-helper';

@Component({
  selector: 'app-electronic-prescription',
  templateUrl: './electronic-prescription.component.html',
  styleUrls: ['./electronic-prescription.component.css']
})
export class ElectronicPrescriptionComponent extends TaminPageBaseComponent {
  @ViewChild('electronicPrescriptionListComponent') electronicPrescriptionListComponent: ElectronicPrescriptionListComponent;
  @ViewChild('electronicPrescriptionViewComponent') electronicPrescriptionViewComponent: ElectronicPrescriptionViewComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;

  initializePage() {
    this.title = 'سابقه' + ' - ' + 'سوابق تلفیقی';
  }

  loadPageData() {
    this.electronicPrescriptionViewComponent
      .loadData()
      .then(value => {
        this.electronicPrescriptionViewComponent
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

