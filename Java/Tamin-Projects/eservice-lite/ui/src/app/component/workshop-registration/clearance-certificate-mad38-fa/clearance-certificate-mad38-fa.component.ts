import { Component, ViewChild, Injector } from '@angular/core';
import { TaminDataGridComponent, OverlayService, TaminDocumentViewerComponent, TaminPageBaseComponent, SearchParam, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerModalComponent, TaminModalComponent } from 'tamin-framework';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';


@Component({
  selector: 'app-clearance-certificate-mad38-fa',
  templateUrl: './clearance-certificate-mad38-fa.component.html',
  styleUrls: ['./clearance-certificate-mad38-fa.component.css']
})
export class ClearanceCertificateMad38FAComponent extends TaminPageBaseComponent {

  @ViewChild('contractGrid') contractGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('mad38Grid') mad38Grid: TaminDataGridComponent;
  @ViewChild('showCertificateDetailModal') showCertificateDetailModal: TaminModalComponent;
  searchParams: SearchParam[];
  contractSearchForm: FormGroup;
  showCertificateDetailFrom: FormGroup;
  currentObject: any;
  private _overlay: any;

  initializePage() {
    this._initializeShowCertificateDetailFromGroup();
    this._initializeFromGroupSearch();
    this._initializeContractGrid();
    this._initializeMad38HeadGrid();
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
      .addUrl(Urls.contractByWorkshopFA)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshop.workshopId', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'workshop.workshopName', columnCaption: 'نام پیمانکار', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractAssignType', columnCaption: 'نوع پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractDate', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat })
      .addVisibleColumn({ columnName: 'contractStartDate', columnCaption: 'شروع قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat })
      .addVisibleColumn({ columnName: 'contractEndDate', columnCaption: 'پایان قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat })
      .addVisibleColumn({ columnName: 'workshopPremiumRate.rateDesc', columnCaption: 'نرخ حق بیمه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractStatus.contractStatusDescription', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'model.nationalCode', columnCaption: 'شناسه واگذارنده', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'model.name', columnCaption: 'نام واگذارنده', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'شعبه', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeMad38HeadGrid() {
    this.mad38Grid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addVisibleColumn({ columnName: 'clearanceSerial', columnCaption: 'سریال مفاصاحساب', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractAmount', columnCaption: 'مبلغ اولیه قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setFirstLoad(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'showCertificateDetail',
        columnCaption: 'مشاهده مفاصاحساب',
        columnViewType: 'Button',
        columnActionName: 'showCertificateDetail',
        // isActionAuthorized: true,
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'نمایش pdf',
        columnViewType: 'Button',
        columnActionName: 'view',
        icon: 'icon-info',
        visible: true,
        enable: true
      })
      .setViewType('GridView')
      .getData();
  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.contractSearchForm.get('workshopId').value;
    const branchCode = this.contractSearchForm.get('branchCode').value;
    const contractRow = this.contractSearchForm.get('contractRow').value;
    if (workshopId != undefined && workshopId !== '' && workshopId !== null) {
      this.searchParams.push({
        property: 'workshop.workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (branchCode != undefined && branchCode !== '' && branchCode !== null) {
      this.searchParams.push({
        property: 'workshop.branchCode',
        value: branchCode,
        operator: SearchOperator.EQ

      });
    }
    if (contractRow != undefined && contractRow !== '') {
      this.searchParams.push({
        property: 'contractRow',
        value: contractRow,
        operator: SearchOperator.EQ

      });
    }
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
  }

  clickContractGridItem(param: any) {
    this.searchParams = new Array<SearchParam>();
    const workshopId = param.workshop.workshopId;
    const branchCode = param.workshop.branchCode;
    const contractRow = param.contractRow;
    // const url = Urls.clearanceCertificateMad38HeadsFA + '/0010003891/0010/00100001' ;
    const url = Urls.clearanceCertificateMad38HeadsFA + '/' + workshopId + '/' + branchCode + '/' + contractRow;
    this.mad38Grid.serviceUrl = url;
    this.mad38Grid.pagerCurrentPage = 1;
    this.mad38Grid.searchParams = this.searchParams;
    this.mad38Grid.refreshData();
  }

  onMad38GridAction(param: any) {
    var me = this
    const actionColumn = param.actionColumn.columnActionName;
    const dataItem = param.item;
    if (actionColumn === 'showCertificateDetail') {
      this._overlay = this.showOverlay();
      this.restService.getAll(Urls.clearanceCertificateMad38DetailsFA + '/' + dataItem.workshopId + '/' + dataItem.branchCode + '/' + dataItem.contractRow + '/' + dataItem.clearanceSerial)
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
    }
    else if(actionColumn === 'view'){
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
    this.loadPdf({id:234333});
  }

  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const pdfUrl = `${Urls.clearanceCertificateMad38Report}/${data.workshopId}/${data.branchCode}/${data.contractRow}/${data.clearanceSerial}`;
        // const pdfUrl = `http://172.16.13.164:7001/erequest/api/workshop-services/report/0018210949/0130/90000011/4703`;
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

}
