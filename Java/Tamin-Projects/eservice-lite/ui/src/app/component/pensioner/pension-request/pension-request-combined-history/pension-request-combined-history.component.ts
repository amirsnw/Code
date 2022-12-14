import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataColumn, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';


@Component({
  selector: 'app-pension-request-combined-history',
  templateUrl: './pension-request-combined-history.component.html',
  styleUrls: ['./pension-request-combined-history.component.css']
})


export class PensionRequestCombinedHistoryComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  historyDays: string;
  historyMonths: string;
  historyYears: string;
  sumHistoryYears: string;
  showSummary = false;
  historyObserved = false;
  private _overlay: any;
  @Output() dataLoaded = new EventEmitter<any>();

  @Input() showButtom = true;
  @Input() showDownload = true;
  loadCompleted = false;

  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.CombinedHistoryRequest)
      // .addUrl('http://172.16.13.176:7001/eservices/api/history-services/talfighinfos')
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'hisYear', columnCaption: 'سال', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth1', columnCaption: 'فروردین', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth2', columnCaption: 'اردیبهشت', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth3', columnCaption: 'خرداد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth4', columnCaption: 'تیر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth5', columnCaption: 'مرداد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth6', columnCaption: 'شهریور', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth7', columnCaption: 'مهر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth8', columnCaption: 'آبان', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth9', columnCaption: 'آذر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth10', columnCaption: 'دی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth11', columnCaption: 'بهمن', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'hisMonth12', columnCaption: 'اسفند', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'sumYear', columnCaption: 'جمع', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .setFirstLoad(true)
      .getData();

    this.dataGrid.cellStyler = (item: any, column: TaminDataColumn) => {
      if (column.columnName === 'sumYear') {
        return {
          'color': 'blue',
          'font-weight': 'bold'
        };
      }
      return {};
    };

    this.dataGrid.afterRefreshData.subscribe(() => {
      this.historyDays = this.dataGrid.dataItems[0].historyDays;
      this.historyMonths = this.dataGrid.dataItems[0].historyMonths;
      this.historyYears = this.dataGrid.dataItems[0].historyYears;
      this.sumHistoryYears = this.dataGrid.dataItems[0].sumHistoryYears;
      this.showSummary = true;
    });
  }

  backToPanelClick() {
    this.redirectTo('/pension-request');
  }
  historyObjection() {
    this.redirectTo('/objection-noexist');
  }
}
