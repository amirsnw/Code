import {Component, ElementRef , OnInit} from '@angular/core';
import {DataColumnViewType, SearchOperator , SearchParam , GenericRestService , TaminFieldAutoCompleteDataGridComponent , TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder} from '@angular/forms';
import {FormGroup , Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import { Urls } from 'src/app/settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pension-inquiry-list',
  templateUrl: './pension-inquiry-list.component.html',
  styleUrls: ['./pension-inquiry-list.component.css']
})
export class PensionInquiryListComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  private _overlay: any;
  loadCompleted = false;
  private nationalCode: string;


  public theForm: FormGroup;
  searchParams: SearchParam[];
  private _subscription = new Subscription();

  private createForm() {
    this.theForm = this.formBuilder.group({
      nationalId: ['', []],
    });
  }


  initializePage() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.GOVERNMENT_PENSION_INQUIRY + '/gov' )
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'نام واحد سازمانی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'fullName', columnCaption: 'نام و نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerId', columnCaption: 'شماره مستمری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceNumber', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerRisuid', columnCaption: 'شماره بیمه فرد اصلی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerType', columnCaption: 'نوع حکم',  columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPensionTypeTranslator})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerBaseBate', columnCaption: 'تاریخ برقراری مستمری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'statusDesc', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator})
      .setShowActionColumn(false)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }

  gridCellStatusTranslator(item) {
    if ( item !== null && item === '00' ) {
      return 'فرد مورد نظر ،مستمری بگیر سازمان تامین اجتماعی نمی باشد';
    } else if (item !== null && item === '01') {
      return 'فرد مورد نظر ،مستمری بگیر فعال سازمان تامین اجتماعی می باشد';
    } else if (item !== null && item === '02') {
      return 'فرد مورد نظر ،در حال حاضر مستمری بگیر فعال سازمان تامین اجتماعی نمی باشد';
    }
  }

  gridCellPensionTypeTranslator(item) {
    debugger;
    if ( item !== null && item.toString().substring(0, 1) === '1' ) {
      return 'بازنشستگی';
    } else if (item !== null && item.toString().substring(0, 1) === '2') {
      return 'ازکارافتادگی';
    } else if (item !== null && item.toString().substring(0, 1) === '3') {
      return 'فوتی';
    }
  }
  onSearch() {
    this.dataGrid.refreshData();
  }

  gridCellRequestTypeStyle(item) {
    if (item !== '-') {
      return {'background-color': 'green'};
    }
  }


  loadData(param: any) {
    debugger;
    this.searchParams = [];
    this.nationalCode = param.nationalCode;
    this.searchParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });

    return new Promise((resolve, reject) => {
      this._overlay = this.showOverlay();
      this.loadCompleted = false;
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

  onReportForm() {
    this._overlay = this.showOverlay();
    this.restService
      .getBlob(Urls.GOVERNMENT_PENSION_INQUIRY + '/report/' + this.nationalCode )
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'pension_inquiry_' + this.getPersianDate(new Date()) + '.pdf';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

}
