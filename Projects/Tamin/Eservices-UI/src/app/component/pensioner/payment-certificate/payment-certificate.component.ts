import {Component, OnInit, Injector, ViewChild} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';
import { Urls } from 'src/app/settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payment-certificate',
  templateUrl: './payment-certificate.component.html',
  styleUrls: ['./payment-certificate.component.css']
})
export class PaymentCertificateComponent extends TaminPageBaseComponent {
  @ViewChild('recipient') recipient: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  public formPaymentCert: FormGroup;
  private _overlay: any;
  private router: ActivatedRoute;
  data: any;
  private _subscription = new Subscription();
  showRecipient: boolean;
  showBranchName: boolean;
  isWrite=true;
  pensionerList = [];

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  private _initializePensioner() {
    this.restService.getAll(Urls.PENSIONER_NO).then(result => {
      (<Array<any>>result.data.list).forEach(value => {
        this.pensionerList.push({
          name: this.getPersianNumber(value.pensionerId),
          value: value.pensionerId

        });
      });
      if (this.pensionerList.length > 0) {
        this.formPaymentCert.get('pensionerId').setValue(this.pensionerList[0].value);
        this.isWrite=false;
      }

    })
      .catch(reason => {

      });

  }
  private _initializeFormGroup() {
    this._subscription.add(this.formPaymentCert.get('recipient').valueChanges.subscribe(value => {
      if (value !== undefined && value !== '' && value === '99') {
        this.showRecipient = true;
        this.showBranchName = false;
      } else {
        this.showRecipient = false;
        this.showBranchName = true;
      }
    }));
  }
  loadPageData() {
debugger
  }
  get formValues() {
    return this.formPaymentCert.getRawValue();
  }

  private createForm() {
    this.formPaymentCert = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      recipient: ['', [Validators.required]],
      target: [''],
      branchName: [''],
    });
  }

  initializePage() {
    debugger
    this._initializePensioner();
    this._initializeRecipient();
    this.createForm();
    this._initializeFormGroup();

  }

  private _initializeRecipient() {
    debugger
    this.recipient.valueField = 'recipientCode';
    this.recipient.displayField = 'recipientName';
    this.recipient.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.recipients)
      .setShowPager(true)
      .setFirstLoad(true)
      .setId('recipientCode')
      .addVisibleColumn({columnName: 'recipientName', columnCaption: 'نام گیرنده', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(60)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }
  wirteClick(){
    this.isWrite=true;
  }
  selectClick(){
    this.isWrite=false;
  }
  confirmClick(values, valid) {
    debugger
    if (!this.formPaymentCert.valid) {
      this.markFormGroupAsTouched(this.formPaymentCert);
      return;
    }

    const pensionerId = new SearchParam();
    pensionerId.property = 'pensionerId';
    pensionerId.operator = SearchOperator.EQUAL;
    pensionerId.value = this.formPaymentCert.get('pensionerId').value;

    const paymentType = new SearchParam();
    paymentType.property = 'recipient';
    paymentType.operator = SearchOperator.EQUAL;
    paymentType.value =  this.formPaymentCert.get('recipient').value  ;

    const target = new SearchParam();
    target.property = 'target';
    target.operator = SearchOperator.EQUAL;
    target.value =  this.formPaymentCert.get('target').value;

    const branchName = new SearchParam();
    branchName.property = 'branchName';
    branchName.operator = SearchOperator.EQUAL;
    branchName.value =  this.formPaymentCert.get('branchName').value  ;

    const searchParams: Array<SearchParam> = [];
    searchParams.push(pensionerId);
    searchParams.push(paymentType);
    searchParams.push(target);
    searchParams.push(branchName);

    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.PensionerCertificate + "/report", searchParams)
      .then(result => {
        debugger
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال گواهی حقوق با موفقیت انجام شد');

      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}
