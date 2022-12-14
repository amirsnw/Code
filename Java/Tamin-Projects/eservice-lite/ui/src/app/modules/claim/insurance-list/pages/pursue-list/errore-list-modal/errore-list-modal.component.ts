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
  selector: 'app-errore-list-modal',
  templateUrl: './errore-list-modal.component.html',
  styleUrls: ['./errore-list-modal.component.css']
})
export class ErroreListModalComponent extends TaminPageBaseComponent {
  @ViewChild('theModall') theModall: TaminModalComponent;
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
        columnName: 'model',
        columnCaption: 'فایل',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'field',
        columnCaption: 'فیلد',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'errorDesc',
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
    this.theModall.width = '70%';
    this._initializeDataGrid(data);
    this.theModall.show();
  }

  hide() {
    this.theModall.hide();
  }
}
