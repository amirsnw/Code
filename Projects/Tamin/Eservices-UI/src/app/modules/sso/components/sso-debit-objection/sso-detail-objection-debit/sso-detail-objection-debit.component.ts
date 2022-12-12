import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';
import {SsoDebitObjectionSearchComponent} from '../sso-debit-objection-search/sso-debit-objection-search.component';

@Component({
  selector: 'app-sso-detail-objection-debit',
  templateUrl: './sso-detail-objection-debit.component.html',
  styleUrls: ['./sso-detail-objection-debit.component.css']
})
export class SsoDetailObjectionDebitComponent extends TaminPageBaseComponent {
  data = {
    desc: ''
  };
  @ViewChild('search') search: SsoDebitObjectionSearchComponent;
  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('workshopsDetailDebitGrid') workshopsDetailDebitGrid: TaminDataGridComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('theDescModal') theDescModal: TaminModalComponent;
  @ViewChild('theModall') theModall: TaminModalComponent;
  public overlay: any;
  public searchWorkshopParams: SearchParam[];
  public searchDebitParams: SearchParam[];
  public filter: SearchParam[];
  public currentObject: any;
  public branchCode: any;
  public firstDocTypeCode: any;
  public workshopSearchForm: FormGroup;
  public workshopDebitSearchForm: FormGroup;
  public workshopDetailDebitSearchForm: FormGroup;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
    this._initializeSearchDebit();
    this._initializeSearchDetailDebit();
    this._initializDetailDebitGrid();
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
  }

  private _initializeSearchDetailDebit() {
    this.workshopDetailDebitSearchForm = this.fb.group({
      debitNumber: [''],
      peymanSequence: ['']
    });
  }

  onSearchWorkshopSubmit(param: any) {
    this.searchWorkshopParams = [];
    this.searchWorkshopParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'serviceName',
      value: 'detailObjectionDebit',
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'ticketCode',
      value: param.ticketCode,
      operator: SearchOperator.EQ
    });
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.serviceUrl = Urls.employerWorkshopsCRM;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.dataItems = [];
    this.workshopsGrid.refreshData().then(value => {
    }).catch(reason => {
      this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
    });

  }

  private _initializeWorkshopGrid() {
    this.workshopsGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      // .addUrl(Urls.employerByLegal)
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
      // .setFirstLoad(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  clickWorkshopGridItem(param: any) {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = param.workshopId;
    this.branchCode = param.branchCode;
    this.setSession('branchCode', this.branchCode);
    const url = Urls.SSO_DetailObjectionWorkshopsDebit + '/' + workshopId + '/' + this.branchCode;
    this.searchWorkshopParams = [];
    this.searchWorkshopParams.push({
      property: 'nationalCode',
      value: this.search.searchForm.value.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'serviceName',
      value: 'detailObjectionDebit',
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'ticketCode',
      value: this.search.searchForm.value.ticketCode,
      operator: SearchOperator.EQ
    });
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.serviceUrl = url;
    this.workshopsDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDebitGrid.dataItems = [];
    this.workshopsDebitGrid.refreshData();
  }

  private _initializeDebitGrid() {
    this.workshopsDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'rowNum', columnCaption: 'ردیف', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'mastCustomerCode', columnCaption: 'شماره کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تا تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'peymanSequence', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitcrtreasondesc', columnCaption: 'علت ایجاد بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitstepdesc', columnCaption: 'مرحله بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitstatdesc', columnCaption: 'وضعیت بدهی', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  clickWorkshopDetailGridItem(param: any) {
    this.searchWorkshopParams = new Array<SearchParam>();
    const debitNumber = param.debitNumber;
    this.branchCode = this.getSes('branchCode');
    const url = Urls.SSO_EcalimDetailObjectionWorkshopsDebit + '/' + debitNumber + '/' + this.branchCode;
    this.searchWorkshopParams = [];
    this.searchWorkshopParams.push({
      property: 'nationalCode',
      value: this.search.searchForm.value.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'serviceName',
      value: 'detailObjectionDebit',
      operator: SearchOperator.EQ
    });
    this.searchWorkshopParams.push({
      property: 'ticketCode',
      value: this.search.searchForm.value.ticketCode,
      operator: SearchOperator.EQ
    });
    this.workshopsDetailDebitGrid.serviceUrl = url;
    this.workshopsDetailDebitGrid.pagerCurrentPage = 1;
    this.workshopsDetailDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDetailDebitGrid.refreshData();
  }

  private _initializDetailDebitGrid() {
    this.workshopsDetailDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      // .addVisibleColumn({ columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label' })
      .addVisibleColumn({columnName: 'claimSequens', columnCaption: 'ردیف سند', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'docNumber', columnCaption: 'شماره سند', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'docDate', columnCaption: 'تاریخ سند ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'docTypeDescription', columnCaption: 'شرح نوع سند', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitstepdesc', columnCaption: 'مرحله سند', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitstatedisc', columnCaption: 'وضیعت سند', columnViewType: DataColumnViewType.Label})
      // .addVisibleColumn({ columnName: 'claimdescription', columnCaption: 'شرح سند', columnViewType: DataColumnViewType.Label })
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده جزییات محاسبه',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'objectionDebit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'viewDesc',
        columnCaption: 'شرح ایجاد بدهی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewDesc',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.workshopsDetailDebitGrid.actionRender = (item, actionCells) => {
      const result = [];
      if (item.claimSequens === '001') {
        result.push(actionCells.find(c => c.columnActionName === 'viewDesc'));
      }
      if (item.claimSequens === '001' && item.docTypeCode === '036') {
        result.push(actionCells.find(c => c.columnActionName === 'objectionDebit'));
      }
      if (item.docTypeCode === '020' || item.docTypeCode === '040') {
        result.push(actionCells.find(c => c.columnActionName === 'objectionDebit'));
      }
      if (item.debitcrtreasoncode === '20' && item.docTypeCode === '048') {
        result.push(actionCells.find(c => c.columnActionName === 'objectionDebit'));
      }
      return result;
    };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'objectionDebit':
        this.loadPdf(param);
        break;
      case 'viewDesc':
        this.data.desc = param.item.claimdescription;
        this.theDescModal.show();
        break;
    }
  }

  loadPdf(data) {
    this.branchCode = this.getSes('branchCode');
    const searchParams = [];
    searchParams.push({
      property: 'nationalCode',
      value: this.search.searchForm.value.nationalCode,
      operator: SearchOperator.EQ
    });
    searchParams.push({
      property: 'serviceName',
      value: 'detailObjectionDebit',
      operator: SearchOperator.EQ
    });
    searchParams.push({
      property: 'ticketCode',
      value: this.search.searchForm.value.ticketCode,
      operator: SearchOperator.EQ
    });
    const requestEntity = {
      debitNumber: data.item.debitNumber,
      nationalCodeBoss: this.search.searchForm.value.nationalCode,
      status: {
        requestCode: data.item.docTypeCode
      },
      requestType: {
        id: '50'
      }
    };

    switch (data.item.docTypeCode) {
      case '020':
      case '048':
        this.restService.getBlob(Urls.SSO_detailObjectionWorkshopDebitReport + '/' + data.item.debitNumber + '/' + data.item.claimSequens + '/' + this.branchCode, searchParams)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            this.theModal.show();
            this.createRequest(requestEntity);
          })
          .catch(reason => {
            this.showErrorMessageBox('خطا', reason.data.toString());
          });
        break;
      case '036':
        this.restService.getBlob(Urls.ObjectionReports + '/gardesh-list/' + data.item.debitNumber + '/' + this.branchCode, searchParams)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            this.theModal.show();
            this.createRequest(requestEntity);
          })
          .catch(reason => {
            this.showErrorMessageBox('خطا', reason.data.toString());
          });
        break;
      case '040':
        this.restService.getBlob(Urls.ObjectionReports + '/contract-calculation/' + data.item.debitNumber + '/' + this.branchCode, searchParams)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            this.theModal.show();
            this.createRequest(requestEntity);
          })
          .catch(reason => {
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            }
          });
        break;
      default:
        this.showErrorMessageBox('پیام سیستم', 'بدهی انتخاب شده دارای شرایط لازم نمی باشد');

    }

  }

  createRequest(requestEntity) {
    this.restService.create(Urls.SSO_detailObjectionWorkshopDebitRequest, requestEntity);
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
        property: 'branchCode',
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

  onDetailDebitSearchSubmit() {
    this.searchDebitParams = new Array<SearchParam>();
    const debitNumber = this.workshopDetailDebitSearchForm.get('debitNumber').value;
    const peymanSequence = this.workshopDetailDebitSearchForm.get('peymanSequence').value;
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
    this.workshopsDetailDebitGrid.pagerCurrentPage = 1;
    this.workshopsDetailDebitGrid.searchParams = this.searchDebitParams;
    this.workshopsDetailDebitGrid.refreshData();
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  getWithCommaSeperator(item) {
    if (item != null && item != '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
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

  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
