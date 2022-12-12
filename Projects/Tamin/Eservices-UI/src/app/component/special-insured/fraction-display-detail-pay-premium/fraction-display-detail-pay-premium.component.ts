import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, DataColumnViewType, SearchParam, SearchOperator, } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fraction-display-detail-pay-premium',
  templateUrl: './fraction-display-detail-pay-premium.component.html',
  styleUrls: ['./fraction-display-detail-pay-premium.component.css']
})
export class FractionDisplayDetailPayPremiumComponent extends TaminPageBaseComponent {
  @ViewChild('detailPayPremium') detailPayPremium: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  public searchParams: SearchParam[];
  public startDate: string;
  public endDate: string;

  initializePage() {
    this.detailPayPremium.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({ columnName: '0', columnCaption: 'سال', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert1 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'ماه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert2 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'روزهای سابقه خریداری شده', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert3 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'دستمزد', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert4 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'مبلغ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert5 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'شرح', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert6 })
      .setPagerCurrentPage(1)
      .setPagerSize(24)
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
    this.theModal.title = ` مشاهده جزئیات پرداخت در بازه تاریخ ${startDate} تا  ${endDate}`;
    this.theModal.show();

    this.detailPayPremium.pagerCurrentPage = 1;
    this.detailPayPremium.serviceUrl = `${Urls.fractiondetailPayPremium}?start-date=${startDate.replaceAll('/','')}&end-date=${endDate.replaceAll('/','')}`;
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
    if (item[4] != null)
      return item[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    else return item[4];
  }
  gridDateConvert5(item) {
    if (item[5] != null)
      return item[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    else return item[5];
  }
}
