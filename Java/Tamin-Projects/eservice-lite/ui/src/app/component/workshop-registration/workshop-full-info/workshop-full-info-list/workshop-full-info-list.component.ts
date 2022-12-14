import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../../settings/urls';

@Component({
  selector: 'app-workshop-full-info-list',
  templateUrl: './workshop-full-info-list.component.html',
  styleUrls: ['./workshop-full-info-list.component.css']
})
export class WorkshopFullInfoListComponent extends TaminPageBaseComponent {

  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;
  @Output() sendRecord = new EventEmitter<any>();

  searchParams: SearchParam[];
  employerSearchForm: FormGroup;

  initializePage() {
    this._initializeDataGrid();
  }

  loadPageData() {
    this.loadData();
  }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData(item = null) {
    this.searchParams = [];
    if (item && item.workshopId !== undefined && item.workshopId !== '' && item.workshopId !== null) {
      this.searchParams.push({
        property: 'workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item && item.branchCode !== undefined && item.branchCode !== '' && item.branchCode !== null) {
      this.searchParams.push({
        property: 'branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.workshopListGrid.pagerCurrentPage = 1;
    this.workshopListGrid.serviceUrl = `${Urls.employerByLegal}`;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
  }

  onItemSelect(param: any) {
    this.sendRecord.emit(param);
  }

}
