import { Component, ViewChild } from '@angular/core';
import { TaminDataGridComponent, TaminPageBaseComponent, SearchParam, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerModalComponent, TaminModalComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-clearance-certificate-mad37',
  templateUrl: './clearance-certificate-mad37.component.html',
  styleUrls: ['./clearance-certificate-mad37.component.css']
})
export class ClearanceCertificateMad37Component extends TaminPageBaseComponent {

  @ViewChild('workshopGrid') workshoptGrid: TaminDataGridComponent;
  @ViewChild('Mad37Grid') Mad37Grid: TaminDataGridComponent;
  @ViewChild('showCertificateDetailModal') showCertificateDetailModal: TaminModalComponent;
  searchParams: SearchParam[];
  workshopSearchForm: FormGroup;
  showCertificateDetailFrom: FormGroup;
  currentObject: any;
  private _overlay: any;

  initializePage() {
    this._initializeShowCertificateDetailFromGroup();
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeMad37HeadGrid();
  }

  private _initializeFromGroupSearch() {
    this.workshopSearchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  private _initializeShowCertificateDetailFromGroup() {
    this.title = 'مفاصاحساب ماده 37';
    this.showCertificateDetailFrom = this.formBuilder.group({
      reportWorkshopId: [''],
      reportBranchCode: [''],
      workshopName: [''],
      letterNumber: [''],
      letterDate: [''],
      requestDesc: [''],
      requestNumber: [''],
      requestDate: [''],
      requestingUnit: [''],
      requestStatus: [''],
      answerDesc: [''],
    });
  }

  private _initializeWorkshopGrid() {
    this.workshoptGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.employerByLegal)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setViewType('GridView')
      .getData();
  }

  private _initializeMad37HeadGrid() {
    this.Mad37Grid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addVisibleColumn({ columnName: 'letterNumber', columnCaption: 'شماره نامه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'letterDate', columnCaption: 'تاریخ نامه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'requestDesc', columnCaption: 'موضوع درخواست', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'requestNumber', columnCaption: 'شماره درخواست', columnViewType: DataColumnViewType.Label })
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
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .setViewType('GridView')
      .getData();
  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.workshopSearchForm.get('workshopId').value;
    const branchCode = this.workshopSearchForm.get('branchCode').value;
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
    this.workshoptGrid.pagerCurrentPage = 1;
    this.workshoptGrid.searchParams = this.searchParams;
    this.workshoptGrid.refreshData();
  }

  clickWorkshopGridItem(param: any) {
    this.searchParams = new Array<SearchParam>();
    const workshopId = param.workshopId;
    const branchCode = param.branchCode;
    const url = Urls.clearanceCertificateMad37Heads + '/' + workshopId + '/' + branchCode;
    this.Mad37Grid.serviceUrl = url;
    this.Mad37Grid.pagerCurrentPage = 1;
    this.Mad37Grid.searchParams = this.searchParams;
    this.Mad37Grid.refreshData();
  }

  onMad37GridAction(param: any) {
    var me = this
    const actionColumn = param.actionColumn.columnActionName;
    const dataItem = param.item;
    if (actionColumn === 'showCertificateDetail') {
      this._overlay = this.showOverlay();
      this.restService.getAll(Urls.clearanceCertificateMad37Details + '/' + dataItem.workshopId + '/' + dataItem.branchCode + '/' + dataItem.requestNumber)
        .then(data1 => {
          this.hideOverlay(this._overlay);
          const data = (<any>data1).data;
          const detailsData = data.list[0];
          detailsData.reportWorkshopId = detailsData.head.workshopId;
          detailsData.reportBranchCode = detailsData.head.branchCode;
          detailsData.letterNumber = detailsData.head.letterNumber;
          debugger;
          detailsData.letterDate = me.getPersianDateFormat(detailsData.head.letterDate);
          detailsData.requestDate = me.getPersianDateFormat(detailsData.requestDate);
          detailsData.requestDesc = detailsData.head.requestDesc;
          detailsData.requestNumber = detailsData.head.requestNumber;
          detailsData.requestStatus = me.getClearanceStatusDesc(detailsData.status);
          this.showCertificateDetailFrom.patchValue(detailsData);
          this.showCertificateDetailModal.show();
        })
        .catch(error => {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام خطا: ', 'خطایی رخ داده است.');
        });
    }
  }

  exitDetailForm() {
    this.showCertificateDetailModal.hide();
  }

  resetForm() {
    this.searchParams = new Array<SearchParam>();
    this.workshoptGrid.pagerCurrentPage = 1;
    this.workshoptGrid.searchParams = this.searchParams;
    this.workshoptGrid.refreshData();
    this.workshopSearchForm.reset();
  }

  getClearanceStatusDesc(item) {
    switch (item) {
      case '1':
        return 'صادر نشده';
      case '2':
        return 'تائید نشده';
      case '3':
        return 'صادر شده';
      default:
        return 'نامشخص';
    }
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


}