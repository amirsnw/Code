import {Component, ViewChild, Injector} from '@angular/core';
import {TaminDataGridComponent, OverlayService, TaminDocumentViewerComponent, TaminPageBaseComponent, SearchParam, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerModalComponent, TaminModalComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from 'src/app/settings/urls';

@Component({
  selector: 'app-clearance-certificate-mad38',
  templateUrl: './special-display-contract.component.html',
  styleUrls: ['./special-display-contract.component.css']
})
export class SpecialDisplayContractComponent extends TaminPageBaseComponent {

  @ViewChild('contractGrid') contractGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('mad38Grid') mad38Grid: TaminDataGridComponent;
  @ViewChild('showCertificateDetailModal') showCertificateDetailModal: TaminModalComponent;
  public searchParams: SearchParam[];
  public contractSearchForm: FormGroup;
  public showCertificateDetailFrom: FormGroup;
  public currentObject: any;
  public _overlay: any;

  initializePage() {
    this._initializeShowCertificateDetailFromGroup();
    this._initializeFromGroupSearch();
    this._initializeContractGrid();
    this._initializeMad38HeadGrid();
    this.onSearchSubmit();
  }

  private _initializeFromGroupSearch() {
    this.contractSearchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: [''],
      contractRow: ['']
    });
  }

  private _initializeShowCertificateDetailFromGroup() {
    this.title = 'مفاصاحساب ماده 38';
    this.showCertificateDetailFrom = this.formBuilder.group({
      rwshid: [''],
      workshopName: [''],
      clearanceSerial: [''],
      clearanceDate: [''],
      clearanceNumber: [''],
      clearanceAmount: [''],
      contractRow: [''],
      contractNumber: [''],
      contractStartDate: [''],
      contractEndDate: [''],
      contractSubject: [''],
      contractAssigner: ['']
    });
  }

  private _initializeContractGrid() {
    this.contractGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.displayDetailContract + '\1819711269')
      .setShowPager(true)
      .addVisibleColumn({columnName: '0', columnCaption: 'کدملی', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert1})
      .addVisibleColumn({columnName: '0', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert2})
      .addVisibleColumn({columnName: '0', columnCaption: 'شماره بدهی', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert3})
      .addVisibleColumn({columnName: '0', columnCaption: 'شروع دوره پرداخت', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert5})
      .addVisibleColumn({columnName: '0', columnCaption: 'پایان دوره پرداخت ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert6})
      .addVisibleColumn({columnName: '0', columnCaption: 'مبلغ کل بدهی ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert7})
      .addVisibleColumn({columnName: '0', columnCaption: 'مهلت پرداخت ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert8})
      .addVisibleColumn({columnName: '0', columnCaption: 'مبلغ پرداخت ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert9})
      .addVisibleColumn({columnName: '0', columnCaption: 'تاریخ پرداخت ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert10})
      .addVisibleColumn({columnName: '0', columnCaption: 'وضعیت قرارداد ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert11})
      .addVisibleColumn({columnName: '0', columnCaption: 'وضعبت وصول ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDateConvert12})
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setViewType('GridView')
      .getData();
  }

  private _initializeMad38HeadGrid() {
    this.mad38Grid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .addVisibleColumn({ columnName: '0', columnCaption: 'سال', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert1 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'ماه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert2 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'روز', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert3 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'دستمزد',  columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert4 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'مبلغ بدهی ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert5 })
      .addVisibleColumn({ columnName: '0', columnCaption: 'شرح بدهی ', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.gridDetailDateConvert6 })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onSearchSubmit() {
    const url = Urls.displayDetailContract;
    // const url = Urls.clearanceCertificateMad38Heads + '/' + workshopId + '/' + branchCode + '/' + contractRow;
    this.contractGrid.serviceUrl = url;
    this.contractGrid.pagerCurrentPage = 1;
    // this.contractGrid.searchParams = this.searchParams;
    // this.loadPdf(null);

    this.contractGrid.refreshData();
  }

  clickContractGridItem(param: any) {
    this.searchParams = new Array<SearchParam>();
    const url = Urls.displayDetailContracttow + `?debit-number=${param[3]}&contract-number=${param[4]}`;
    this.mad38Grid.serviceUrl = url;
    this.mad38Grid.pagerCurrentPage = 1;
    this.mad38Grid.searchParams = this.searchParams;
    this.mad38Grid.refreshData();
  }

  onMad38GridAction(param: any) {
    var me = this;
    const actionColumn = param.actionColumn.columnActionName;
    const dataItem = param.item;
    if (actionColumn === 'showCertificateDetail') {
      this._overlay = this.showOverlay();
      this.restService.getAll(Urls.clearanceCertificateMad38Details + '/' + dataItem.workshopId + '/' + dataItem.branchCode + '/' + dataItem.contractRow + '/' + dataItem.clearanceSerial)
        .then(data1 => {
          this.hideOverlay(this._overlay);
          const data = (<any>data1).data;
          const detailsData = data.list[0];
          detailsData.clearanceDate = me.getPersianDateFormat(detailsData.clearanceDate);
          detailsData.contractStartDate = me.getPersianDateFormat(detailsData.contractStartDate);
          detailsData.contractEndDate = me.getPersianDateFormat(detailsData.contractEndDate);
          detailsData.clearanceAmount = me.getWithCommaSeperator(detailsData.clearanceAmount);
          detailsData.contractAmount = me.getWithCommaSeperator(detailsData.contractAmount);
          this.showCertificateDetailFrom.patchValue(detailsData);
          this.showCertificateDetailModal.show();
        })
        .catch(error => {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام خطا: ', 'خطایی رخ داده است.');
        });
    } else if (actionColumn === 'view') {
      this.loadPdf(dataItem);
    }
  }

  exitDetailForm() {
    this.showCertificateDetailModal.hide();
  }

  resetForm() {
    this.searchParams = new Array<SearchParam>();
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
    this.contractSearchForm.reset();
  }


  getWithCommaSeperator(item) {
    if (item !== null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  wiewPdf() {
    this.loadPdf({id: 234333});
  }

  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // const pdfUrl = `${Urls.clearanceCertificateMad38Report}/${data.workshopId}/${data.branchCode}/${data.contractRow}/${data.clearanceSerial}`;
      // const pdfUrl = `http://172.16.13.164:7001/erequest/api/workshop-services/report/0070005952/0070/00700001/170492`;
      const pdfUrl = `http://172.16.13.164:7001/erequest/api/workshop-services/report/0018210949/0130/90000011/4703`;
      this.restService.getBlob(pdfUrl)
        .then(value => {
          this.documentViewer.loadPdf(URL.createObjectURL(value));
          this.theModal.show();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  gridDateConvert1(item) {
    return item[1];
  }

  gridDateConvert2(item) {
    return item[2];
  }

  gridDateConvert3(item) {
    return item[3];
  }

  gridDateConvert4(item) {
    return item[4];
  }

  gridDateConvert5(item) {
    if (item[5] != null) {
      return item[5].substring(0, 4) + '/' + item[5].substring(4, 6) + '/' + item[5].substring(6, 8);
    } else {
      return item[5];
    }

  }

  gridDateConvert6(item) {
    if (item[6] != null) {
      return item[6].substring(0, 4) + '/' + item[6].substring(4, 6) + '/' + item[6].substring(6, 8);
    } else {
      return item[6];
    }
  }

  gridDateConvert7(item) {
    if (item[7] != null) {
       return item[7].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return item[7];
    }
  }

  gridDateConvert8(item) {
    if (item[8] != null) {
      return item[8].substring(0, 4) + '/' + item[8].substring(4, 6) + '/' + item[8].substring(6, 8);
    } else {
      return item[8];
    }
  }

  gridDateConvert9(item) {
    if (item[9] != null) {
      return item[9].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return item[9];
    }
  }

  gridDateConvert10(item) {
    if (item[10] != null) {
      return item[10].substring(0, 4) + '/' + item[10].substring(4, 6) + '/' + item[10].substring(6, 8);
    } else {
      return item[10];
    }
  }

  gridDateConvert11(item) {
    return item[11];
  }

  gridDateConvert12(item) {
    return item[12];
  }

  gridDetailDateConvert1(item) {
    return item[0];
  }
  gridDetailDateConvert2(item) {
    return item[1];
  }
  gridDetailDateConvert3(item) {
    return item[2];
  }
  gridDetailDateConvert6(item) {
    return item[3];
  }
  gridDetailDateConvert4(item) {
    return  item[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
  }
  gridDetailDateConvert5(item) {
    return item[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
  }

  onRollback(){
    this.redirectTo('/optional-insurance/pay-premium');
  }

}
