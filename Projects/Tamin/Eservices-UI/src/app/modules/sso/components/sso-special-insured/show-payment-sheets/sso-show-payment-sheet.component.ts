import {Component, OnInit, ViewChild, ChangeDetectorRef, Injector} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {WorkshopFullInfoListComponent} from '../../../../../component/workshop-registration/workshop-full-info/workshop-full-info-list/workshop-full-info-list.component';
import {SsoInsuredPaymentSheetListComponent} from './sso-insured-payment-sheet-list/sso-insured-payment-sheet-list.component';
import {StpUrls} from '../../../../stp/stp-urls';
import {reject, resolve} from 'q';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';
import {SsoInsuredSearchComponent} from './sso-insured-search/sso-insured-search.component';

declare var alertify: any;

@Component({
  selector: 'app-sso-show-payment-sheet',
  templateUrl: './sso-show-payment-sheet.component.html',
  styleUrls: ['./sso-show-payment-sheet.component.css']
})
export class SsoShowPaymentSheetComponent extends TaminPageBaseComponent {
  @ViewChild('paymentSheetList') paymentSheetList: SsoInsuredPaymentSheetListComponent;
  @ViewChild('insuredForm') insuredForm: SsoInsuredSearchComponent;
  private _overlay: any;
  private nationalCode: any;
  private ticketCode: any;

  protected initializePage(): void {
  }

  loadInsuredInfo(params) {
    const me = this;
    this.restService.getAll(Urls.SSO_getPersonalInfo + '/' + params.nationalCode)
      .then(value => {
        this.hideOverlay(this._overlay);
        if (value === undefined || value === null || value.data === undefined || value.data === null) {
          me.insuredForm.searchForm.get('insuranceNumber').setValue(null);
          me.insuredForm.searchForm.get('firstName').setValue(null);
          me.insuredForm.searchForm.get('lastName').setValue(null);
          alertify.alert('پیام سیستم', 'کاربر گرامی، بیمه شده ای با کد ملی فوق ثبت نشده است.');
          reject(false);
        } else {
          resolve(true);
          me.insuredForm.searchForm.get('insuranceNumber').setValue(value.data.insuranceId);
          me.insuredForm.searchForm.get('firstName').setValue(value.data.personal.firstName);
          me.insuredForm.searchForm.get('lastName').setValue(value.data.personal.lastName);
        }
      }).catch(error => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', error.error.data.message);
    });
  }

  onSearchPaymentSheetSubmit(params: any) {
    if (this.nationalCode != null && this.nationalCode !== undefined) {
      if (params === undefined || params == null) {
        params = [];
      }
      params.nationalCode = this.nationalCode;
      params.ticketCode = this.ticketCode;
      this.paymentSheetList.loadData(params);
    } else {
      this.showInfoMessageBox('توجه', 'لطفا کد ملی بیمه شده را وارد نمایید!');
    }
  }

  onSearchInsuredSubmit(params: any) {
    debugger
    this.loadInsuredInfo(params);
    this.nationalCode = params.nationalCode;
    this.ticketCode = params.ticketCode;
    this.onSearchPaymentSheetSubmit([]);
  }
}
