import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminDocumentViewerModalComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {HttpClient} from '@angular/common/http';
import {FormGroup, Validators} from '@angular/forms';
import {reject, resolve} from 'q';
import {Urls} from '../../../../settings/urls';
import {sanitizeHtml} from '@angular/core/src/sanitization/sanitization';

declare var alertify: any;

@Component({
  selector: 'app-sso-inspection',
  templateUrl: './sso-inspection.component.html',
  styleUrls: ['./sso-inspection.component.css']
})
export class SsoInspectionComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('documentViewerModal') documentViewerModal: TaminDocumentViewerModalComponent;
  private _overlay: any;
  selectedItem: any;
  calculateDataForm: FormGroup;
  nationalId: any;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  protected initializePage(): void {
    this.calculateDataForm = this.formBuilder.group({
      // nationalId: [''],
      // insuranceNumber: [''],
      // firstName: [''],
      // lastName: [''],
    });
    this.initializeDataGrid();
  }

  private initializeDataGrid() {
    const me = this;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.STP_SSO_All_Requests)
      // .addSearchParam(searchParam)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'inspectionNo', columnCaption: 'شناسه بازرسی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceNo', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopNo', columnCaption: 'شماره کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'relationType', columnCaption: 'نوع ارتباط با کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'inspectionDate', columnCaption: 'تاریخ بازرسی', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'activityDesc', columnCaption: 'نوع فعالیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchdesc', columnCaption: 'شعبه تامین اجتماعی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'nationalcode', columnCaption: 'کد ملی', columnViewType: 'Label', visible: false})
      .setPagerCurrentPage(1)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'details',
        columnCaption: 'جزییات',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'details',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(true)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'details'));
      return result;
    };
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

  onShowReport(data) {
    debugger;
    const inspectionNumber = data.item.inspectionNo;
    const insuranceNumber = data.item.insuranceNo;
    switch (data.actionColumn.columnName) {
      case 'details' :
        this._overlay = this.showOverlay();
        this.restService.getBlob(`${Urls.InspectionReportSso}/${inspectionNumber}/${this.nationalId}`)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.documentViewerModal.openPdf(URL.createObjectURL(value));
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  onSearch(values) {
    const me = this;
    this.nationalId = values.nationalCode;
    const url = Urls.InspectionListSso + '/' + values.nationalCode + '/' + values.ticketCode;
    this.dataGrid.serviceUrl = url;
    this._overlay = this.showOverlay();
    this.hideOverlay(this._overlay);
    this.dataGrid.refreshData();

  }
  afterLoadReport() {
    this.hideOverlay(this._overlay);
  }

  beforeLoadReport() {
    this._overlay = this.showOverlay();
  }
  onError() {
    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  }
}
