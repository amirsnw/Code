import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inspection-objection-list',
  templateUrl: './inspection-objection-list.component.html',
  styleUrls: ['./inspection-objection-list.component.css']
})
export class InspectionObjectionListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  selectedItem: any;
  private _overlay: any;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }


  protected initializePage(): void {
    this.initializeDataGrid();
  }

  protected loadPageData(): void {
    // request.id
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.dataGrid.searchParams = [{
          property: 'request.id',
          value: params['id'],
          operator: SearchOperator.EQUAL
        }];

        this.dataGrid.refreshData();
      }
    });
  }

  onItemSelect(item) {
    this.selectedItem = item;
  }

  beforeRefreshData() {
    this.selectedItem = null;
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.InspectionObjection)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'request.id', columnCaption: 'کد پیگیری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'brchCode', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'inspectionNumberOld', columnCaption: 'شماره بازرسی مورد اعتراض', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'inspectionNumberNew', columnCaption: 'شماره بازرسی انجام شده پیرو درخواست اعتراض', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'request.requestDate', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'request.statusName', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label})
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
}
