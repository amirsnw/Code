import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  protected initializePage() {
    this.initializeDataGrid();
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.listRecord)
      .setShowPager(true)
      .addSortParam({
        property: 'id',
        direction: 'DESC'
      })
      .setFirstLoad(true)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'workshopCode', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workshopTitle', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'year', columnCaption: 'سال', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month', columnCaption: 'ماه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addActionColumn({
          columnName: 'view',
          columnCaption: 'مشاهده ریز اطلاعات',
          columnViewType: 'Button',
          columnActionName: 'view',
          columnIconUrl: '',
          icon: '',
          visible: true, enable: true
        }
      )
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  onShowDetails(data) {
    debugger;
    const id = data.item.id;
    this.redirectTo('il/online-list-details/' + id);
  }
}
