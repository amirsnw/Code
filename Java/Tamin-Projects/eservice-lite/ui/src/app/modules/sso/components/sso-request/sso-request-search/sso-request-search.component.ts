import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sso-request-search',
  templateUrl: './sso-request-search.component.html',
  styleUrls: ['./sso-request-search.component.css']
})
export class SsoRequestSearchComponent extends TaminPageBaseComponent {
  @Output() afterSubmit = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  requestTypes = [];
  private _subscription = new Subscription();
  @ViewChild('branch') branch: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('requestStatus') requestStatus: TaminFieldComboBoxStaticComponent;
  @ViewChild('requestType') requestType: TaminFieldComboBoxStaticComponent;
  requestServices = [];
  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      refCode: [''],
      requestStatus: [''],
      requestType: [''],
      userName: [''],
      branch: ['']
    });
    this._subscription.add(this.searchForm.get('requestType').valueChanges.subscribe(value => {
      this.requestStatus.dataItems = [];
      this.searchForm.get('requestStatus').setValue('');
      if (value) {
          const tmp = this.requestServices.find(c => c.value === value);
        if (tmp) {
          this.requestStatus.dataItems = tmp.items;
        }
      }
    }));
    this._initializeBranch();
    this.loadServiceStatus();
  }

  protected loadPageData(): void {
    this.restService.getAll(Urls.RequestType).then(value => {
      (<Array<any>>value.data.list).forEach((item) => {
        this.requestTypes.push({
          name: item.title,
          value: item.id
        });
      });
    }).catch(reason => {

    });
    }

  private _initializeBranch() {
    this.branch.valueField = 'code';
    this.branch.displayField = 'name';
    this.branch.searchPattern = '%{term}%';
    this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesByFilter)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(true)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  resetForm() {
    this.searchForm.reset();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.value = '02';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';
    this.searchParams.push(searchParam);
    this.afterSubmit.emit(this.searchParams);
  }

  searchFormSubmit() {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.value = '02';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';
    this.searchParams.push(searchParam);

    if (this.searchForm.get('refCode').value && this.searchForm.get('refCode').value !== '') {
      const refCodeSearchParam = new SearchParam();
      refCodeSearchParam.property = 'refCode';
      refCodeSearchParam.value = this.searchForm.get('refCode').value;
      refCodeSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(refCodeSearchParam);
    }
    if (this.searchForm.get('userName').value && this.searchForm.get('userName').value !== '') {
      const refCodeSearchParam = new SearchParam();
      refCodeSearchParam.property = 'userName';
      refCodeSearchParam.value = this.searchForm.get('userName').value;
      refCodeSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(refCodeSearchParam);
    }
    if (this.searchForm.get('requestType').value && this.searchForm.get('requestType').value !== '') {
      const requestTypeSearchParam = new SearchParam();
      requestTypeSearchParam.property = 'requestType.id';
      requestTypeSearchParam.value = this.searchForm.get('requestType').value;
      requestTypeSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(requestTypeSearchParam);
    }
    if (this.searchForm.get('requestStatus').value && this.searchForm.get('requestStatus').value !== '') {
      const requestStatusSearchParam = new SearchParam();
      requestStatusSearchParam.property = 'status.requestCode';
      requestStatusSearchParam.value = this.searchForm.get('requestStatus').value;
      requestStatusSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(requestStatusSearchParam);
    }
    if (this.searchForm.get('branch').value && this.searchForm.get('branch').value !== '') {
      const requestTypeSearchParam = new SearchParam();
      requestTypeSearchParam.property = 'organizationId';
      requestTypeSearchParam.value = this.searchForm.get('branch').value;
      requestTypeSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(requestTypeSearchParam);
    }

    this.afterSubmit.emit(this.searchParams);
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
}
