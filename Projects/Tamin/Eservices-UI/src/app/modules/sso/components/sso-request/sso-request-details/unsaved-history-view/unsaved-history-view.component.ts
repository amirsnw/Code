import { Component, OnInit, ViewChild } from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-unsaved-history-view',
  templateUrl: './unsaved-history-view.component.html',
  styleUrls: ['./unsaved-history-view.component.css']
})
export class UnsavedHistoryViewComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ObjectionUnsavedHistoryRequest)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'requestNo', columnCaption: 'شناسه درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchCode', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceFName', columnCaption: 'نام ',  columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceLName', columnCaption: ' نام خانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceBirthDate', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.Custom , columnTranslator: this.gridCellDateTranslator})
      .addVisibleColumn({columnName: 'insuranceId', columnCaption: 'شماره بیمه',  columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceNationalCode', columnCaption: 'کد ملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceTypeCode', columnCaption: 'نوع بیمه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'تاریخ شروع دوره', columnViewType: DataColumnViewType.Custom , columnTranslator: this.gridCellDateTranslator})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'تاریخ پایان دوره', columnViewType: DataColumnViewType.Custom , columnTranslator: this.gridCellDateTranslator})
      .addVisibleColumn({columnName: 'userDesc', columnCaption: 'توضیحات کاربر', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  open(id) {
    this.theModal.show();
    const searchParam = new SearchParam();
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'requestNo';
    this.dataGrid.searchParams = [];
    this.changeDetectorRef.detectChanges();
    this.dataGrid.searchParams = [searchParam];
    this.dataGrid.refreshData();
  }

   gridCellDateTranslator(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
   }

}
