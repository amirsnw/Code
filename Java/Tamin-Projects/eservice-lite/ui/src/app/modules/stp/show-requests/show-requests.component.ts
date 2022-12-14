import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../settings/urls';
import {FormGroup} from '@angular/forms';
import {reject, resolve} from 'q';
import {StpUrls} from '../stp-urls';

declare var alertify: any;

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.css']
})
export class ShowRequestsComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private _overlay: any;
  selectedItem: any;
  calculateDataForm: FormGroup;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  protected initializePage(): void {
    this.calculateDataForm = this.formBuilder.group({
      nationalId: [''],
      insuranceNumber: [''],
      firstName: [''],
      lastName: [''],
    });
    this.initializeDataGrid();
  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    const theUrl = `${StpUrls.STP_All_Requests}`;
    const me = this;
    this.restService.getAll(theUrl)
      .then(value => {
        this.hideOverlay(this._overlay);
        if (value === undefined || value === null || value.data === undefined || value.data === null || value.data.list[0] === undefined || value.data.list[0] === null) {
          alertify.alert('پیام سیستم', 'کاربر گرامی، درخواست حمایت کوتاه مدتی تاکنون برای شما ثبت نشده است.');
          reject(false);
        } else {
          resolve(true);
          me.calculateDataForm.get('nationalId').setValue(value.data.list[0].nationalId);
          me.calculateDataForm.get('insuranceNumber').setValue(value.data.list[0].risuid);
          me.calculateDataForm.get('firstName').setValue(value.data.list[0].firstName);
          me.calculateDataForm.get('lastName').setValue(value.data.list[0].lastName);
        }
      }).catch(error => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', error.error.data.message);
    });
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(StpUrls.STP_All_Requests)
      // .addSearchParam(searchParam)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'payReciever', columnCaption: 'دریافت کننده وجه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'reqHelptype', columnCaption: 'نوع تعهد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'reqDescStep', columnCaption: 'مرحله درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sDate', columnCaption: 'تاریخ شروع سند', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'eDate', columnCaption: 'تاریخ پایان سند', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      .addVisibleColumn({columnName: 'docDate', columnCaption: 'تاریخ صدور سند', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      .addVisibleColumn({columnName: 'accountNo', columnCaption: 'شماره حساب', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'bankName', columnCaption: 'بانک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'faniConfDesc', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'acceptDate', columnCaption: 'تاریخ چک', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      .addVisibleColumn({columnName: 'sendDate', columnCaption: 'تاریخ ارسال به مالی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(true)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  gridCellUserTranslator(item) {
    if (item !== undefined && item !== null && item !== '' && item.trim() !== '') {
      return `${item.toString().substring(0, 4)}/${item.toString().substring(4, 6)}/${item.toString().substring(6, 8)} `;
    } else {
      return '';
    }
  }

  backToPanelClick() {
    this.redirectTo('/main');
  }
}
