import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';


@Component({
  selector: 'app-workshop-full-info-search',
  templateUrl: './workshop-full-info-search.component.html',
  styleUrls: ['./workshop-full-info-search.component.css']
})
export class WorkshopFullInfoSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  protected initializePage(): void {
    window.sessionStorage.setItem('paramsSelected', null);
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  resetForm() {
    window.sessionStorage.setItem('paramsSelected', null);
    this.searchForm.reset();
    this.submitt.emit();
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }
}
