import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';
import {d} from '@angular/core/src/render3';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-sso-pension-account',
  templateUrl: './sso-pension-account.component.html',
  styleUrls: ['./sso-pension-account.component.css']
})
export class SsoPensionAccountComponent  extends TaminPageBaseComponent {

  @ViewChild('accountGrid') accountGrid: TaminDataGridComponent;
  nationalCode: any;
  private _overlay = null;

  initializePage() {
    // this._initializeDataGrid();

  }

  private _initializeDataGrid() {
    this.accountGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addUrl(Urls.SSO_PensionerAccount + '/' +  this.nationalCode)
      .addVisibleColumn({columnName: 'accountNumber', columnCaption: 'شماره حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bank.bankName', columnCaption: 'بانک', columnViewType: 'Label'})
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
    this.nationalCode = data.nationalCode;
    this.accountGrid.searchParams = [searchParam];
    this._initializeDataGrid();
    this.accountGrid.refreshData();
  }
}
