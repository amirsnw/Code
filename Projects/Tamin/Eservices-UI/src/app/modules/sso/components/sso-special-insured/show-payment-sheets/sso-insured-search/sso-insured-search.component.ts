import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-insured-search',
  templateUrl: './sso-insured-search.component.html',
  styleUrls: ['./sso-insured-search.component.css']
})
export class SsoInsuredSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() ClearForm = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  private overlay: any;
  isDisabled: boolean;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [TaminValidators.nationalId, Validators.required]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
      insuranceNumber: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  resetForm() {
    this.isDisabled = false;
    this.searchForm.reset();
    this.ClearForm.emit();
  }

  searchFormSubmit(value: any, valid: boolean) {
    debugger
    const values = this.searchForm.value;
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6) {
      return;
    }
    this.afterSubmit.emit(values);
  }

  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
       this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.ticket_crm + '/' + values.nationalCode + '/insuredPaymentSheets')
      .then(result => {
        this.isDisabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

}
