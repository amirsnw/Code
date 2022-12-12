import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetFinanCost} from '../../../models/alo-request-det-finan-cost';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetConContra} from '../../../models/alo-request-det-con-contra';

@Component({
  selector: 'app-new-con-contra',
  templateUrl: './new-con-contra.component.html',
  styleUrls: ['./new-con-contra.component.css']
})
export class NewConContraComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetConContraId: any;
   branches = [];


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetFinanCostId: [''],
      aloRequests: [''],
      companyAccountPeriod: [''],
      branch: ['', [Validators.required]],
      workshopId: ['', [Validators.required]],
      treatyRow: ['', [Validators.required]],
      contractNumber: ['', [Validators.required]],
      contractDate: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
      contractSubject: ['', [Validators.required]],
      contractStartDate: ['', [Validators.required]],
      contractEndDate: ['', [Validators.required]],
      initialAmountContract: ['', [Validators.required]],
      amountFunction: ['', [Validators.required]],
      totalApprovedFunction: ['', [Validators.required]],
      insuranceDeposit: ['', [Validators.required]],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.requestDetConContraId = this.route.snapshot.params['conContraId'];
    debugger;
    this.loadData();
    this._initializeDataGrid();
    this.fillReciveBranchComboBox();
  }

  loadData() {
    debugger;
    if (this.editMode === '1') {
     const theUrl = `${FacUrls.CON_CONTRA}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetConContraId = values.data.list[0].requestDetConContraId;
         this.editForm.get('branch').setValue(values.data.list[0].branches.brhCode);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetConContra();
    jsondata.branches = values.branches;
    jsondata.workshopId = values.workshopId;
    jsondata.treatyRow = values.treatyRow;
    jsondata.contractor = values.contractor;
    jsondata.contractNumber = values.contractNumber;
    jsondata.contractDate = values.contractDate;
    jsondata.contractSubject =  values.contractSubject;
    jsondata.initialAmountContract =  values.initialAmountContract;
    jsondata.isOk =  values.isOk;
    jsondata.newYear =  values.newYear;
    jsondata.contractStartDate = values.contractStartDate;
    jsondata.contractEndDate = values.contractEndDate;
    jsondata.totalApprovedFunction = values.totalApprovedFunction;
    jsondata.amountFunction = values.amountFunction;
    jsondata.insuranceDeposit = values.insuranceDeposit;
    jsondata.refinedNumber = values.refinedNumber;
    jsondata.refinedDate =  values.refinedDate;
    jsondata.refinedFunction =  values.refinedFunction;
    jsondata.refinedSeries =  values.refinedSeries;
    jsondata.confirm =  values.confirm;
    jsondata.differencesFieldsDesc =  values.differencesFieldsDesc;
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.requestDetConContraId = this.requestDetConContraId ;
    }
    debugger;
    if (this.requestDetConContraId === undefined || this.requestDetConContraId === '') {
      this.restService.create(FacUrls.CON_CONTRA_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/conContra/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.CON_CONTRA_EDIT, this.requestDetConContraId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/conContra/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }
  fillReciveBranchComboBox() {
    debugger;
    const theUrl = `${FacUrls.BRANCH}`;
    // this.editForm.onNewget('clinic').setValue('');
    this.restService.getAll(theUrl)
      .then(data => {
        (data.data.list as Array<any>).forEach((item) => {
          this.branches.push({
            name: item.brhName,
            value: item.brhCode
          });
        });
      })
      .catch(reason => {
      });
  }

  back() {
    this.redirectTo('/fac/conContra/' +  this.requestId);
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.CON_CONTRA_DET}/${this.requestDetConContraId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'refinedNumber', columnCaption: 'شماره مفاصا حساب  ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'refinedDate', columnCaption: 'تاریخ مفاصا حساب ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refinedFunction', columnCaption: 'مبلغ ناخالص کارکرد مفاصا  حساب', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refinedSeries', columnCaption: 'سریال مفاصا حساب ', columnViewType: 'Label'})
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
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newFinanCost/' + this.editMode + '/' + this.requestId);
        break;
    }
  }

}
