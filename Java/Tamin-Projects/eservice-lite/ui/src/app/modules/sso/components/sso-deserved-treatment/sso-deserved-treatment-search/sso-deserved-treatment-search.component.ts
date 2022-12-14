import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from "tamin-framework";

@Component({
  selector: 'app-sso-deserved-treatment-search',
  templateUrl: './sso-deserved-treatment-search.component.html',
  styleUrls: ['./sso-deserved-treatment-search.component.css']
})
export class SsoDeservedTreatmentSearchComponent extends TaminPageBaseComponent{

  @Output() afterSubmit = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      nationalCode: [''],
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(new Array<SearchParam>());
  }

  searchFormSubmit(values, valid) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'nationalCode';
    searchParam.value = this.searchForm.value[searchParam.property];
    searchParam.operator = SearchOperator.EQ;
    if (searchParam.value !== undefined && searchParam.value !== '') {
      this.searchParams.push(searchParam);
    }

    this.afterSubmit.emit(this.searchParams);
  }

}