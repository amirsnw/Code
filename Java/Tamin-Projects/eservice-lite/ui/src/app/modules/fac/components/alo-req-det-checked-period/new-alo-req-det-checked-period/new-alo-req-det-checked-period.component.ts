import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloReqDetCheckedPeriod} from '../../../models/alo-req-det-checked-period';
import {AloReqDetNonComput} from '../../../models/alo-req-det-non-comput';

@Component({
  selector: 'app-new-alo-req-det-checked-period',
  templateUrl: './new-alo-req-det-checked-period.component.html',
  styleUrls: ['./new-alo-req-det-checked-period.component.css']
})
export class NewAloReqDetCheckedPeriodComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  editForm: FormGroup;
  modalForm: FormGroup;
  editFormDetail: FormGroup;
  private requestId: any;
  private editMode: any;
  private aloReqDetCheckedPeriodId: any;
   branches = [];
  private _overlay: any;
  private checkedPeriodId: any;
  fromDate: string;
  private row: any;
  toDate: string;
  nonComputList =  [] ;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {

    this.modalForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    });
    debugger;
    this.editForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reportNo: ['', Validators.required],
      reportDate: ['', Validators.required],
      branch: ['', Validators.required],
      workshopId: ['', Validators.required],
      fromDate: [''],
      toDate: [''],
      aloReqDetNonComput: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.checkedPeriodId = this.route.snapshot.params['checkedPeriodId'];
    this.editMode = this.route.snapshot.params['editMode'];
    debugger;
    this.loadData();
    this._initializeDataGrid();
    this.fillReciveBranchComboBox();
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.NON_COMPUT}/${this.checkedPeriodId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'fromDate', columnCaption: 'از تاريخ ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'toDate', columnCaption: 'تا تاريخ',  columnViewType: DataColumnViewType.PersianDate})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عمليات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ويرايش',
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
        this.theModal.width = '50%';
        this.theModal.show();
        break;
      case 'delete':
        this.delete(param.item.aloReqDetCheckedPeriodId.toString());
        break;
    }
  }
  onNew() {
    this.theModal.width = '50%';
    this.theModal.show();
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
  delete(id) {
    this.showQuestionBox('پيام سيستم', 'آيا از حذف اطلاعات اطمينان داريد؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          // this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پيام سيستم', 'حذف با موفقيت انجام شد.', () => {
            this.dataGrid.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پيام سيستم', this.constants.getNetworkErrorMessage());
        });
    }, () => {
    });
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.CHECKED_PERIOD_BY_ID}/` + this.checkedPeriodId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.total !== '0' &&  this.editMode === '1' ) {
          // this.editForm.patchValue(values.data);
          this.aloReqDetCheckedPeriodId = values.data.list[0].aloReqDetCheckedPeriodId;
          this.editForm.get('startDate').setValue(values.data.list[0].startDate);
          this.editForm.get('endDate').setValue(values.data.list[0].endDate);
          this.editForm.get('reportNo').setValue(values.data.list[0].reportNo);
          this.editForm.get('reportDate').setValue(values.data.list[0].reportDate);
          this.editForm.get('branch').setValue(values.data.list[0].reciveBranch.brhCode);
          this.editForm.get('workshopId').setValue(values.data.list[0].workshopId);
          // this.editForm.get('reciveBranch').setValue(values.data.list[0].reciveBranch.brhCode);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پيام سيستم', this.constants.getNetworkErrorMessage());
      });
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    for (let a = 0;  a < this.dataGrid.dataItems.length ; a++) {
      this.nonComputList.push(this.dataGrid.dataItems[a]);
      //   // this.row = 1;
      //   // this.row.reqDetNComutId = 0;
      //   this.nonComputList[a] =   this.modalForm.getRawValue();
    }
    // for (let a = 0;   a < this.nonComputList.length ; a++) {
    //  if (this.nonComputList.) {
    //
    //  }
    // }
    const jsondata = new AloReqDetCheckedPeriod();
    jsondata.reportNo = values.reportNo;
    jsondata.reportDate = values.reportDate;
    jsondata.reciveBranch = values.branch;
    jsondata.startDate = values.startDate;
    jsondata.endDate = values.endDate;
    jsondata.workshopId = values.workshopId;
    jsondata.aloReqDetNonComput =  this.nonComputList;
    jsondata.requests = new (AloRequest);
    jsondata.requests = this.requestId;
    if ( this.editMode === '1') {
      jsondata.aloReqDetCheckedPeriodId = this.aloReqDetCheckedPeriodId ;
    }
    debugger;
    if (this.aloReqDetCheckedPeriodId === undefined || this.aloReqDetCheckedPeriodId === '') {
      this.restService.create(FacUrls.CHECKED_PERIOD_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پيام سيستم', 'اطلاعات با موفقيت ذخيره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/aloReqDetCheckedPeriod/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخيره کردن اطلاعات مشکلي پيش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.CHECKED_PERIOD_EDIT, this.aloReqDetCheckedPeriodId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پيام سيستم', 'اطلاعات با موفقيت ذخيره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/aloReqDetCheckedPeriod/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخيره کردن اطلاعات مشکلي پيش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/aloReqDetCheckedPeriod/' +  this.requestId);
  }

  doAddToGrid() {
    this.dataGrid.dataItems.push(this.modalForm.getRawValue());
  }

  doCancel() {
    this.theModal.hide();
  }

  doDeleteToGrid() {

  }
}
