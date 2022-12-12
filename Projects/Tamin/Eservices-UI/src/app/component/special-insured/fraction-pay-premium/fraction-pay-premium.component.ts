import { Component, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { Urls } from '../../../settings/urls';
import { FractionDisplayDetailPayPremiumComponent } from '../fraction-display-detail-pay-premium/fraction-display-detail-pay-premium.component';

declare var alertify: any;

@Component({
  selector: 'app-fraction-pay-premium',
  templateUrl: './fraction-pay-premium.component.html',
  styleUrls: ['./fraction-pay-premium.component.css']
})

export class FractionPayPremiumComponent extends TaminPageBaseComponent {
  public overlay: any;
  public theForm: FormGroup;
  public countPayment: string;
  public chekReloLap: string;
  public startDate: string;
  public endDate: string;
  public insurancePremiums: string;
  public previousDebit: string;
  public total: string;
  public hasPaymentHistory = false;
  public checkCalcPremium = false;
  public allDesabled = false;
  @ViewChild('fractiondisplayDetailPayPremiumComponent') fractiondisplayDetailPayPremiumComponent: FractionDisplayDetailPayPremiumComponent;


  initializePage() {
    this.theForm = this.formBuilder.group({
      month: ['']
    });
    this.theForm.get('month').valueChanges.subscribe(value => {
      this.onChangeMonth();
    });
    //todo
    this.restService.getAll(Urls.fractiongetLastPayment)
      .then(data => {
        var values = data.data;
        if (values !== undefined && values != null && values !== 0) {
          if (values.countPayment > 0) {
            this.countPayment = values.countPayment;
            this.hasPaymentHistory = true;
          } else {
            this.hasPaymentHistory = false;
          }
          if (values.startDate != null && values.startDate.length == 8) {
            this.startDate = `${values.startDate.substring(0, 4)}/${values.startDate.substring(4, 6)}/${values.startDate.substring(6, 8)}`;
            this.endDate = `${values.startDate.substring(0, 4)}/${values.endDate.substring(0, 2)}/${values.endDate.substring(2, 4)}`;
          }
          if (values.checkFracMonCheckDate != "1") {
            alertify.alert(values.checkFracMonCheckDate);
            this.allDesabled = true;
            return;
          }
          if (values.resultCalcDebit == 0) {
            if (values.endDate == "0631") alertify.alert("روزهای کارکرد شما در 6 ماه اول کامل میباشد");
            else alertify.alert("تعداد روزهای کارکرد شما در 6 ماه  دوم کامل میباشد ");
            this.allDesabled = true;
          }
        }
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        alertify.alert(error.error.data.message);
        this.allDesabled = true;
        // this.redirectTo('optional-insurance/contract/invalid');
      });
  }

  convertTimeStampToPersianDate(timeStamp: any) {
    return this.getPersianDate(new Date(timeStamp));
  }

  getPersianCurrency(price: any) {
    if (price != null) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  onShowPaymentHistory() {
    this.redirectTo('optional-insurance/fraction-detail-pay-premiume');
  }

  onCalcPremium() {
    this.overlay = this.showOverlay();
    //todo
    this.restService.getAll(Urls.fractionecalcDebit)
      .then(data => {
        this.hideOverlay(this.overlay);
        if (data !== undefined && data != null) {
          this.total = data.data.total;
          this.checkCalcPremium = true;
        }
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        // alertify.alert('در حال حاضر امکان محاسبه بدهی وجود ندارد.');
        alertify.alert(error.error.data.message);
      });

  }

  private onChangeMonth() {
    const month = this.theForm.get('month').value;
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      alertify.alert('ماه وارد شده باید حداقل 1 ماه یا حد اکثر 12 ماه باشد!');
      this.theForm.get('month').setValue(1);
      return;
      // this.theForm.get('month').setValue(`${persianNumberPipe.transform(result.toString(), 'cs')} ريال`);
    }
  }

  onDisplayCalcDetail() {
    if (this.startDate == null || this.startDate == undefined || this.startDate == '') {
      alertify.alert('شروع دوره پرداخت باید مقدار داشته باشد!');
      return;
    }
    if (this.endDate == null || this.endDate == undefined || this.endDate == '') {
      alertify.alert('پایان دوره پرداخت باید مقدار داشته باشد!');
      return;
    }
    this.fractiondisplayDetailPayPremiumComponent.show(this.startDate, this.endDate);
  }

  onPayPremium() {
    this.overlay = this.showOverlay();
    this.restService.getAll(`${Urls.onlinePayment}?start-date=${this.startDate.replace('/', '').replace('/', '')}&end-date=${this.endDate.replace('/', '').replace('/', '')}&amount=${this.total}&systemType=04`)
      .then(data => {
        this.hideOverlay(this.overlay);
        if (data !== undefined && data != null) {
          // window.open(data.data, '_self ');
          location.href = data.data;
        }
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        var splitmessage = error.error.data.message.split("get token failed");
        if (splitmessage.length > 1) alertify.alert(splitmessage[1]);
        else alertify.alert('در حال حاضر امکان اتصال به درگاه پرداخت الکترونیکی وجود ندارد.');
      });
  }
}
