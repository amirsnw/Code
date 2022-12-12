import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {TaminStaticDataService} from 'src/app/services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-edict-payment-search',
  templateUrl: './edict-payment-search.component.html',
  styleUrls: ['./edict-payment-search.component.css']
})
export class EdictPaymentSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();
  searchForm: FormGroup;
  paymentTypes = [];
  pensionerList = [];
  pensionerIds = [];
  months = [];
  isWrite = true;
  searchParams: SearchParam[];

  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }

  initializePage() {
    // if (Number(this.getPersianDate(new Date()).substr(8, 2)) < 5 || Number(this.getPersianDate(new Date()).substr(8, 2)) > 10) {
    this._initializePensioner();
    // }

    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      month: ['', Validators.required],
      paymentType: ['', Validators.required]
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
        this.searchForm.get('pensionerId').setValue(this.pensionerList[0].value);
        this.isWrite = false;
      }

    })
      .catch(reason => {

      });

  }

  loadPageData() {
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

    // const searchString = [
    //   {
    //     property: 'startDate',
    //     operator: SearchOperator.GTE,
    //     value: this.searchForm.value['year'] + this.searchForm.value['month'] + '01'
    //   },
    //   {
    //     property: 'endDate',
    //     operator: SearchOperator.LTE,
    //     value: this.searchForm.value['year'] + this.searchForm.value['month'] + '31'
    //   },
    //   {
    //     property: 'payment.calculationFunction.payDocumentCenter.paymentType',
    //     operator: SearchOperator.EQ,
    //     value: this.searchForm.value['paymentType']
    //   },
    //   {
    //     property: 'payment.pensionerId',
    //     operator: SearchOperator.EQ,
    //     value: this.searchForm.value['pensionerId']
    //   }
    // ];


    const data = {
      year: this.searchForm.value['year'],
      month: this.months.find(c => c.value === this.searchForm.value['month']).name,
      monthNumber: this.searchForm.value['month'],
      searchString: ''/*searchString*/,
      pensionerId: this.searchForm.value['pensionerId'],
      paymentType: this.paymentTypes.find(c => c.value === this.searchForm.value['paymentType']).name,
      paymentTypeNumber: this.searchForm.value['paymentType']
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
