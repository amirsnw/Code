import {Component, ElementRef, ViewChild} from '@angular/core';
import {PersianNumberPipe, TaminFieldValidatorComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {CombinedListComponent} from '../../history/combined/combined-list/combined-list.component';

@Component({
  selector: 'app-edict-details',
  templateUrl: './edict-details.component.html',
  styleUrls: ['./edict-details.component.css']
})
export class EdictDetailsComponent extends TaminPageBaseComponent {
  staticDataForm: FormGroup;
  calculateDataForm: FormGroup;
  @ViewChild('combinedList') combinedList: CombinedListComponent;
  @ViewChild('calculated') calculated: ElementRef;
  @ViewChild('durationFieldValidator') durationFieldValidator: TaminFieldValidatorComponent;
  private _overlay: any;
  private branchCode: string;
  private insuranceNumber: string;

  protected initializePage(): void {
    this.staticDataForm = this.formBuilder.group({
      duration: [''],
      wageAverage: [''],
      pensionAmount: [''],
     multipleWorkshops : ['']
    });
    this.calculateDataForm = this.formBuilder.group({
      duration: ['', [Validators.max(35.00), Validators.min(10.00)]],
      wageAverage: [''],
      pensionAmount: [''],
      // multipleWorkshops : ['']
    });

    this.calculateDataForm.get('duration').valueChanges.subscribe(value => {
      this.calculate();
  });
    this.calculateDataForm.get('wageAverage').valueChanges.subscribe(value => {
      this.calculate();
    });
    this.staticDataForm.get('multipleWorkshops').valueChanges.subscribe(value => {
      debugger;
      if (value) {
        this.calc();
      }
    });
  }

  protected loadPageData(): void {
    this.combinedList.loadData();
    // this.calc();
  }


  private calculate() {
    const persianNumberPipe = new PersianNumberPipe();
    const duration = Number(this.calculateDataForm.get('duration').value);
    if (duration > 35 || duration < 10) {
      this.calculateDataForm.get('pensionAmount').setValue(persianNumberPipe.transform('0', 'cs'));
      return;
    }
    const wageAverage = this.calculateDataForm.get('wageAverage').value;
    let result = Math.ceil((duration * wageAverage) / 30);

    if (duration >= 20 && wageAverage < 11112690) {
      result = 11112690;
    }
    if (duration < 20) {
      const minWage = (duration / 30) * 11112690;
      if (result < minWage) {
        result = minWage;
      }
    }

    this.calculateDataForm.get('pensionAmount').setValue(persianNumberPipe.transform(result.toString(), 'cs'));
  }

  calc() {
    this.changeDetectorRef.detectChanges();
    this._overlay = this.showOverlay(this.calculated.nativeElement);
    this.restService.getAll(Urls.SalaryRequest).then(value => {
      this.hideOverlay(this._overlay);
      this.internalCalc(value.data.list);
    }).catch(reason => {
      this.hideOverlay(this._overlay);
    });
  }

  internalCalc(list: Array<any>): any {
    debugger;
    const result = [];
    for (let i = list.length - 1; i >= 0; --i) {
      if (list[i].hismon12 !== null) {
        result.push({
          days: list[i].hismon12,
          wage: list[i].hiswage12
        });
      }
      if (list[i].hismon11 !== null) {
        result.push({
          days: list[i].hismon11,
          wage: list[i].hiswage11
        });
      }
      if (list[i].hismon10 !== null) {
        result.push({
          days: list[i].hismon10,
          wage: list[i].hiswage10
        });
      }
      if (list[i].hismon9 !== null) {
        result.push({
          days: list[i].hismon9,
          wage: list[i].hiswage9
        });
      }
      if (list[i].hismon8 !== null) {
        result.push({
          days: list[i].hismon8,
          wage: list[i].hiswage8
        });
      }
      if (list[i].hismon7 !== null) {
        result.push({
          days: list[i].hismon7,
          wage: list[i].hiswage7
        });
      }
      if (list[i].hismon6 !== null) {
        result.push({
          days: list[i].hismon6,
          wage: list[i].hiswage6
        });
      }
      if (list[i].hismon5 !== null) {
        result.push({
          days: list[i].hismon5,
          wage: list[i].hiswage5
        });
      }
      if (list[i].hismon4 !== null) {
        result.push({
          days: list[i].hismon4,
          wage: list[i].hiswage4
        });
      }
      if (list[i].hismon3 !== null) {
        result.push({
          days: list[i].hismon3,
          wage: list[i].hiswage3
        });
      }
      if (list[i].hismon2 !== null) {
        result.push({
          days: list[i].hismon2,
          wage: list[i].hiswage2
        });
      }
      if (list[i].hismon1 !== null) {
        result.push({
          days: list[i].hismon1,
          wage: list[i].hiswage1
        });
      }
    }

    let days = 0;
    let wages = 0;
    result.forEach((item) => {
      if (days < 730) {
        days += Number(item.days);
        wages += Number(item.wage);
      }
    });

    const years = Number(this.combinedList.sumHistoryYears) / 365;
    const data1 = Number(years.toFixed(2));
    const data2 = Math.ceil(wages / 24);
    let data3 = Math.ceil((data2 / 30) * data1);
    if (data1 >= 20 && data3 < 11112690) {
      data3 = 11112690;
    }
    if (data1 < 20) {
      const minWage = (data1 / 30) * 11112690;
      if (data3 < minWage) {
        data3 = minWage;
      }
    }
    const persianNumberPipe = new PersianNumberPipe();
    persianNumberPipe.transform(data1, 'cs');

    this.staticDataForm.get('duration').setValue(persianNumberPipe.transform(data1, 'cs'));
    this.staticDataForm.get('wageAverage').setValue(persianNumberPipe.transform(data2, 'cs'));
    if ( this.staticDataForm.get('multipleWorkshops').value) {
      this.multipleWorkshopCalc();
    } else {
      this.staticDataForm.get('pensionAmount').setValue(persianNumberPipe.transform(data3, 'cs')) ;
    }
  }
  multipleWorkshopCalc() {
    debugger;
    const value  = this.staticDataForm.get('multipleWorkshops').value;
    if (value && (this.branchCode === null || this.branchCode === undefined)) {
      this._overlay = this.showOverlay();
      this.restService.getAll(Urls.PENSION_CALC_PERSONAL + '/personal-info' ).then(value1 => {
        const data =  value1.data;
        this.branchCode =  data.organizationId;
        this.insuranceNumber = data.insuranceId;
        const theUrl1 = `${Urls.PENSION_CALC_PERSONAL + '/is-multiple'}?branchCode=${this.branchCode}&insuranceNumber=${this.insuranceNumber}`;
        const theUrl2 = `${Urls.PENSION_CALC_PERSONAL + '/calc'}?branchCode=${this.branchCode}&insuranceNumber=${this.insuranceNumber}`;
        this.restService.getAll(theUrl1).then(value2 => {
          const data2 =  value2.data;
          if (data2 === '1') {
            this.restService.getAll(theUrl2).then(value3 => {
              const data3 =  value3.data;
              this.hideOverlay(this._overlay);
              if (data3 !== 0 && data3 !== undefined && data3 !== null) {
                this.staticDataForm.get('pensionAmount').setValue(data3);
              }
            })
              .catch(error => {
                this.hideOverlay(this._overlay);
                this.showErrorMessageBox('پیام سیستم', 'با توجه به بررسی های صورت گرفته،شما مشمول قوانین دوکارگاهی نمی باشید،لطفا این گزینه را غیرفعال نمایید تا محاسبات عادی انجام پذیرد.');
              });
          } else {
            this.showErrorMessageBox('پیام سیستم', 'با توجه به بررسی های صورت گرفته،شما مشمول قوانین دوکارگاهی نمی باشید،لطفا این گزینه را غیرفعال نمایید تا محاسبات عادی انجام پذیرد.');
          }
        })
          .catch(error => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', 'با توجه به بررسی های صورت گرفته،شما مشمول قوانین دوکارگاهی نمی باشید،لطفا این گزینه را غیرفعال نمایید تا محاسبات عادی انجام پذیرد.');
          });
      })
        .catch(error => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', 'با توجه به بررسی های صورت گرفته،شما مشمول قوانین دوکارگاهی نمی باشید،لطفا این گزینه را غیرفعال نمایید تا محاسبات عادی انجام پذیرد.');
        });
    }
  }
}
