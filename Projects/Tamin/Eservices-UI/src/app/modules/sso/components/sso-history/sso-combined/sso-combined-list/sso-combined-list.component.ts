import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchParam , SearchOperator , TaminDataColumn, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';


@Component({
  selector: 'app-sso-combined-list',
  templateUrl: './sso-combined-list.component.html',
  styleUrls: ['./sso-combined-list.component.css']
})


export class SsoCombinedListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  historyDays: string;
  historyMonths: string;
  historyYears: string;
  sumHistoryYears: string;
  showSummary = false;
  private _overlay: any;
  @Output() dataLoaded = new EventEmitter<any>();

  @Input() showButtom = true;
  @Input() showDownload = true;
  loadCompleted = false;
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
      this.loadCompleted = false;
      this._overlay = this.showOverlay(this.panel.nativeElement);
      this.showSummary = false;
      this.dataGrid.serviceUrl = Urls.CombinedHistoryRequestAdmin;
      this.dataGrid.searchParams = this.searchParams;
      this.dataGrid.refreshData().then(value => {
        this.loadCompleted = true;
        this.hideOverlay(this._overlay);
        this.dataLoaded.emit();
      }).catch(reason => {
        this.hideOverlay(this._overlay);
      });
    });
  }

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }

}
