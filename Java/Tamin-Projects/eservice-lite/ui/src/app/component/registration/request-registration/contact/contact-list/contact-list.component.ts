import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from "tamin-framework";
import {Urls} from "../../../../../settings/urls";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent extends TaminPageBaseComponent {
@ViewChild('contactGrid') contactGrid: TaminDataGridComponent;

  initializePage() {
    this._initializeDataGrid();
  }

private _initializeDataGrid() {
    this.contactGrid.configuration = (new TaminDataGridConfigurationFactory())
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
