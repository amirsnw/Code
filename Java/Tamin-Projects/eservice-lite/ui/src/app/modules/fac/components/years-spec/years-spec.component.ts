import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-years-spec',
  templateUrl: './years-spec.component.html',
  styleUrls: ['./years-spec.component.css']
})
export class YearsSpecComponent extends TaminPageBaseComponent {

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
    const theUrl = `${FacUrls.YEARS_SPEC}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'companyAccountPeriod.endDate', columnCaption: 'منتهی به تاریخ  ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'financialDocumentsNumber', columnCaption: 'تعداد کل اسناد مالی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bindersNumber', columnCaption: 'تعداد کل کلاسورها', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insurancePersonnelNumber', columnCaption: 'تعداد پرسنل بیمه ای', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'nonStaffPersonnelNumber', columnCaption: 'تعداد پرسنل غیر بیمه ای', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'costContractsNumber', columnCaption: 'تعداد قراردادهای هزینه ای', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'incomeContractsNumber', columnCaption: 'تعداد قراردادهای درآمدی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'sealedNumber', columnCaption: 'شماره پلمپ دفاتر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'sealedDate', columnCaption: 'تاریخ پلمپ دفاتر', columnViewType: DataColumnViewType.PersianDate})
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
  gridCellServiceNationality(item) {
    switch (item) {
      case '1':
        return 'ایرانی';
      case '2':
        return 'تبعه خارجی';
      case '0':
        return 'نامشخص';

    }
  }
  gridCellServicePosition(item) {
    switch (item) {
      case '1':
        return 'مدیرعامل';
      case '2':
        return 'رئیس حسابداری';
      case '3':
        return 'معاون مالی';
      case '4':
        return '';
    }
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newYearsSpec/' + this.editMode + '/' +  this.requestId + '/0');
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newYearsSpec/' + this.editMode + '/' + this.requestId + '/' +  param.item.requestDetYearsSpecId );
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

  onBackYears() {
    this.redirectTo('/fac/aloReqDetCheckedPeriod/' +  this.requestId);
  }

  onComplete() {

  }
}

