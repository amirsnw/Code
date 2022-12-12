import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';
import {FormsComponent} from '../forms/forms.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-con-contra',
  templateUrl: './con-contra.component.html',
  styleUrls: ['./con-contra.component.css']
})
export class ConContraComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('mapModal') mapModal: TaminModalComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('onForms') onForms: FormsComponent;
  @ViewChild('isOkComboBox') isOkComboBox: TaminFieldComboBoxStaticComponent;
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
      workshopId: [''],
      treatyRow: [''],
      branchCode: [''],
      contractNumber: [''],
      isOk: ['']
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
    this.fillReciveBranchComboBox();
    this.setHiddenBranch = true;
    this.isOkComboBox.dataItems = [
      {
        name: 'با اطلاعات سازمان مغایرت دارد',
        value: '1'
      }, {
        name: 'با اطلاعات سازمان مغایرت ندارد',
        value: '2'
      }, {
        name: '   فاقد اطلاعات نزد سازمان',
        value: '0'
      }
    ];
   // this.securityService.getCurrentUser()
    //   .then(value => {
    //     debugger;
    //     if (value.roles.length > 0) {
    //       for ( let i = 0; i <= value.roles.length ; i++ ) {
    //         if ( value.roles[i].roleName ===  'EMPLOYER') {
    //           this.setHiddenBranch = true;
    //           return;
    //         }
    //       }
    //     }
    //    })
    //   .catch(reason => {
    //   });
  }
  // ERROR DARE    vaghti load mishe samte server koli record bar migardone
  fillReciveBranchComboBox() {
    // const theUrl = `${FacUrls.BRANCH}`;
    // this.restService.getAll(theUrl)
    //   .then(data => {
    //     (data.data.list as Array<any>).forEach((item) => {
    //       this.branchCodes.push({
    //         name:  item.brhCode + ' - ' + item.brhName,
    //         value: item.brhCode
    //       });
    //     });
    //   })
    //   .catch(reason => {
    //   });
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.CON_CONTRA}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
          .addVisibleColumn({columnName: 'isOk', columnCaption: 'وضعیت بررسی اطلاعات ', columnViewType: DataColumnViewType.Custom,  columnTranslator: this.gridCellServiceisOk})
          .addVisibleColumn({columnName: 'branches.brhName', columnCaption: 'شعبه', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'treatyRow', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'contractNumber', columnCaption: 'شماره قرارداد',  columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'contractDate', columnCaption: 'تاريخ قرارداد ', columnViewType: DataColumnViewType.PersianDate})
          .addVisibleColumn({columnName: 'contractor', columnCaption: 'نام پیمانکار', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'contractSubject', columnCaption: 'موضوع قرارداد', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'contractStartDate', columnCaption: 'تاریخ شروع قرارداد', columnViewType: DataColumnViewType.PersianDate})
          .addVisibleColumn({columnName: 'contractEndDate', columnCaption: 'تاریخ خاتمه قرارداد ', columnViewType: DataColumnViewType.PersianDate})
          .addVisibleColumn({columnName: 'initialAmountContract', columnCaption: 'جمع مبالغ اولیه وتغییرات آن ', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'amountFunction', columnCaption: 'مبلغ ناخالص کارکرد تایید شده', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'totalApprovedFunction', columnCaption: 'تاریخ آخرین صورت وضعیت  کارکرد تایید شده', columnViewType: DataColumnViewType.PersianDate})
          .addVisibleColumn({columnName: 'insuranceDeposit', columnCaption: 'سپرده بیمه کل کارکرد تایید شده', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'refinedNumber', columnCaption: 'شماره مفاصا حساب ', columnViewType: 'Label'})
          .addVisibleColumn({columnName: 'refinedDate', columnCaption: 'تاریخ مفاصا حساب', columnViewType: DataColumnViewType.PersianDate})
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
  // private _initializeDataGrid() {
  //   debugger;
  //   const theUrl = `${FacUrls.CON_CONTRA}/${this.requestId}`;
  //   this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .setFirstLoad(true)
  //     .addUrl(theUrl)
  //     .addVisibleColumn({columnName: 'isOk', columnCaption: 'وضعیت بررسی اطلاعات ', columnTranslator: this.gridCellServiceisOk})
  //     .addVisibleColumn({columnName: 'branches.brhName', columnCaption: 'شعبه', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'treatyRow', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'contractNumber', columnCaption: 'شماره قرارداد',  columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'contractDate', columnCaption: 'تاريخ قرارداد ', columnViewType: DataColumnViewType.PersianDate})
  //     .addVisibleColumn({columnName: 'contractor', columnCaption: 'نام پیمانکار', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'contractSubject', columnCaption: 'موضوع قرارداد', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'contractStartDate', columnCaption: 'تاریخ شروع قرارداد', columnViewType: DataColumnViewType.PersianDate})
  //     .addVisibleColumn({columnName: 'contractEndDate', columnCaption: 'تاریخ خاتمه قرارداد ', columnViewType: DataColumnViewType.PersianDate})
  //     .addVisibleColumn({columnName: 'initialAmountContract', columnCaption: 'جمع مبالغ اولیه وتغییرات آن ', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'amountFunction', columnCaption: 'مبلغ ناخالص کارکرد تایید شده', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'totalApprovedFunction', columnCaption: 'تاریخ آخرین صورت وضعیت  کارکرد تایید شده', columnViewType: DataColumnViewType.PersianDate})
  //     .addVisibleColumn({columnName: 'insuranceDeposit', columnCaption: 'سپرده بیمه کل کارکرد تایید شده', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'refinedNumber', columnCaption: 'شماره مفاصا حساب ', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'refinedDate', columnCaption: 'تاریخ مفاصا حساب', columnViewType: DataColumnViewType.PersianDate})
  //     .addVisibleColumn({columnName: 'refinedFunction', columnCaption: 'مبلغ ناخالص کارکرد مفاصا  حساب', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'refinedSeries', columnCaption: 'سریال مفاصا حساب ', columnViewType: 'Label'})
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setActionColumnCaption('عملیات')
  //     .addActionColumn({
  //       columnName: 'edit',
  //       columnCaption: 'ویرایش',
  //       columnViewType: 'Button',
  //       icon: '',
  //       columnIconUrl: '',
  //       columnActionName: 'edit',
  //       isActionAuthorized: false,
  //       visible: true,
  //       enable: true
  //
  //     })
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(true)
  //     .setShowFooter(false)
  //     .setShowPager(true)
  //     .setViewType('GridView')
  //     .setFirstLoad(true)
  //     .getData();
  //
  //   this.dataGrid.cellRenderer = (item, column) => {
  //     // if (column.columnName === 'startDate' && item.startDate && item.startDate.length === 6) {
  //     //   const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
  //     //   return {handled: true, data: tmp};
  //     // }
  //     // item.aloRefineId;
  //     return {handled: false, data: ''};
  //   };
  //   this.dataGrid.actionRenderer = (item, actionCells) => {
  //     const result = [];
  //     result.push(actionCells.find(c => c.columnActionName === 'editModir'));
  //     result.push(actionCells.find(c => c.columnActionName === 'deleteModir'));
  //     return result;
  //   };
  // }
  gridCellServiceisOk(item) {
    switch (item) {
      case '1':
        return  'با اطلاعات سازمان مغایرت دارد';
      case '2':
        return 'با اطلاعات سازمان مغایرت ندارد';
      case '0':
        return '   فاقد اطلاعات نزد سازمان';

    }
  }
 onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newConContra/' + this.editMode + '/' +  this.requestId  );
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newConContra/' + this.editMode + '/' + this.requestId  + '/' + param.item.requestDetConContraId);
        break;
    }
  }
  loadData() {
    const theUrl = `${FacUrls.CON_CONTRA}/${this.requestId}`;
    debugger;
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this.dataGrid.serviceUrl = theUrl;
      this.dataGrid
        .refreshData()
        .then(value => {
          this.hideOverlay(this._overlay);
          this.loadCompleted = true;
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject(reason);
        });
    });
  }
  private hasValue(data) {
    debugger;
    return data !== '' && data !== null  ;
  }
  onSearch() {
    const filter = [];
    debugger;
    if (this.hasValue(this.form.controls.workshopId.value)) {
      filter.push({
        property: 'workshopId',
        value: this.form.get('workshopId').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.treatyRow.value)) {
      filter.push({
        property: 'treatyRow',
        value:  this.form.get('treatyRow').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.branchCode.value)) {
      filter.push({
        property: 'branches.brhCode',
        value: this.form.get('branchCode').value.toString(),
        operator: SearchOperator.LIKE
      });
    }
    if (this.hasValue(this.form.controls.isOk.value)) {
      filter.push({
        property: 'isOk',
        value: this.form.get('isOk').value.toString(),
        operator: SearchOperator.EQ
      });
    }
    if (this.hasValue(this.form.controls.contractNumber.value)) {
      filter.push({
        property: 'contractNumber',
        value: this.form.get('contractNumber').value.toString(),
        operator: SearchOperator.EQ
      });
    }
    this.dataGrid.searchParams = [];
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    debugger;
    this.dataGrid.serviceUrl = `${FacUrls.CON_CONTRA}/${this.requestId}`;
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

  onBackCheck() {
    this.redirectTo('/fac/detRequestAuditors/' +  this.requestId);
  }

  onComplete() {

  }

  onBackCon() {

  }
}
