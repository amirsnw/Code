import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaminActionColumn } from 'tamin-framework/lib/models/tamin-action-column.model';
import { DataColumnViewType, SearchOperator, SearchParam, TaminDataColumn, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent } from 'tamin-framework';
import { UploadFileModelComponent } from './upload-file-model/upload-file-model.component';
import {ClaimUrls} from '../../../claim-urls';
@Component({
  selector: 'app-pursue-list',
  templateUrl: './pursue-list.component.html',
  styleUrls: ['./pursue-list.component.css']
})

export class PursueListComponent extends TaminPageBaseComponent {
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @ViewChild('uploadFileModel') uploadFileModel: UploadFileModelComponent;
   public restUrl;
  private _overlay: any;
   visibleColumns: TaminDataColumn[];
   public restUrlPayPalPut;
  actionColumns: TaminActionColumn[] = [
    {
      columnName: 'view',
      columnCaption: 'مشاهده',
      columnViewType: 'Button',
      columnIconUrl: 'url(assets/images/icons/calendar_32.png)',
      columnActionName: 'view',
      icon: 'icon-ok',
      visible: true,
      enable: true
    },
    {
      columnName: 'edit',
      columnCaption: 'اطلاعات',
      columnViewType: 'Button',
      columnIconUrl: 'url(assets/images/icons/edit_24.png)',
      columnActionName: 'edit',
      icon: 'icon-ok',
      visible: true,
      enable: true

    }
  ];
  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];
  // end Grid ------------------------------<

  @ViewChild('branch') branch: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('status') status: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('workshopSpecification') workshopSpecification: TaminFieldAutoCompleteDataGridComponent;

  docStates = [
    { 'id': 1, 'statusDescription': 'ثبت اوليه' },
    { 'id': 2, 'statusDescription': 'غيرقابل ارسال' },
    { 'id': 3, 'statusDescription': 'در حال پردازش' },
    { 'id': 4, 'statusDescription': 'تاييد نهايي' },
    { 'id': 5, 'statusDescription': 'عدم تاييد نهايي' },
    { 'id': 6, 'statusDescription': 'تاييد پرداخت' },
    { 'id': 7, 'statusDescription': 'در حال انجام محاسبات' },
    { 'id': 8, 'statusDescription': 'در حال انجام صدور برگه' },
    { 'id': 9, 'statusDescription': 'خطاي داخلي شعبه' }
  ];

  @Output() afterSubmit = new EventEmitter<any>();

  searchForm: FormGroup;

  searchParams: SearchParam[];


  initializeList() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshopHistories)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'code', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'name', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();

  }


  initializePage() {
    this.searchForm = this.formBuilder.group({
      branchId: [''],
      workshopSpecificationId: [''],
      statusId: [''],
      stateDate: [''],
      traceCode: ['']
    });
    this._initializebranch();
    this._initializeworkshopSpecification();

    this.restUrl = ClaimUrls.workshopHistories;
    let column = new TaminDataColumn();
    this.visibleColumns = new Array<TaminDataColumn>();
    column.columnName = 'traceCode';
    column.columnCaption = 'شماره پیگیری';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'year';
    column.columnCaption = 'سال';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'month.monthDescription';
    column.columnCaption = 'ماه';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'status.statusDescription';
    column.columnCaption = 'وضعیت درخواست';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'creationTime';
    column.columnCaption = 'تاریخ ثبت وضعیت';
    column.columnViewType = DataColumnViewType.PersianDate;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'workshop.code';
    column.columnCaption = 'کد کارگاه';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'workshop.title';
    column.columnCaption = 'نام کارگاه';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'workshop.contractNumber';
    column.columnCaption = 'ردیف پیمان';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);

    column = new TaminDataColumn();
    column.columnName = 'workshop.organization.organizationName';
    column.columnCaption = 'نام شعبه';
    column.columnViewType = DataColumnViewType.Label;
    this.visibleColumns.push(column);
  }

  private _initializebranch() {
    this.branch.valueField = 'code';
    this.branch.displayField = 'name';
    this.branch.searchPattern = '%{term}%';
    this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.branchs)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'code', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'name', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  private _initializeworkshopSpecification() {
    this.workshopSpecification.valueField = 'workshopId';
    this.workshopSpecification.displayField = 'workshopName';
    this.workshopSpecification.searchPattern = '%{term}%';
    this.workshopSpecification.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshopSpecification)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  resetForm() {
    this.searchForm.reset();
    this.taminDataGrid.searchParams = new Array<SearchParam>();
    this.taminDataGrid.refreshData();
  }


  searchFormSubmit() {
    var values = this.searchForm.value
    this.searchParams = new Array<SearchParam>();
    let searchParam = new SearchParam();

    if ('' !== values.branchId) {
      searchParam.property = 'branchId';
      searchParam.value = values.branchId;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }

    if ('' !== values.workshopSpecificationId) {
      searchParam = new SearchParam();
      searchParam.property = 'workshopSpecificationId';
      searchParam.value = values.workshopSpecificationId;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }

    if ('' !== values.statusId) {
      searchParam = new SearchParam();
      searchParam.property = 'status.id';
      searchParam.value = values.statusId;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }

    if ('' !== values.traceCode) {
      searchParam = new SearchParam();
      searchParam.property = 'traceCode';
      searchParam.value = values.traceCode;
      searchParam.operator = SearchOperator.LIKE;
      this.searchParams.push(searchParam);
    }

    if ('' !== values.stateDate) {
      const persianDate = this.getPersianDate(values.stateDate);
      const persianDateSplited = persianDate.split('/');
      searchParam = new SearchParam();
      searchParam.property = 'year';
      searchParam.value = persianDateSplited[0];
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);

      searchParam = new SearchParam();
      searchParam.property = 'month.code';
      searchParam.value = persianDateSplited[1];
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }
    this.taminDataGrid.searchParams = this.searchParams;
    this.taminDataGrid.refreshData();
  }

  onGridAction(param: any) {
    if (param.actionColumn.columnName === 'view') {
      this.redirectTo(`/il/load-from-file/${param.item.traceCode}/${param.item.status.id}`);

    }

    // if (param.actionCell.columnActionName == 'approve') {
    // this._overlay = this.showOverlay();
    // this.restService.update(this.restUrlPayPalPut,param.dataItem, {})
    //     .then(result => {
    //       this.hideOverlay(this._overlay);
    //       this.taminDataGrid.refreshData();
    //     })
    //     .catch(error => {
    //       this.hideOverlay(this._overlay);
    //       this.taminDataGrid.refreshData();
    //     });
    // }
  }
  addList() {
    this.uploadFileModel.show();
  }
}
