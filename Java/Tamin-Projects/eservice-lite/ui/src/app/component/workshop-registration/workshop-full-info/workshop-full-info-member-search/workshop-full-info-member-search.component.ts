import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';


@Component({
  selector: 'app-workshop-full-info-member-search',
  templateUrl: './workshop-full-info-member-search.component.html',
  styleUrls: ['./workshop-full-info-member-search.component.css']
})
export class WorkshopFullInfoMemberSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      insuranceId: [''],
      nationalId: ['']
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
