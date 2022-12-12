import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-sso-debit-installment',
  templateUrl: './sso-debit-installment.component.html',
  styleUrls: ['./sso-debit-installment.component.css']
})
export class SsoDebitInstallmentComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private requestId = null;

  initializePage() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.ErrorRequest)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'debitSubCode', columnCaption: 'شماره قسط', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'amount', columnCaption: 'مبلغ قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'expireDate', columnCaption: 'سررسید پرداخت پیش قسط', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusName})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
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

  show(serialNo: any) {
    this.dataGrid.serviceUrl = Urls.DebitInstallmetBySerial + '/' + serialNo;
    this.dataGrid.refreshData();
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

  cloaseNewHeader() {
    this.theModal.hide();
  }

}
