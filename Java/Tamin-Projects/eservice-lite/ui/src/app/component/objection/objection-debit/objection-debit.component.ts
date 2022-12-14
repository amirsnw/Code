import {Component, ViewChild, Injector} from '@angular/core';
import {TaminPageBaseComponent, TaminDataGridComponent, TaminModalComponent, SearchParam, OverlayService, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerComponent, TaminTabComponent} from 'tamin-framework';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Urls} from 'src/app/settings/urls';

@Component({
  selector: 'app-objection-debit',
  templateUrl: './objection-debit.component.html',
  styleUrls: ['./objection-debit.component.css']
})
export class ObjectionDebitComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  private overlay: any;
  searchWorkshopParams: SearchParam[];
  searchDebitParams: SearchParam[];
  filter: SearchParam[];
  currentObject: any;
  branchCode: any;
  workshopSearchForm: FormGroup;
  workshopDebitSearchForm: FormGroup;

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
      .addVisibleColumn({columnName: 'orderRecipeDate', columnCaption: 'تاریخ ابلاغ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'mastCustomerCode', columnCaption: 'کد طرف حساب ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تا تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'peymanSequence', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addActionColumn({
        columnName: 'objectionDebit',
        columnCaption: 'اعتراض به بدهی برآوردی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'objectionDebit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'objectionBadvi',
        columnCaption: 'اعتراض به رای هیئت بدوی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'objectionBadvi',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'viewObjection',
        columnCaption: 'مشاهده اعتراض',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewObjection',
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
        if (item.debitStepCode === '01' && item.debitStatCode === '03') {
          result.push(actionCells.find(c => c.columnActionName === 'objectionDebit'));
        } else if (item.debitStepCode === '02' && item.debitStatCode === '03') {
          result.push(actionCells.find(c => c.columnActionName === 'objectionBadvi'));
        }
      } else {
        result.push(actionCells.find(c => c.columnActionName === 'viewObjection'));
      }

      return result;
    };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'objectionDebit':
        this.overlay = this.showOverlay();
        this.restService.getById(Urls.DiffDays, param.item.orderRecipeDate.toString())
          .then(value => {
            this.hideOverlay(this.overlay);
            if (value.data > 31) {
              alert('به دلیل انقضاء مهلت اعتراض، امکان ثبت این اعتراض وجود ندارد.');
            } else {
              this.redirectTo('/objection-debit-new/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString());
            }
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });

        break;
      case 'objectionBadvi':
        this.overlay = this.showOverlay();
        this.restService.getById(Urls.DiffDays, param.item.orderRecipeDate.toString())
          .then(value => {
            this.hideOverlay(this.overlay);
            if (value.data > 21) {
              alert('به دلیل انقضاء مهلت اعتراض، امکان ثبت این اعتراض وجود ندارد.');
            } else {
              this.redirectTo('/objection-badvi-new/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString());
            }
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
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
        const pdfUrl = `${Urls.ObjectionReports}/objection/${data.item.seqNo}`;
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

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  clickWorkshopGridItem(param: any) {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = param.workshopId;
    this.branchCode = param.branchCode;
    const url = Urls.ObjectionWorkshopsDebit + '/' + workshopId + '/' + this.branchCode;
    this.workshopsDebitGrid.serviceUrl = url;
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDebitGrid.refreshData();
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
