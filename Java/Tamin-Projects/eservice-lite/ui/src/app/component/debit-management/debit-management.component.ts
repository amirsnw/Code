import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from '../../settings/urls';

@Component({
  selector: 'app-debit-management',
  templateUrl: './debit-management.component.html',
  styleUrls: ['./debit-management.component.css']
})
export class DebitManagementComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('theModalComment') theModalComment: TaminModalComponent;
  private overlay: any;
  searchWorkshopParams: SearchParam[];
  searchDebitParams: SearchParam[];
  filter: SearchParam[];
  currentObject: any;
  branchCode: any;
  workshopSearchForm: FormGroup;
  workshopDebitSearchForm: FormGroup;
  modalForm: FormGroup;

  // isHidden = true;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
    this._initializeSearchDebit();
  }

  private _initializeFromGroupSearch() {
    this.workshopSearchForm = this.fb.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  private _initializeSearchDebit() {
    this.workshopDebitSearchForm = this.fb.group({
      debitNumber: [''],
      peymanSequence: ['']
    });
    this.modalForm = this.fb.group({
      defectDesc: [''],
    });
  }

  private _initializeWorkshopGrid() {
    this.workshopsGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.employerByLegal)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeDebitGrid() {
    this.workshopsDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'docDateEblaghEjra', columnCaption: 'تاریخ ابلاغ اجراییه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'docDateEblaghEkhtar', columnCaption: 'تاریخ ابلاغ اخطاریه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'mastCustomerCode', columnCaption: 'کد طرف حساب ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تا تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'peymanSequence', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({
        columnName: 'status',
        columnCaption: 'وضعیت درخواست',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator, columnStyle: this.gridCellStatusTypeStyle
      })
      .addActionColumn({
        columnName: 'debitInvestigation',
        columnCaption: 'درخواست رسیدگی به بدهی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'debitInvestigation',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'viewObjection',
        columnCaption: 'مشاهده درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewObjection',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'viewComment',
        columnCaption: 'پیام کارشناس',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewComment',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'editDebitInvestigation',
        columnCaption: 'اصلاح درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'editDebitInvestigation',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      // .setPagerCurrentPage(1)
      // .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.workshopsDebitGrid.actionRender = (item, actionCells) => {
      const result = [];
      if (!item.seqNo) {
        result.push(actionCells.find(c => c.columnActionName === 'debitInvestigation'));
      } else if (item.status === '7') {
        result.push(actionCells.find(c => c.columnActionName === 'viewComment'));
        result.push(actionCells.find(c => c.columnActionName === 'editDebitInvestigation'));
      } else {
        result.push(actionCells.find(c => c.columnActionName === 'viewObjection'));
      }

      return result;
    };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'debitInvestigation':
        this.overlay = this.showOverlay();
        if (param.item.stepCat.toString() === '2' || param.item.docDateEblaghEjra === null) {
          this.redirectTo('/debit-investigation/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString());
        }
        this.restService.getById(Urls.DiffDays, param.item.docDateEblaghEjra.toString())
          .then(value => {
            this.hideOverlay(this.overlay);
            if (value.data > 365) {
              alert('به دلیل انقضاء مهلت ، امکان ثبت درخواست وجود ندارد.');
            } else {
              this.redirectTo('/debit-investigation/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString());
            }
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
      case 'editDebitInvestigation':
        this.redirectTo('/edit-debit-investigation/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString());
        break;
      case 'viewComment':
        this.onShowDefect();
        this.restService.getById(Urls.ObjectionRequest, param.item.seqNo.toString())
          .then(value => {
            this.modalForm.get('defectDesc').setValue(value.data.defectDesc);
          })
          .catch(error => {
          });
        break;
      case 'viewObjection':
        this.overlay = this.showOverlay();
        this.loadPdf(param)
          .then(value => {
            this.hideOverlay(this.overlay);
            this.theModal.show();
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  loadPdf(data) {
    return new Promise<void>((resolve, reject) => {
      if (data.item.seqNo) {
        const pdfUrl = `${Urls.ObjectionReports}/comitte/${data.item.seqNo}`;
        this.restService.getBlob(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }

  onShowDefect() {
    this.theModalComment.width = '50%';
    this.theModalComment.show();
  }

  onHideDefect() {
    this.theModalComment.hide();
  }

  onSearchSubmit() {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = this.workshopSearchForm.get('workshopId').value;
    const branchCode = this.workshopSearchForm.get('branchCode').value;
    if (workshopId !== undefined && workshopId !== '' && workshopId !== null) {
      this.searchWorkshopParams.push({
        property: 'workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (branchCode !== undefined && branchCode !== '' && branchCode !== null) {
      this.searchWorkshopParams.push({
        property: 'branch.code',
        value: branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.refreshData();
  }

  onDebitSearchSubmit() {
    this.searchDebitParams = new Array<SearchParam>();
    const debitNumber = this.workshopDebitSearchForm.get('debitNumber').value;
    const peymanSequence = this.workshopDebitSearchForm.get('peymanSequence').value;
    if (debitNumber !== undefined && debitNumber !== '' && debitNumber !== null) {
      this.searchDebitParams.push({
        property: 'debitNumber',
        value: debitNumber,
        operator: SearchOperator.EQ

      });
    }
    if (peymanSequence !== undefined && peymanSequence !== '' && peymanSequence !== null) {
      this.searchDebitParams.push({
        property: 'peymanSequence',
        value: peymanSequence,
        operator: SearchOperator.EQ

      });
    }
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.searchParams = this.searchDebitParams;
    this.workshopsDebitGrid.refreshData();
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '';
    }
  }

  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  gridCellStatusTranslator(item) {
    switch (item) {
      case '1':
        return 'ثبت درخواست';
      case '7':
        return 'نقص مدارک';
      case '8':
        return 'رد درخواست';
      case '9':
        return 'تایید درخواست';
      default:
        return 'نامشخص';
    }
  }

  gridCellStatusTypeStyle(item) {
    switch (item) {
      case '1':
        return {'color': 'grey'};
      case '7':
        return {'color': 'red'};
      case '8':
        return {'color': 'blue'};
      case '9':
        return {'color': 'purple'};
    }
  }

  clickWorkshopGridItem(param: any) {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = param.workshopId;
    this.branchCode = param.branchCode;
    const url = Urls.ManagementWorkshopsDebit + '/' + workshopId + '/' + this.branchCode;
    this.workshopsDebitGrid.serviceUrl = url;
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDebitGrid.refreshData();
    // .then(value => this.isHidden = false)
    // .catch(reason => this.isHidden = true);
  }

  resetWorkshopForm() {
    this.searchWorkshopParams = new Array<SearchParam>();
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.refreshData();
    this.workshopSearchForm.reset();
  }

  resetDebitForm() {
    this.searchDebitParams = new Array<SearchParam>();
    this.workshopsDebitGrid.searchParams = this.searchDebitParams;
    this.workshopsDebitGrid.refreshData();
    this.workshopDebitSearchForm.reset();
  }

}
