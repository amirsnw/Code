import {Component, ElementRef, ViewChild} from '@angular/core';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {SalaryListComponent} from '../salary/salary-list/salary-list.component';

@Component({
  selector: 'app-two-last-year-history',
  templateUrl: './two-last-year-history.component.html',
  styleUrls: ['./two-last-year-history.component.css']
})
export class TwoLastYearHistoryComponent extends TaminPageBaseComponent {

  staticDataForm: FormGroup;
  @ViewChild('salaryList') salaryList: SalaryListComponent;
  @ViewChild('calculated') calculated: ElementRef;
  private _overlay: any;
  private sumHistoryYears;

  protected initializePage(): void {
    this.salaryList.showDownloadButton = false;
    this.staticDataForm = this.formBuilder.group({
      duration: [''],
      wageAverage: [''],
      pensionAmount: [''],
    });
  }

  protected loadPageData(): void {
    this.salaryList.loadData();
    this.restService.getAll(Urls.CombinedHistoryRequest)
      .then(value => {
        this.sumHistoryYears = value.data.list[0].sumHistoryYears;
        this.calc();
      })
      .catch(reason => {
      });
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

    const years = Number(this.sumHistoryYears) / 365;
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
    this.staticDataForm.get('pensionAmount').setValue(persianNumberPipe.transform(data3, 'cs'));
  }


  loadDataCombinedData() {
    return new Promise((resolve, reject) => {
    });
  }
}
