import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-contract-acc',
  templateUrl: './contract-acc.component.html',
  styleUrls: ['./contract-acc.component.css']
})
export class ContractAccComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  private requestId: any;
  private editMode: any;
  private _overlay: any;
  private companyId: any;
  private endDate: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
  }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.CONTRACT_ACC}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'companyAccountPeriod.endDate', columnCaption: 'منتهی به تاریخ  ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'contractRevenue', columnCaption: 'درآمد پیمانکاری', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'finishedGoodsPrice', columnCaption: 'قیمت تمام شده کار', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'grossProfitsLosses', columnCaption: 'سود و زیان ناویژه ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'totalDepositsDeductions', columnCaption: 'جمع سپرده مکسوره', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'contractRelatedPremium', columnCaption: 'حق بیمه پیمانکاری', columnViewType: 'Label'})
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
    debugger;
   this.dataGrid.afterRefreshData.subscribe(() => {
      this.companyId = this.dataGrid.dataItems[0].companyAccountPeriod.companyAccountPeriodId;
      this.endDate = this.dataGrid.dataItems[0].companyAccountPeriod.endDate;
    });
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newContractAcc/' + this.editMode + '/' +  this.requestId + '/' +  this.companyId + '/' + this.endDate + '/0' );
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newContractAcc/' + this.editMode + '/' + this.requestId + '/' +  this.companyId + '/' + this.endDate + '/' +  param.item.requestDetContractAccId);
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

  onBackContract() {
    this.redirectTo('/fac/stock/' +  this.requestId);
  }

  onComplete() {

  }
}

