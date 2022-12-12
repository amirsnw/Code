import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-announcement-search',
  templateUrl: './announcement-search.component.html',
  styleUrls: ['./announcement-search.component.css']
})
export class AnnouncementSearchComponent extends TaminPageBaseComponent {
  @Output() afterSubmit = new EventEmitter<any>();
  @ViewChild('type') type: TaminFieldComboBoxComponent;
  @ViewChild('subType') subType: TaminFieldComboBoxComponent;
  @ViewChild('branch') branch: TaminFieldAutoCompleteDataGridComponent;
  searchForm: FormGroup;
  searchParams: SearchParam[];

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      eblaghNo: [''],
      workshopCode: ['', Validators.maxLength(10)],
      pyman: [''],
      branchCode: ['', Validators.maxLength(4)],
      type: [''],
      subType: [''],
      docDateFrom: [''],
      docDateTo: ['']
    });
    this._initializeType();
    this._initializeSubType();
    this._initializeBranch();
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(new Array<SearchParam>());
  }

  private _initializeBranch() {
    this.branch.valueField = 'code';
    this.branch.displayField = 'name';
    this.branch.searchPattern = '%{term}%';
    this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesByFilter)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(true)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  searchFormSubmit(values, valid) {
    this.searchParams = new Array<SearchParam>();
    const searchParam_eblaghNo = new SearchParam();
    searchParam_eblaghNo.property = 'details.eblaghNo';
    searchParam_eblaghNo.value = this.searchForm.value['eblaghNo'];
    searchParam_eblaghNo.operator = SearchOperator.EQ;
    if (searchParam_eblaghNo.value && searchParam_eblaghNo.value !== '') {
      this.searchParams.push(searchParam_eblaghNo);
    }
    const searchParam_workshopCode = new SearchParam();
    searchParam_workshopCode.property = 'details.workshopCode';
    searchParam_workshopCode.value = this.searchForm.value['workshopCode'];
    searchParam_workshopCode.operator = SearchOperator.EQ;
    if (searchParam_workshopCode.value && searchParam_workshopCode.value !== '') {
      this.searchParams.push(searchParam_workshopCode);
    }
    const searchParam_pyman = new SearchParam();
    searchParam_pyman.property = 'details.pymanSEQ';
    searchParam_pyman.value = this.searchForm.value['pyman'];
    searchParam_pyman.operator = SearchOperator.EQ;
    if (searchParam_pyman.value && searchParam_pyman.value !== '') {
      this.searchParams.push(searchParam_pyman);
    }
    const searchParam_branchCode = new SearchParam();
    searchParam_branchCode.property = 'details.branchCode';
    searchParam_branchCode.value = this.searchForm.value['branchCode'];
    searchParam_branchCode.operator = SearchOperator.EQ;
    if (searchParam_branchCode.value && searchParam_branchCode.value !== '') {
      this.searchParams.push(searchParam_branchCode);
    }
    const searchParam_docDateFrom = new SearchParam();
    searchParam_docDateFrom.property = 'details.docDateFrom';
    searchParam_docDateFrom.value = new Date(this.searchForm.value['docDateFrom']).getTime().toString();
    searchParam_docDateFrom.operator = SearchOperator.EQ;
    if (searchParam_docDateFrom.value && searchParam_docDateFrom.value !== '0' && searchParam_docDateFrom.value !== 'NaN' && searchParam_docDateFrom.value !== '') {
      this.searchParams.push(searchParam_docDateFrom);
    }
    const docDateTo = this.searchForm.get('docDateTo').value;
    if (docDateTo !== undefined && docDateTo !== '' && docDateTo !== null) {
      const searchParam_docDateTo = new SearchParam();
      searchParam_docDateTo.property = 'details.docDateTo';
      searchParam_docDateTo.value = (this.searchForm.value['docDateTo'].getTime() + 86400000).toString();
      searchParam_docDateTo.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam_docDateTo);
    }
    if (values.type) {
      this.searchParams.push({
        property: 'type.typeCode',
        value: values.type,
        operator: SearchOperator.EQ
      });
    }
    if (values.subType) {
      this.searchParams.push({
        property: 'subType.typeCode',
        value: values.subType,
        operator: SearchOperator.EQ
      });
    }
    this.afterSubmit.emit(this.searchParams);
  }

  private _initializeType() {
    this.type.valueField = 'typeCode';
    this.type.displayField = 'typeDesc';
    this.type.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'نام سیستم', columnViewType: 'Label'})
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

  private _initializeSubType() {
    this.subType.valueField = 'typeCode';
    this.subType.displayField = 'typeDesc';
    this.subType.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementSubType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'موضوع', columnViewType: 'Label'})
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
}
