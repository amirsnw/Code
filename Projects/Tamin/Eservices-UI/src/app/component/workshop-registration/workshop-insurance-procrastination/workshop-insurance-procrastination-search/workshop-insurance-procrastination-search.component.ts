import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';


@Component({
  selector: 'app-workshop-insurance-procrastination-search',
  templateUrl: './workshop-insurance-procrastination-search.component.html',
  styleUrls: ['./workshop-insurance-procrastination-search.component.css']
})
export class WorkshopInsuranceProcrastinationSearchComponent extends TaminPageBaseComponent {
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
    this.submitt.emit();
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }
}
