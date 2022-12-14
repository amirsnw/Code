import {Component, ComponentFactoryResolver, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-debit-online-payment-follow',
  templateUrl: './debit-online-payment-follow.component.html',
  styleUrls: ['./debit-online-payment-follow.component.css']
})
export class DebitOnlinePaymentFollowComponent extends TaminPageBaseComponent {

  @ViewChild('theGrid') theGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  private overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }


  initializePage() {
    this._initializeFromGroupSearch();
    this._initializetheGrid();
  }

  private _initializeFromGroupSearch() {
    this.searchForm = this.fb.group({
      debitNumber: [''],
      paymentDate: ['']
    });
  }

  protected loadPageData(): void {
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.OnlinePayCheck)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.theGrid.serviceUrl = Urls.DebitOnlinePaymentAll;
        this.theGrid.refreshData();
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('/');
          });
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/');
          });
        }
      });
  }

  private _initializetheGrid() {
    this.theGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.DebitOnlinePaymentAll)
      .setShowPager(true)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitSubCode', columnCaption: 'شماره قسط', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'expireDate', columnCaption: 'مهلت پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'discount', columnCaption: 'مبلغ تخفیف', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusName})
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
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'viewPayment':
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
    }
  }

  loadPdf(data) {
    return new Promise<void>((resolve, reject) => {
      if (data.item.serialNo) {
        this.restService.getBlob(Urls.OnlinePaymentView + '/' + data.item.workshopId + '/' + data.item.branchCode + '/' + data.item.debitNumber + '/' + data.item.debitSubCode)
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

  gridCellStatusName(item) {
    switch (item) {
      case '0':
        return 'عدم پرداخت';
      case '1':
        return 'تایید پرداخت';
    }
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '';
    }
  }


  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const values = this.searchForm.getRawValue();
    if (values.debitNumber) {
      this.searchParams.push({
        property: 'debitNumber',
        value: values.debitNumber,
        operator: SearchOperator.EQ
      });
    }
    if (values.paymentDate) {
      this.searchParams.push({
        property: 'paymentDate',
        value: this.getPersianDate(values.paymentDate).replace('/', '').replace('/', ''),
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
