import {Component, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-workshop-full-info-list',
  templateUrl: './sso-workshop-full-info-list.component.html',
  styleUrls: ['./sso-workshop-full-info-list.component.css']
})
export class SsoWorkshopFullInfoListComponent extends TaminPageBaseComponent {

  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;
  @Output() sendRecord = new EventEmitter<any>();

  searchParams: SearchParam[];

  initializePage() {
    this._initializeDataGrid();
  }

  loadPageData() {
    // this.loadData();
  }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
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
    if (!item || item == undefined || item == null || item.nationalCode === undefined || item.nationalCode == null || item.nationalCode.length !== 10) {
      this.showErrorMessageBox('پیام سیستم', 'کاربر گرامی لطفا ابتدا کد ملی کارفرما را به درستی وارد نمایید.');
      return;
    }
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
    if (item && item.ticketCode !== undefined && item.ticketCode !== '' && item.ticketCode !== null) {
      this.searchParams.push({
        property: 'ticketCode',
        value: item.ticketCode,
        operator: SearchOperator.EQ

      });
    }
    this.searchParams.push({
      property: 'serviceName',
      value: 'workshopPaymentSheets',
      operator: SearchOperator.EQ

    });
    this.workshopListGrid.pagerCurrentPage = 1;
    this.workshopListGrid.serviceUrl = `${Urls.employerWorkshopsCRM}` + '/' + item.nationalCode;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
  }

  onItemSelect(param: any) {
    this.sendRecord.emit(param);
  }

}
