import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-request-search',
  templateUrl: './request-search.component.html',
  styleUrls: ['./request-search.component.css']
})
export class RequestSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();

  searchForm: FormGroup;

  searchParams: SearchParam[];
  requestTypes = [];

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      refCode: [''],
      requestType: ['']
    });
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

  resetForm() {
    this.searchForm.reset();
    // this.afterSubmit.emit(new Array<SearchParam>());
    this.searchParams = new Array<SearchParam>();

    const searchParam = new SearchParam();
    searchParam.value = '03';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';
    this.searchParams.push(searchParam);
    this.afterSubmit.emit(this.searchParams);
  }

  searchFormSubmit(/*values, valid*/) {
    this.searchParams = new Array<SearchParam>();

    const searchParam = new SearchParam();
    searchParam.value = '03';
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

    if (this.searchForm.get('requestType').value && this.searchForm.get('requestType').value !== '') {
      const requestTypeSearchParam = new SearchParam();
      requestTypeSearchParam.property = 'requestType.id';
      requestTypeSearchParam.value = this.searchForm.get('requestType').value;
      requestTypeSearchParam.operator = SearchOperator.EQ;
      this.searchParams.push(requestTypeSearchParam);
    }

    this.afterSubmit.emit(this.searchParams);
  }
}
