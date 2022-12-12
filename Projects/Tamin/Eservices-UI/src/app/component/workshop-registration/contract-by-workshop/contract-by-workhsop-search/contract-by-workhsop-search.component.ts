import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-contract-by-workhsop-search',
  templateUrl: './contract-by-workhsop-search.component.html',
  styleUrls: ['./contract-by-workhsop-search.component.css']
})
export class ContractByWorkhsopSearchComponent extends TaminPageBaseComponent {

  @Output() submitt = new EventEmitter<any>();
  contractSearchForm: FormGroup;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.contractSearchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  resetForm() {
    this.contractSearchForm.reset();
    this.submitt.emit([]);
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.contractSearchForm.getRawValue());
  }
}
