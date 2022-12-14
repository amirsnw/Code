import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaminPageBaseComponent} from "tamin-framework";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sso-wage-assignment-request-search',
  templateUrl: './sso-wage-assignment-request-search.component.html',
  styleUrls: ['./sso-wage-assignment-request-search.component.css']
})
export class SsoWageAssignmentRequestSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      pensionerId: [''],
      pensionerNationalId: ['']
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.submitt.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }
}
