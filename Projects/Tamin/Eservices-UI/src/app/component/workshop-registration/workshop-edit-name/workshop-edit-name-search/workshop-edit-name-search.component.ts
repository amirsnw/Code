import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-workshop-edit-name-search',
  templateUrl: './workshop-edit-name-search.component.html',
  styleUrls: ['./workshop-edit-name-search.component.css']
})
export class WorkshopEditNameSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  resetForm() {
    this.searchForm.reset();
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }

}
