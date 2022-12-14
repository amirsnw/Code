import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, PersianNumberPipe, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

import * as momentNs from 'jalali-moment';
import {ActivatedRoute, Router} from '@angular/router';
import {Urls} from '../../../../../settings/urls';

const moment = momentNs;

@Component({
  selector: 'app-agent-conscription',
  templateUrl: './agent-conscription.component.html',
  styleUrls: ['./agent-conscription.component.css']
})
export class AgentConscriptionComponent extends TaminPageBaseComponent {

  insuredDataForm: FormGroup;
  calculateDataForm: FormGroup;
  installmentForm: FormGroup;
  finalDetailsForm: FormGroup;

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  private persianNumberPipe: PersianNumberPipe;
  installmentDetailList = new Array<any>(0);
  installmentSelectNumbers = new Array<any>(0);
  renderMode: 'desktop' | 'mobile' = 'desktop';
  private data: Array<any>;
  private _overlay: any;
  monthDuration = 0;
  wageAverage = 0;
  amount = 0;
  wageAverageField = 0;
  amountField = 0;
  payedInstallmentCount = 0;
  payableAmount = 0;
  lastYear = '';
  lastMonth = '';
  insuranceNumber = '';
  message = '';
  isEligible = false;
  firstState = false;
  middleState = false;
  finalState = false;
  isInstallment = false;

  ssoNationalCode: string;
  ssoTicket: string;

  private types = [
    {'value': 0, 'name': 'پرداخت نقدی'},
    {'value': 1, 'name': 'تقسیط'}
  ];
  private months = [
    {'value': 2}, {'value': 3}, {'value': 4}, {'value': 5},
    {'value': 6}, {'value': 7}, {'value': 8}, {'value': 9}, {'value': 10},
    {'value': 11}, {'value': 12}];

