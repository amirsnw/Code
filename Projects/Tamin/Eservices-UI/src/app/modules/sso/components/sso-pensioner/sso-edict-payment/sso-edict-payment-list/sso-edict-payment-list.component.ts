import {Component, Input, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {EdictPaymentDetailModel} from '../../../../../../models/pensioner/edictPaymentDetail.model';
import {Urls} from '../../../../../../settings/urls';

declare let NumToPersian: any;

@Component({
  selector: 'app-edict-payment-list',
  templateUrl: './sso-edict-payment-list.component.html',
  styleUrls: ['./sso-edict-payment-list.component.css']
})
export class SsoEdictPaymentListComponent extends TaminPageBaseComponent {
  items: EdictPaymentDetailModel[];
  items1: EdictPaymentDetailModel[];
  items2: EdictPaymentDetailModel[];
  items3: EdictPaymentDetailModel[];
  items6: EdictPaymentDetailModel[];
  searchParams: any[] = [];
  sortParams: any[] = [];
  private _overlay: any;
  year: any;
  month: any;
  monthNumber: any;
  lastName: any;
  firstName: any;
  pensionerId: any;
  paymentType: any;
  paymentTypeNumber: any;
  nationalCode: any;

  displayPaymentContent = 'unset';
  @Input() insuranceNumber: string;

  initializePage() {
  }

  loadData(param: any) {
    this.nationalCode = param.nationalCode;
    this.year = param.year;
    this.month = param.month;
    this.monthNumber = param.monthNumber;
    this.pensionerId = param.pensionerId;
    this.lastName = param.lastName;
    this.firstName = param.firstName;
    this.paymentType = param.paymentType;
    this.paymentTypeNumber = param.paymentTypeNumber;
    this.refreshData();
  }

  abs(val) {
    return Math.abs(val);
  }

  refreshData() {
    const startDate = new SearchParam();
    startDate.property = 'startDate';
    startDate.operator = SearchOperator.EQUAL;
    startDate.value = this.year + this.monthNumber;

    const pensionerId = new SearchParam();
    pensionerId.property = 'pensionerId';
    pensionerId.operator = SearchOperator.EQUAL;
    pensionerId.value = this.pensionerId;

    const paymentType = new SearchParam();
    paymentType.property = 'paymentType';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value = this.paymentTypeNumber;

    const searchParams: Array<SearchParam> = [];
    searchParams.push(startDate);
    searchParams.push(pensionerId);
    searchParams.push(paymentType);

    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.SsoPensionerFishRequest + '/' + this.nationalCode, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.items = result.data.list.filter(c => c.sumAmount !== 0); // result.data.list;

        this.items1 = this.items.filter(c => c.clpType === '1');
        this.items2 = this.items.filter(c => c.clpType === '2');
        this.items3 = this.items.filter(c => c.clpType === '3');
        this.items6 = this.items.filter(c => c.clpType === '6');

        if (result.data.list.length === 0) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعاتی برای نمایش وجود ندارد');
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error.data !== null && reason.error.data.cause === ('TaminClientException')) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {

          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  resetData() {
    this.items = [];
  }

  backToPanelClick() {
    this.redirectTo('/');
  }

  getTotal() {
    let total = 0;
    this.items.forEach(item => {
      if (item.clpType === '1' || item.clpType === '2') {
        total += Number(item.sumAmount);
      }
    });
    return total;
  }


  filterPayment(data) {
    // return this.items.filter(c=>c.clpType === type);
  }

  numToPersian(val) {
    return NumToPersian(val);
  }

  print() {
    const startDate = new SearchParam();
    startDate.property = 'startDate';
    startDate.operator = SearchOperator.EQUAL;
    startDate.value = this.year + this.monthNumber;

    const pensionerId = new SearchParam();
    pensionerId.property = 'pensionerId';
    pensionerId.operator = SearchOperator.EQUAL;
    pensionerId.value = this.pensionerId;

    const paymentType = new SearchParam();
    paymentType.property = 'paymentType';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value = this.paymentTypeNumber;

    const searchParams: Array<SearchParam> = [];
    searchParams.push(startDate);
    searchParams.push(pensionerId);
    searchParams.push(paymentType);

    this._overlay = this.showOverlay();
    this.restService
      .getBlob(Urls.SSoPensionerFishRequestPrint + '/' + this.nationalCode, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'salary_slip_' + this.getPersianDate(new Date()) + '.pdf';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  sendToAnnoncment() {
    const startDate = new SearchParam();
    startDate.property = 'startDate';
    startDate.operator = SearchOperator.EQUAL;
    startDate.value = this.year + this.monthNumber;

    const pensionerId = new SearchParam();
    pensionerId.property = 'pensionerId';
    pensionerId.operator = SearchOperator.EQUAL;
    pensionerId.value = this.pensionerId;

    const paymentType = new SearchParam();
    paymentType.property = 'paymentType';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value = this.paymentTypeNumber;

    const searchParams: Array<SearchParam> = [];
    searchParams.push(startDate);
    searchParams.push(pensionerId);
    searchParams.push(paymentType);

    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.SSoPensionerFishAnnoncment + '/' + this.nationalCode, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال فیش حقوق با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}


