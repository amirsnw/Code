import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-edict-search',
  templateUrl: './edict-search.component.html',
  styleUrls: ['./edict-search.component.css']
})
export class EdictSearchComponent extends TaminPageBaseComponent {
  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();
  pensionerList = [];
  searchForm: FormGroup;
  paymentTypes = [];
  pensionerIds = [];
  months = [];
  searchParams: SearchParam[];
  isWrite = true;
  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }

  initializePage() {
    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      month: [''],
      // paymentType: ['', Validators.required]
    });
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
        this.isWrite = false;
        this.searchForm.get('pensionerId').setValue(this.pensionerList[0].value);
      }

    })
      .catch(reason => {

      });

  }
  loadPageData() {
    this._initializePensioner();
    this.paymentTypes = this.taminStaticDataService.getPensionerPaymentTypes();
    this.months = [
      {name: 'فروردین', value: '01'},
      {name: 'اردیبهشت', value: '02'},
      {name: 'خرداد', value: '03'},
      {name: 'تیر', value: '04'},
      {name: 'مرداد', value: '05'},
      {name: 'شهریور', value: '06'},
      {name: 'مهر', value: '07'},
      {name: 'آبان', value: '08'},
      {name: 'آذر', value: '09'},
      {name: 'دی', value: '10'},
      {name: 'بهمن', value: '11'},
      {name: 'اسفند', value: '12'}
    ];
  }

  searchFormSubmit() {
    if (!this.searchForm.valid) {
      this.markFormGroupAsTouched(this.searchForm);
      return;
    }
    const data = {
      year: this.searchForm.value['year'],
      month: this.searchForm.value['month'] !== '' && this.searchForm.value['month'] !== null && this.searchForm.value['month'] !== undefined ?   this.months.find(c => c.value === this.searchForm.value['month']).name : '',
      monthNumber: this.searchForm.value['month'],
      searchString: ''/*searchString*/,
      pensionerId: this.searchForm.value['pensionerId'],
      // paymentType: this.paymentTypes.find(c => c.value === this.searchForm.value['paymentType']).name,
      // paymentTypeNumber: this.searchForm.value['paymentType']
    };
    this.afterSubmit.emit(data);
  }
  wirteClick() {
    this.isWrite = true;
  }
  selectClick() {
    this.isWrite = false;
  }
}
