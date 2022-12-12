import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrls: ['./user-feedbacks.component.css']
})
export class UserFeedbacksComponent extends TaminPageBaseComponent {

  @ViewChild('theGrid') theGrid: TaminDataGridComponent;

  protected initializePage(): void {
    this.theGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SITE_FEEDBACK)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'CreatedOn', columnCaption: 'تاریخ ارسال', columnViewType: DataColumnViewType.Label})
      // .addVisibleColumn({columnName: 'Description', columnCaption: 'شرح اشکال', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'StatusReason', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'Response', columnCaption: 'پاسخ', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
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

  protected loadPageData(): void {
    this.theGrid.refreshData();
  }

  backToPanelClick() {
    this.redirectTo('me');
  }
}
