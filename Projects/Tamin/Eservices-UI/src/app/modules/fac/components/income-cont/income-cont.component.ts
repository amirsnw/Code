import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormsComponent} from '../forms/forms.component';
import {FormGroup} from '@angular/forms';
import {FacUrls} from '../../fac-urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-income-cont',
  templateUrl: './income-cont.component.html',
  styleUrls: ['./income-cont.component.css']
})
export class IncomeContComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('mapModal') mapModal: TaminModalComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('onForms') onForms: FormsComponent;
 form: FormGroup;
  id: any;
  map: any;
  branchCodes = [];
  statusTypes = [];
  private _overlay: any;
  loadCompleted = false;
  searchParams: SearchParam[];
  item: any;
  setHiddenBranch: any;
  private requestId: any;
  private editMode: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.form = this.formBuilder.group({
      contractNumber: [''],
      contractDate: [''],
      // workshopId: [''],
      signingContract: ['']
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
 }
   private _initializeDataGrid() {
    debugger;
     const theUrl = `${FacUrls.INCOME_CONT}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'contractDate', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'signingContract', columnCaption: 'واگذارنده کار', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'contractSubject', columnCaption: 'موضوع قرار داد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'contractStartDate', columnCaption: 'تاریخ شروع قرار داد ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'contractEndDate', columnCaption: 'تاریخ خاتمه قرار داد ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'initialAmountContract', columnCaption: 'جمع مبالغ اولیه و تغییرات آن ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'amountFunction', columnCaption: 'مبلغ ناخالص  کارکرد آخرین صورت وضعیت  ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dateFunction', columnCaption: 'تاریخ آخرین صورت وضعیت تایید شده ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'refinedNumber', columnCaption: 'شماره مفاصا حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refinedDate', columnCaption: 'تاریخ مفاصا حساب ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'refinedFunction', columnCaption: 'مبلغ ناخالص کارکرد مفاصا حساب ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refinedSeries', columnCaption: 'سریال مفاصا حساب', columnViewType: 'Label'})
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
      result.push(actionCells.find(c => c.columnActionName === 'onForms'));
      return result;
    };
    this.dataGrid.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newIncomeCont/' + this.editMode + '/' +  this.requestId  );
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newIncomeCont/' + this.editMode + '/' + this.requestId  + '/' + param.item.requestDetConContraId);
        break;
    }
  }

  private hasValue(data) {
    debugger;
    return data !== '' && data !== null  ;
  }
  onSearch() {
    const filter = [];
    debugger;
    if (this.hasValue(this.form.controls.signingContract.value)) {
      filter.push({
        property: 'signingContract',
        value: this.form.get('signingContract').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.contractNumber.value)) {
      filter.push({
        property: 'contractNumber',
        value:  this.form.get('contractNumber').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.contractDate.value)) {
      filter.push({
        property: 'contractDate',
        value: this.form.get('contractDate').value.toString(),
        operator: SearchOperator.EQ
      });
    }
    if (this.hasValue(this.form.controls.signingContract.value)) {
      filter.push({
        property: 'signingContract',
        value: this.form.get('signingContract').value.toString(),
        operator: SearchOperator.EQ
      });
    }
    this.dataGrid.searchParams = [];
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    debugger;
    this.dataGrid.serviceUrl = `${FacUrls.SYSTEM_REQUEST}`;
    this.dataGrid.refreshData();
  }

  resetSearch() {
    this.form.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }
  back() {
    this.redirectTo('/fac/portal-forms/' +  this.requestId);
  }

  onBackIncome() {
    this.redirectTo('/fac/conContra/' +  this.requestId);
  }

  onComplete() {

  }
}
