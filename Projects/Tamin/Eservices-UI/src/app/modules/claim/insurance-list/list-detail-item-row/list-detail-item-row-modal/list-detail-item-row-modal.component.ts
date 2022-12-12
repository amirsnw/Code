import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Injector } from '@angular/core';
import {
  DataColumnViewType,
  SearchOperator,
  TaminModalComponent,
  SearchParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListDetailItemRowModel } from 'src/app/models/insurance-list/listDetailItemRow.model';
import { InsuranceModel } from 'src/app/models/insurance-list/insurance.model';
import {ClaimUrls} from '../../../claim-urls';
@Component({
  selector: 'app-list-detail-item-row-modal',
  templateUrl: './list-detail-item-row-modal.component.html',
  styleUrls: ['./list-detail-item-row-modal.component.css']
})
export class ListDetailItemRowModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;

  public lDIRModelModal: ListDetailItemRowModel;
  public insuranceModel: InsuranceModel;
  sortParams: any[] = [];
  @Output() selectedNotionalCode = new EventEmitter<any>();
  @Output() afterSubmit = new EventEmitter<any>();
  public router: ActivatedRoute;


  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  private overlay: any;
  detailForm: FormGroup;
  // public listDetailModel: ListDetailModel;

  private _overlay: any;

  searchParams: SearchParam[];

  initializePage() {
    this.title = 'تهیه لیست بیمه';
    this.detailForm = this.formBuilder.group({
      id: [''],
      nationalId: [''],
    });
    this._initializeDataGrid();
    //this.searchFormSubmit(this.router.snapshot.params['listid']);
  }
  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.InsuranceWorkshopRelation)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'insurance.id',
        columnCaption: 'شماره بیمه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.nationalId',
        columnCaption: 'کد ملی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.firstName',
        columnCaption: 'نام',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.lastName',
        columnCaption: 'نام خانوادگی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.fatherName',
        columnCaption: 'نام پدر',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.gender.genderDesc',
        columnCaption: 'جنسیت',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.idCardNumber',
        columnCaption: 'شماره شناسنامه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'identityIssuPlace',
        columnCaption: 'محل صدور شناسنامه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insurance.dateOfBirth',
        columnCaption: 'تاریخ تولد',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({
        columnName: 'insurance.nation.nationDesc',
        columnCaption: 'ملیت',
        columnViewType: DataColumnViewType.Label
      })
      // .addVisibleColumn({
      //   columnName: 'employeePremium',
      //   columnCaption: 'سهم بیمه شده',
      //   columnViewType: DataColumnViewType.Label
      // })
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .addActionColumn({
        columnName: 'select',
        columnCaption: 'انتخاب',
        columnViewType: 'Button',
        columnActionName: 'select',
        icon: 'icon-view',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  resetForm() {
    this.detailForm.reset();
    this.searchFormSubmit(null);
  }


  searchFormSubmit(value: any) {
    this.searchParams = new Array<SearchParam>();
    if (value != null) {
      if (value.nationalId) {
        const searchParam = new SearchParam();
        searchParam.property = 'insurance.nationalId';
        searchParam.value = value.nationalId;
        searchParam.operator = SearchOperator.EQ;
        this.searchParams.push(searchParam);
      }
      if (value.id) {
        const searchParam = new SearchParam();
        searchParam.property = 'insurance.id';
        searchParam.value = value.id;
        searchParam.operator = SearchOperator.EQ;
        this.searchParams.push(searchParam);
      }
    }
    const searchParam = new SearchParam();
    searchParam.property = 'rwshid.workshopId';
    searchParam.value = this.lDIRModelModal.listId.workshopCode;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    const searchParam2 = new SearchParam();
    searchParam2.property = 'rwshid.branchCode';
    searchParam2.value = this.lDIRModelModal.listId.brchCode;
    searchParam2.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam2);

    this.taminDataGrid.searchParams = this.searchParams;
    this.taminDataGrid.refreshData();
  }
  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;

    switch (actionColumn.columnName) {
      case 'select':
        this.insuranceModel = dataItem.insurance;
        this.selectedNotionalCode.emit();
        // this.redirectTo(`/il/list-details-item-row/${this.router.snapshot.params['listid']}/${dataItem.id}`);
        break;
    }
  }

  show(lDIRModelModal: ListDetailItemRowModel) {
    this.lDIRModelModal = lDIRModelModal;
    this.searchFormSubmit(null);
    this.theModal.width = '70%';
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }
}
