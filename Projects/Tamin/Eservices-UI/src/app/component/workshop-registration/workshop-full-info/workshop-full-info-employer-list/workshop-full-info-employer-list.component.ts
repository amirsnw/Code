import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../../settings/urls';

@Component({
  selector: 'app-workshop-full-info-employer-list',
  templateUrl: './workshop-full-info-employer-list.component.html',
  styleUrls: ['./workshop-full-info-employer-list.component.css']
})
export class WorkshopFullInfoEmployerListComponent extends TaminPageBaseComponent {
  @ViewChild('employerListGrid') employerListGrid: TaminDataGridComponent;

  searchParams: SearchParam[];

  employerSearchForm: FormGroup;

  initializePage() {
    this._initializeDataGrid();
  }

  gridCellRecieveTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'اعضای هیئت مدیره';
      case '2':
        return 'صاحبان امضا';
      case '3':
        return 'مدیرعامل';
      default:
        return item;
    }
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  private _initializeDataGrid() {
    this.employerListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'nationalId', columnCaption: 'کد ملی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'personalRegistrationOffice.firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'personalRegistrationOffice.lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'personalRegistrationOffice.fatherName', columnCaption: 'نام پدر', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'personalRegistrationOffice.birthDate', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat })
      .addVisibleColumn({ columnName: 'stackType', columnCaption: 'سمت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellRecieveTypeTranslator })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData(item) {
    this.searchParams = [];
    if (item.workshopId !== undefined && item.workshopId !== '') {
      this.searchParams.push({
        property: 'workshopId.workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item.branchCode !== undefined && item.branchCode !== '') {
      this.searchParams.push({
        property: 'workshopId.branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.employerListGrid.pagerCurrentPage = 1;
    this.employerListGrid.serviceUrl = `${Urls.WorkshopsStackholders}`;
    this.employerListGrid.searchParams = this.searchParams;
    this.employerListGrid.refreshData();
  }
}
