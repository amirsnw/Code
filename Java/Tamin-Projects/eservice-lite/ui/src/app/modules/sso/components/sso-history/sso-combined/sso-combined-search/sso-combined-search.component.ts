import {Component, EventEmitter, ViewChild, OnInit, Output} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminDataGridComponent} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../../settings/urls';
import {TaminStaticDataService} from '../../../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-sso-combined-search',
  templateUrl: './sso-combined-search.component.html',
  styleUrls: ['./sso-combined-search.component.css']
})

export class SsoCombinedSearchComponent extends TaminPageBaseComponent {
  @Output() Submitt = new EventEmitter<any>();
  @Output() ClearForm = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  isDesabled: boolean;
  private overlay: any;

  public href: String = '';
  private nationalCodeUrl = '';
  private pattern1 = /^\+?(0|[1-9]\d*)$/g;
  private pattern2 = /[a-zA-Z]/g;
  private result1 = false;
  private result2 = false;

  // constructor(public formBuilder: FormBuilder, private taminStaticDataService: TaminStaticDataService) {
  // }

  // ngOnInit() {
  //   this._initializeFromGroup();
  // }

  initializePage() {
    this._initializeFromGroup();
    this.isDesabled = false;
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.href = window.location.href;
    this.nationalCodeUrl = this.href.substring(this.href.length - 10, this.href.length);
    this.result1 = this.pattern1.test(this.nationalCodeUrl);
    this.result2 = this.pattern2.test(this.nationalCodeUrl);
    // if (this.result1 === true && this.result2 === false ) {
    if (!isNaN(this.nationalCodeUrl as any)) {
      this.searchForm.get('nationalCode').setValue(this.nationalCodeUrl);
    }
  }

  resetForm() {
    this.isDesabled = false;
    this.searchForm.reset();
    this.ClearForm.emit();
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
      value: 'historyTalfigh',
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

  searchFormSubmit() {
    const values = this.searchForm.value;
    // if (value.nationalCode.length === 0 || value.nationalCode.length !== 10 ) {
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.Submitt.emit(values);
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      insuranceNumber: [''],
      nationalCode: ['']
    });
  }

}
