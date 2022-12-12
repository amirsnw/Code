import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';


@Component({
  selector: 'app-sso-workshop-full-info-search',
  templateUrl: './sso-workshop-full-info-search.component.html',
  styleUrls: ['./sso-workshop-full-info-search.component.css']
})
export class SsoWorkshopFullInfoSearchComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  @Output() ClearForm = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  isDisabled: boolean;
  private overlay: any;

  protected initializePage(): void {
    this._initializeFromGroup();
  }

  private _initializeFromGroup() {
    this.isDisabled = false;
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [TaminValidators.nationalId, Validators.required]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
      workshopId: [''],
      branchCode: ['']
    });
  }

  resetForm() {
    this.isDisabled = false;
    this.searchForm.reset();
    this.ClearForm.emit();
  }

  searchFormSubmit(value: any, valid: boolean) {
    const values = this.searchForm.value;
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6) {
      return;
    }
    this.submitt.emit(values);
  }

  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
     this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.ticket_crm + '/' + values.nationalCode + '/workshopPaymentSheets')
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
