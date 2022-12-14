import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-pension-account',
  templateUrl: './pension-account.component.html',
  styleUrls: ['./pension-account.component.css']
})
export class PensionAccountComponent extends TaminPageBaseComponent {

  @ViewChild('accountGrid') accountGrid: TaminDataGridComponent;

  private _overlay = null;

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
      .addUrl(Urls.PensionerAccount)
      .addVisibleColumn({columnName: 'accountNumber', columnCaption: 'شماره حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bank', columnCaption: 'بانک', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dateOfStart', columnCaption: 'تاریخ شروع', columnViewType: DataColumnViewType.PersianDate})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData(data) {
    this.accountGrid.searchParams = [];
    const searchParam = new SearchParam();
    searchParam.operator = SearchOperator.EQ;
    searchParam.value = data.pensionerId;
    searchParam.property = 'pensionerId';

    this.accountGrid.searchParams = [searchParam];
    this.accountGrid.refreshData();

  }
}
