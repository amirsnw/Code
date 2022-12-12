import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Urls} from '../../../settings/urls';
import {TaminStaticDataService} from '../../../services/tamin-static-data.service/tamin-static-data.service';
import {DataColumnViewType, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent} from 'tamin-framework';

@Component({
  selector: 'app-booklet-search',
  templateUrl: './booklet-search.component.html',
  styleUrls: ['./booklet-search.component.css']
})
export class BookletSearchComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();
  @ViewChild('organizationDataGrid') organizationDataGrid: TaminFieldAutoCompleteDataGridComponent;
  searchForm: FormGroup;
  requestTypes = [];
  printStatus = [];

  constructor(public formBuilder: FormBuilder, private taminStaticDataService: TaminStaticDataService) {
  }

  ngOnInit() {
    this._initializeFromGroup();
    this._initializeOrganizationDataGrid();
    this.requestTypes = this.taminStaticDataService.getBookletRequestTypes();
    this.printStatus = this.taminStaticDataService.getBookletPrintStatus();
  }

  resetForm() {
    this.searchForm.reset();
    this.submit.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit() {
    this.submit.emit(this.searchForm.getRawValue());
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      requestCreationTimeFrom: [''],
      requestCreationTimeTo: [''],
      organizationId: [''],
      requestType: [''],
      printStatus: ['']
    });
  }

  private _initializeOrganizationDataGrid() {
    this.organizationDataGrid.valueField = 'code';
    this.organizationDataGrid.displayField = 'name';
    this.organizationDataGrid.searchPattern = '%{term}%';
    this.organizationDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesAll)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchAddress', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
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
