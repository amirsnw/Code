import {Component, EventEmitter, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-agent-conscription-search',
  templateUrl: './agent-conscription-search.component.html',
  styleUrls: ['./agent-conscription-search.component.css']
})
export class AgentConscriptionSearchComponent extends TaminPageBaseComponent {

  private overlay: any;

  searchForm: FormGroup;
  @Output() submit = new EventEmitter<any>();
  lock: boolean;

  protected initializePage(): void {
    this.lock = true;
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  sendUserTicket() {
    if (!this.searchForm.controls.nationalCode.valid) {
      this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    const searchParams: Array<SearchParam> = Array(0);
    searchParams.push({
      property: 'nationalCode',
      value: this.searchForm.value.nationalCode,
      operator: SearchOperator.EQ

    });
    searchParams.push({
      property: 'serviceName',
      value: 'soldier',
      operator: SearchOperator.EQ
    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.RequestTicketAdmin, searchParams)
      .then(result => {
        this.lock = false;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.lock = true;
        this.hideOverlay(this.overlay);
        if (reason !== undefined && reason != null && reason.status === 403) {
          this.showErrorMessageBox('پیام سیستم', 'شما مجوز دسترسی ندارید');
          return;
        }
        if (reason.error != null && reason.error.data != null
            && reason.error.data.message !== undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          return;
        }
        this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  search(): void {
    if (!this.lock) {
      this.submit.emit(this.searchForm.getRawValue());
    }
  }
}
