import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-announcement-statistics',
  templateUrl: './announcement-statistics.component.html',
  styleUrls: ['./announcement-statistics.component.css']
})
export class AnnouncementStatisticsComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('type') type: TaminFieldComboBoxComponent;
  @ViewChild('subType') subType: TaminFieldComboBoxComponent;
  searchForm: FormGroup;
  private _overlay: any;


  initializePage() {
    this.searchForm = this.formBuilder.group({
      sentDateFrom: [''],
      sentDateTo: [''],
      type: [''],
      subType: ['']
    });
    this._initializeType();
    this._initializeSubType();
    this.initializeDataGrid();
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementStatistics)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'نام سیستم', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'subTypeDesc', columnCaption: 'موضوع', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sentDate', columnCaption: 'تاریخ ارسال', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'mokatebeCount', columnCaption: 'تعداد', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'sentDate' && item.sentDate === ' ') {
        return {handled: true, data: '<span>در انتظار ارسال</span>'};
      }
      return {handled: false, data: ''};
    };
  }

  resetForm() {
    this.searchForm.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.refreshData();
    this.dataGrid.pagerCurrentPage = 1;
  }

  onSearch() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    if (values.subType) {
      searchParams.push({
        property: 'subTypeDesc',
        value: values.subType,
        operator: SearchOperator.EQ
      });
    }
    if (values.type) {
      searchParams.push({
        property: 'typeDesc',
        value: values.type,
        operator: SearchOperator.EQ
      });
    }
    if (values.sentDateFrom) {
      searchParams.push({
        property: 'sentDateFrom',
        value: this.getPersianDate(values.sentDateFrom),
        operator: SearchOperator.GTE
      });
    }

    if (values.sentDateTo) {
      searchParams.push({
        property: 'sentDateTo',
        value: this.getPersianDate(values.sentDateTo),
        operator: SearchOperator.LTE
      });
    }
    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.refreshData();
    }
  }

  private _initializeType() {
    this.type.valueField = 'typeDesc';
    this.type.displayField = 'typeDesc';
    this.type.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'نام سیستم', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  private _initializeSubType() {
    this.subType.valueField = 'typeDesc';
    this.subType.displayField = 'typeDesc';
    this.subType.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementSubType)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('typeCode')
      .addVisibleColumn({columnName: 'typeDesc', columnCaption: 'موضوع', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  onExcelReport() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    if (values.subType) {
      searchParams.push({
        property: 'subTypeDesc',
        value: values.subType,
        operator: SearchOperator.EQ
      });
    }
    if (values.type) {
      searchParams.push({
        property: 'typeDesc',
        value: values.type,
        operator: SearchOperator.EQ
      });
    }
    if (values.sentDateFrom) {
      searchParams.push({
        property: 'sentDateFrom',
        value: this.getPersianDate(values.sentDateFrom),
        operator: SearchOperator.GTE
      });
    }

    if (values.sentDateTo) {
      searchParams.push({
        property: 'sentDateTo',
        value: this.getPersianDate(values.sentDateTo),
        operator: SearchOperator.LTE
      });
    }
    this._overlay = this.showOverlay();
    this.restService
      .getBlob(Urls.AnnouncementReportExcel, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'Eblagh_' + this.getPersianDate(new Date()) + '.xls';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}
