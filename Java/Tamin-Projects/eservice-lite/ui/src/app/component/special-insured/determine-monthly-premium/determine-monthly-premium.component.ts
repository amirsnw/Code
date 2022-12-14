import { Component, EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { FormGroup, Validators } from '@angular/forms';

declare var alertify: any;

@Component({
  selector: 'app-determine-monthly-premium',
  templateUrl: './determine-monthly-premium.component.html',
  styleUrls: ['./determine-monthly-premium.component.css']
})

export class DetermineMonthlyPremiumComponent extends TaminPageBaseComponent {
  private overlay: any;
  @Output() validPremium = new EventEmitter<any>();
  @Output() medicalExemption = new EventEmitter<any>();
  @Output() changeScroll = new EventEmitter<any>();
  public viewForm: FormGroup;
  public minPremium = 0;
  public maxPremium = 0;
  public alldisabled = false;
  public minPremiumWithComma = ' ';
  public maxPremiumWithComma = ' ';
  public isPayment = false;

  initializePage() {
    this.setSes('premium', null);
    this.setSes('checkedPremium', null);
    this.viewForm = this.formBuilder.group({
      monthlyPremium: ['', Validators['required']],
      salary: ['']
    });
    this.viewForm.get('monthlyPremium').valueChanges.subscribe(value => {
      this.onChangePremium();
    });
    // this.validPremium.emit(false);
    // this.medicalExemption.emit(false);
    this.loadDate();
  }

  private onChangePremium() {
    this.setSes('premium', this.viewForm.get('monthlyPremium').value);
  }

  loadDate() {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.getLowHighPremium)
        .then(data => {
          this.hideOverlay(this.overlay);
          this.minPremium = data.data.lowPremium;
          this.maxPremium = data.data.highPremium;
          this.minPremiumWithComma = this.getWithCommaSeperator(data.data.lowPremium);
          this.maxPremiumWithComma = this.getWithCommaSeperator(data.data.highPremium);
          this.changeScroll.emit();
        }
        )
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }

  onCalculateSalary() {
    if (!Number(this.maxPremium) || !Number(this.minPremium) ||
      Number(this.viewForm.get('monthlyPremium').value) > Number(this.maxPremium) ||
      Number(this.viewForm.get('monthlyPremium').value) < Number(this.minPremium)) {
      this.showErrorMessageBox('بیمه شده گرامی', 'مبلغ حق بیمه ماهانه را از ' + this.minPremium + ' تا ' + this.maxPremium + ' انتخاب نمایید.');
    } else {
      return new Promise((resolve, reject) => {
        this.overlay = this.showOverlay();
        this.restService.getAll(Urls.checkAndCalcSalary + '/' + this.viewForm.get('monthlyPremium').value)
          .then(data => {
            this.hideOverlay(this.overlay);
            this.viewForm.get('salary').setValue(this.getWithCommaSeperator(data.data));
            this.setSes('premium', this.viewForm.get('monthlyPremium').value);
            this.setSes('checkedPremium', this.viewForm.get('monthlyPremium').value);
            this.setSes('salary', this.getWithCommaSeperator(data.data));
            this.checkMedicalExemption();
          }
          )
          .catch(error => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('بیمه شده گرامی', error.error.data.message);
            reject(error);
          });
      });
    }
  }

  checkMedicalExemption() {
    this.restService.getAll(Urls.checkMedicalExemption)
      .then(data => {
        this.validPremium.emit(true)
        if (data !== undefined && data != null) {
          if (data.data === 1) this.medicalExemption.emit(true);
          else this.medicalExemption.emit(false);
        }
      })
      .catch(error => {
        alertify.alert(error.data);
      });
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  getWithCommaSeperator(item) {
    if (item != null) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  getSalary() {
    return this.viewForm.get('salary').value;
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
