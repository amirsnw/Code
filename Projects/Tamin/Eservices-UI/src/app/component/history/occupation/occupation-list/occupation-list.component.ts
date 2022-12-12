import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css']
})

export class OccupationListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.OccupationRequest)
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
      .setFirstLoad(false)
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'startDate' && item.startDate && item.startDate.length === 6) {
        const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
        return {handled: true, data: tmp};
      }
      return {handled: false, data: ''};
    };
  }

  loadData() {
    return new Promise((resolve, reject) => {
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
    this.redirectTo('/');
  }
}
