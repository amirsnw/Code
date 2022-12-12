import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-specific-person-search',
  templateUrl: './sso-specific-person-search.component.html',
  styleUrls: ['./sso-specific-person-search.component.css']
})
export class SsoSpecificPersonSearchComponent extends TaminPageBaseComponent {
  searchForm: FormGroup;
  searchParams: SearchParam[];
  @Output() submitt = new EventEmitter<any>();
  requestTypes = [];
  isDesabled: boolean;
  private overlay: any;

  initializePage() {
    this.searchForm = this.formBuilder.group({
      nationalId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      // insuranceId: ['', [Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.isDesabled = false;
  }

  search() {
    const values = this.searchForm.value;
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.value = values.nationalId;
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'nationalId';
    this.searchParams.push(searchParam);
    // if (value.nationalCode.length === 0 || value.nationalCode.length !== 10 ) {
    this.submitt.emit(this.searchParams);
  }

  resetForm() {
    this.searchForm.reset();
    this.searchParams = [];
    this.submitt.emit(this.searchParams);
  }

}
