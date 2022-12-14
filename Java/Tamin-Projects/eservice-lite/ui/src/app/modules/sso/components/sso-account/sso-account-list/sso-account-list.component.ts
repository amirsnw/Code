import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from "tamin-framework";
import {Urls} from "../../../../../settings/urls";

@Component({
  selector: 'app-sso-account-list',
  templateUrl: './sso-account-list.component.html',
  styleUrls: ['./sso-account-list.component.css']
})
export class SsoAccountListComponent extends TaminPageBaseComponent {
  @ViewChild('accountGrid') accountGrid: TaminDataGridComponent;

  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.accountGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addUrl(Urls.MasterAccount + '/sso')
      .addVisibleColumn({columnName: 'accountNumber', columnCaption: 'شماره حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bank.bankName', columnCaption: 'بانک', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'accounttype.accountName', columnCaption: 'نوع حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dateOfStart', columnCaption: 'تاریخ شروع', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'dateOfFinish', columnCaption: 'تاریخ پایان', columnViewType: DataColumnViewType.PersianDate})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  search(filter) {
    this.accountGrid.searchParams = filter;
    this.accountGrid.pagerCurrentPage = 1;
    this.accountGrid.refreshData();
  }

}
