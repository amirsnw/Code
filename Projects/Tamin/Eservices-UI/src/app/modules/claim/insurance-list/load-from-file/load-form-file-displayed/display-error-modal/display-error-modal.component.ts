import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminModalComponent,
  TaminPageBaseComponent,
  TaminDataGridComponent,
  DataColumnViewType
} from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-error-modal',
  templateUrl: './display-error-modal.component.html',
  styleUrls: ['./display-error-modal.component.css']
})
export class DisplayErrorModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @Output() refreshData = new EventEmitter<any>();

  private overlay: any;



  initializePage() {
  }

  private _initializeDataGrid(data: any) {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .setFirstLoad(false)
      .setDataItems(data)
      .addVisibleColumn({
        columnName: 'error.id',
        columnCaption: 'کدخطا',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'error.flageic.errorTypeDesc',
        columnCaption: 'نوع خطا',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'error.errorClass.errorClassDesc',
        columnCaption: 'ماهیت خطا',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workerHistory.insuranceNumber',
        columnCaption: 'شماره بیمه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workerHistory.nationalCode',
        columnCaption: 'کد ملی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workerHistory.firstName',
        columnCaption: 'نام',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workerHistory.lastName',
        columnCaption: 'نام خوانوادگی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'error.errorDescription',
        columnCaption: 'شرح خطا',
        columnViewType: DataColumnViewType.Label
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  show(data: any) {
    this.theModal.width = '70%';
    this._initializeDataGrid(data);
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }
}
