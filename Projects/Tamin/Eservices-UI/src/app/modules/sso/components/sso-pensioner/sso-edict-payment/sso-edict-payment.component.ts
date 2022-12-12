import {Component, Input, ViewChild} from '@angular/core';
import {SsoEdictPaymentListComponent} from './sso-edict-payment-list/sso-edict-payment-list.component';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {SsoEdictPaymentSearchComponent} from './sso-edict-payment-search/sso-edict-payment-search.component';
import {InsuranceSpecModel} from '../../../../../models/base-info/insuranceSpec.model';
import {Urls} from '../../../../../settings/urls';
import {reject, resolve} from 'q';
import {FormGroup, Validators} from '@angular/forms';
import {Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-edict-payment',
  templateUrl: './sso-edict-payment.component.html',
  styleUrls: ['./sso-edict-payment.component.css']
})
export class SsoEdictPaymentComponent extends TaminPageBaseComponent {

  @ViewChild('paymentListComponent') paymentListComponent: SsoEdictPaymentListComponent;
  @ViewChild('paymentSearchComponent') paymentSearchComponent: SsoEdictPaymentSearchComponent;
  @Input() insuranceSpecModel: InsuranceSpecModel;
  data: any;
  private _overlay = null;
  private alertify: any;
  calculateDataForm: FormGroup;
  private _nationalCode: any;
  private _firstName: any;
  private _lastName: any;
  // isAccessible = true;


  protected initializePage(): void {
    this.title = 'فیش' + ' - ' + ' مستمری';
    this.calculateDataForm = this.formBuilder.group({
      insuranceNumber: [''],
      firstName: [''],
      lastName: [''],
      fatherName: [''],
      idCardNumber: [''],

    });
  }

  loadPageData() {
    // if (Number(this.getPersianDate(new Date()).substr(8, 2)) <= 10 && Number(this.getPersianDate(new Date()).substr(8, 2)) >= 5) {
    //   this.isAccessible = false;
    // }
    /* this._overlay = this.showOverlay();
     this.restService.getAll(Urls.PensionerInsuranceRequestFirst)
       .then(data => {
         this.hideOverlay(this._overlay);
         this.data = data.data;
         const pensionerIds = [];
         data.data.pensionerIds.forEach((item) => {
           pensionerIds.push({name: this.getPersianNumber(item), value: item});
         });
         // this.paymentViewComponent.setData(this.data);
         this.paymentSearchComponent.setPensionerIds(pensionerIds);
       })
       .catch(error => {
         this.hideOverlay(this._overlay);
       });*/
  }

  loadData(data) {
    const tmp = Object.assign(data, {
      nationalCode: this._nationalCode,
      firstName: this._firstName,
      lastName: this._lastName
    });
    this.paymentListComponent.loadData(tmp);
  }

  retryOrCancel() {
    this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.loadPageData();
      },
      () => {
        this.redirectTo('/');
      });
  }

  onSearch(nationalCode) {
    const me = this;
    const filter = [];
    me.calculateDataForm.get('insuranceNumber').setValue(null);
    me.calculateDataForm.get('firstName').setValue(null);
    me.calculateDataForm.get('lastName').setValue(null);
    me.calculateDataForm.get('fatherName').setValue(null);
    me.calculateDataForm.get('idCardNumber').setValue(null);
    me.paymentSearchComponent.pensionerList = [];
    if (me.paymentSearchComponent.searchForm.get('pensionerId').status === 'VALID') {
      me.paymentSearchComponent.searchForm.get('pensionerId').setValue(null);
    }
    this.data = null;
    if (nationalCode !== undefined && nationalCode !== null) {
      me._nationalCode = nationalCode;
      filter.push({
        property: 'nationalCode',
        value: nationalCode,
        operator: 'EQUAL'
      });
      const url = Urls.InsuranceRequestAdmin + '?filter=' + JSON.stringify(filter);
      this._overlay = this.showOverlay();
      this.restService.getAll(url)
        .then(value => {
          this.hideOverlay(this._overlay);
          if (value === undefined || value === null || value.data === undefined || value.data === null) {
            me.calculateDataForm.get('insuranceNumber').setValue(null);
            me.calculateDataForm.get('firstName').setValue(null);
            me.calculateDataForm.get('lastName').setValue(null);
            me.calculateDataForm.get('fatherName').setValue(null);
            me.calculateDataForm.get('idCardNumber').setValue(null);
            me.paymentSearchComponent.pensionerList = [];
            if (me.paymentSearchComponent.searchForm.get('pensionerId').status === 'VALID') {
              me.paymentSearchComponent.searchForm.get('pensionerId').setValue(null);
            }
            this.data = null;
            this.alertify.alert('پیام سیستم', 'کاربر گرامی، اطلاعات شخص مذکور در دسترس نمی باشد.');
            reject(false);
          } else {
            resolve(true);
            me.calculateDataForm.get('insuranceNumber').setValue(value.data.insuranceNumber);
            me.calculateDataForm.get('firstName').setValue(value.data.firstName);
            me.calculateDataForm.get('lastName').setValue(value.data.lastName);
            me.calculateDataForm.get('fatherName').setValue(value.data.fatherName);
            me.calculateDataForm.get('idCardNumber').setValue(value.data.identityNumber);
            me._firstName = value.data.firstName;
            me._lastName = value.data.lastName;
            me._initializePensioner(nationalCode);
          }
        }).catch(error => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', error.error.data.message);
      });
    }
  }

  private _initializePensioner(nationalCode) {
    const me = this;
    me.restService.getAll(Urls.SSO_PENSIONER_NO + '/' + nationalCode).then(result => {

      (<Array<any>>result.data.list).forEach(value => {

        me.paymentSearchComponent.pensionerList.push({
          name: this.getPersianNumber(value.pensionerId),
          value: value.pensionerId

        });
      });
      if (me.paymentSearchComponent.pensionerList.length > 0) {
        me.paymentSearchComponent.searchForm.get('pensionerId').setValue(me.paymentSearchComponent.pensionerList[0].value);
        me.paymentSearchComponent.isWrite = false;
      }

    })
      .catch(reason => {

      });

  }
}
