import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataColumnViewType, SearchOperator, SearchParam, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Subscription} from 'rxjs';
import {TaminStaticDataService} from "../../../../services/tamin-static-data.service/tamin-static-data.service";
import {Urls} from "../../../../settings/urls";

@Component({
  selector: 'app-search-proprietary',
  templateUrl: './search-proprietary.component.html',
  styleUrls: ['./search-proprietary.component.css']
})
export class SearchProprietaryComponent extends TaminPageBaseComponent {

  searchForm: FormGroup;
  newForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldAutoCompleteDataGridComponent;
  private _subscription = new Subscription();
  provinces = [];
  shift = [
    {
      name: 'شبانه روزی',
      value: '0'
    },
    {
      name: 'صبح',
      value: '1'
    },
    {
      name: 'صبح-عصر',
      value: '2'
    },
    {
      name: 'صیح-عصر-شب',
      value: '3'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }
  ];
  unitTypes = [
    {
      name: 'بیمارستان',
      value: '1'
    },
    {
      name: 'پلی کلنیک',
      value: '2'
    },
    {
      name: 'درمانگاه تخصصی',
      value: '3'
    },
    {
      name: 'دذرمانگاه عمومی',
      value: '4'
    },
    {
      name: 'دندان پزشک مستقل',
      value: '5'
    },
    {
      name: 'مراکز جراحی محدود',
      value: '6'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }
  ];
  diviceTypes = [
    {
      name: 'دستگاه آنژیوگرافی',
      value: '1'
    },
    {
      name: 'دستگاه MRI',
      value: '2'
    },
    {
      name: 'دستگاه CTSCAN',
      value: '3'
    },
    {
      name: 'دستگاه شتاب دهنده خطی',
      value: '4'
    },
    {
      name: 'دستگاه سنجش تراکم استخوان',
      value: '5'
    },
    {
      name: 'دستگاه سنگ شکن درون اندامی',
      value: '6'
    },
    {
      name: 'دستگاه سنگ شکن برون اندامی',
      value: '7'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }
  ];
  telRcp = [
    {
    name: 'ندارد',
    value: '0'
  },
    {
      name: 'دارد',
      value: '1'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }];
  internetRcp = [
    {
      name: 'ندارد',
      value: '0'
    },
    {
      name: 'دارد',
      value: '1'
    },
    {
      name: ' انتخاب کنید...',
      value: ''
    }];
  private taminStaticDataService: TaminStaticDataService;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      province: [''],
      city: [''],
      unitTypes: [''],
      unitName: [''],
      shift : [''],
      diviceTypes: [''],
      telRcp : [''],
      internetRcp : [''],
          });
    this._subscription.add(this.searchForm.get('province').valueChanges.subscribe(value => {
      this.city.filter = [];
      this.city.filter.push({property: 'province.provinceCode', value: value, operator: 'EQUAL'});
    }));
    /*this._initializeDataGrid();*/
    this._initializeProvince();
    this._initializeCity();
      }

  protected loadPageData(): void {

    this._initializeProvince();
    this._initializeCity();
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {

      this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
        .clearActionColumns()
        .clearSearchParams()
        .clearSortParams()
        .clearVisibleColumns()
        .addUrl(Urls.PROPRIETARY)
        .setShowPager(true)
        .setFirstLoad(true)
        .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
        .addVisibleColumn({columnName: 'displayName', columnCaption: 'استان', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'cityName', columnCaption: 'شهر', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'unitTypeDesc', columnCaption: 'نوع مرکز', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'unitName', columnCaption: 'نام مرکز', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'shiftDesc', columnCaption: 'شیفت', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'internetRcp', columnCaption: 'پذیرش اینترنتی', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'telRcp', columnCaption: 'پذیرش تلفنی', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'deviceType', columnCaption: 'نوع دستگاه', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'parking', columnCaption: 'پارکینگ', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'unitTel', columnCaption: 'تلفن', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'unitFax', columnCaption: 'فکس', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'rcpTel', columnCaption: 'تلفن پذیرش', columnViewType: DataColumnViewType.Label})
        .addVisibleColumn({columnName: 'address', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
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

  onSearch() {
    const values = this.searchForm.getRawValue();
    const searchParams = [];
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    if (values.unitName) {
      searchParams.push({
        property: 'unitName',
        value: values.unitName,
        operator: SearchOperator.LIKE
      });
    }
    if (values.unitTypes) {
      searchParams.push({
        property: 'unitTypeCode',
        value: values.unitTypes,
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

    if (values.shift) {
      searchParams.push({
        property: 'shiftCode',
        value: values.shift,
        operator: SearchOperator.EQ
      });
    }

    if (values.telRcp) {
      searchParams.push({
        property: 'telRcp',
        value: values.telRcp,
        operator: SearchOperator.EQ
      });
    }
    if (values.internetRcp) {
      searchParams.push({
        property: 'internet_rcp',
        value: values.internetRcp,
        operator: SearchOperator.EQ
      });
    }

      if (values.diviceTypes) {
        debugger;
        switch (values.diviceTypes) {
          case '1':
            searchParams.push({
              property: 'deviceCode1',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
          case '2':
            searchParams.push({
              property: 'deviceCode2',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
          case '3':

            searchParams.push({
              property: 'deviceCode3',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });

            break;
          case '4':
            searchParams.push({
              property: 'deviceCode4',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
          case '5':
            searchParams.push({
              property: 'deviceCode5',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
          case '6':
            searchParams.push({
              property: 'deviceCode6',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
          case '7':
            searchParams.push({
              property: 'deviceCode7',
              value: values.diviceTypes,
              operator: SearchOperator.EQ
            });
            break;
        }
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
