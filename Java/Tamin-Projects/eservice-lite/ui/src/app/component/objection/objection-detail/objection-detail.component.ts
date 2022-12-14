import {Component, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-objection-detail',
  templateUrl: './objection-detail.component.html',
  styleUrls: ['./objection-detail.component.css']
})
export class ObjectionDetailComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  protected initializePage(): void {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({
        columnName: 'status',
        columnCaption: 'وضعیت',
        columnViewType: DataColumnViewType.Custom,
        columnTranslator: this.gridCellStatusTranslator
      })
      .addVisibleColumn({columnName: 'smsDescription', columnCaption: 'متن پیامک', columnViewType: 'Label'})
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
    this.changeDetectorRef.detectChanges();
    this.dataGrid.serviceUrl = Urls.ObjectionDetail + '/' + id;
    this.dataGrid.refreshData();
  }

  gridCellStatusTranslator(item) {
    switch (item) {
      case '1':
        return 'ثبت درخواست';
      case '2':
        return 'بازنگري محاسبات';
      case '3':
        return 'طرح در هيئت';
      case '4':
        return 'تجدید محاسبه شده';
      case '5':
        return 'تخصیص زمان';
      case '6':
        return 'تایید رای';
      case '7':
        return 'نقص مدارک';
      case '8':
        return 'رد درخواست';
      case '9':
        return 'تایید درخواست';
      default:
        return 'نامشخص';
    }
  }

}
