import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-salar-cost',
  templateUrl: './salar-cost.component.html',
  styleUrls: ['./salar-cost.component.css']
})
export class SalarCostComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  private requestId: any;
  private editMode: any;
  private _overlay: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.SALAR_COST}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'companyAccountPeriod.endDate', columnCaption: 'منتهی به تاریخ ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'salaryBenefitOfficeStaff', columnCaption: 'حقوق و مزایای کارکنان دفتر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'salaryBenefitFactoryStaff', columnCaption: 'حقوق و مزایای کارکنان کارخانه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dueEmployerShare', columnCaption: 'حق کارفرما حق بیمه 23% ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'salaryOtherFunds', columnCaption: 'حقوق سایر صندوق ها ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dueMission', columnCaption: 'حق مأموریت', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'reward', columnCaption: 'کارانه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bonuses', columnCaption: 'عیدی و پاداش', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'yearsOld', columnCaption: 'سنوات', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'totalSumSalarCost', columnCaption: 'جمع کل', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'edited', columnCaption: 'فاقد اطلاعات', columnViewType: 'Label'})
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
 onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newSalarCost/' + this.editMode + '/' +  this.requestId);
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newSalarCost/' + this.editMode + '/' + this.requestId);
        break;
      case 'delete':
        this.delete(param.item.requestDetSalarCostId.toString());
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

  onComplete() {
    this.redirectTo('/fac/saleAndDispedCharges/' +  this.requestId);
  }

  onBackSalar() {

  }
}

