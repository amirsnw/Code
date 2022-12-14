import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloReqDetNonComput} from '../../../models/alo-req-det-non-comput';
import {AloReqDetCheckedPeriod} from '../../../models/alo-req-det-checked-period';
import {AloRequestDetYearsSpec} from '../../../models/alo-request-det-years-spec';
import {CompanyAccountPeriod} from '../../../models/company-account-period';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-years-spec',
  templateUrl: './new-years-spec.component.html',
  styleUrls: ['./new-years-spec.component.css']
})
export class NewYearsSpecComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('isFinancialSystemComboBox') isFinancialSystemComboBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('FinancialSystemTypesComboBox') FinancialSystemTypesComboBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetYearsSpecId: any;
  private _overlay: any;
  fromDate: string;
  private row: any;
  toDate: string;
  nonComputList: Array<AloReqDetNonComput>;
  private _subscription = new Subscription();
  modalForm: FormGroup;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.modalForm = this.formBuilder.group({
      sealedNumber: [''],
      sealedDate: [''],
    });
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetYearsSpecId: [''],
      aloRequests: [''],
      tbFinancialSystemTypes: [''],
      sealedNumber: [''],
      sealedDate: [''],
      financialDocumentsNumber: ['', Validators.required],
      bindersNumber: ['', Validators.required],
      insurancePersonnelNumber: ['', Validators.required],
      nonStaffPersonnelNumber: [''],
      isFinancialSystem: ['', Validators.required],
      costContractsNumber: ['', Validators.required],
      incomeContractsNumber: ['', Validators.required],
      companyAccountPeriod: [''],
      finantialSystemName: [''],
      aloRequestDetSealed: [''],
      endDate: [''],
      FinancialSystemTypes: [''],
      });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.requestDetYearsSpecId = this.route.snapshot.params['yearsSpecId'];
    debugger;
    this.isFinancialSystemComboBox.dataItems = [
      {
        name: 'بله',
        value: '1'
      },
      {
        name:  'خیر',
        value: '2'
      }
     ];
    this.FinancialSystemTypesComboBox.dataItems = [
      {
        name: 'نوسا',
        value: '1'
      },
      {
        name:  'هلو',
        value: '2'
      },
      {
        name: 'همکاران سیستم',
        value: '3'
      },
      {
        name:  'سپیدار',
        value: '4'
      },
      {
        name: 'پاتریس',
        value: '5'
      },
      {
        name:  'کاکتوس',
        value: '6'
      },
      {
        name: 'همکاران سیستم',
        value: '7'
      },
      {
        name:  'تدبیر',
        value: '8'
      },
      {
        name: 'پگاه سیستم',
        value: '9'
      },
      {
        name:  'سیستم حسابداری سامان',
        value: '10'
      },
      {
        name: 'سایر',
        value: '99'
      },
      {
        name:  'برهان',
        value: '19791'
      },
    ];
    this.loadData();
    this._initializeDataGrid();
    this.editForm.get('isFinancialSystem').setValue('0');
    this.editForm.get('FinancialSystemTypes').disable();
    this.editForm.get('finantialSystemName').disable();
    this._subscription.add(this.editForm.get('isFinancialSystem').valueChanges.subscribe(value => {
      debugger;
     if (value === '1' ) {
        this.editForm.get('FinancialSystemTypes').enable();
      }
    }));
    this._subscription.add(this.editForm.get('FinancialSystemTypes').valueChanges.subscribe(value => {
      debugger;
      if (value === '99' ) {
        this.editForm.get('finantialSystemName').enable();
      }
    }));
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.YEARS_SPEC}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'sealedNumber', columnCaption: 'شماره پلمپ دفاتر ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'sealedDate', columnCaption: 'تاریخ پلمپ دفاتر', columnViewType: DataColumnViewType.PersianDate})
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
    this.dataGrid.afterRefreshData.subscribe(() => {
      this.fromDate = this.dataGrid.dataItems[0].fromDate;
      this.toDate = this.dataGrid.dataItems[0].toDate;
    });

  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.theModal.width = '50%';
        this.theModal.show();
        break;
      case 'delete':
        this.delete(param.item.requestDetYearsSpecId.toString());
        break;
    }
  }
  onNew() {
    this.theModal.width = '50%';
    this.theModal.show();
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

  loadData() {
    debugger;
    if (this.editMode === '1') {
      const theUrl = `${FacUrls.YEARS_SPEC_BY_ID}/` + this.requestDetYearsSpecId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          if (values.data ) {
            // this.editForm.patchValue(values.data.list[0]);
            this.requestDetYearsSpecId = values.data.list[0].requestDetYearsSpecId;
             this.editForm.get('financialDocumentsNumber').setValue(values.data.list[0].financialDocumentsNumber);
            this.editForm.get('bindersNumber').setValue(values.data.list[0].bindersNumber);
            this.editForm.get('insurancePersonnelNumber').setValue(values.data.list[0].insurancePersonnelNumber);
            this.editForm.get('nonStaffPersonnelNumber').setValue(values.data.list[0].nonStaffPersonnelNumber);
            this.editForm.get('isFinancialSystem').setValue(values.data.list[0].isFinancialSystem);
            this.editForm.get('FinancialSystemTypes').setValue(values.data.list[0].FinancialSystemTypes);
            this.editForm.get('finantialSystemName').setValue(values.data.list[0].finantialSystemName);
            this.editForm.get('costContractsNumber').setValue(values.data.list[0].costContractsNumber);
            this.editForm.get('incomeContractsNumber').setValue(values.data.list[0].incomeContractsNumber);
            this.requestDetYearsSpecId = values.data.list[0].requestDetYearsSpecId;
            this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
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
    for (let a = 0; a < values.aloReqDetNonComput.length; a++) {
      this.row = 1;
      this.row.reqDetNComutId = 0;
      this.nonComputList[a] =  this.row;
    }
    const jsondata = new AloRequestDetYearsSpec();
    jsondata.aloRequestDetSealed =  this.nonComputList
    jsondata.bindersNumber = values.bindersNumber;
    jsondata.companyAccountPeriod = values.companyAccountPeriod;
    jsondata.costContractsNumber = values.costContractsNumber;
    jsondata.edited = values.edited;
    jsondata.incomeContractsNumber = values.bindersNumber;
    jsondata.financialDocumentsNumber = values.financialDocumentsNumber;
    jsondata.finantialSystemName = values.costContractsNumber;
    jsondata.insurancePersonnelNumber = values.insurancePersonnelNumber;
    jsondata.sealedDate =   values.financialDocumentsNumber;
    jsondata.tbFinancialSystemTypes =   values.tbFinancialSystemTypes;
    jsondata.requestDetYearsSpecId =   values.financialDocumentsNumber;
    jsondata.nonStaffPersonnelNumber =   values.nonStaffPersonnelNumber;
    jsondata.isFinancialSystem =   values.isFinancialSystem;
    jsondata.sealedNumber =   values.sealedNumber;
    jsondata.companyAccountPeriod = new (CompanyAccountPeriod);
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriod.companyAccountPeriodId;
   jsondata.aloRequests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.aloRequests.requestId = this.requestId;
    } else {
      jsondata.aloRequests.requestId =  this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetYearsSpecId = this.requestDetYearsSpecId ;
    }
    debugger;
    if (this.requestDetYearsSpecId === undefined || this.requestDetYearsSpecId === '') {
      this.restService.create(FacUrls.CHECKED_PERIOD_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/yearsSpec/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.CHECKED_PERIOD_EDIT, this.requestDetYearsSpecId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/yearsSpec/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  doAddToGrid() {
    this.dataGrid.dataItems.push(this.modalForm.getRawValue());
  }

  doCancel() {
    this.theModal.hide();
  }

  back() {
    this.redirectTo('/fac/yearsSpec/' +  this.requestId);
  }

}
