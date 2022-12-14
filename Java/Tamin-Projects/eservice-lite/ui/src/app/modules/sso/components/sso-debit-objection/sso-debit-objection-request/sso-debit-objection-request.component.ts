import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-debit-objection-request',
  templateUrl: './sso-debit-objection-request.component.html',
  styleUrls: ['./sso-debit-objection-request.component.css']
})
export class SsoDebitObjectionRequestComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;

  searchParams: SearchParam[];
  currentObject: any;
  branchCode: any;
  workshopDebitSearchForm: FormGroup;
  private overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
  }

  private _initializeFromGroupSearch() {
    this.workshopDebitSearchForm = this.fb.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }


  onSearchSubmit() {
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    if (ticketCode === null || ticketCode === '') {
      alert('وارد نمودن کد اعتباری کارفرما الزامیست');
      return;
    } else if (nationalCode === null || nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    } else {
      this.searchParams = [];
      this.searchParams.push({
        property: 'nationalCode',
        value: nationalCode,
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'serviceName',
        value: 'debitObjection',
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'ticketCode',
        value: ticketCode,
        operator: SearchOperator.EQ
      });
      this.workshopsGrid.pagerCurrentPage = 1;
      this.workshopsGrid.serviceUrl = Urls.employerWorkshopsCRM;
      this.workshopsGrid.searchParams = this.searchParams;
      this.workshopsGrid.dataItems = [];
      this.workshopsGrid.refreshData().then(value => {
      }).catch(reason => {
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
    }
  }

  sendUserTicket() {
    const values = this.workshopDebitSearchForm.value;
    if (values.nationalCode === null || values.nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      alert('مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'debitObjection',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso, this.searchParams)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

  private _initializeWorkshopGrid() {
    this.workshopsGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
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
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  clickWorkshopGridItem(param: any) {
    this.searchParams = new Array<SearchParam>();
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    const workshopId = param.workshopId;
    this.branchCode = param.branchCode;
    const url = Urls.SSO_ObjectionWorkshopsDebit + '/' + workshopId + '/' + this.branchCode;
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'debitObjection',
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'ticketCode',
      value: ticketCode,
      operator: SearchOperator.EQ
    });
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    this.workshopsDebitGrid.serviceUrl = url;
    this.workshopsDebitGrid.searchParams = this.searchParams;
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
        return result;
      }
      return result;
    };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    switch (actionName) {
      case 'objectionDebit':
        this.overlay = this.showOverlay();
        this.restService.getById(Urls.DiffDays, param.item.orderRecipeDate.toString())
          .then(value => {
            this.hideOverlay(this.overlay);
            if (value.data > 31) {
              alert('به دلیل انقضاء مهلت اعتراض، امکان ثبت این اعتراض وجود ندارد.');
            } else {
              this.redirectTo('/sso/debit-objection-baravordi-new/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString() + '/' + nationalCode + '/' + ticketCode);
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
              this.redirectTo('/sso/debit-objection-badvi-new/' + param.item.debitNumber.toString() + '/' + param.item.mastCustomerCode.toString() + '/' + this.branchCode.toString() + '/' + nationalCode + '/' + ticketCode);
            }
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
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


}
