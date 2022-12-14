import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-all-requests-search',
  templateUrl: './all-requests-search.component.html',
  styleUrls: ['./all-requests-search.component.css']
})
export class AllRequestSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required]],
      insuranceNumber: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(null);
  }

  searchFormSubmit(values, valid) {
    this.afterSubmit.emit(this.searchForm.value['nationalCode']);
  }

}
