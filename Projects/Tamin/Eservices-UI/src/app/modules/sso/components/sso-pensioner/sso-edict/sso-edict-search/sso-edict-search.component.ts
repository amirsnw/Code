import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {TaminStaticDataService} from '../../../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../../../settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sso-edict-search',
  templateUrl: './sso-edict-search.component.html',
  styleUrls: ['./sso-edict-search.component.css']
})

  export class SsoEdictSearchComponent extends TaminPageBaseComponent {
  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();
  pensionerList = [];
  searchForm: FormGroup;
  paymentTypes = [];
  pensionerIds = [];
  months = [];
  searchParams: SearchParam[];
  isWrite = true;
  isDesabled: boolean;
  private overlay: any;
  private _subscription = new Subscription();
  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }

  initializePage() {
    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), TaminValidators.nationalId]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      ticketCode: ['' , [Validators.minLength(6), Validators.maxLength(6)]]
    });
    this._initializeFormGroup();
    this.isDesabled = false;

  }
  private _initializeFormGroup() {
     this._subscription.add(this.searchForm.get('nationalCode').valueChanges.subscribe(value => {
       const nationalCode = this.searchForm.get('nationalCode').value;
       if ( nationalCode.length === 10) {
         const theUrl = `${Urls.SSO_PENSIONER_NO}/${nationalCode}`;
         this.restService.getAll(theUrl)
           .then(data => {
             (<Array<any>>data.data.list).forEach(value1 => {
               this.pensionerList.push({
                 name: this.getPersianNumber(value1.pensionerId),
                 value: value1.pensionerId

               });
             });
             if (this.pensionerList.length > 0) {
               this.isWrite = false;
               this.searchForm.get('pensionerId').setValue(this.pensionerList[0].value);

             }
           })
           .catch(error => {
             // this.pensionerList = [];
           });
       } else {
         this.searchForm.get('pensionerId').setValue(this.pensionerList = []);
       }
     }));
  }

  loadPageData() {
    // this._initializePensioner();
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
    const values = this.searchForm.value;
    if (values.ticketCode.length === 0 || values.ticketCode.length !== 6 ) {
      return;
    }
    const data = {
      year: this.searchForm.value['year'],
      searchString: ''/*searchString*/,
      pensionerId: this.searchForm.value['pensionerId'],
      nationalCode: this.searchForm.value['nationalCode'],
      ticketCode: this.searchForm.value['ticketCode'],
    };
    this.afterSubmit.emit(data);
  }
  sendUserTicket() {
    const values = this.searchForm.value;
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ

    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'hokmPension',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso , this.searchParams)
      .then(result => {
        this.isDesabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }
  wirteClick() {
    this.isWrite = true;
  }
  selectClick() {
    this.isWrite = false;
  }
}
