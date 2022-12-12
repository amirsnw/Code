import {Component, Input, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {Urls} from '../../../settings/urls';
import {EdictListComponent} from './edict-list/edict-list.component';
import {EdictViewComponent} from '../edict-view/edict-view.component';
import {EdictSearchComponent} from './edict-search/edict-search.component';
import {EdictListSubdominantComponent} from './edict-list-subdominant/edict-list-subdominant.component';

@Component({
  selector: 'app-edict',
  templateUrl: './edict.component.html',
  styleUrls: ['./edict.component.css']
})
export class EdictComponent extends TaminPageBaseComponent {

  @ViewChild('listComponent') listComponent: EdictListComponent;
  @ViewChild('subdominantComponent') subdominantComponent: EdictListSubdominantComponent;
  @ViewChild('viewComponent') viewComponent: EdictViewComponent;
  @ViewChild('searchComponent') searchComponent: EdictSearchComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;
  data: any;
  private _overlay = null;


  initializePage() {
    this.title = 'حکم' + ' - ' + ' مستمری';
  }

  loadPageData() {
    // this._overlay = this.showOverlay();
    // this.restService.getAll(Urls.PensionerInsuranceRequestFirst)
    //   .then(data => {
    //     this.hideOverlay(this._overlay);
    //     this.data = data.data;
    //     const pensionerIds = [];
    //     data.data.pensionerIds.forEach((item) => {
    //       pensionerIds.push({name: this.getPersianNumber(item), value: item});
    //     });
    //     // this.paymentViewComponent.setData(this.data);
    //     this.searchComponent.setPensionerIds(pensionerIds);
    //   })
    //   .catch(error => {
    //     this.hideOverlay(this._overlay);
    //   });
  }

  loadData(data) {
    this._overlay = this.showOverlay();
    this.securityService
      .getCurrentUser()
      .then(value => {
        this.hideOverlay(this._overlay);
        const tmp = Object.assign(data, {
          firstName: value.firstName,
          lastName: value.lastName
        });
        if (this.isSubdominant(tmp.pensionerId)) {
          this.subdominantComponent.loadData(tmp);
        } else {
          this.listComponent.loadData(tmp);
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('', this.constants.getNetworkErrorMessage());
      });
  }

  isSubdominant(val: string): boolean {
    if (val.length !== 10) {
      return false;
    }
    const flag = val.substr(1, 1);
    switch (flag) {
      case '0':
      case '1':
      case '2':
      case '3':
        return false;
      case '5':
      case '7':
        return true;
      default:
        return false;
    }
  }


  retryOrCancel() {
    this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.loadPageData();
      },
      () => {
        this.redirectTo('/');
      });
  }

}
