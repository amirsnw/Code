import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from "../../../../../../settings/urls";

@Component({
  selector: 'app-sso-user-info-search',
  templateUrl: './sso-user-info-search.component.html',
  styleUrls: ['./sso-user-info-search.component.css']
})
export class SsoUserInfoSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  private overlay: any;
  isDisabled: boolean;

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), TaminValidators.nationalId]],
      ticketCode: ['' , [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.isDisabled = false;
  }

  // resetForm() {
  //   this.searchForm.reset();
  //   this.afterSubmit.emit(null);
  // }

  searchFormSubmit(values, valid) {
    this.afterSubmit.emit(this.searchForm.value['nationalCode']);
  }
  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
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
      value: 'fishPension',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso , this.searchParams)
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
