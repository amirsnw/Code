import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {RequestModel} from '../../../../models/dynamic-request/request.model';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-request-list-new',
  templateUrl: './request-list-new.component.html',
  styleUrls: ['./request-list-new.component.css']
})
export class RequestListNewComponent extends TaminPageBaseComponent {
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  items: RequestModel[];
  private _overlay: any;
  selectedItem: RequestModel;

  initializePage() {
    const sortParam = new SortParam();
    sortParam.property = 'refCode';
    sortParam.direction = SortDirection.DESC;

    const searchParam = new SearchParam();
    searchParam.value = '03';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';

    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request)
      .setShowPager(true)
      .setFirstLoad(true)
      .addSortParam(sortParam)
      .addSearchParam(searchParam)
      .addVisibleColumn({columnName: 'refCode', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'title', columnCaption: 'عنوان درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'userName', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'comment', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'createByName', columnCaption: 'کاربر درخواست کننده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'creationTime', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'status.requestDesc', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'deliverCode', columnCaption: 'کد تحویل', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'نمایش درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'view',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  onGridAction(param: any) {
    console.log(param);
    this.selectedItem = param.item;
    const actionName = param.actionColumn.columnActionName;

    switch (param.item.requestType.id) {
      case 12:
        this.redirectTo('stp/orthosis-and-prosthesis-view-new' + '/' + param.item.refrenceid);
        break;
      case 10:
        this.redirectTo('stp/indemnity-view-new' + '/' + param.item.refrenceid);
        break;
      case 11:
        this.redirectTo('stp/pregnancy-view-new' + '/' + param.item.refrenceid);
        break;
      case 13:
        this.redirectTo('stp/marriage-view-new' + '/' + param.item.refrenceid);
        break;
      case 15:
        this.redirectTo('stp/funeral-view-new' + '/' + param.item.refrenceid);
        break;
    }
  }
}
