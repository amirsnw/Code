import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-det-tax-location',
  templateUrl: './det-tax-location.component.html',
  styleUrls: ['./det-tax-location.component.css']
})
export class DetTaxLocationComponent  extends TaminPageBaseComponent {

  @ViewChild('taxSalaryLocationGrid') taxSalaryLocationGrid: TaminDataGridComponent;
  @ViewChild('incomeTaxLocationGrid') incomeTaxLocationGrid: TaminDataGridComponent;
  private requestId: any;
  private editMode: any;
  private _overlay: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializetaxSalaryLocationGrid();
    this._initializeDataGridIncomeTaxLocation();
  }
  private _initializetaxSalaryLocationGrid() {
    debugger;
    const theUrl = `${FacUrls.TAX_LOCATIONS_SALARY}/${this.requestId}`;
    this.taxSalaryLocationGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'taxLocNo', columnCaption: 'شماره حوزه مالیات', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'منتهی به تاریخ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'taxLocProvince.provinceName', columnCaption: 'استان ',  columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'taxLocCity.cityName', columnCaption: 'شهر',  columnViewType: 'Label'})
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
        columnActionName: 'editSalary',
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
        columnActionName: 'deleteSalary',
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

    this.taxSalaryLocationGrid.cellRenderer = (item, column) => {
           // if (item.taxLocCity.cityName) {
      //   const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
      //   return {handled: true, data: tmp};
      // }
      // if (item.taxLocProvince.provinceName) {
      //   const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
      //   return {handled: true, data: tmp};
      // }
      return {handled: false, data: ''};
    };

    this.taxSalaryLocationGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'editSalary'));
      result.push(actionCells.find(c => c.columnActionName === 'deleteSalary'));
      return result;
    };
  }
  private _initializeDataGridIncomeTaxLocation() {
    debugger;
    const theUrl = `${FacUrls.TAX_LOCATIONS_INCOME}/${this.requestId}`;
    this.incomeTaxLocationGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'taxLocNo', columnCaption: 'شماره حوزه مالیات', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'منتهی به تاریخ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'taxLocProvince.provinceName', columnCaption: 'استان ',  columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'taxLocCity.cityName', columnCaption: 'شهر',  columnViewType: 'Label'})
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
        columnActionName: 'editIncome',
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
        columnActionName: 'deleteIncome',
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

    this.incomeTaxLocationGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'editIncome'));
      result.push(actionCells.find(c => c.columnActionName === 'deleteIncome'));
      return result;
    };
    this.incomeTaxLocationGrid.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };
  }
  onNewDetIncomeTaxLocation() {
    debugger;
    //   taxLocationId  = 0   editMode = 0   salaryMOde = 0
    this.redirectTo('/fac/newDetTaxLocation/'  +  this.requestId + '/0/0/0');
  }
  onNewDetSalaryTaxLocation() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newDetTaxLocation/' +  this.requestId +  '/0/0/1');
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'editIncome':
        // editMode = '1   salaryMOde = 0
        this.redirectTo('/fac/newDetTaxLocation/' +  this.requestId  + '/' + param.item.detTaxLocationId + '/1/0');
        break;
      case 'editSalary':
        this.redirectTo('/fac/newDetTaxLocation/' +  this.requestId   + '/' + param.item.detTaxLocationId + '/1/1');
        break;
    }
  }
  onEdit(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newDetTaxLocation/' + this.editMode + '/' + this.requestId);
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
            // this.gridDetDafaterAddress.refreshData();
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
}
