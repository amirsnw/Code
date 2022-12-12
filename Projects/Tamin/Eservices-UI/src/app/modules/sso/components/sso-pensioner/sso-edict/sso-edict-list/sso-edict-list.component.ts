import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {EdictPaymentViewComponent} from '../../../../../../component/pensioner/edict-payment/edict-payment-view/edict-payment-view.component';
import {Urls} from '../../../../../../settings/urls';
declare let NumToPersian: any;
@Component({
  selector: 'app-sso-edict-list',
  templateUrl: './sso-edict-list.component.html',
  styleUrls: ['./sso-edict-list.component.css']
})
  export class SsoEdictListComponent extends TaminPageBaseComponent {
  searchParams: any[] = [];
  sortParams: any[] = [];
  private _overlay: any;
  year: any;
  month: any;
  monthNumber: any;
  lastName: any;
  firstName: any;
  pensionerId: any;
  nationalCode: any;
  paymentType: any;
  paymentTypeNumber: any;
  data: any;
  ticketCode: any;
  groupedByData: Array<any> = [];

  @ViewChild('paymentViewComponent') paymentViewComponent: EdictPaymentViewComponent;
  displayPaymentContent = 'unset';
  @Input() insuranceNumber: string;

  initializePage() {
  }

  loadData(param: any) {
    this.year = param.year;
    this.month = param.month;
    this.nationalCode = param.nationalCode;
    this.monthNumber = param.monthNumber;
    this.pensionerId = param.pensionerId;
    this.lastName = param.lastName;
    this.firstName = param.firstName;
    this.paymentType = param.paymentType;
    this.paymentTypeNumber = param.paymentTypeNumber;
    this.ticketCode =  param.ticketCode;
    this.refreshData();
  }

  abs(val) {
    return Math.abs(val);
  }

  refreshData() {
    const startDate = new SearchParam();
    startDate.property = 'startDate';
    startDate.operator = SearchOperator.EQUAL;
    startDate.value = this.year + '0101';

    const pensionerId = new SearchParam();
    pensionerId.property = 'pensionerId';
    pensionerId.operator = SearchOperator.EQUAL;
    pensionerId.value = this.pensionerId;


    const ticketCode = new SearchParam();
    ticketCode.property = 'ticketCode';
    ticketCode.operator = SearchOperator.EQUAL;
    ticketCode.value = this.ticketCode;

    const searchParams: Array<SearchParam> = [];
    searchParams.push(startDate);
    searchParams.push(pensionerId);
    searchParams.push(ticketCode);


    this._overlay = this.showOverlay();
    const theUrl = Urls.SSO_PensionerHokmRequest + '/' + this.nationalCode;
    this.restService
      .getAll(theUrl, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.data = result.data;
        this.categorizeData(result.data.detail);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم',this.constants.getNetworkErrorMessage());
      });
  }

  categorizeData(data: Array<any>) {
    const nonEmptyValues = data;
    const groupedBy = this.groupBy(nonEmptyValues, packageName => packageName.packageName);
    this.groupedByData = Array.from(groupedBy.values());
    this.groupedByData.forEach((value: Array<any>) =>  {
      value.forEach(item => {
        if (item.fieldValue === '0') {
          item.fieldValue = '';
        }
      });
    });


    console.log(this.groupedByData);
  }

  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }


  resetData() {
  }

  backToPanelClick() {
    this.redirectTo('/');
  }

  filterPayment(data) {
    // return this.items.filter(c=>c.clpType === type);
  }

  numToPersian(val) {
    return NumToPersian(val);
  }

  getZeroFromNull(val) {
    return val ? val : '0';
  }

  getMainHistory() {
    return this.getPersianNumber(`${this.getZeroFromNull(this.data.hisasal)} سال و ${this.getZeroFromNull(this.data.hisamon)} ماه و ${this.getZeroFromNull(this.data.hisaday)} روز `);
  }

  getSecondHistory() {
    return this.getPersianNumber(`${this.getZeroFromNull(this.data.hisyere)} سال و ${this.getZeroFromNull(this.data.hismnte)} ماه و ${this.getZeroFromNull(this.data.hisdaye)} روز `);
  }


  getBirthDate(value) {
    const year = value.toString().substr(0, 4);
    const month = value.toString().substr(4, 2);
    const day = value.toString().substr(6, 2);
    return this.getPersianNumber(`${year}/${month}/${day}`);
  }

  getSum() {
    return Number(this.data.amt20) + Number(this.data.amt80) + Number(this.data.amt71) + Number(this.data.amt12) + Number(this.data.amt11) + Number(this.data.amt85);
  }

  history(years, months, days) {
    const y = years === null ? '0' : years;
    const m = months === null ? '0' : months;
    const d = days === null ? '0' : days;
    return this.getPersianNumber(y + ' سال و ' + m + ' ماه و ' + d + ' روز ');
  }

  hasAddedHistory(years, months, days) {
    return years !== null || months !== null || days !== null;
  }

}
