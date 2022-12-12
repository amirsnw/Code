import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Urls} from    '../../../../../../settings/urls';
import {StpUrls} from '../../../../../stp/stp-urls';

@Component({
  selector: 'app-request-result-new',
  templateUrl: './request-result-new.component.html',
  styleUrls: ['./request-result-new.component.css']
})
export class RequestResultNewComponent extends TaminPageBaseComponent{

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {

  }

  protected loadPageData(): void {
    this._initializeDataGrid();
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.dataGrid.serviceUrl = `${StpUrls.STP_PROCESS_DATA}/${id}`;
        this.dataGrid.refreshData();
      }
    });
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.STP_PROCESS_DATA)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'date_acc', columnCaption: 'تاریخ رسیدگی توسط شعبه', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'rejectReson', columnCaption: 'علت رد درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'process_result', columnCaption: 'نتیجه اقدامات انجام شده', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('')
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

}
