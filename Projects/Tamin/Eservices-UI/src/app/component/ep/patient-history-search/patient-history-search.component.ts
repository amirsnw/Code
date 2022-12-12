import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-history-search',
  templateUrl: './patient-history-search.component.html',
  styleUrls: ['./patient-history-search.component.css']
})
export class PatientHistorySearchComponent extends TaminPageBaseComponent  {
  @ViewChild('typeCombo') typeCombo: TaminFieldComboBoxStaticComponent;
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;

  protected initializePage(): void {
    this._initializeFromGroup();

    this.typeCombo.dataItems = [
      {
        name: '  دارو',
        value: '1'
      },
      {
        name: 'پاراکلینیک',
        value: '2'
      },
      {
        name: ' ویزیت',
        value: '3'
      } ,
      {
        name: 'خدمات پزشکی',
        value: '5'
      }
    ];
  }


  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      prescType: ['', Validators.required],
      prescDateFrom: ['', Validators.required],
      prescDateTo: ['', Validators.required]
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
