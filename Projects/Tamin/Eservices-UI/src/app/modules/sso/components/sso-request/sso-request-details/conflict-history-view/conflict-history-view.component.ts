import { Component, OnInit, ViewChild } from '@angular/core';
import { DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../../../../settings/urls';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-conflict-history-view',
  templateUrl: './conflict-history-view.component.html',
  styleUrls: ['./conflict-history-view.component.css']
})
export class ConflictHistoryViewComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ObjectionConflictHistoryRequest)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'requestNo', columnCaption: 'شناسه درخواست', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branchCode', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insuranceYear', columnCaption: 'سال ', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'insuranceFName', columnCaption: 'نام ', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'insuranceLName', columnCaption: ' نام خانوادگی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'insuranceBirthDate', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellDateTranslator })
      .addVisibleColumn({ columnName: 'insuranceId', columnCaption: 'شماره بیمه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'insuranceNationalCode', columnCaption: 'کد ملی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'histotyTypeDesc', columnCaption: 'نوع بیمه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month0', columnCaption: 'سابقه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month1', columnCaption: 'فروردین', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month2', columnCaption: 'اردیبهشت', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month3', columnCaption: 'خرداد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month4', columnCaption: 'تیر', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month5', columnCaption: 'مرداد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month6', columnCaption: 'شهریور', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month7', columnCaption: 'مهر', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month8', columnCaption: 'آبان', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month9', columnCaption: 'آذر', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month10', columnCaption: 'دی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month11', columnCaption: 'بهمن', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'month12', columnCaption: 'اسفند', columnViewType: 'Label' })

      .addVisibleColumn({ columnName: 'userDesc', columnCaption: 'توضیحات کاربر', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      switch (column.columnName) {
        case 'month0':
          return { handled: true, data: `<span>موجود</span><hr/><span>جایگزین</span>` };
        case 'month1':
          return { handled: true, data: `<span>${item.month1}</span><hr/><span>${item.monthR1}</span>` };
        case 'month2':
          return { handled: true, data: `<span>${item.month2}</span><hr/><span>${item.monthR2}</span>` };
        case 'month3':
          return { handled: true, data: `<span>${item.month3}</span><hr/><span>${item.monthR3}</span>` };
        case 'month4':
          return { handled: true, data: `<span>${item.month4}</span><hr/><span>${item.monthR4}</span>` };
        case 'month5':
          return { handled: true, data: `<span>${item.month5}</span><hr/><span>${item.monthR5}</span>` };
        case 'month6':
          return { handled: true, data: `<span>${item.month6}</span><hr/><span>${item.monthR6}</span>` };
        case 'month7':
          return { handled: true, data: `<span>${item.month7}</span><hr/><span>${item.monthR7}</span>` };
        case 'month8':
          return { handled: true, data: `<span>${item.month8}</span><hr/><span>${item.monthR8}</span>` };
        case 'month9':
          return { handled: true, data: `<span>${item.month9}</span><hr/><span>${item.monthR9}</span>` };
        case 'month10':
          return { handled: true, data: `<span>${item.month10}</span><hr/><span>${item.monthR10}</span>` };
        case 'month11':
          return { handled: true, data: `<span>${item.month11}</span><hr/><span>${item.monthR11}</span>` };
        case 'month12':
          return { handled: true, data: `<span>${item.month12}</span><hr/><span>${item.monthR12}</span>` };

        default:
          return { handled: false, data: '' };
      }
      // if (column.columnName === 'month1') {
      //   return { handled: true, data: `<span>${item.month1}</span><hr/><span>${item.monthR1}</span>` };
      // }
      // return { handled: false, data: '' };
    };

    this.dataGrid.cellStyler = (item, column) => {
      return { 'text-align': 'center' };
    };
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
