import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminDataGridComponent, TaminValidators } from 'tamin-framework';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Urls } from "../../../../settings/urls";

@Component({
  selector: 'app-orthosis-and-prosthesis-no-presence-search',
  templateUrl: './orthosis-and-prosthesis-no-presence-search.component.html',
  styleUrls: ['./orthosis-and-prosthesis-no-presence-search.component.css']
})
export class OrthosisAndProsthesisNoPresenceSearchComponent extends TaminPageBaseComponent  {
  @Output() Submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];
  requestTypes = [];
  isDesabled: boolean;
  private overlay: any;

  // constructor(public formBuilder: FormBuilder) {//, private taminStaticDataService: TaminStaticDataService
  // }

  ngOnInit() {
    this._initializeFromGroup();
  }

  resetForm() {
    this.searchForm.reset();
    // this.Submitt.emit(this.searchForm.getRawValue());
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
      value: 'stpOrthosisAndProsthesis',
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
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    if (value.ticketCode.length === 0 || value.ticketCode.length !== 6) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
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
