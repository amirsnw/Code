import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-pension-inquiry-search',
  templateUrl: './pension-inquiry-search.component.html',
  styleUrls: ['./pension-inquiry-search.component.css']
})
export class PensionInquirySearchComponent extends TaminPageBaseComponent {

  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  @Output() Submitt = new EventEmitter<any>();
  @Output() ClearForm = new EventEmitter<any>();
  private overlay: any;

  initializePage() {
    this._initializeFromGroup();
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }
  resetForm() {
    this.searchForm.reset();
    this.ClearForm.emit();
  }

  searchFormSubmit() {
    debugger;
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10 ) {
      this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.Submitt.emit(values);
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['']
    });
  }

}
