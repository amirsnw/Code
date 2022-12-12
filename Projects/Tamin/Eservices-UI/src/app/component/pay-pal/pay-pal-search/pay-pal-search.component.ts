import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PayPalModel} from '../../../models/pay-pal/payPal.model';
import {GenericRestService, SearchOperator, SearchParam} from 'tamin-framework';

@Component({
  selector: 'app-pay-pal-search',
  templateUrl: './pay-pal-search.component.html',
  styleUrls: ['./pay-pal-search.component.css']
})
export class PayiPalSearchComponent implements OnInit {

  @Output() afterSubmit = new EventEmitter<any>();

  searchForm: FormGroup;

  searchParams: SearchParam[];

  constructor(private genericRestService: GenericRestService<PayPalModel>, public fb: FormBuilder) {
    this.searchForm = this.fb.group({
      refCode: [''],
      title: ['']
    });
  }

  ngOnInit() {
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(new Array<SearchParam>());
  }

  searchFormSubmit(values, valid) {
    this.searchParams = new Array<SearchParam>();
    let searchParam = new SearchParam();
    searchParam.property = 'refCode';
    searchParam.value = this.searchForm.value[searchParam.property];
    searchParam.operator = SearchOperator.EQ;
    if (searchParam.value != undefined && searchParam.value != '') {
      this.searchParams.push(searchParam);
    }

    searchParam = new SearchParam();
    searchParam.property = 'title';
    searchParam.value = this.searchForm.value[searchParam.property];
    searchParam.operator = SearchOperator.EQ;
    if (searchParam.value != undefined && searchParam.value != '') {
      this.searchParams.push(searchParam);
    }

    this.afterSubmit.emit(this.searchParams);
  }

}

