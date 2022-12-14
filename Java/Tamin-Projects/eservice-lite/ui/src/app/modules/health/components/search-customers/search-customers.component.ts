import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Urls} from "../../../../settings/urls";
import {TaminStaticDataService} from "../../../../services/tamin-static-data.service/tamin-static-data.service";


@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent extends TaminPageBaseComponent {

  searchForm: FormGroup;
  newForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('spec') spec: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldAutoCompleteDataGridComponent;
  private _subscription = new Subscription();
  ALLCITIES = [];
  provinces = [];
  SPECS = [];
  custTypes = [
    {
      name: 'پزشک',
      value: '1'
    },
    {
      name: 'دندان پزشک',
      value: '2'
    },
    {
      name: 'داروخانه',
      value: '3'
    },
    {
      name: 'پاراکلینیک',
      value: '4'
    },
    {
      name: 'درمانگاه',
      value: '6'
    },
    {
      name: 'بیمارستان',
      value: '7'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }
      ];
  private taminStaticDataService: TaminStaticDataService;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      spec: [{value: '', disabled: true}],
      province: [''],
      city: [''],
      type: [''],
      custName: [''],
    });
    this._subscription.add(this.searchForm.get('province').valueChanges.subscribe(value => {
      this.city.filter = [];
      this.city.filter.push({property: 'province.provinceCode', value: value, operator: 'EQUAL'});

      // this.city.theGrid.searchParams = [];
      // this.searchForm.get('city').setValue('');
      // if (value) {
      //   debugger;
      //   //  this.city.theGrid.searchParams.push({property: 'province.provinceCode', value: value, operator: 'EQUAL'});
      //   this.city.theGrid.searchParams.push({
      //     property: 'province.provinceCode', value: value, operator: 'EQUAL',
      //
      //   });
      // }
    }));
    this._subscription.add(this.searchForm.get('type').valueChanges.subscribe(value => {
      const values = this.searchForm.getRawValue();
      if (values.type === '1') {
        this.searchForm.get('spec').enable();
        this._initializeSpec();
        this._initializeDataGrid();

      } else {
        this.searchForm.get('spec').setValue('');
        this.searchForm.get('spec').disable();
        this._initializeDataGrid();
      }

    }));
    /*this._initializeDataGrid();*/
    this._initializeProvince();
    this._initializeCity();
    this._initializeSpec();

  }

  protected loadPageData(): void {

    this._initializeProvince();
    this._initializeSpec();
    this._initializeCity();
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    const values = this.searchForm.getRawValue();
    if (values.type === '1') {
      this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
        .clearActionColumns()
        .clearSearchParams()
        .clearSortParams()
        .clearVisibleColumns()
        .addUrl(Urls.CUSTOMERS)
        .setShowPager(true)
        .setFirstLoad(true)
        .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
        .addVisibleColumn({columnName: 'custName', columnCaption: 'نام طرف قرارداد', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'custType', columnCaption: 'نوع طرف قرارداد', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'specDesc', columnCaption: 'تخصص', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'officeProvince', columnCaption: 'استان', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'cityName', columnCaption: 'شهر', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'address', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'tel', columnCaption: 'تلفن', columnViewType: DataColumnViewType.Label})
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

    } else {
      this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
        .clearActionColumns()
        .clearSearchParams()
        .clearSortParams()
        .clearVisibleColumns()
        .addUrl(Urls.CUSTOMERS)
        .setShowPager(true)
        .setFirstLoad(true)
        .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
        .addVisibleColumn({columnName: 'custName', columnCaption: 'نام طرف قرارداد', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'custType', columnCaption: 'نوع طرف قرارداد', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'officeProvince', columnCaption: 'استان', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'cityName', columnCaption: 'شهر', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'address', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'tel', columnCaption: 'تلفن', columnViewType: DataColumnViewType.Label})
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


  }

  onSearch() {

    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    if (values.custName) {
      searchParams.push({
        property: 'custName',
        value: values.custName,
        operator: SearchOperator.LIKE
      });
    }
    if (values.type) {
      searchParams.push({
        property: 'custTypeCode',
        value: values.type,
        operator: SearchOperator.EQ
      });
    }
    if (values.city) {
      searchParams.push({
        property: 'cityCode',
        value: values.city,
        operator: SearchOperator.EQ
      });
    }
    if (values.province) {
      searchParams.push({
        property: 'provincCode',
        value: values.province,
        operator: SearchOperator.EQ
      });

    }

    if (values.spec) {
      searchParams.push({
        property: 'specCode',
        value: values.spec,
        operator: SearchOperator.EQ
      });
    }

    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.refreshData();
    }
  }

  resetSearch() {
    this.searchForm.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'displayName';
    this.province.searchPattern = '%{term}%';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ALLProvince)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('dbLinksId')
      .addVisibleColumn({columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'displayName', columnCaption: 'نام', columnViewType: 'Label'})
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
    const sortParam = new SortParam();
    sortParam.property = 'cityName';
    sortParam.direction = SortDirection.ASC;
    this.city.valueField = 'cityCode';
    this.city.displayField = 'cityName';
 this.city.searchPattern = '%{term}%';
    this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ALLCITIES)
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam(sortParam)
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

  private _initializeSpec() {
    this.spec.valueField = 'specCode';
    this.spec.displayField = 'specDesc';
    this.spec.searchPattern = '%{term}%';
    this.spec.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SPECS)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('specCode')
      .addVisibleColumn({columnName: 'specCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'specDesc', columnCaption: 'نام', columnViewType: 'Label'})
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

  private getCities(Code): Promise<any> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-debugger
      debugger;
      const searchParam = new SearchParam();
      searchParam.value = Code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provincecode';

      this.restService.getPage(Urls.ALLCITIES, 1, 10, [searchParam])
        .then(data => {
          // tslint:disable-next-line:no-debugger
          debugger;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });


  }

}
