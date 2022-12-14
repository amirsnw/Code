import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { TaminPageBaseComponent, SearchOperator, SearchParam } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'sso-app-workshop-insurance-procrastination-search',
  templateUrl: './sso-workshop-insurance-procrastination-search.component.html',
  styleUrls: ['./sso-workshop-insurance-procrastination-search.component.css']
})
export class SsoWorkshopInsuranceProcrastinationSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  isDesabled: boolean;
  private overlay: any;
  searchParams: SearchParam[];

  protected initializePage(): void {
    this.isDesabled = true;
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      workshopId: [''],
      branchCode: [''],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  resetForm() {
    this.isDesabled = true;
    this.searchForm.reset();
    this.submitt.emit();
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }
  sendUserTicket() {
    debugger;
    const values = this.searchForm.value;
    if (values.nationalCode == null || values.nationalCode == '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      alert('مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ

    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'workshopProcrastination',
      operator: SearchOperator.EQ
    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.RequestTicketAdmin, this.searchParams)
      .then(result => {
        this.isDesabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }
}
