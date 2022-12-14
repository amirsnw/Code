import {Component, Input, ViewChild} from '@angular/core';
import {EdictPaymentListComponent} from './edict-payment-list/edict-payment-list.component';
import {EdictPaymentViewComponent} from './edict-payment-view/edict-payment-view.component';
import {InsuranceSpecModel} from '../../../models/base-info/insuranceSpec.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {EdictPaymentSearchComponent} from './edict-payment-search/edict-payment-search.component';

@Component({
  selector: 'app-edict-payment',
  templateUrl: './edict-payment.component.html',
  styleUrls: ['./edict-payment.component.css']
})
export class EdictPaymentComponent extends TaminPageBaseComponent {

  @ViewChild('paymentListComponent') paymentListComponent: EdictPaymentListComponent;
  @ViewChild('paymentViewComponent') paymentViewComponent: EdictPaymentViewComponent;
  @ViewChild('paymentSearchComponent') paymentSearchComponent: EdictPaymentSearchComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;
  data: any;
  private _overlay = null;
  // isAccessible = true;


  initializePage() {
    this.title = 'فیش' + ' - ' + ' مستمری';
  }

  loadPageData() {
    // if (Number(this.getPersianDate(new Date()).substr(8, 2)) <= 10 && Number(this.getPersianDate(new Date()).substr(8, 2)) >= 5) {
    //   this.isAccessible = false;
    // }
    /* this._overlay = this.showOverlay();
     this.restService.getAll(Urls.PensionerInsuranceRequestFirst)
       .then(data => {
         this.hideOverlay(this._overlay);
         this.data = data.data;
         const pensionerIds = [];
         data.data.pensionerIds.forEach((item) => {
           pensionerIds.push({name: this.getPersianNumber(item), value: item});
         });
         // this.paymentViewComponent.setData(this.data);
         this.paymentSearchComponent.setPensionerIds(pensionerIds);
       })
       .catch(error => {
         this.hideOverlay(this._overlay);
       });*/
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
        this.paymentListComponent.loadData(tmp);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('', this.constants.getNetworkErrorMessage());
      });
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
