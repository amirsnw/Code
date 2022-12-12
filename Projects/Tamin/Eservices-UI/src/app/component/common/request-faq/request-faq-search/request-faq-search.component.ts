import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {RequestFaqNewComponent} from '../request-faq-new/request-faq-new.component';
import {RequestFaqComponent} from '../request-faq.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-request-faq-search',
  templateUrl: './request-faq-search.component.html',
  styleUrls: ['./request-faq-search.component.css']
})
export class RequestFaqSearchComponent extends TaminPageBaseComponent {
  @Output() afterSearch = new EventEmitter<any>();
  // @ViewChild('requestFaq') requestFaq: RequestFaqComponent;
  @ViewChild('requestStatus') requestStatus: TaminFieldComboBoxStaticComponent;
  @ViewChild('requestType') requestType: TaminFieldComboBoxStaticComponent;
  searchForm: FormGroup;
  private _subscription = new Subscription();
  requestServices = [];
  requestTypes = [];
  // requestStatus = [];
  // searchParams: SearchParam[];
  private _overlay: any;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      requestTypeSearch: [''],
      requestStatusSearch: [''],
    });
    this._subscription.add(this.searchForm.get('requestTypeSearch').valueChanges.subscribe(value => {
      this.requestStatus.dataItems = [];
      this.searchForm.get('requestStatusSearch').setValue('');
      if (value) {
             const tmp = this.requestServices.find(c => c.value === value);
        if (tmp) {
          this.requestStatus.dataItems = tmp.items;
        }
      }
    }));
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
    // this.restService.getAll(Urls.RequestStatus).then(value => {
    //   (<Array<any>>value.data.list).forEach((item) => {
    //     this.requestStatus.push({
    //       name: item.requestDesc,
    //       value: item.requestCode
    //     });
    //   });
    // }).catch(reason => {
    // });
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

  search() {
    const searchParams = new Array<SearchParam>();

    if (this.searchForm.get('requestTypeSearch').value && this.searchForm.get('requestTypeSearch').value !== '') {
      const refCodeSearchParam = new SearchParam();
      refCodeSearchParam.property = 'requestType.id';
      refCodeSearchParam.value = this.searchForm.get('requestTypeSearch').value;
      refCodeSearchParam.operator = SearchOperator.EQ;
      searchParams.push(refCodeSearchParam);
    }

    if (this.searchForm.get('requestStatusSearch').value && this.searchForm.get('requestStatusSearch').value !== '') {
      const requestTypeSearchParam = new SearchParam();
      requestTypeSearchParam.property = 'requestStatus.requestCode';
      requestTypeSearchParam.value = this.searchForm.get('requestStatusSearch').value;
      requestTypeSearchParam.operator = SearchOperator.EQ;
      searchParams.push(requestTypeSearchParam);
    }

    this.afterSearch.emit(searchParams);
  }

  refreshForm() {
    const searchParams = new Array<SearchParam>();
    this.searchForm.reset();
    this.afterSearch.emit(searchParams);
  }
}
