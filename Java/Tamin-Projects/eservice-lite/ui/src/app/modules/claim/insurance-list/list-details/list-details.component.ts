import { Component, EventEmitter, Injector, Output, OnInit, ViewChild } from '@angular/core';
import { Urls } from 'src/app/settings/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent,
  PersianNumberPipe
} from 'tamin-framework';
import { ListDetailModel } from 'src/app/models/insurance-list/listDetail.model';
import { ListDetailItemRowModel } from 'src/app/models/insurance-list/listDetailItemRow.model';
import {ClaimUrls} from '../../claim-urls';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent extends TaminPageBaseComponent {


  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;

  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];

  @Output() afterSubmit = new EventEmitter<any>();
  public router: ActivatedRoute;
  public persianNumberPipe: PersianNumberPipe;


  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  private overlay: any;
  detailForm: FormGroup;
  public listDetailModel: ListDetailModel;

  private _overlay: any;

  searchParams: SearchParam[];

  initializePage() {
  this.persianNumberPipe = new PersianNumberPipe();

    this.title = 'تهیه لیست بیمه';
    this.detailForm = this.formBuilder.group({
      totalEmployeePremium: [''],
      totalEmployerPremium: [''],
      hardJobPremium: [''],
      totalUnemploymentPremium: [''],
    });
    this._initializeDataGrid();
    this.searchFormSubmit(this.router.snapshot.params['listid']);
    this.searchFormSubmitInfo(this.router.snapshot.params['listid']);
  }
  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.listItemRecord)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'firstName',
        columnCaption: 'نام',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'lastName',
        columnCaption: 'نام خانوادگی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workingDays',
        columnCaption: 'روزهای کارکرد',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'dailyWage',
        columnCaption: 'دستمزد روزانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'monthlyWage',
        columnCaption: 'دستمزد ماهانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'includedContinuousBonus',
        columnCaption: 'مزایای مشمول مستمر',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'includedContinuousBonus',
        columnCaption: 'مزایای مشمول غیر مستمر',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'excludedBonus',
        columnCaption: 'مزایای غیر مشمول',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'employeePremium',
        columnCaption: 'سهم بیمه شده',
        columnViewType: DataColumnViewType.Label
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        columnActionName: 'edit',
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnActionName: 'delete',
        icon: 'icon-cancel',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  resetForm() {
    this.detailForm.reset();
    this.taminDataGrid.searchParams = new Array<SearchParam>();
    this.taminDataGrid.refreshData();
  }


  searchFormSubmit(listDetailId) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'listId.id';
    searchParam.value = listDetailId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.taminDataGrid.searchParams = this.searchParams;
    this.taminDataGrid.refreshData();
  }
  searchFormSubmitInfo(listDetailId) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'id';
    searchParam.value = listDetailId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.restService.getAll(ClaimUrls.listRecord, this.searchParams, [])
      .then(data => {
        this.listDetailModel = data.data.list[0] as ListDetailModel;
        this.detailForm.patchValue(data.data.list[0]);
      }).catch(error => {
      });

  }
  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;

    switch (actionColumn.columnName) {
      case 'edit':
        this.redirectTo(`/il/list-details-item-row/${this.router.snapshot.params['listid']}/${dataItem.id}`);
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(ClaimUrls.listItemRecord, dataItem.id.toString())
            .then(value => {
              this.hideOverlay(this._overlay);
              this.searchFormSubmit(this.router.snapshot.params['listid']);
              this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت حذف گردید.');
            })
            .catch(error => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', error.message);
            });
        }, () => {
        });
        break;
    }
  }

  saveForm(values) {
    if (!this.detailForm.valid) {
      return;
    }
    values.operation = "00"
    this.overlay = this.showOverlay();
    this.restService
      .update(ClaimUrls.listRecord, this.router.snapshot.params['listid'], values)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد ');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason);
      });
  }
  newCustomer() {
    this.redirectTo(`/il/list-details-item-row/${this.router.snapshot.params['listid']}`);
  }
}
