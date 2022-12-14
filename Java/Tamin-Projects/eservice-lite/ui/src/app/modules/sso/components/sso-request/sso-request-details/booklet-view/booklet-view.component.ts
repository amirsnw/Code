import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-booklet-view',
  templateUrl: './booklet-view.component.html',
  styleUrls: ['./booklet-view.component.css']
})
export class BookletViewComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BookletElectronicRequest + '/sso')
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'id', columnCaption: 'شناسه درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'bookletSsn', columnCaption: 'نام و نام خانوادگی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellNameTranslator})
      .addVisibleColumn({columnName: 'bookletSsn.insuranceId', columnCaption: 'شماره بیمه', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'requestType',
        columnCaption: 'نوع درخواست',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellRequestTypeTranslator, columnStyle: this.gridCellRequestTypeStyle
      })
      .addVisibleColumn({columnName: 'requestCreationTime', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'branchCreationTime', columnCaption: 'تاریخ صدور', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'recieveTime', columnCaption: 'تاریخ دریافت', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'printStatus', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPrintStatusTranslator})
      .addVisibleColumn({columnName: 'organization.organizationName', columnCaption: 'واحد صادر کننده', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'price', columnCaption: 'هزینه ارسال', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'user', columnCaption: 'کاربر', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      // .addVisibleColumn({columnName: 'createdBy', columnCaption: 'کاربر', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'recieveType', columnCaption: 'نحوه دریافت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellRecieveTypeTranslator})
      .addVisibleColumn({columnName: 'errorDescription', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
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
    searchParam.property = 'id';
    this.dataGrid.searchParams = [];
    this.changeDetectorRef.detectChanges();
    this.dataGrid.searchParams = [searchParam];
    this.dataGrid.refreshData();
  }

  gridCellUserTranslator(item) {
    if (item !== null && item !== '') {
      return `${item.firstName} - ${item.lastName}`;
    } else {
      return '';
    }
  }

  gridCellNameTranslator(item) {
    return `${item.firstName} - ${item.lastName}`;
  }

  gridCellRecieveTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'حضوری';
      case '2':
        return 'پیک';
      default :
        return item;
    }
  }

  gridCellRequestTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'اولین بار';
      case '2':
        return 'تجدید';
      // case '3':
      //   return 'المثنی';
      case '4':
        return 'تامین اعتبار';
      default:
        return 'نامشخص';
    }
  }

  gridCellRequestTypeStyle(item) {
    switch (item) {
      case '1':
        return {'color': 'grey'};
      case '2':
        return {'color': 'red'};
      case '3':
        return {'color': 'blue'};
      case '4':
        return {'color': 'purple'};
    }
  }

  gridCellPrintStatusTranslator(item) {
    switch (item) {
      case '0':
        return 'ثبت درخواست';
      case '1':
        return 'صف چاپ';
      case '2':
        return 'چاپ شده';
      case '3':
        return 'بازگشت درخواست';
      case '4':
        return 'تحویل درخواست';
      default :
        return item;
    }
  }

}
