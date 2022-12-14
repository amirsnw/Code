import { Component, ViewChild } from '@angular/core';
import {
  SearchOperator,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminModalComponent,
  TaminPageBaseComponent,
  TaminFieldComboBoxComponent,
  TaminFieldComboBoxStaticComponent,
  TaminFieldAutoCompleteDataGridComponent,
  DataColumnViewType,
  SearchParam
} from 'tamin-framework';
import { Urls } from '../../settings/urls';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rightel-delivery',
  templateUrl: './rightel-delivery.component.html',
  styleUrls: ['./rightel-delivery.component.css']
})
export class RightelDeliveryComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldComboBoxComponent;
  @ViewChild('branch') branch: TaminFieldComboBoxComponent;
  searchForm: FormGroup;
  private _subscription = new Subscription();
  private _overlay: any;

  intervals = [
    {
      name: '9 تا 11 صبح',
      value: '1'
    },
    {
      name: '11 تا 12:30 ظهر',
      value: '2'
    },
    {
      name: '12:30 تا 14:30 بعدازظهر',
      value: '3'
    }
  ];

  protected initializePage(): void {
    // this.id = (new Date()).getTime().toString();
    this.searchForm = this.formBuilder.group({
      province: [''],
      city: [''],
      branch: [''],
      recieveDateFrom: [''],
      recieveDateTo: [''],
      requestDateFrom: [''],
      requestDateTo: [''],
      interval: [''],
      nationalCode: ['']
    });

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
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BookletDeliveryProgram)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({ columnName: 'branchName', columnCaption: 'واحد صادر کننده', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'address', columnCaption: 'آدرس واحد صادر کننده', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'nationalCode', columnCaption: 'کد ملی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'fullName', columnCaption: 'نام و نام خانوادگی', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'mobileNumber', columnCaption: 'شماره همراه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'requestDate', columnCaption: 'تاریخ درخواست', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'recieveDate', columnCaption: 'تاریخ تحویل', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'intervalDesc', columnCaption: 'زمان تحویل', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'price', columnCaption: 'مبلغ', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'reqAddress', columnCaption: 'آدرس ارسال', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setFirstLoad(true)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  onSearch() {
    const filter = [];
    if (this.hasValue(this.searchForm.get('province').value)) {
      filter.push({
        property: 'provinceCode',
        value: this.searchForm.get('province').value,
        operator: SearchOperator.LIKE
      });
    }

    if (this.hasValue(this.searchForm.get('city').value)) {
      filter.push({
        property: 'cityCode',
        value: this.searchForm.get('city').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.searchForm.get('branch').value)) {
      filter.push({
        property: 'branchName',
        value: this.searchForm.get('branch').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.searchForm.get('requestDateTo').value)) {
      filter.push({
        property: 'requestDateTo',
        value: new Date(this.searchForm.get('requestDateTo').value).getTime(),
        operator: SearchOperator.LTE
      });
    }
    if (this.hasValue(this.searchForm.get('requestDateFrom').value)) {
      filter.push({
        property: 'requestDateFrom',
        value: new Date(this.searchForm.get('requestDateFrom').value).getTime(),
        operator: SearchOperator.GTE
      });
    }
    if (this.hasValue(this.searchForm.get('recieveDateTo').value)) {
      filter.push({
        property: 'recieveDateTo',
        value: new Date(this.searchForm.get('recieveDateTo').value).getTime(),
        operator: SearchOperator.LTE
      });
    }
    if (this.hasValue(this.searchForm.get('recieveDateFrom').value)) {
      filter.push({
        property: 'recieveDateFrom',
        value: new Date(this.searchForm.get('recieveDateFrom').value).getTime(),
        operator: SearchOperator.GTE
      });
    }
    if (this.hasValue(this.searchForm.get('nationalCode').value)) {
      filter.push({
        property: 'nationalCode',
        value: this.searchForm.get('nationalCode').value,
        operator: SearchOperator.EQ
      });
    }
    if (this.hasValue(this.searchForm.get('interval').value)) {
      filter.push({
        property: 'recieveTimeInterval',
        value: this.searchForm.get('interval').value,
        operator: SearchOperator.EQ
      });
    }

    this.dataGrid.searchParams = [];
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

  resetSearch() {
    this.searchForm.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

  private hasValue(data) {
    return data !== null && data !== undefined && data !== '';
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
      .addVisibleColumn({ columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label' })
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
      .addVisibleColumn({ columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label' })
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
      .addVisibleColumn({ columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label })
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

  printPDF() {
    if (!this.hasValue(this.searchForm.get('province').value)
      || !this.hasValue(this.searchForm.get('city').value)
      || !this.hasValue(this.searchForm.get('recieveDateTo').value)
      || !this.hasValue(this.searchForm.get('recieveDateFrom').value)) {
      this.showErrorMessageBox('پیام سیستم', 'فیلترهای استان،شهر و بازه تاریخ تحویل باید پر باشد.');
      return;
    }


    const filter = [];
    if (this.hasValue(this.searchForm.get('province').value)) {
      filter.push({
        property: 'provinceCode',
        value: this.searchForm.get('province').value,
        operator: SearchOperator.LIKE
      });
    }

    if (this.hasValue(this.searchForm.get('city').value)) {
      filter.push({
        property: 'cityCode',
        value: this.searchForm.get('city').value,
        operator: SearchOperator.EQ
      });
    }


    const province = new SearchParam();
    province.property = 'provinceCode';
    province.operator = SearchOperator.EQUAL;
    province.value = this.searchForm.get('province').value;

    const city = new SearchParam();
    city.property = 'cityCode';
    city.operator = SearchOperator.EQUAL;
    city.value = this.searchForm.get('city').value;

    const dateFrom = new SearchParam();
    dateFrom.property = 'recieveDateFrom';
    dateFrom.operator = SearchOperator.GTE;
    dateFrom.value =new Date(this.searchForm.get('recieveDateFrom').value).getTime().toString();

    const dateTo = new SearchParam();
    dateTo.property = 'recieveDateFrom';
    dateTo.operator = SearchOperator.GTE;
    dateTo.value = new Date(this.searchForm.get('recieveDateTo').value).getTime().toString();

    const searchParams: Array<SearchParam> = [];
    searchParams.push(province);
    searchParams.push(city);
    searchParams.push(dateFrom);
    searchParams.push(dateTo);

    this._overlay = this.showOverlay();
    this.restService
      .getBlob(Urls.RightelBookletDeliveryReport, searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'delivery_list_' + this.getPersianDate(new Date()) + '.pdf';
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
