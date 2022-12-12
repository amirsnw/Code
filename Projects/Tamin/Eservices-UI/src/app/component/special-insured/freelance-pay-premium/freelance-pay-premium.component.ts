import { Component, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { Urls } from '../../../settings/urls';
import { FreelanceDisplayDetailPayPremiumComponent } from '../freelance-display-detail-pay-premium/freelance-display-detail-pay-premium.component';

declare var alertify: any;

@Component({
  selector: 'app-freelance-pay-premium',
  templateUrl: './freelance-pay-premium.component.html',
  styleUrls: ['./freelance-pay-premium.component.css']
})

export class FreelancePayPremiumComponent extends TaminPageBaseComponent {
  public overlay: any;
  public theForm: FormGroup;
  public lastPaymentDate: string;
  public chekReloLap: string;
  public startDate: string;
  public endDate: string;
  public PayPremiumDate: string;
  public insurancePremiums: string;
  public previousDebit: string;
  public total: string;
  public hasPaymentHistory = false;
  public checkCalcPremium = false;
  public allDesabled = false;
  @ViewChild('freelanceDisplayDetailPayPremiumComponent') freelanceDisplayDetailPayPremiumComponent: FreelanceDisplayDetailPayPremiumComponent;


  initializePage() {
    this.theForm = this.formBuilder.group({
      month: ['']
    });
    this.theForm.get('month').valueChanges.subscribe(value => {
      this.onChangeMonth();
    });
    setTimeout(() => {
      this.restService.getAll(Urls.freelancegetLastPayment)
        .then(data => {
          if (data.data !== undefined && data.data != null && data.data !== 0) {
            if (data.data.lastPaymentDate != "01" && data.data.lastPaymentDate != "0") {
              this.lastPaymentDate = data.data.lastPaymentDate;
              this.hasPaymentHistory = true;
            } else {
              this.hasPaymentHistory = false;
            }
            this.chekReloLap = data.data.chekReloLap;
            if (this.chekReloLap != "1" && this.chekReloLap != "") {
              alertify.alert(data.data.chkRelolapMessage);
              this.allDesabled = true;
            }
          }
        })
        .catch(error => {
          alertify.alert(error.error.data.message);
        });
    }, 1500);


    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.update(Urls.freelancecheckContractStatus, null, null)
        .then(data => {
          this.hideOverlay(this.overlay);
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          this.setSes('payPremiumError', error.error.data.message);
          this.redirectTo('optional-insurance/contract/invalid');
          reject(error);
        });
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
    this.redirectTo('/optional-insurance/freelance-detail-pay-premiume');
  }

  onCalcPremium() {
    const month = this.theForm.get('month').value;
    if (month == '' || month == null || month == undefined) {
      alertify.alert('برای محاسبه ماه را وارد کنید!');
      return;
    }
    this.overlay = this.showOverlay();
    this.restService.getAll(`${Urls.freelancecalcDebit}/${month}`)
      .then(data => {
        this.hideOverlay(this.overlay);
        if (data !== undefined && data != null) {
          this.startDate = data.data.startDate;
          this.endDate = data.data.endDate;
          if (data.data.PayPremiumDate != null && data.data.PayPremiumDate != "" && data.data.PayPremiumDate != undefined)
            this.PayPremiumDate = `${data.data.PayPremiumDate.substring(0, 4)}/${data.data.PayPremiumDate.substring(4, 6)}/${data.data.PayPremiumDate.substring(6, 8)}`;
          this.insurancePremiums = data.data.insurancePremiums;
          this.previousDebit = data.data.previousDebit;
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
    this.freelanceDisplayDetailPayPremiumComponent.show(this.startDate, this.endDate);
  }

  onPayPremium() {
    this.overlay = this.showOverlay();
    this.restService.getAll(`${Urls.onlinePayment}?start-date=${this.startDate}&end-date=${this.endDate}&amount=${this.total}&systemType=03`)
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
