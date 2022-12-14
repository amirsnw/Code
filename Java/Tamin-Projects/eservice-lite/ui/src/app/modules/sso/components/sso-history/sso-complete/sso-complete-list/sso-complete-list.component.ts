import {Component, ElementRef, ViewChild} from '@angular/core';
import {Urls} from '../../../../../../settings/urls';
import {DataColumnViewType, SearchParam , SearchOperator ,  TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../../../../settings/app-helper';
import {CordovaHelper} from '../../../../../../helpers/cordova-helper';

declare var alertify: any;

@Component({
  selector: 'app-sso-complete-list',
  templateUrl: './sso-complete-list.component.html',
  styleUrls: ['./sso-complete-list.component.css']
})

export class SsoCompleteListComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('pdfViewer') pdfViewer: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  private _overlay: any;
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
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'year', columnCaption: 'سال', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'historyTypeName', columnCaption: 'نوع سابقه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'branchname', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workShopCode', columnCaption: 'شماره کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workShopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month1', columnCaption: 'فروردین', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month2', columnCaption: 'اردیبهشت', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month3', columnCaption: 'خرداد', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month4', columnCaption: 'تیر', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month5', columnCaption: 'مرداد', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month6', columnCaption: 'شهریور', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month7', columnCaption: 'مهر', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month8', columnCaption: 'آبان', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month9', columnCaption: 'آذر', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month10', columnCaption: 'دی', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month11', columnCaption: 'بهمن', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'month12', columnCaption: 'اسفند', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
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
      this.dataGrid.serviceUrl = Urls.HistoryRequestAdmin;
      this.dataGrid.searchParams = this.searchParams;
      this.dataGrid
        .refreshData()
        .then(value => {
          this.hideOverlay(this._overlay);
          this.loadCompleted = true;
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject(reason);
        });
    });
  }

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }
}
