import {Component, ElementRef, ViewChild} from '@angular/core';
import {Urls} from '../../../../settings/urls';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {AppHelper} from '../../../../settings/app-helper';
import {CordovaHelper} from '../../../../helpers/cordova-helper';

declare var alertify: any;

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})

export class HistoryListComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('pdfViewer') pdfViewer: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  private _overlay: any;
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
      .setFirstLoad(false)
      .getData();
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this._overlay = this.showOverlay(this.panel.nativeElement);
      this.dataGrid.serviceUrl = Urls.HistoryRequest;
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

  downloadPdf() {
    if (AppHelper.isWeb()) {
      this.downloadPdfDesktop();
    } else {
      this.downloadPdfMobile();
    }
  }

  downloadPdfMobile() {
    this._overlay = this.showOverlay();
    this.restService.getBlob(Urls.downloadHistory).then(value => {
      this.hideOverlay(this._overlay);
      const fileName = 'sabeghe_' + (new Date()).getTime().toString() + '.pdf';
      CordovaHelper.savePdf(fileName, value)
        .then(value1 => {
          const message = '<p>بارگذاری با موفقیت انجام شد و فایل در شاخه Downloads ذخیره شد.</p>';
          alertify.confirm('پیام سیستم', message, () => {
            CordovaHelper.openPdf(fileName);
          }, () => {
          }).set({labels: {ok: 'رویت', cancel: 'تایید'}, padding: false});
        })
        .catch(reason => {
          console.log(reason);
          this.showErrorMessageBox('پیام سیستم', 'سیستم قادر به ذخیره فایل نمی باشد.');
        });
    }).catch(reason => {
      this.hideOverlay(this._overlay);
      console.log(reason);
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });
  }


  downloadPdfDesktop() {
    this._overlay = this.showOverlay();
    this.restService.getBlob(Urls.downloadHistory).then(value => {
      this.hideOverlay(this._overlay);
      const a = document.createElement('a'),
        url = URL.createObjectURL(value);
      a.href = url;
      a.download = 'sabeghe_' + this.getPersianDate(new Date()) + '.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }).catch(reason => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });
  }

  sendToInbox() {
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.HistorySendToEblagh, null, null, {type: '1'})
      .then(value => {
        this.hideOverlay(this._overlay);
        if (value) {
          this.showInfoMessageBox('پیام مسیستم', 'ارسال سابقه با موفقیت انجام شد');
        } else {
          this.showErrorMessageBox('پیام مسیستم', this.constants.getNetworkErrorMessage());
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام مسیستم', this.constants.getNetworkErrorMessage());
      });

  }

  showPdf() {
    this._overlay = this.showOverlay();
    this.restService.getBlob(Urls.downloadHistory).then(value => {
      this.hideOverlay(this._overlay);
      this.pdfViewer.show();
      this.documentViewer.loadPdfBased64(URL.createObjectURL(value));
      // const a = document.createElement('a'),
      //   url = URL.createObjectURL(value);
      // a.href = url;
      // a.download = 'sabeghe_' + this.getPersianDate(new Date()) + '.pdf';
      // document.body.appendChild(a);
      // a.click();
      // setTimeout(function () {
      //   document.body.removeChild(a);
      //   window.URL.revokeObjectURL(url);
      // }, 0);
    }).catch(reason => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });


    // @ViewChild('pdfViewer') pdfViewer: TaminModalComponent;
    // @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;

  }
}
