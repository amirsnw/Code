import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-det-request-auditors',
  templateUrl: './det-request-auditors.component.html',
  styleUrls: ['./det-request-auditors.component.css']
})
export class DetRequestAuditorsComponent extends TaminPageBaseComponent {

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
    const theUrl = `${FacUrls.AUDITORS}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'nationalId', columnCaption: 'کد/شناسه  ملی ',  columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'auditorName', columnCaption: 'نام موسسه و یا حسابرس مستقل ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'phoneNumber', columnCaption: 'شماره تلفن', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'postCode', columnCaption: 'کد پستی ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'reportResult', columnCaption: 'نتیجه گزارش ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceReportResult})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'منتهی به تاریخ', columnViewType: DataColumnViewType.PersianDate})
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
  gridCellServiceReportResult(item) {
    switch (item) {
      case '1':
        return 'مقبول';
      case '2':
        return 'مشروط';
      case '3':
        return 'عدم اظهارنظر';
      case '4':
        return 'مردود';

    }
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newDetRequestAuditors/' + this.editMode + '/' +  this.requestId + '/0');
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newDetRequestAuditors/' + this.editMode + '/' + this.requestId + '/' +  param.item.aloRequestDetAuditorsId );
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

  onBackAuditors() {
    this.redirectTo('/fac/companyAccountPeriod/' +  this.requestId);
  }

  onComplete() {

  }
}

