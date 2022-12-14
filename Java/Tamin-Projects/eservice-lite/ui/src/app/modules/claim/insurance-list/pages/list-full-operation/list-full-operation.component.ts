import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {Urls} from 'src/app/settings/urls';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam,
  TaminDataColumn,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {ListFullOperationModalComponent} from './list-full-operation-modal/list-full-operation-modal.component';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-list-full-operation',
  templateUrl: './list-full-operation.component.html',
  styleUrls: ['./list-full-operation.component.css']
})

export class ListFullOperationComponent extends TaminPageBaseComponent {

  // start Grid --------------------------------->
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];
  // end Grid ------------------------------<

  @ViewChild('workshopSpecification') workshopSpecification: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('listFullOperationModal') listFullOperationModal: ListFullOperationModalComponent;
  months = [
    {name: 'فروردین', value: '01'},
    {name: 'اردیبهشت', value: '02'},
    {name: 'خرداد', value: '03'},
    {name: 'تیر', value: '04'},
    {name: 'مرداد', value: '05'},
    {name: 'شهریور', value: '06'},
    {name: 'مهر', value: '07'},
    {name: 'آبان', value: '08'},
    {name: 'آذر', value: '09'},
    {name: 'دی', value: '10'},
    {name: 'بهمن', value: '11'},
    {name: 'اسفند', value: '12'}
  ];

  @Output() afterSubmit = new EventEmitter<any>();

  searchForm: FormGroup;
  searchParams: SearchParam[];
  private _overlay: any;

  initializePage() {
    this.title = 'تهیه لیست بیمه';
    this.searchForm = this.formBuilder.group({
      workshopCode: [''],
      contractNumber: [''],
      year: ['', [Validators.minLength(4), Validators.maxLength(4)]],
      month: [''],
    });
    this._initializeworkshopSpecification();
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.listRecord)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'listNumber',
        columnCaption: 'شماره لیست',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'year',
        columnCaption: 'سال',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'month.monthDescription',
        columnCaption: 'ماه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workshopCode',
        columnCaption: 'کد کارگاه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workshopTitle',
        columnCaption: 'نام کارگاه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'contractNumber',
        columnCaption: 'ردیف پیمان',
        columnViewType: DataColumnViewType.Label
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(true)
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
      .addActionColumn({
        columnName: 'send',
        columnCaption: 'ارسال',
        columnViewType: 'Button',
        columnActionName: 'send',
        icon: 'icon-ok',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeworkshopSpecification() {
    this.workshopSpecification.valueField = 'workshopId';
    this.workshopSpecification.displayField = 'workshopName';
    // this.workshopSpecification.searchPattern = '%{term}%';
    this.workshopSpecification.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshopSpecification)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام', columnViewType: 'Label'})
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
    this.searchParams = new Array<SearchParam>();

    const workshopCode = this.searchForm.get('workshopCode').value;
    const contractNumber = this.searchForm.get('contractNumber').value;
    const year = this.searchForm.get('year').value;
    const month = this.searchForm.get('month').value;

    if (workshopCode) {
      const searchParam = new SearchParam();
      searchParam.property = 'workshopCode';
      searchParam.value = workshopCode;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }
    if (contractNumber) {
      const searchParam = new SearchParam();
      searchParam.property = 'contractNumber';
      searchParam.value = contractNumber;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }
    if (year) {
      const searchParam = new SearchParam();
      searchParam.property = 'year';
      searchParam.value = year;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }
    if (month) {
      const searchParam = new SearchParam();
      searchParam.property = 'month.code';
      searchParam.value = month;
      searchParam.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam);
    }

    this.taminDataGrid.searchParams = this.searchParams;
    this.taminDataGrid.refreshData();
  }

  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;

    switch (actionColumn.columnName) {
      case 'edit':
        this.redirectTo(`/il/list-details/${dataItem.id}`);
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(ClaimUrls.listRecord, dataItem.id.toString())
            .then(value => {
              this.hideOverlay(this._overlay);
              this.taminDataGrid.refreshData();
              this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت حذف گردید.');
            })
            .catch(error => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', error.message);
            });
        }, () => {
        });
        break;
      case 'send':
        this._overlay = this.showOverlay();
        const putData = {
          id: dataItem.id,
          operation: '01'
        };
        this.restService.update<any>(ClaimUrls.listRecord, dataItem.id.toString(), putData)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.taminDataGrid.refreshData();
            this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ارسال گردید.');
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', error.message);
          });
        break;
    }
  }

  refreshData() {
    this.taminDataGrid.refreshData();
  }

  show() {
    this.listFullOperationModal.show();
  }
}

