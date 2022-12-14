import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ObjectionDetailComponent} from '../../objection/objection-detail/objection-detail.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-debit-installment-follow',
  templateUrl: './debit-installment-follow.component.html',
  styleUrls: ['./debit-installment-follow.component.css']
})
export class DebitInstallmentFollowComponent extends TaminPageBaseComponent {

  @ViewChild('theGrid') theGrid: TaminDataGridComponent;
  @ViewChild('paidGrid') paidGrid: TaminDataGridComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('objectionDetail') objectionDetail: ObjectionDetailComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('container', {read: ViewContainerRef}) container;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  private overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }


  initializePage() {
    this._initializeFromGroupSearch();
    this._initializetheGrid();
    this._initializePaidGrid();
  }

  private _initializeFromGroupSearch() {
    this.searchForm = this.fb.group({
      workshopId: [''],
      letterDate: ['']
    });
  }


  private _initializetheGrid() {
    this.theGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.InstallmentAll)
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
        columnName: 'viewInstallment',
        columnCaption: 'مشاهده درخواست تقسیط',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewInstallment',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
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
      result.push(actionCells.find(c => c.columnActionName === 'viewInstallment'));
      return result;
    };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'viewInstallment':
        this.overlay = this.showOverlay();
        this.loadPdf(param)
          .then(value => {
            this.hideOverlay(this.overlay);
            this.theModal.show();
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
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
                this.redirectTo('/debit-installment-payment/' + value.data.debitNumber.toString());
              } else {
                alert('شماره تقسیط نامه تخصیص نیافته است، چند لحظه دیگر دوباره تلاش کنید.');
              }
            })
            .catch(reason => {
              this.hideOverlay(this.overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        } else {
          this.redirectTo('/debit-installment-payment/' + param.item.debitNumber.toString());
        }
        break;
    }
  }

  loadPdf(data) {
    return new Promise<void>((resolve, reject) => {
      if (data.item.serialNo) {
        const pdfUrl = `${Urls.InstallmentReports}/installment/${data.item.serialNo}`;
        this.restService.getBlob(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
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

  clickGridItem(param: any) {
    this.paidGrid.serviceUrl = Urls.PaidInstallment + '/' + param.serialNo;
    this.paidGrid.refreshData();
  }

  private _initializePaidGrid() {
    this.paidGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitSubCode', columnCaption: 'شماره قسط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'expireDate', columnCaption: 'سررسید پرداخت پیش قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addActionColumn({
        columnName: 'viewPayment',
        columnCaption: 'مشاهده رسید پرداخت',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewPayment',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setShowActionColumn(true)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onPaidGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'viewPayment':
        this.overlay = this.showOverlay();
        this.loadPaidPdf(param)
          .then(value => {
            this.hideOverlay(this.overlay);
            this.theModal.show();
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  loadPaidPdf(data) {
    return new Promise<void>((resolve, reject) => {
      if (data.item.debitNumber) {
        this.restService.getBlob(Urls.InstallmentPaymentView + '/' + data.item.debitInstallment.workshopId + '/' + data.item.debitInstallment.branchCode + '/' + data.item.debitNumber + '/' + data.item.debitSubCode)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const values = this.searchForm.getRawValue();
    if (values.workshopId) {
      this.searchParams.push({
        property: 'workshopId',
        value: values.workshopId,
        operator: SearchOperator.EQ
      });
    }
    if (values.letterDate) {
      this.searchParams.push({
        property: 'letterDate',
        value: this.getPersianDate(values.letterDate).replace('/', '').replace('/', ''),
        operator: SearchOperator.EQ
      });
    }
    this.theGrid.pagerCurrentPage = 1;
    this.theGrid.searchParams = this.searchParams;
    this.theGrid.refreshData();
  }

  resetSerachForm() {
    this.searchParams = new Array<SearchParam>();
    this.theGrid.searchParams = this.searchParams;
    this.theGrid.refreshData();
    this.searchForm.reset();
  }
}
