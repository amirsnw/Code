import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory } from 'tamin-framework';
import { Urls } from '../../../../settings/urls';

@Component({
  selector: 'app-workshop-edit-address-list',
  templateUrl: './workshop-edit-address-list.component.html',
  styleUrls: ['./workshop-edit-address-list.component.css']
})
export class WorkshopEditAddressListComponent implements OnInit {

  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;


  @Output() sendRecord = new EventEmitter<any>();

  searchParams: SearchParam[];
  employerSearchForm: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this._initializeDataGrid();
    this.loadData({});
  }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      //.addUrl(this.restUrl)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'editName',
        columnCaption: 'تغییر آدرس کارگاه',
        columnViewType: 'Button',
        columnIconUrl: 'url(assets/images/icons/Actions-document-edit-icon.png)',
        columnActionName: 'editName',
        isActionAuthorized: true
      })
      .setActionColumnCaption('تغییر آدرس کارگاه')
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData(item) {
    this.searchParams = [];
    if (item.workshopId != undefined && item.workshopId !== '') {
      this.searchParams.push({
        property: 'workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item.branchCode != undefined && item.branchCode !== '') {
      this.searchParams.push({
        property: 'branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.workshopListGrid.serviceUrl = `${Urls.employerByLegal}`;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
  }

  onItemAction(param: any) {
    this.sendRecord.emit(param);
  }

}
