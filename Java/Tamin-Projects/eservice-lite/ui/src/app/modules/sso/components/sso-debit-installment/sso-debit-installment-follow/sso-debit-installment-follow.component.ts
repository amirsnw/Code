import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-debit-installment-follow',
  templateUrl: './sso-debit-installment-follow.component.html',
  styleUrls: ['./sso-debit-installment-follow.component.css']
})
export class SsoDebitInstallmentFollowComponent extends TaminPageBaseComponent {

  @ViewChild('theGrid') theGrid: TaminDataGridComponent;
  searchParams: SearchParam[];
  workshopDebitSearchForm: FormGroup;
  private overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializetheGrid();
  }

  private _initializeFromGroupSearch() {
    this.workshopDebitSearchForm = this.fb.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  sendUserTicket() {
    const values = this.workshopDebitSearchForm.value;
    if (values.nationalCode === null || values.nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      alert('مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'debitInstallment',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso, this.searchParams)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

  onSearchSubmit() {
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    if (ticketCode === null || ticketCode === '') {
      alert('وارد نمودن کد اعتباری کارفرما الزامیست');
      return;
    } else if (nationalCode === null || nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    } else {
      this.searchParams = [];
      this.searchParams.push({
        property: 'nationalCode',
        value: nationalCode,
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'serviceName',
        value: 'debitInstallment',
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'ticketCode',
        value: ticketCode,
        operator: SearchOperator.EQ
      });
      this.theGrid.pagerCurrentPage = 1;
      this.theGrid.serviceUrl = Urls.SSO_InstallmentAll;
      this.theGrid.searchParams = this.searchParams;
      this.theGrid.dataItems = [];
      this.theGrid.refreshData().then(value => {
      }).catch(reason => {
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
    }
  }

  private _initializetheGrid() {
    this.theGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'شماره کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'letterDate', columnCaption: 'تاریخ ثبت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'installmentAmount', columnCaption: 'جمع مبالغ بدهی های انتخابی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'installmentNumber', columnCaption: 'تعداد اقساط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'تاریخ شروع بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تاریخ پایان بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'dateFirstInstallment', columnCaption: 'تاریخ اولین پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'firstInstallment', columnCaption: 'مبلغ قسط اول (ریال)', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'firstInstallmentPer', columnCaption: 'میزان پیش قسط (درصد)', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'eachInstallment', columnCaption: 'مبلغ هر قسط (ریال)', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addActionColumn({
        columnName: 'payInstallment',
        columnCaption: 'پرداخت تقسیط',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'payInstallment',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.theGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      if (item.finishCode === '1' || item.closingTime === '1') {
        const column = actionCells.find(c => c.columnActionName === 'payInstallment');
        column.columnCaption = 'مشاهده پرداخت تقسیط';
        result.push(column);
      } else {
        const column = actionCells.find(c => c.columnActionName === 'payInstallment');
        column.columnCaption = 'پرداخت تقسیط';
        result.push(actionCells.find(c => c.columnActionName === 'payInstallment'));
      }
      return result;
    };
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    switch (actionName) {
      case 'payInstallment':
        // if (param.item.closingTime.toString() === '1') {
        //   this.showInfoMessageBox('پیام سیستم', 'به علت عدم پرداخت در موعد مقرر امکان ادامه نمی باشد.', () => {
        //     return;
        //   });
        // }
        const jasonData = {
          serialNo: param.item.serialNo
        };
        if (!param.item.debitNumber) {
          this.restService.update(Urls.InstallmentUpadteDebitNumber, param.item.serialNo.toString(), jasonData)
            .then(value => {
              this.hideOverlay(this.overlay);
              if (value.data.debitNumber !== null && value.data.debitNumber !== '') {
                this.redirectTo('sso/debit-installment-payment/' + value.data.debitNumber.toString() + '/' + nationalCode + '/' + ticketCode);
              } else {
                alert('شماره تقسیط نامه تخصیص نیافته است، چند لحظه دیگر دوباره تلاش کنید.');
              }
            })
            .catch(reason => {
              this.hideOverlay(this.overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        } else {
          this.redirectTo('sso/debit-installment-payment/' + param.item.debitNumber.toString() + '/' + nationalCode + '/' + ticketCode);
        }
        break;
    }
  }
}
