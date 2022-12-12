import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-request-details',
  templateUrl: './sso-request-details.component.html',
  styleUrls: ['./sso-request-details.component.css']
})
export class SsoRequestDetailsComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request_Detail_Entity)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'organizationId', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
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

  open(id) {
    this.theModal.show();
    const searchParam = new SearchParam();
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'request.id';
    this.dataGrid.searchParams = [];
    this.changeDetectorRef.detectChanges();
    this.dataGrid.searchParams = [searchParam];
    this.dataGrid.refreshData();
  }
}
