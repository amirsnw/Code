import {Component, ViewChild} from '@angular/core';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {CombinedListComponent} from '../../history/combined/combined-list/combined-list.component';
import {Urls} from '../../../settings/urls';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends TaminPageBaseComponent {

  calculateDataForm: FormGroup;
  @ViewChild('combinedList') combinedList: CombinedListComponent;
  private _overlay: any;
  private _wageAverage = 0;
  isEligible = true;
  driver: any;

  // private _persianNumberPipe: PersianNumberPipe;

  protected initializePage(): void {
    // this._persianNumberPipe = new PersianNumberPipe();
    this.calculateDataForm = this.formBuilder.group({
      duration: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      wageAverage: [''],
      amount: [''],
    });

    this.calculateDataForm.get('duration').valueChanges.subscribe(value => {
      this.calculate();
    });
  }

  protected loadPageData(): void {
    this.combinedList.loadData();
  }

  private calculate() {
    const persianNumberPipe = new PersianNumberPipe();
    const duration = Number(this.calculateDataForm.get('duration').value);
    if (duration > 30 || duration < 1) {
      this.calculateDataForm.get('amount').setValue(persianNumberPipe.transform(0, 'cs'));
      return;
    }
    const wageAverage = this._wageAverage;
    const amount = Math.round(((wageAverage * 7) / 100) * duration);
    this.calculateDataForm.get('amount').setValue(persianNumberPipe.transform(amount.toString(), 'cs'));
  }


  calc() {
    if (Number(this.combinedList.sumHistoryYears) < 2) {
      this.isEligible = false;
    } else {
      this.isEligible = true;
    }
    this.changeDetectorRef.detectChanges();
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.SalaryRequest).then(value => {
      this.hideOverlay(this._overlay);
      this.internalCalc(value.data.list);

    }).catch(reason => {
      this.hideOverlay(this._overlay);
    });
  }

  internalCalc(list: Array<any>): any {
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
      if (days <= 730) {
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
    this._wageAverage = data2;
    const persianNumberPipe = new PersianNumberPipe();
    this.calculateDataForm.get('wageAverage').setValue(persianNumberPipe.transform(data2, 'cs'));
  }


  // onTour() {
  //   // introJs().onchange(function(targetElement) {
  //   //   alert("new step");
  //   // });
  //   introJs().setOptions(
  //     {
  //       'nextLabel': 'بعد',
  //       'prevLabel': 'قبل',
  //       'skipLabel': 'خروج',
  //       'doneLabel': 'اتمام'
  //     }).start();
  // }
}
