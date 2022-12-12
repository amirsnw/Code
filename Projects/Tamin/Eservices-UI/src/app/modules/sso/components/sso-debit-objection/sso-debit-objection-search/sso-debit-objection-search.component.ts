import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-debit-objection-search',
  templateUrl: './sso-debit-objection-search.component.html',
  styleUrls: ['./sso-debit-objection-search.component.css']
})
export class SsoDebitObjectionSearchComponent extends TaminPageBaseComponent {
  @Output() Submitt = new EventEmitter<any>();
  @Input() serviceName: any;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  requestTypes = [];
  isDesabled: boolean;
  private overlay: any;


  ngOnInit() {
    this._initializeFromGroup();
  }

  resetForm() {
    this.searchForm.reset();
  }

  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
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
      value: this.serviceName,
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

  searchFormSubmit(value) {
    if (value.nationalCode.length === 0 || value.nationalCode.length !== 10) {
      return;
    }
    if (value.ticketCode.length === 0 || value.ticketCode.length !== 6) {
      return;
    }
    this.Submitt.emit(value);
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, TaminValidators.nationalId]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.isDesabled = false;
  }
}
