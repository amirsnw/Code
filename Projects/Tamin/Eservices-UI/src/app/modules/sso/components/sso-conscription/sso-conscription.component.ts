import {Component, Injector, ViewChild} from '@angular/core';
import {PersianNumberPipe, SearchOperator, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Urls} from '../../../../settings/urls';
import {CombinedListComponent} from '../../../../component/history/combined/combined-list/combined-list.component';
import {reject, resolve} from 'q';

@Component({
  selector: 'app-conscription',
  templateUrl: './sso-conscription.component.html',
  styleUrls: ['./sso-conscription.component.css']
})
export class SsoConscriptionComponent extends TaminPageBaseComponent {
  calculateDataForm: FormGroup;
  searchFrom: FormGroup;
  private _overlay: any;
  private _wageAverage = 0;
  isEligible = true;
  data: Array<any>;
  renderMode: 'desktop' | 'mobile' = 'desktop';
  private alertify: any;

  constructor(injector: Injector, private breakpointObserver: BreakpointObserver) {
    super(injector);
  }

  protected initializePage(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (![Breakpoints.Small, Breakpoints.Handset]) {
          return;
        }
        if (state.matches) {
          if (this.renderMode !== 'mobile') {
            this.renderMode = 'mobile';
          }
        } else {
          if (this.renderMode !== 'desktop') {
            this.renderMode = 'desktop';
          }
        }
      });

    this.calculateDataForm = this.formBuilder.group({
      insuranceNumber: [''],
      firstName: [''],
      lastName: [''],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      wageAverage: [''],
      amount: [''],
    });

    this.calculateDataForm.get('duration').valueChanges.subscribe(value => {
      const persianNumberPipe = new PersianNumberPipe();
      const tmp = Math.round((value * this._wageAverage * 7) / 100);
      this.calculateDataForm.get('amount').setValue(persianNumberPipe.transform(tmp, 'cs'));
    });
  }

  protected loadDataByNationalCode(value): void {
    const persianNumberPipe = new PersianNumberPipe();
    this._wageAverage = Math.round(value.data.wageValues[value.data.wageValues.length - 1].his_WAGE / 24);
    this.calculateDataForm.get('wageAverage').setValue(persianNumberPipe.transform(this._wageAverage, 'cs'));
    this.reshapeData(value.data.wageValues);
  }

  private reshapeData(data: Array<any>) {
    const result = [];
    const groupedBy = this.groupBy(data.slice(0, -1), kg => kg.his_YEAR);
    groupedBy.forEach((value: Array<any>, key: string) => {
      const tmp = {
        year: '',
        month1_days: '0',
        month1_wage: '0',
        month2_days: '0',
        month2_wage: '0',
        month3_days: '0',
        month3_wage: '0',
        month4_days: '0',
        month4_wage: '0',
        month5_days: '0',
        month5_wage: '0',
        month6_days: '0',
        month6_wage: '0',
        month7_days: '0',
        month7_wage: '0',
        month8_days: '0',
        month8_wage: '0',
        month9_days: '0',
        month9_wage: '0',
        month10_days: '0',
        month10_wage: '0',
        month11_days: '0',
        month11_wage: '0',
        month12_days: '0',
        month12_wage: '0'
      };
      value.forEach(value1 => {
        tmp['year'] = value1.his_YEAR;
        switch (value1.his_MON) {
          case '01':
            tmp.month1_days = value1.his_DAY;
            tmp.month1_wage = value1.his_WAGE;
            break;
          case '02':
            tmp.month2_days = value1.his_DAY;
            tmp.month2_wage = value1.his_WAGE;
            break;
          case '03':
            tmp.month3_days = value1.his_DAY;
            tmp.month3_wage = value1.his_WAGE;
            break;
          case '04':
            tmp.month4_days = value1.his_DAY;
            tmp.month4_wage = value1.his_WAGE;
            break;
          case '05':
            tmp.month5_days = value1.his_DAY;
            tmp.month5_wage = value1.his_WAGE;
            break;
          case '06':
            tmp.month6_days = value1.his_DAY;
            tmp.month6_wage = value1.his_WAGE;
            break;
          case '07':
            tmp.month7_days = value1.his_DAY;
            tmp.month7_wage = value1.his_WAGE;
            break;
          case '08':
            tmp.month8_days = value1.his_DAY;
            tmp.month8_wage = value1.his_WAGE;
            break;
          case '09':
            tmp.month9_days = value1.his_DAY;
            tmp.month9_wage = value1.his_WAGE;
            break;
          case '10':
            tmp.month10_days = value1.his_DAY;
            tmp.month10_wage = value1.his_WAGE;
            break;
          case '11':
            tmp.month11_days = value1.his_DAY;
            tmp.month11_wage = value1.his_WAGE;
            break;
          case '12':
            tmp.month12_days = value1.his_DAY;
            tmp.month12_wage = value1.his_WAGE;
            break;
        }
      });
      result.push(tmp);
    });
    this.data = result;
  }

  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  onSearch(values) {
    debugger
    const nationalCode = values.nationalCode;
    const ticketCode = values.ticketCode;
    const me = this;
    const filter = [];
    me.calculateDataForm.get('insuranceNumber').setValue(null);
    me.calculateDataForm.get('firstName').setValue(null);
    me.calculateDataForm.get('lastName').setValue(null);
    me.calculateDataForm.get('duration').setValue(null);
    me.calculateDataForm.get('wageAverage').setValue(null);
    me.calculateDataForm.get('amount').setValue(null);
    this.data = null;
    if (nationalCode !== undefined && nationalCode !== null && ticketCode !== undefined && ticketCode !== null) {
      const url = Urls.SSO_Soldier_Wage + '/' + nationalCode + '/' + ticketCode;
      this._overlay = this.showOverlay();
      this.restService.getAll(url)
        .then(value => {
          this.hideOverlay(this._overlay);
          if (value === undefined || value === null || value.data === undefined || value.data === null || value.data.userInfo === undefined || value.data.userInfo === null || value.data.wageValues === undefined || value.data.wageValues === null) {
            me.calculateDataForm.get('insuranceNumber').setValue(null);
            me.calculateDataForm.get('firstName').setValue(null);
            me.calculateDataForm.get('lastName').setValue(null);
            me.calculateDataForm.get('duration').setValue(null);
            me.calculateDataForm.get('wageAverage').setValue(null);
            me.calculateDataForm.get('amount').setValue(null);
            this.data = null;
            this.alertify.alert('پیام سیستم', 'کاربر گرامی، اطلاعات شخص مذکور در دسترس نمی باشد.');
            reject(false);
          } else {
            resolve(true);
            me.calculateDataForm.get('insuranceNumber').setValue(value.data.userInfo.insuranceNumber);
            me.calculateDataForm.get('firstName').setValue(value.data.userInfo.firstName);
            me.calculateDataForm.get('lastName').setValue(value.data.userInfo.lastName);
            me.loadDataByNationalCode(value);
          }
        }).catch(error => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', error.error.data.message);
      });
    }
  }


}
