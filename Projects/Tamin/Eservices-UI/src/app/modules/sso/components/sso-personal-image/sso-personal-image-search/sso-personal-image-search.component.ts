import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-personal-image-search',
  templateUrl: './sso-personal-image-search.component.html',
  styleUrls: ['./sso-personal-image-search.component.css']
})
export class SsoPersonalImageSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  requestTypes = [];
  isDesabled: boolean;
  private overlay: any;

  initializePage() {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.isDesabled = false;
  }

  protected loadPageData(): void {
    // this.requestTypes.push(
    //   {
    //     name: 'کارفرما',
    //     value: '0'
    //   },
    //   {
    //     name: 'بیمه شده',
    //     value: '1'
    //   },
    // );

  }

  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
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
      value: 'registration',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.isDesabled = true;
    this.restService.getAll(Urls.RequestTicketAdmin, this.searchParams)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

  resetForm() {
    this.searchForm.reset();
    this.afterSubmit.emit(null);
    this.isDesabled = false;
    // this.Submitt.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit(value , valid) {
    const values = this.searchForm.value;
    // if (value.nationalCode.length === 0 || value.nationalCode.length !== 10 ) {
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.submitt.emit(values);
  }

}
