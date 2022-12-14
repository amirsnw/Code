import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-request-modal',
  templateUrl: './sso-request-modal.component.html',
  styleUrls: ['./sso-request-modal.component.css']
})
export class SSoRequestModalComponent extends TaminPageBaseComponent {
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
      .setFirstLoad(false)
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

  loadData() {
    this.dataGrid.searchParams = [];
    this.dataGrid.searchParams.push({property: 'request.id', operator: SearchOperator.EQUAL, value: this.requestId});
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
