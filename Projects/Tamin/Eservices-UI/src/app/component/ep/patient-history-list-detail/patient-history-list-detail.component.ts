import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  PersianNumberPipe,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminModalComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-patient-history-list-detail',
  templateUrl: './patient-history-list-detail.component.html',
  styleUrls: ['./patient-history-list-detail.component.css']
})
export class PatientHistoryListDetailComponent extends TaminPageBaseComponent  {
  @ViewChild('dataGridDetail') dataGridDetail: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  private _overlay: any;
  items: any;
  headSsoPayment: number;
  headInsuPayment: number;
  requestPrice: number;
  open(id,patientID) {
    this.theModal.show();
    this.dataGridDetail.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'serviceName', columnCaption: 'نام خدمت / دارو',  columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'srvQty', columnCaption: 'تعداد تجویزی',columnWidth : 10, columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'drugInstruction', columnCaption: 'دستور مصرف', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'regdate',columnCaption: 'تاریخ اقدام',columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'ssoPayment', columnCaption: 'سهم بیمار' ,columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'insuPayment', columnCaption: 'سهم سازمان',columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'sumPriceItem', columnCaption: 'جمع کل',columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'deliveredNo',columnStyle :'center', columnCaption: 'تعداد دریافتی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'userName', columnCaption: 'داروخانه/پاراکلینیک', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('')
      .addUrl(Urls.PATIENT_HISTORY + '/detail' + '/' + id + '/'+ patientID)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setShowActionColumn(false)
      .setViewType('GridView')
      .getData();

    this.dataGridDetail.cellStyler = (item, column) => {
      if (column.columnName === 'srvQty' || column.columnName === 'deliveredNo') {
        return {'text-align': 'center'};
      }
    };

    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.PATIENT_HISTORY + '/price' + '/' + id + '/'+ patientID)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.items = result.data.list[0];
        this.items = result.data.list[0];

        this.headSsoPayment = this.items.headSsoPayment;
        this.headInsuPayment = this.items.headInsuPayment;
        this.requestPrice = this.items.requestPrice;

        if (result.data.list.length === 0) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعاتی برای نمایش وجود ندارد');
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error.data !== null && reason.error.data.cause === ('TaminClientException')) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {

          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
    this.dataGridDetail.pagerCurrentPage = 1;
    this.changeDetectorRef.detectChanges();
    this.dataGridDetail.refreshData();
  }
  getWithCommaSeperator(item) {
    const persianNumber = new PersianNumberPipe();
    if (item != null) {
      return persianNumber.transform(item.toString(), 'cs');
    } else {
      return this.getPersianNumber('0');
    }
  }
  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

}
