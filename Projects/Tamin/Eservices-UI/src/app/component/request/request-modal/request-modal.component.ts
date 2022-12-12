import { Component, OnInit, ViewChild } from '@angular/core';
import {TaminModalComponent, TaminDataGridComponent, DataColumnViewType, TaminDataGridConfigurationFactory, SearchOperator, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private requestId = null;

initializePage() {
  this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
.clearActionColumns()
    .clearSearchParams()
    .clearSortParams()
    .clearVisibleColumns()
    .addUrl(Urls.ErrorRequest)
    .setShowPager(true)
    .setFirstLoad(true)
    .addVisibleColumn({columnName: 'errorMassage', columnCaption: 'توضیحات خطا', columnViewType: DataColumnViewType.Label})
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


  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request + '/request-error-entity')
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'errorMassage', columnCaption: 'توضیحات خطا', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();
  }

  loadData() {
      this.dataGrid.searchParams = [];
      this.dataGrid.searchParams.push({ property: 'request.id', operator:  SearchOperator.EQUAL, value: this.requestId });
      this.dataGrid.refreshData();
  }

  show(requestId: any) {
    this.requestId = requestId;
    this.loadData();
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

  cloaseNewHeader() {
    this.theModal.hide();
  }

}
