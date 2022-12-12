import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-intro-relation-date-form-medical-committee',
  templateUrl: './committee-intro-relation-date-form.component.html',
  styleUrls: ['../../main-committee/main-committee.component.css'],
})
export class CommitteeIntroRelationDateFormComponent extends TaminPageBaseComponent {

  dateForm: FormGroup;
  birthDate: number;

  @Output() onSubmit = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<boolean>();

  /* Constructor */
  constructor(injector: Injector) {
    super(injector);
    this.securityService.getCurrentUser().then(item => {
      this.birthDate = item.birthDate;
    });
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.dateForm = this.formBuilder.group({
      insuranceDate: ['', [Validators.required]],
    });
  }

  cancelPastDemand() {
    this.dateForm.reset();
    this.onCancel.emit(true);
  }

  continuePastDemandAction() {
    debugger
    if (!this.dateForm.valid) {
      this.markFormGroupAsTouched(this.dateForm);
      this.showInfoMessageBox('پیام سیستم', 'لطفا تاریخ بیمه پردازی پیشین خود را وارد نمایید.');
      return;
    } else if (new Date(this.dateForm.value.insuranceDate).getTime() >= new Date().getTime()) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ بیمه پردازی پیشین باید قبل از تاریخ روز باشد.');
      return;
    } else if (new Date(this.dateForm.value.insuranceDate).getTime() < this.birthDate) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ بیمه پردازی پیشین نمی تواند قبل از تاریخ تولد باشد.');
      return;
    }
    this.onSubmit.emit(this.dateForm.value.insuranceDate);
  }
}
