import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {TaminStaticDataService} from 'src/app/services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-edict-payment-search',
  templateUrl: './sso-edict-payment-search.component.html',
  styleUrls: ['./sso-edict-payment-search.component.css']
})
export class SsoEdictPaymentSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();
  searchForm: FormGroup;
  paymentTypes = [];
  pensionerList = [];
  months = [];
  isWrite = true;
  searchParams: SearchParam[];

  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  initializePage() {
    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      month: ['', Validators.required],
      paymentType: ['', Validators.required]
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
    } else {

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
