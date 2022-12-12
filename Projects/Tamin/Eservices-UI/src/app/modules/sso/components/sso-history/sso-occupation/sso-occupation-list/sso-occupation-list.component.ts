import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchParam , SearchOperator ,  TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-occupation-list',
  templateUrl: './sso-occupation-list.component.html',
  styleUrls: ['./sso-occupation-list.component.css']
})

export class SsoOccupationListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  searchParams: SearchParam[];
  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.OccupationRequestAdmin)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'risuid', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'تاریخ شروع', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'jobDesc', columnCaption: 'عنوان شغلی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'rwshId', columnCaption: 'شماره کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'rwshName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
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
      if (column.columnName === 'startDate' && item.startDate && item.startDate.length === 6) {
        const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
        return {handled: true, data: tmp};
      }
      return {handled: false, data: ''};
    };
  }

  loadData(param: any) {
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'ticketCode',
      value: param.ticketCode,
      operator: SearchOperator.EQ
    });
    return new Promise((resolve, reject) => {
      this.dataGrid.searchParams = this.searchParams;
      this.dataGrid.refreshData()
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });

  }

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }
}
