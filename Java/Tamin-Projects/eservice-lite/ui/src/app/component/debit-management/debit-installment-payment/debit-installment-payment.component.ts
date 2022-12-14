import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-debit-installment-payment',
  templateUrl: './debit-installment-payment.component.html',
  styleUrls: ['./debit-installment-payment.component.css']
})
export class DebitInstallmentPaymentComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  debitNumber: any;
  private brchCode: any;
  paymentKey = false;
  success = false;
  haal = false;
  private overlay: any;

  /* TaminPageBaseComponent Constructor */
  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.debitNumber = this.route.snapshot.params['debitNumber'];
    this._initializetheGrid();
  }

  protected loadPageData(): void {
    this.overlay = this.showOverlay();
    this.restService.getById(Urls.InstallmentPaymentCheck, this.debitNumber)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.brchCode = value.data.branchCode;
        this.dataGrid.serviceUrl = Urls.InstallmentPaymentList + '/' + this.debitNumber + '/' + this.brchCode;
        this.dataGrid.refreshData();
        if (value.data.finishCode === '1') {
          this.success = true;
          this.paymentKey = false;
        } else {
          this.success = false;
          if (value.data.closingTime === '1') {
            this.paymentKey = false;
            this.haal = true;
          } else {
            this.paymentKey = true;
            this.haal = false;
          }
        }
        if (value.data.message !== null && value.data.message !== '') {
          this.showInfoMessageBox('توجه', value.data.message);

        }

      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('/debit-installment-follow');
          });
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/debit-installment-follow');
          });
        }
      });
  }

  private _initializetheGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.InstallmentPayment + '/' + this.debitNumber + '/' + this.brchCode)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'debitSubCode', columnCaption: 'شماره قسط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'expireDate', columnCaption: 'سررسید پرداخت پیش قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'statusDesc', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setPagerSize(10)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '-';
    }
  }


  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  onPayment() {
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.InstallmentPay + '/' + this.debitNumber)
      .then(value => {
        if (value.data.succeed === true) {
          location.href = value.data.paymentURL;
        } else {
          this.loadPageData();
        }
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
}
