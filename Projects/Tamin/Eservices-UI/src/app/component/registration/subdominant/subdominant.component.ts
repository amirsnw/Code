import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {Urls} from '../../../settings/urls';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-subdominant',
  templateUrl: './subdominant.component.html',
  styleUrls: ['./subdominant.component.css']
})
export class SubdominantComponent extends  TaminPageBaseComponent {
@ViewChild('subdominantGrid') subdominantGrid: TaminDataGridComponent;

initializePage() {
  this._initializeDataGrid();

}
loadPageData() {
  this.loadData();
}
/*  ngOnInit() {
    this._initializeDataGrid();
    this.loadData();
  }*/
  private _initializeDataGrid() {
    this.subdominantGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'relationWithTamin.personal.nationalId', columnCaption: 'کدملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'relationWithTamin.personal.dateOfBirth', columnCaption: 'تاریخ تولد', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'relationWithTamin.personal.firstName', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'relationWithTamin.personal.lastName', columnCaption: 'نام خوانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'relationWithTamin.personal.idCardNumber', columnCaption: 'شماره شناسنامه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'relationWithTamin.personal.idCardSerial1', columnCaption: 'سریال', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'relationWithTamin.relationWithTamin.relationDescription', columnCaption: 'نوع تکفل', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData() {
    this.subdominantGrid.serviceUrl = Urls.Subdominant;
    this.subdominantGrid.refreshData();
  }
  NextFormClick() {
    // this.redirectTo('/subdomain/-1');
      this.redirectTo('/subdominant-no-presence');
  }

}
