import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent extends TaminPageBaseComponent {
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
      .setFirstLoad(true)
      .addUrl(Urls.MasterAccount)
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


}
