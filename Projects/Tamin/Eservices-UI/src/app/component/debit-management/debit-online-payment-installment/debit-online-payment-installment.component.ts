import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-debit-online-payment-installment',
  templateUrl: './debit-online-payment-installment.component.html',
  styleUrls: ['./debit-online-payment-installment.component.css']
})
export class DebitOnlinePaymentInstallmentComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  debitNumber: any;
  branchCode: any;

  private overlay: any;

  /* TaminPageBaseComponent Constructor */
  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.debitNumber = this.route.snapshot.params['debitNumber'];
    this.branchCode = this.route.snapshot.params['brchCode'];
    this._initializetheGrid();
  }

  private _initializetheGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.OnlineInstallmentList + '/' + this.debitNumber + '/' + this.branchCode)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'debitSubCode', columnCaption: 'شماره قسط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'expireDate', columnCaption: 'تاریخ سر رسید', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'statusDesc', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'lastFishAmount', columnCaption: 'مبلغ آخرین پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(true)
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
    this.restService.getAll(Urls.OnlineInstallmentPay + '/' + this.debitNumber + '/' + this.branchCode)
      .then(value => {
        if (value.data.succeed === true) {
          location.href = value.data.paymentURL;
        } else {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('توجه', value.data.responseMessage);
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
