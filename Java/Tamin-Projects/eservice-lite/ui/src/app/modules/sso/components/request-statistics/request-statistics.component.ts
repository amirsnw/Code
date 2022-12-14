import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-request-statistics',
  templateUrl: './request-statistics.component.html',
  styleUrls: ['./request-statistics.component.css']
})
export class RequestStatisticsComponent extends TaminPageBaseComponent {

  searchForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldComboBoxComponent;
  @ViewChild('requestStatus') requestStatus: TaminFieldComboBoxStaticComponent;
  @ViewChild('requestType') requestType: TaminFieldComboBoxStaticComponent;
  @ViewChild('branch') branch: TaminFieldComboBoxComponent;
  private _subscription = new Subscription();
  requestServices = [];
  private _overlay: any;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
      requestStatus: [''],
      requestType: [''],
      province: [''],
      city: [''],
      branch: [''],
    });

    this._subscription.add(this.searchForm.get('requestType').valueChanges.subscribe(value => {
      this.requestStatus.dataItems = [];
      this.searchForm.get('requestStatus').setValue('');
      if (value) {
        this.city.theGrid.searchParams = [];
        const tmp = this.requestServices.find(c => c.value === value);
        if (tmp) {
          this.requestStatus.dataItems = tmp.items;
        }
      }
    }));

    this._subscription.add(this.searchForm.get('province').valueChanges.subscribe(value => {
      this.city.theGrid.searchParams = [];
      this.branch.theGrid.searchParams = [];
      this.searchForm.get('city').setValue('');
      this.searchForm.get('branch').setValue('');
      if (value) {
        this.city.theGrid.searchParams.push({
          operator: 'EQ',
          value: value,
          property: 'provincecode'
        });
      }
    }));

    this._subscription.add(this.searchForm.get('city').valueChanges.subscribe(value => {
      this.branch.theGrid.searchParams = [];
      this.searchForm.get('branch').setValue('');
      if (value) {
        this.branch.theGrid.searchParams.push({
          operator: 'EQ',
          value: value,
          property: 'cityCode'
        });
      }
    }));

    this._initializeDataGrid();
    this._initializeProvince();
    this._initializeCity();
    this._initializeBranch();
    // this._initializeRequestStatus();
    // this._initializeRequestType();
  }

  protected loadPageData(): void {
    this._initializeDataGrid();
    this._initializeProvince();
    this._initializeCity();
    this._initializeBranch();
    this.loadServiceStatus();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SSO_Request_General_Report)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'requestDate', columnCaption: 'تاریخ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'استان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'شهر', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({
        columnName: 'requestTypeDesc',
        columnCaption: 'سرویس',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'requestStatusDesc',
        columnCaption: 'وضعیت',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({columnName: 'requestCount', columnCaption: 'تعداد', columnViewType: DataColumnViewType.Label})
      // .addSortParam({property: 'requestDate', direction: 'DESC'})
      // .addSortParam( {property: 'provinceCode', direction: 'ASC'})
      .setActionColumnCaption('')
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

  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'provinceName';
    this.province.searchPattern = '*{term}*%';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('provinceCode')
      .addVisibleColumn({columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeCity() {
    this.city.valueField = 'cityCode';
    this.city.displayField = 'cityName';
    // this.city.searchPattern = '*{term}*%';
    this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
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

  /*private _initializeRequestStatus() {
    this.requestStatus.valueField = 'requestCode';
    this.requestStatus.displayField = 'requestDesc';
    // this.city.searchPattern = '*{term}*%';
    this.requestStatus.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SSO_Request_Status)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      // .addVisibleColumn({columnName: 'requestCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'requestDesc', columnCaption: 'نام', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }*/

  /*
    private _initializeRequestType() {
      this.requestType.valueField = 'id';
      this.requestType.displayField = 'description';
      // this.city.searchPattern = '*{term}*%';
      this.requestType.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
        .clearActionColumns()
        .clearSearchParams()
        .clearSortParams()
        .clearVisibleColumns()
        .addUrl(Urls.RequestType)
        .setShowPager(true)
        .setFirstLoad(false)
        .setId('cityCode')
        // .addVisibleColumn({columnName: 'requestCode', columnCaption: 'کد', columnViewType: 'Label'})
        .addVisibleColumn({columnName: 'description', columnCaption: 'نام', columnViewType: 'Label'})
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
  */

  private _initializeBranch() {
    this.branch.valueField = 'code';
    this.branch.displayField = 'name';
    // this.branch.searchPattern = '%{term}%';
    this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.CityBranches)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
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

  resetForm() {
    this.searchForm.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.refreshData();
  }

  onSearch() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;

    if (values.fromDate) {
      searchParams.push({
        property: 'requestDateFrom',
        value: new Date(values.fromDate).getTime(),
        operator: SearchOperator.GTE
      });
    }

    if (values.toDate) {
      searchParams.push({
        property: 'requestDateTo',
        value: new Date(values.toDate).getTime(),
        operator: SearchOperator.LTE
      });
    }

    if (values.requestStatus) {
      searchParams.push({
        property: 'requestStatusCode',
        value: values.requestStatus,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.requestType) {
      searchParams.push({
        property: 'requestTypeCode',
        value: values.requestType,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.province) {
      searchParams.push({
        property: 'provinceCode',
        value: values.province,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.city) {
      searchParams.push({
        property: 'cityCode',
        value: values.city,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.branch) {
      searchParams.push({
        property: 'organizationId',
        value: values.branch,
        operator: SearchOperator.EQUAL
      });
    }

    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.refreshData();
    }
  }

  private loadServiceStatus() {

    this.restService.getAll(Urls.SSO_Service_Status)
      .then(value => {
        const requestTypes = (value.data.list as Array<any>)
          .map(item => item.requestType)
          .filter((thing, i, arr) => {
            return arr.indexOf(arr.find(t => t.id === thing.id)) === i;
          })
          .forEach((item) => {
            this.requestServices.push({
              name: item.title,
              value: item.id,
              items: value.data.list.filter(c => c.requestType.id === item.id).map(val => ({
                name: val.requestStatus.requestDesc,
                value: val.requestStatus.requestCode
              }))
            });
          });
      })
      .catch(reason => {
      });
  }

  printExcel() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;

    if (values.fromDate) {
      searchParams.push({
        property: 'requestDateFrom',
        value: new Date(values.fromDate).getTime(),
        operator: SearchOperator.GTE
      });
    }

    if (values.toDate) {
      searchParams.push({
        property: 'requestDateTo',
        value: new Date(values.toDate).getTime(),
        operator: SearchOperator.LTE
      });
    }

    if (values.requestStatus) {
      searchParams.push({
        property: 'requestStatusCode',
        value: values.requestStatus,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.requestType) {
      searchParams.push({
        property: 'requestTypeCode',
        value: values.requestType,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.province) {
      searchParams.push({
        property: 'provinceCode',
        value: values.province,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.city) {
      searchParams.push({
        property: 'cityCode',
        value: values.city,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.branch) {
      searchParams.push({
        property: 'organizationId',
        value: values.branch,
        operator: SearchOperator.EQUAL
      });
    }

    /*if(searchParams.length===0){
      this.showErrorMessageBox('پیام سیستم', 'جهت صدور به اکسل ، بازه زمانی باید کمتر از ا ماه انتخاب شود.');
      return;
    }*/
    // if()
    /*   const start_date = new Date(values.fromDate).getTime();
       const end_date =  new Date(values.toDate).getTime();
       let diff = end_date.getFullYear() - start_date.getFullYear();
       const m = today.getMonth() - birthDate.getMonth();
   */
    this._overlay = this.showOverlay();
    this.restService
      .getBlob(Urls.SSO_Request_Report_Excel, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'request_statistic_' + this.getPersianDate(new Date()) + '.xls';
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

  printCsv() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;

    if (values.fromDate) {
      searchParams.push({
        property: 'requestDateFrom',
        value: new Date(values.fromDate).getTime(),
        operator: SearchOperator.GTE
      });
    }

    if (values.toDate) {
      searchParams.push({
        property: 'requestDateTo',
        value: new Date(values.toDate).getTime(),
        operator: SearchOperator.LTE
      });
    }

    if (values.requestStatus) {
      searchParams.push({
        property: 'requestStatusCode',
        value: values.requestStatus,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.requestType) {
      searchParams.push({
        property: 'requestTypeCode',
        value: values.requestType,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.province) {
      searchParams.push({
        property: 'provinceCode',
        value: values.province,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.city) {
      searchParams.push({
        property: 'cityCode',
        value: values.city,
        operator: SearchOperator.EQUAL
      });
    }

    if (values.branch) {
      searchParams.push({
        property: 'organizationId',
        value: values.branch,
        operator: SearchOperator.EQUAL
      });
    }

    /*if(searchParams.length===0){
      this.showErrorMessageBox('پیام سیستم', 'جهت صدور به اکسل ، بازه زمانی باید کمتر از ا ماه انتخاب شود.');
      return;
    }*/
    // if()
    /*   const start_date = new Date(values.fromDate).getTime();
       const end_date =  new Date(values.toDate).getTime();
       let diff = end_date.getFullYear() - start_date.getFullYear();
       const m = today.getMonth() - birthDate.getMonth();
   */
    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.SSO_Request_Report_CSV, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a');
        const universalBOM = '\uFEFF';
        const uri = 'data:text/csv;charset=utf-8,' + universalBOM + result.data;
        a.href = uri;
        a.download = 'request_statistic_' + this.getPersianDate(new Date()) + '.csv';
        a.click();
        window.URL.revokeObjectURL(uri);
        a.remove();

      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

}
