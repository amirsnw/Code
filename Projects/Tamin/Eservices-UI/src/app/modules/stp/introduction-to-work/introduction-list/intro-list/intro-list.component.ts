import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DataColumnViewType, SearchOperator,
  SearchParam, SortParam, SortDirection,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from "tamin-framework";
import { FormGroup } from "@angular/forms";
import { Urls } from '../../../../../settings/urls';
import {StpUrls} from '../../../stp-urls';
// import {WorkshopFullInfoMembersListComponent} from "../../../../workshop-registration/workshop-full-info/workshop-full-info-members-list/workshop-full-info-members-list.component";
@Component({
  selector: 'app-intro-list',
  templateUrl: './intro-list.component.html',
  styleUrls: ['./intro-list.component.css']
})
export class IntroListComponent extends TaminPageBaseComponent {
  @ViewChild('introDataGrid') introDataGrid: TaminDataGridComponent;
  searchParams: SearchParam[];

  workshopId: string;
  organizationId: string;
  private _overlay: any;
  initializePage() {
    this._initializeDataGrid();
  }
  private _initializeDataGrid() {
     const sortParam = new SortParam();
    sortParam.property = 'intLno';
    sortParam.direction = SortDirection.DESC;

    this.introDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam(sortParam)
      .addVisibleColumn({
        columnName: 'intLno',
        columnCaption: 'شماره معرفی نامه',
        columnViewType: 'Label'
      })
      .addVisibleColumn({
        columnName: 'intDate',
        columnCaption: 'تاریخ معرفی نامه',
        columnViewType: 'Label'
      })
      .addVisibleColumn({ columnName: 'risuname', columnCaption: ' نام و نام خانوادگی بیمه شده ', columnViewType: 'Label' })
      .addVisibleColumn({
        columnName: 'nationalid',
        columnCaption: 'کد ملی  ',
        columnViewType: 'Label'
      })
      .addVisibleColumn({ columnName: 'risuId', columnCaption: 'شماره بیمه', columnViewType: 'Label' })
  .addVisibleColumn({
        columnName: 'flag',
        columnCaption: 'نوع ',
        columnViewType: 'Label'
      })
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'sendAnswer',
        columnCaption: ' ارسال پاسخ ',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'sendAnswer',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.introDataGrid.actionRender = (item, actionCells) => {
      const result = [];
      if (item.intAzdat1 == null || item.intAzdat1 == '' || item.intAzdat1 == '//') {
        result.push(actionCells.find(c => c.columnActionName === 'sendAnswer'));
      }
      return result;
    }
    this.introDataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'flag' && item.flag=='t') {
        return {handled: true, data: '<span>معرفی به کار</span>'};
      }
      else if (column.columnName === 'flag' && item.flag=='q') {
        return {handled: true, data: '<span>استعلام وضعیت </span>'};
      }
    return {handled: false, data: ''};
    };

    this.introDataGrid.cellStyler = (item, column) => {
      if (item.intAzdat1 == null || item.intAzdat1 == '' || item.intAzdat1 == '//') {
        return {
          'background-color': 'green',
          'color': 'white'
        }
      }
    };
  }
  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'sendAnswer':
        this.redirectTo('stp/introduction/' + param.item.intLno);
        break;
    }
  }
  loadData(item) {
    if (item !== null) {
      this.workshopId = item.workshopId;
      this.organizationId = item.branchCode;
    }
    this.introDataGrid.serviceUrl = StpUrls.STP_Introduction_To_work;
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    if (this.workshopId !== null) {
      searchParam.property = 'rwshid';
      searchParam.value = this.workshopId;//'0018220985';
    }
    searchParam.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam);
    this.introDataGrid.searchParams = this.searchParams;
    this.introDataGrid.refreshData();
  }

}
