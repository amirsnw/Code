import {Component, ViewChild} from '@angular/core';
import {SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {FormGroup} from '@angular/forms';

declare let L: any;

@Component({
  selector: 'app-search-sso-location',
  templateUrl: './search-sso-location.component.html',
  styleUrls: ['./search-sso-location.component.css']
})
export class SearchSsoLocationComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('mapModal') mapModal: TaminModalComponent;
  searchForm: FormGroup;
  id: any;
  map: any;
  types = [
    {
      name: 'شعبه',
      value: 'شعبه'
    },
    {
      name: 'شعبه اقماری',
      value: 'شعبه اقماری'
    },
    {
      name: 'کارگزاری',
      value: 'کارگزاری'
    },
    {
      name: 'بیمارستان',
      value: 'بیمارستان'
    },
    {
      name: 'درمانگاه',
      value: 'درمانگاه'
    },
    {
      name: 'پلی کلینیک',
      value: 'پلی کلینیک'
    }
  ];


  protected initializePage(): void {
    this.id = (new Date()).getTime().toString();
    this.searchForm = this.formBuilder.group({
      type: [''],
      city: [''],
      address: [''],
      name: ['']
    });
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.MAP_ALL_GEO_UNIT)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'category', columnCaption: 'نوع مرکز', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'city', columnCaption: 'شهر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'tel', columnCaption: 'تلفن', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'address', columnCaption: 'آدرس', columnViewType: 'Label'})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'viewMap',
        columnCaption: 'نمایش بر روی نقشه',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewMap',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setFirstLoad(true)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  onSelect(data) {
    this.mapModal.title = data.item.name;
    this.mapModal.show();
    const me = this;
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map(this.id).setView([data.item.lat, data.item.long], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    const icon = L.icon.pulse({
      iconSize: [12, 12],
      color: 'blue',
      fillColor: 'blue',
    });
    L.marker([data.item.lat, data.item.long], {icon: icon}).addTo(this.map);
  }


  private hasValue(data) {
    return data !== null && data !== undefined && data.trim() !== '';
  }


  onSearch() {
    const filter = [];
    if (this.hasValue(this.searchForm.get('type').value)) {
      filter.push({
        property: 'category',
        value: this.searchForm.get('type').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.searchForm.get('city').value)) {
      filter.push({
        property: 'city',
        value: this.searchForm.get('city').value,
        operator: SearchOperator.LIKE
      });
    }

    if (this.hasValue(this.searchForm.get('address').value)) {
      filter.push({
        property: 'address',
        value: this.searchForm.get('address').value,
        operator: SearchOperator.LIKE
      });
    }

    if (this.hasValue(this.searchForm.get('name').value)) {
      filter.push({
        property: 'name',
        value: this.searchForm.get('name').value,
        operator: SearchOperator.LIKE
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
}
