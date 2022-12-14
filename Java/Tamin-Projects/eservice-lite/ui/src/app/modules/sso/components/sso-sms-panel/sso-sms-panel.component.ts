import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SortDirection, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {FormGroup, Validators} from '@angular/forms';

import * as momentNs from 'jalali-moment';

const moment = momentNs;

@Component({
  selector: 'app-sso-sms-panel',
  templateUrl: './sso-sms-panel.component.html',
  styleUrls: ['./sso-sms-panel.component.css']
})
export class SsoSmsPanelComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  searchForm: FormGroup;

  protected initializePage(): void {
    this._initializeDataGrid();
    this.searchForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      date: [''],
    });
  }

  protected loadPageData(): void {
  }

  private _initializeDataGrid() {

    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SSO_SMS)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'applicationId', columnCaption: 'ارسال کننده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'phoneNumber', columnCaption: 'موبایل', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sendingDate', columnCaption: 'تاریخ ارسال', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'providerErr', columnCaption: 'پیام سرویس دهنده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت پیام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'message', columnCaption: 'پیام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .addSortParam({
        property: 'sendingDate',
        direction: SortDirection.DESC
      })
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'phoneNumber') {
        const pn = '0' + item.phoneDetails[0].phoneNumber.toString().substr(2);
        return {handled: true, data: pn};
      }
      if (column.columnName === 'sendingDate') {
        const tmp = moment.from((new Date(item.sendingDate)).toString(), 'en').locale('fa').format('YYYY/M/D HH:mm:ss');
        return {handled: true, data: `<span>${tmp}</span>`};
      }
      return {handled: false, data: ''};
    };

  }

  onSearch() {
    if (!this.searchForm.valid) {
      this.markFormGroupAsTouched(this.searchForm);
      return;
    }
    const pn = this.searchForm.get('phoneNumber').value;
    const date = this.searchForm.get('date').value;
    if (pn.trim() !== '') {
      this.dataGrid.searchParams = [];
      this.dataGrid.searchParams.push({property: 'phoneDetails.phoneNumber', operator: SearchOperator.EQ, value: pn});
      if (date !== '') {
        this.dataGrid.searchParams.push({property: 'sendingDate', operator: SearchOperator.EQ, value: new Date(date).getTime()});
      }
      this.dataGrid.pagerCurrentPage = 1;
      this.dataGrid.refreshData();
    }
  }

  onBeforeRefreshDataGrid() {
    if (this.dataGrid.searchParams.length === 0) {
      this.dataGrid.searchParams.push({property: 'phoneDetails.phoneNumber', operator: SearchOperator.EQ, value: ''});
    }
  }
}
