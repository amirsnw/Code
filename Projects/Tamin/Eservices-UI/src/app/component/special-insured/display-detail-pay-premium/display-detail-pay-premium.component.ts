import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, DataColumnViewType, SearchParam, SearchOperator, } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-detail-pay-premium',
  templateUrl: './display-detail-pay-premium.component.html',
  styleUrls: ['./display-detail-pay-premium.component.css']
})
export class DisplayDetailPayPremiumComponent extends TaminPageBaseComponent {
  @ViewChild('detailPayPremium') detailPayPremium: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  public searchParams: SearchParam[];
  public startDate: string;
  public endDate: string;

  initializePage() {
    this.detailPayPremium.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .addVisibleColumn({ columnName: '0', columnCaption: 'سال', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert1 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'ماه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert2 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'روز', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert3 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'دستمزد',  columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert4 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'مبلغ بدهی ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert5 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'شرح بدهی ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert6 })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  show(startDate: any, endDate: any) {

    this.theModal.width = '60%';
    this.theModal.title = ` مشاهده جزئیات برگ پرداخت در بازه تاریخ ${this.convertTimeStampToPersianDate(startDate)} تا  ${this.convertTimeStampToPersianDate(endDate)}`;
    this.theModal.show();

    this.detailPayPremium.pagerCurrentPage = 1;
    this.detailPayPremium.serviceUrl = `${Urls.detailPayPremium}?start-date=${startDate}&end-date=${endDate}`;
    // this.detailPayPremium.searchParams = this.searchParams;
    this.detailPayPremium.dataItems = [];
    this.detailPayPremium.refreshData();
  }

  convertTimeStampToPersianDate(timeStamp: any) {
    return this.getPersianDate(new Date(timeStamp));
  }
  getPersianCurrency(price: any) {
    if (price != null) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  hide() {
    this.theModal.hide();
  }
  gridDateConvert1(item) {
    return item[0];
  }
  gridDateConvert2(item) {
    return item[1];
  }
  gridDateConvert3(item) {
    return item[2];
  }
  gridDateConvert6(item) {
    return item[3];
  }
  gridDateConvert4(item) {
    return  item[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
  }
  gridDateConvert5(item) {
    return item[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
  }
}
