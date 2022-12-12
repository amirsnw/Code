import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-alo-req-det-checked-period',
  templateUrl: './alo-req-det-checked-period.component.html',
  styleUrls: ['./alo-req-det-checked-period.component.css']
})
export class AloReqDetCheckedPeriodComponent extends TaminPageBaseComponent {

@ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

private requestId: any;
private editMode: any;
private _overlay: any;
  private data: number[];
  fromDate: any;
  toDate: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
}
private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.CHECKED_PERIOD}/${this.requestId}`;

  function renderColumn() {
    debugger;
    // for (let i = 0; i < r.data.aloReqDetNonComput.length; i++) {
    //   startDate = startDate + Audit.tamin.helpers.Persian.gregorianToPersian(new Date(Number(r.data.aloReqDetNonComput[i].fromDate))) + ",";
    // }
    // startDate = startDate.substr(0, startDate.length - 1);
    return '';
  }

  this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'reportNo', columnCaption: 'شماره گزارش ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'reportDate', columnCaption: 'تاریخ گزارش', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'reciveBranch.brhName', columnCaption: 'شعبه دریافت کننده', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'شروع دوره ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'پایان دوره ',   columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'fromDate', columnCaption: 'شروع دوره های عیر محاسباتی',   columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName:  'toDate', columnCaption: 'پایان دوره های غیر محاسباتیه ',  columnViewType: DataColumnViewType.PersianDate})
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
     this.fromDate = '';
     this.toDate = '';
     if (column.columnName === 'fromDate') {
       for (let i = 0; i < item.aloReqDetNonComput.length; i++) {
         this.fromDate = this.fromDate +  this.getPersianDate(new Date(item.aloReqDetNonComput[i].fromDate)) + ',';
       }
       return {handled: true, data: this.fromDate.substr(0,  this.fromDate.length - 1)};
     }
     if (column.columnName === 'toDate') {
       for (let i = 0; i < item.aloReqDetNonComput.length; i++) {
         this.toDate = this.toDate +  this.getPersianDate(new Date(item.aloReqDetNonComput[i].toDate)) + ',';
       }
       return {handled: true, data: this.toDate.substr(0,  this.toDate.length - 1)};
     }
    return {handled: false, data:  ''};
    };
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newAloReqDetCheckedPeriod/' + this.editMode + '/' +  this.requestId + '/0' );
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newAloReqDetCheckedPeriod/' + this.editMode + '/' + this.requestId + '/' + param.item.aloReqDetCheckedPeriodId);
        break;
      case 'delete':
        this.delete(param.item.aloReqDetCheckedPeriodId.toString());
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

  onBackCheck() {
    this.redirectTo('/fac/detRequestAuditors/' +  this.requestId);
  }

  onComplete() {

  }
}

