import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-workshop-edit-address-search',
  templateUrl: './workshop-edit-address-search.component.html',
  styleUrls: ['./workshop-edit-address-search.component.css']
})
export class WorkshopEditAddressSearchComponent extends TaminPageBaseComponent {

  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  // constructor(private taminStaticDataService: TaminStaticDataService, public formBuilder: FormBuilder) {
  // }

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
