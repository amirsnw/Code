import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-sso-penalty-relief',
  templateUrl: './sso-penalty-relief.component.html',
  styleUrls: ['./sso-penalty-relief.component.css']
})
export class SsoPenaltyReliefComponent extends TaminPageBaseComponent {
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
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'insurance', columnCaption: 'حق بیمه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'unemploy', columnCaption: 'بیمه بیکاری', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'penalty', columnCaption: 'جریمه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'other', columnCaption: 'سایر', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: DataColumnViewType.Label})
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
    this.dataGrid.serviceUrl = Urls.GetPenaltyReliefDebits + '/' + serialNo;
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