  /* TaminPageBaseComponent Constructor */
  constructor(injector: Injector, private breakpointObserver: BreakpointObserver, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.persianNumberPipe = new PersianNumberPipe();

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (![Breakpoints.Small, Breakpoints.Handset]) {
          return;
        }
        if (state.matches) {
          if (this.renderMode !== 'mobile') {
            this.renderMode = 'mobile';
          }
        } else {
          if (this.renderMode !== 'desktop') {
            this.renderMode = 'desktop';
          }
        }
      });

    this.insuredDataForm = this.formBuilder.group({
      historyDays: [],
      isuType: [],
      lastBranchCode: []
    });

    this.calculateDataForm = this.formBuilder.group({
      durationMonths: [''],
      durationStartDate: [''],
      durationEndDate: [''],
      duration: [''],
      wageAverage: [''],
    });

    this.installmentForm = this.formBuilder.group({
      paymentType: ['', [Validators.required]],
      installmentCount: ['', [Validators.required]],
      installmentPrice: [],
      installmentSelect: [],
      installmentDetail: []
    });

    this.finalDetailsForm = this.formBuilder.group({
      insuredAmount: ['', ],
      esoldierNajaDuration: ['', ],
      averageWage: ['', ],
      requestDate: ['', ]
    });

    this.installmentForm.get('paymentType').valueChanges.subscribe(value => {
      this.installmentDetailList = [];
      if (value === 1) {
        this.installmentForm.get('installmentCount').setValue(2);
        this.isInstallment = true;
      } else {
        this.installmentForm.get('installmentCount').setValue(1);
        this.isInstallment = false;
      }
    });

    this.installmentForm.get('installmentCount').valueChanges.subscribe(value => {
      if (value !== undefined && value !== '' && value > 1 && value < 13) {
        this.installmentForm.get('installmentSelect').setValue('قسط اول');
        const instalmentDates =  this.getInstalmentDates(new Date(), value);
        /*for (let i = - 100 ; i < 365 ; i++) {
          const tempDate = new Date();
          tempDate.setDate((new Date()).getDate() + i);
          console.log(this.getInstalmentDates(tempDate, 12));
        }*/
        this.installmentSelectNumbers = new Array(0);
        this.installmentDetailList = [];
        for (let i = 1; i <= value; i++) {
          let tempStr;
          switch (i) {
            case 1:
              tempStr = 'اول';
              break;
            case 2:
              tempStr = 'دوم';
              break;
            case 3:
              tempStr = 'سوم';
              break;
            case 4:
              tempStr = 'چهارم';
              break;
            case 5:
              tempStr = 'پنجم';
              break;
            case 6:
              tempStr = 'ششم';
              break;
            case 7:
              tempStr = 'هفتم';
              break;
            case 8:
              tempStr = 'هشتم';
              break;
            case 9:
              tempStr = 'نهم';
              break;
            case 10:
              tempStr = 'دهم';
              break;
            case 11:
              tempStr = 'یازدهم';
              break;
            case 12:
              tempStr = 'دوازدهم';
              break;
          }

          this.installmentSelectNumbers.push({'value': 'قسط ' + tempStr});
          this.installmentDetailList.push('قسط ' + tempStr + ' - مهلت پرداخت' + instalmentDates[i - 1]);
        }

      } else if (value !== 1 && !this.finalState) {
        this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی، لطفا تعداد اقساط را انتخاب بفرمایید.', () => {
          this.redirectTo('/');
        });
      }
    });

    this.installmentForm.get('installmentSelect').valueChanges.subscribe(value => {
      let payable = 0;
      const installmentCount = this.installmentForm.get('installmentCount').value;
      if (value === 'قسط اول') {
        payable = (1000 * Math.trunc(this.amount / installmentCount / 1000)) + this.amount - ((1000 * Math.trunc((this.amount / installmentCount / 1000)) * installmentCount));
        payable = this.persianNumberPipe.transform(payable, 'cs');
        this.installmentForm.get('installmentPrice').setValue(payable);
      } else {
        payable = 1000 * Math.trunc((this.amount / installmentCount) / 1000);
        payable = this.persianNumberPipe.transform(payable, 'cs');
        this.installmentForm.get('installmentPrice').setValue(payable);
      }
    });
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.checkEligibility().then(done => {
      if (this.firstState) {
        this.restService.getAll(Urls.Soldier_Wage_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`)
          .then(wageValue => {
            if (wageValue.data.list.length <= 1) {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی، شما فاقد سابقه لازم جهت خرید خدمت می باشید.', () => {
                this.redirectTo('/');
              });
            } else {
              return this.restService.getAll(Urls.Soldier_Duration_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`)
                .then(value => {
                  if (value.data.list < 1) {
                    this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی، دوره خدمت شما یافت نشد.', () => {
                      this.redirectTo('/');
                    });
                  } else {
                    const wageAverageTemp = (Math.round((wageValue.data.list[wageValue.data.list.length - 1].his_WAGE / 24)));
                    const monthDurationTemp = (value.data.list[value.data.list.length - 1].dur_IN_MONTH);
                    const amountTemp = Math.round((monthDurationTemp * wageAverageTemp * 7) / 100);
                    const startDateTemp = value.data.list[value.data.list.length - 1].sdate;
                    const endDateTemp = value.data.list[value.data.list.length - 1].edate;
                    this.calculateDataForm.get('durationStartDate').setValue(startDateTemp.substring(0, 4) + '/' + startDateTemp.substring(4, 6) + '/' + startDateTemp.substring(6, 8));
                    this.calculateDataForm.get('durationEndDate').setValue(endDateTemp.substring(0, 4) + '/' + endDateTemp.substring(4, 6) + '/' + endDateTemp.substring(6, 8));
                    this.calculateDataForm.get('durationMonths').setValue(monthDurationTemp);

                    this.wageAverageField = this.persianNumberPipe.transform(wageAverageTemp, 'cs');
                    this.amountField = this.persianNumberPipe.transform(amountTemp, 'cs');

                    this.wageAverage = wageAverageTemp;
                    this.amount = amountTemp;
                    this.monthDuration = monthDurationTemp;

                    this.insuredDataForm.get('historyDays').setValue(wageValue.data.list[wageValue.data.list.length - 1].his_DAY);
                    this.insuredDataForm.get('isuType').setValue(wageValue.data.list[wageValue.data.list.length - 1].brhname);
                    this.insuredDataForm.get('lastBranchCode').setValue(wageValue.data.list[wageValue.data.list.length - 1].isutypedesc);

                    this.lastYear = wageValue.data.list[0].his_YEAR;
                    this.lastMonth = wageValue.data.list[0].his_MON;
                    this.insuranceNumber = wageValue.data.list[0].risuid;

                    this.reshapeData(wageValue.data.list);
                  }
                  this.hideOverlay(this._overlay);
                });
            }
          });
      } else {
        this.hideOverlay(this._overlay);
      }
    }).catch(error => {
      this.hideOverlay(this._overlay);
      if (error.pstatdesc) {
        this.showErrorMessageBox('پیام سیستم', error.pstatdesc, () => {
          // this.redirectTo('/');
        });
        return;
      }
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        // this.redirectTo('/');
      });
    });
  }

  /* Reconstruct Data Structure */
  private reshapeData(data: Array<any>) {
    const result = [];
    const groupedBy = this.groupBy(data.slice(0, -1), kg => kg.his_YEAR);
    groupedBy.forEach((value: Array<any>, key: string) => {
      const tmp = {
        year: '',
        month1_days: '0',
        month1_wage: '0',
        month2_days: '0',
        month2_wage: '0',
        month3_days: '0',
        month3_wage: '0',
        month4_days: '0',
        month4_wage: '0',
        month5_days: '0',
        month5_wage: '0',
        month6_days: '0',
        month6_wage: '0',
        month7_days: '0',
        month7_wage: '0',
        month8_days: '0',
        month8_wage: '0',
        month9_days: '0',
        month9_wage: '0',
        month10_days: '0',
        month10_wage: '0',
        month11_days: '0',
        month11_wage: '0',
        month12_days: '0',
        month12_wage: '0'
      };
      value.forEach(value1 => {
        tmp['year'] = value1.his_YEAR;
        switch (value1.his_MON) {
          case '01':
            tmp.month1_days = value1.his_DAY;
            tmp.month1_wage = value1.his_WAGE;
            break;
          case '02':
            tmp.month2_days = value1.his_DAY;
            tmp.month2_wage = value1.his_WAGE;
            break;
          case '03':
            tmp.month3_days = value1.his_DAY;
            tmp.month3_wage = value1.his_WAGE;
            break;
          case '04':
            tmp.month4_days = value1.his_DAY;
            tmp.month4_wage = value1.his_WAGE;
            break;
          case '05':
            tmp.month5_days = value1.his_DAY;
            tmp.month5_wage = value1.his_WAGE;
            break;
          case '06':
            tmp.month6_days = value1.his_DAY;
            tmp.month6_wage = value1.his_WAGE;
            break;
          case '07':
            tmp.month7_days = value1.his_DAY;
            tmp.month7_wage = value1.his_WAGE;
            break;
          case '08':
            tmp.month8_days = value1.his_DAY;
            tmp.month8_wage = value1.his_WAGE;
            break;
          case '09':
            tmp.month9_days = value1.his_DAY;
            tmp.month9_wage = value1.his_WAGE;
            break;
          case '10':
            tmp.month10_days = value1.his_DAY;
            tmp.month10_wage = value1.his_WAGE;
            break;
          case '11':
            tmp.month11_days = value1.his_DAY;
            tmp.month11_wage = value1.his_WAGE;
            break;
          case '12':
            tmp.month12_days = value1.his_DAY;
            tmp.month12_wage = value1.his_WAGE;
            break;
        }
      });
      result.push(tmp);
    });
    this.data = result;
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

  // Check Eligibility of the Client */
  private checkEligibility() {
    if (this.firstState) {
      setTimeout(function () {
        const element = document.getElementById('pay');
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 1000);
    }

    const paymentType = new SearchParam();
    paymentType.property = 'paymentType';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value = this.installmentForm.get('paymentType').value;

    const lastBranchCode = new SearchParam();
    lastBranchCode.property = 'lastBranchCode';
    lastBranchCode.operator = SearchOperator.EQUAL;
    lastBranchCode.value = this.insuredDataForm.get('lastBranchCode').value;

    const insuranceNumber = new SearchParam();
    insuranceNumber.property = 'insuranceNumber';
    insuranceNumber.operator = SearchOperator.EQUAL;
    insuranceNumber.value = this.insuranceNumber;

    const searchParams: Array<SearchParam> = [];

    searchParams.push(paymentType);
    searchParams.push(lastBranchCode);
    searchParams.push(insuranceNumber);

    return new Promise<any>((resolve, reject) => {
      this.restService
        .getAll(Urls.Soldier_Validation_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`, searchParams)
        .then(result => {
          switch (result.data.result) {
            case '00':
              this.isEligible = true;
              this.firstState = true;
              break;
            case '97':
              this.isEligible = true;
              this.middleState = true;
              break;
            case '99':
              this.isEligible = true;
              this.finalState = true;
              this.message = result.data.pstatdesc;
              break;
            default:
              this.isEligible = false;
              this.message = result.data.pstatdesc;
              throw result.data;
          }
          if (this.middleState) {
            this._initializeDataGrid();
            return this.restService
              .getAll(Urls.Soldier_Installment_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`)
              .then(item => {
                this.isInstallment = item.data.list.length !== 0;
                this.dataGrid.dataItems = item.data.list;
                for (let i = 0; i < item.data.list.length; i++) {
                  if (item.data.list[i].pay_STATUS === '1') {
                    this.payedInstallmentCount++;
                    if (item.data.list[i + 1] !== undefined) {
                      this.payableAmount = item.data.list[i + 1].payable_AMOUNT;
                    }
                  }
                }
                this.installmentForm.get('installmentCount').setValue(item.data.list.length);
                return this.restService.getAll(Urls.SoldierFinalDetails_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`).then(value => {
                  this.finalDetailsForm.patchValue({
                    insuredAmount: this.getWithCommaSeperator(value.data.insuredAmount),
                    esoldierNajaDuration: value.data.esoldierNajaDuration,
                    averageWage: this.getWithCommaSeperator(value.data.averageWage),
                    requestDate: value.data.requestDate.substring(0, 4) + '/' + value.data.requestDate.substring(4, 6) + '/' + value.data.requestDate.substring(6, 8)
                  });
                  resolve();
                });
              });
          } else if (this.finalState) {
            return this.restService.getAll(Urls.SoldierFinalDetails_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`).then(value => {
              this.finalDetailsForm.patchValue({
                insuredAmount: this.getWithCommaSeperator(value.data.insuredAmount),
                esoldierNajaDuration: value.data.esoldierNajaDuration,
                averageWage: this.getWithCommaSeperator(value.data.averageWage),
                requestDate: value.data.requestDate.substring(0, 4) + '/' + value.data.requestDate.substring(4, 6) + '/' + value.data.requestDate.substring(6, 8)
              });
              resolve();
            });
          }
          resolve();
        })
        .catch(reason => {
          this.isEligible = false;
          reject(reason);
        });
    });
  }

  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  // Submit On Pay
  private onSend() {
    let totalTemp;
    let installmentCountTemp = '';
    if (this.firstState) {
      if (this.installmentForm.get('installmentCount').value === 1) {
        totalTemp = this.amount;
        installmentCountTemp = '1';
      } else {
        totalTemp = this.installmentForm.get('installmentPrice').value.replace(/,/g, '');
        installmentCountTemp = this.installmentForm.get('installmentCount').value;
      }
    } else if (this.middleState) {
      totalTemp = this.payableAmount;
      installmentCountTemp = this.installmentForm.get('installmentCount').value;
    }
    this._overlay = this.showOverlay();
    this.restService.getAll(`${Urls.onlinePayment_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`}?start-date=${''}&end-date=${''}&amount=${totalTemp}&installmentCount=${installmentCountTemp}&systemType=${'soldier'}`)
      .then(data => {
        if (data !== undefined && data != null) {
          this.hideOverlay(this._overlay);
          // window.open(data.data, '_self ');
          location.href = data.data;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
      });
  }

  /* Constructing Data Grid: it load in loadPageData() method*/
  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.Soldier_Installment_sso + `/${this.ssoNationalCode}/${this.ssoTicket}`)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'debitsubcode', columnCaption: 'شماره قسط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ قسط (ریال)', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'fine_AMOUNT', columnCaption: ' مبلغ مابه التفاوت (ریال)', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellFineAmountTranslator})
      .addVisibleColumn({columnName: 'payable_AMOUNT', columnCaption: 'مبلغ قابل پرداخت (ریال)', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'expdate', columnCaption: 'مهلت پرداخت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'paydate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPaymentDateTranslator})
      .addVisibleColumn({columnName: 'pay_STATUS', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPaymentTranslator})
      .setPagerCurrentPage(1)
      .setPagerSize(12)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'expdate' && item.expdate && item.expdate.length === 8) {
        const tmp = item.expdate.substr(0, 4) + '/' + item.expdate.substr(4, 2) + '/' + item.expdate.substr(6, 2);
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'paydate' && item.paydate && item.paydate.length === 8) {
        const tmp = item.paydate.substr(0, 4) + '/' + item.paydate.substr(4, 2) + '/' + item.paydate.substr(6, 2);
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'amount' && item.amount.length !== 0) {
        const tmp = this.persianNumberPipe.transform(item.amount, 'cs');
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'fine_AMOUNT' && item.fine_AMOUNT.length !== 0) {
        if (item.fine_AMOUNT === '') {
          return {handled: true, data: '-'};
        }
        const tmp = this.persianNumberPipe.transform(item.fine_AMOUNT, 'cs');
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'payable_AMOUNT' && item.payable_AMOUNT.length !== 0) {
        const tmp = this.persianNumberPipe.transform(item.payable_AMOUNT, 'cs');
        return {handled: true, data: tmp};
      }
      return {handled: false, data: ''};
    };
  }

  /* Data Grid Translator */
  gridCellFineAmountTranslator(item) {
    if (item === '0') {
      return '-';
    }
  }

  /* Data Grid Translator */
  gridCellPaymentTranslator(item) {
    switch (item) {
      case '0':
        return 'منتظر پرداخت';
      case '1':
        return 'پرداخت شده';
      default:
        return 'نامشخص';
    }
  }

  /* Data Grid Translator */
  gridCellPaymentDateTranslator(item) {
    switch (item) {
      case '':
        return '-';
      case '1':
        return item;
      default:
        return 'نامشخص';
    }
  }

  private getInstalmentDates(start: Date, count: number): string[] {
    const result = [];
    const startDate = moment(start).locale('fa');
    result.push(startDate.format('YYYY/MM/DD'));
    const startDay = startDate.date();
    startDate.date(1);

    for (let i = 1; i < count ; i++) {
      const tmp = startDate.add(1, 'months');
      tmp.date(startDay);
      result.push(tmp.format('YYYY/MM/DD'));
    }
    return result;
  }
}
