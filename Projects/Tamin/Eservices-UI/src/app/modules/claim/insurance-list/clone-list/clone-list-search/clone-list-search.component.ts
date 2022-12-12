import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CloneListModel} from '../../../../../models/insurance-list/cloneList.model';
import {GenericRestService, SearchOperator, SearchParam} from 'tamin-framework';

@Component({
  selector: 'app-clone-list-search',
  templateUrl: './clone-list-search.component.html',
  styleUrls: ['./clone-list-search.component.css']
})
export class CloneListSearchComponent implements OnInit {

  @Output() afterSubmit = new EventEmitter<any>();

  searchForm: FormGroup;

  searchParams: SearchParam[];

  constructor(private genericRestService: GenericRestService<CloneListModel>, public fb: FormBuilder) {
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

