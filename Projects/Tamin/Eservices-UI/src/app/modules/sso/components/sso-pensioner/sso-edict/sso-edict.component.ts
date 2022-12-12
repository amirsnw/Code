import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {EdictViewComponent} from '../../../../../component/pensioner/edict-view/edict-view.component';
import {InsuranceSpecModel} from '../../../../../models/base-info/insuranceSpec.model';
import {SsoEdictSearchComponent} from './sso-edict-search/sso-edict-search.component';
import {SsoEdictListSubdominantComponent} from './sso-edict-list-subdominant/sso-edict-list-subdominant.component';
import {SsoEdictListComponent} from './sso-edict-list/sso-edict-list.component';

@Component({
  selector: 'app-sso-edict',
  templateUrl: './sso-edict.component.html',
  styleUrls: ['./sso-edict.component.css']
})

  export class SsoEdictComponent extends TaminPageBaseComponent {

  @ViewChild('listComponent') listComponent: SsoEdictListComponent;
  @ViewChild('subdominantComponent') subdominantComponent: SsoEdictListSubdominantComponent;
  // @ViewChild('viewComponent') viewComponent: EdictViewComponent;
  @ViewChild('searchComponent') searchComponent: SsoEdictSearchComponent;
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
    debugger
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
