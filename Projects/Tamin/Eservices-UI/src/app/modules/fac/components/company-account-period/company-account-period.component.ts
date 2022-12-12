import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-company-account-period',
  templateUrl: './company-account-period.component.html',
  styleUrls: ['./company-account-period.component.css']
})
export class CompanyAccountPeriodComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  public formCompanyAccount: FormGroup;
  private requestId: any;
  private editMode: any;
  private _overlay: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.requestId = this.route.snapshot.params['requestId'];
    this.formCompanyAccount = this.formBuilder.group({
      fiscalStart: [''],
      fiscalEnd: [''],
    });
    this.loadDate();
    this._initializeDataGrid();
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.COMPANY_ACCOUNT_PERIOD}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'شروع سال مالی ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'endDate', columnCaption: ' پایان سال مالی',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'hasBooklet', columnCaption: 'دفاتر', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceHasBooklet})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(true)
      .getData();

    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      return result;
    };
    this.dataGrid.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };
  }

  loadDate() {
    const theUrl = `${FacUrls.REQUEST}/` + this.requestId;
    debugger;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.list) {
          this.formCompanyAccount.get('fiscalStart').setValue(this.getPersianDate(values.data.list[0].startFiscalYear));
          this.formCompanyAccount.get('fiscalEnd').setValue(this.getPersianDate(values.data.list[0].endFiscalYear));
        }
     })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  gridCellServiceHasBooklet(item) {
    switch (item) {
      case '0':
        return 'دارد';
      case '2':
        return 'مخدوش';
      case '3':
        return 'فاقد';
      case '1':
        return 'سفید و نانویس';
    }
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newCompanyAccountPeriod/' + this.editMode + '/' +  this.requestId);
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newCompanyAccountPeriod/' + this.editMode + '/' + this.requestId);
        break;
      case 'delete':
        this.delete(param.item.detStackholdersId.toString());
        break;
    }
  }
  delete(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          // this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پیام سیستم', 'حذف با موفقیت انجام شد.', () => {
            this.dataGrid.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }, () => {
    });
  }
  back() {
    this.redirectTo('/fac/portal-forms/' +  this.requestId);
  }

  onBackCompany() {
    this.redirectTo('/fac/detTaxLocation/' +  this.requestId);
  }

  onComplete() {

  }
}

