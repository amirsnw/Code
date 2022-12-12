import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ConstantsService, DataColumnViewType, SearchOperator, SearchParam, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ClaimUrls} from '../../../claim-urls';
import {Urls} from '../../../../../settings/urls';
import {SortDirection} from 'tamin-framework/lib/models/sort-param.model';

@Component({
  selector: 'app-workshop-history',
  templateUrl: './workshop-history.component.html',
  styleUrls: ['./workshop-history.component.css']
})
export class WorkshopHistoryComponent extends TaminPageBaseComponent {

  searchForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('workshop') workshop: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('branch') branch: TaminFieldAutoCompleteDataGridComponent;
  states = [
    {'id': 1, 'name': 'ثبت اوليه'},
    {'id': 2, 'name': 'غيرقابل ارسال'},
    {'id': 3, 'name': 'در حال پردازش'},
    {'id': 4, 'name': 'تاييد نهايي'},
    {'id': 5, 'name': 'عدم تاييد نهايي'},
    {'id': 6, 'name': 'تاييد پرداخت'},
    {'id': 7, 'name': 'در حال انجام محاسبات'},
    {'id': 8, 'name': 'در حال انجام صدور برگه'},
    {'id': 9, 'name': 'خطاي داخلي شعبه'}
  ];
  months = [
    {'id': '01', 'name': 'فروردین'},
    {'id': '02', 'name': 'اردیبهشت'},
    {'id': '03', 'name': 'خرداد'},
    {'id': '04', 'name': 'تیر'},
    {'id': '05', 'name': 'مرداد'},
    {'id': '06', 'name': 'شهریور'},
    {'id': '07', 'name': 'مهر'},
    {'id': '08', 'name': 'آبان'},
    {'id': '09', 'name': 'آذر'},
    {'id': '10', 'name': 'دی'},
    {'id': '11', 'name': 'بهمن'},
    {'id': '12', 'name': 'اسفند'}
  ];

  private _initializeWorkshopAutoComplete() {
    this.workshop.valueField = 'workshop.id';
    this.workshop.displayField = 'workshop.title';
    this.workshop.searchPattern = '{term}';
    this.workshop.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshops)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('id')
      .addVisibleColumn({columnName: 'workshop.code', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.title', columnCaption: 'نام کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.contractNumber', columnCaption: 'ردیف پیمان', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshop.organization.title', columnCaption: 'شعبه', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  constructor(injector: Injector, private constantsService: ConstantsService) {
    super(injector);
  }


  private initializeHistoryDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addSortParam({
        property: 'statusModificationTime',
        direction: 'DESC'
      })
      .addUrl(ClaimUrls.workshopHistories)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'traceCode', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Label, columnSortable: true})
      .addVisibleColumn({columnName: 'year', columnCaption: 'سال', columnViewType: DataColumnViewType.Label, columnSortable: true})
      .addVisibleColumn({columnName: 'month', columnCaption: 'ماه', columnViewType: DataColumnViewType.Label, columnSortable: true})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label, columnSortable: true})
      .addVisibleColumn({columnName: 'paymentStatus', columnCaption: 'وضعیت پرداخت', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'statusModificationTime', columnCaption: 'تاریخ تغییر وضعیت', columnViewType: DataColumnViewType.PersianDate, columnSortable: true})
      .addVisibleColumn({columnName: 'workshop.code', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workshop.title', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'organization.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label, columnSortable: true})
      .addVisibleColumn({columnName: 'workshop.contractNumber', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addActionColumn({
          columnName: 'view',
          columnCaption: 'مشاهده ریز اطلاعات',
          columnViewType: 'Button',
          columnActionName: 'view',
          columnIconUrl: '',
          icon: '',
          visible: true, enable: true
        }
      )
      .addActionColumn({
          columnName: 'remove',
          columnCaption: 'حذف لیست',
          columnViewType: 'Button',
          columnActionName: 'remove',
          columnIconUrl: '',
          icon: '',
          visible: true, enable: true
        }
      )
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      if (item.status === 1 || item.status === 2) {
        result.push(actionCells.find(c => c.columnActionName === 'view'));
        result.push(actionCells.find(c => c.columnActionName === 'remove'));
      } else {
        result.push(actionCells.find(c => c.columnActionName === 'view'));
      }
      return result;
    };

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'month') {
        const tmp = this.months.find(c => c.id === item.month).name;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'status') {
        const tmp = this.states.find(c => c.id === item.status).name;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'paymentStatus') {
        if (
          item.paymentOrder !== null &&
          item.paymentOrder.referenceBankId !== null) {
          return {handled: true, data: 'پرداخت شده'};
        }
        return {handled: true, data: ''};
      }
      return {handled: false, data: ''};
    };
  }

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
//      contactNumber: [''],
      workshop: [''],
      statusId: [''],
      stateDate: [''],
      stateMonth: [''],
      stateYear: [''],
      traceCode: [''],
      branch: ['']
    });
    this._initializeWorkshopAutoComplete();
    this.initializeHistoryDataGrid();
  }


  resetForm() {
    this.searchForm.reset();
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.searchParams = [];
    this.dataGrid.refreshData();
  }

  doSearch() {
    const values = this.searchForm.getRawValue();
    const searchParams = new Array<SearchParam>();
    let searchParam = new SearchParam();


    if (values.workshop) {
      searchParam = new SearchParam();
      searchParam.property = 'workshop.id';
      searchParam.value = values.workshop;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.branch) {
      searchParam = new SearchParam();
      searchParam.property = 'organization.code';
      searchParam.value = values.branch;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.statusId) {
      searchParam = new SearchParam();
      searchParam.property = 'status';
      searchParam.value = values.statusId;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.traceCode) {
      searchParam = new SearchParam();
      searchParam.property = 'traceCode';
      searchParam.value = values.traceCode;
      searchParam.operator = SearchOperator.LIKE;
      searchParams.push(searchParam);
    }

    if (values.stateMonth) {
      searchParam = new SearchParam();
      searchParam.property = 'month';
      searchParam.value = values.stateMonth;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.stateYear) {
      searchParam = new SearchParam();
      searchParam.property = 'year';
      searchParam.value = values.stateYear;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }
    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.refreshData();
    }
  }

  addNewList() {
    this.redirectTo('il/insurance-list-new');
  }

  onShowDetails(data) {
    switch (data.actionColumn.columnActionName) {
      case 'remove':
        this.showQuestionBox('توجه', 'آیا مطمئن هستید؟', () => {
          this.restService.delete(ClaimUrls.removeList, data.item.id.toString())
            .then(value => {
              this.showInfoMessageBox('توجه', 'لیست با موفقیت حذف شد.', () => {
                this.dataGrid.refreshData();
              });
            })
            .catch(reason => {
              if (reason.error.data.cause === 'UserNotAllowedException') {
                this.showErrorMessageBox('خطا', reason.error.data.message);
              } else {
                this.showErrorMessageBox('خطا', this.constantsService.getNetworkErrorMessage());
              }
            });
        }, () => {
        });
        break;
      case 'view':
        this.redirectTo('il/workshop-history/view/' + data.item.id);
        break;
    }
  }

  clearSearch() {
    this.searchForm.reset();
    this.dataGrid.searchParams = null;
    this.dataGrid.refreshData();
  }
}
