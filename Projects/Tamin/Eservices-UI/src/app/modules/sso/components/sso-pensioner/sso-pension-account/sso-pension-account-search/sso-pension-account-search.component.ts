import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {TaminStaticDataService} from '../../../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../../../settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sso-pension-account-search',
  templateUrl: './sso-pension-account-search.component.html',
  styleUrls: ['./sso-pension-account-search.component.css']
})
export class SsoPensionAccountSearchComponent   extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();

  searchForm: FormGroup;
  pensionerIds = [];
  searchParams: SearchParam[];
  private _subscription = new Subscription();
  isWrite = true;
  pensionerList = [];
  private overlay: any;
  isDisabled: boolean;

  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }

  initializePage() {
    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      // nationalCode: ['', [TaminValidators.nationalId]]
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), TaminValidators.nationalId]],
      ticketCode: ['' , [Validators.minLength(6), Validators.maxLength(6)]]
    });
    this._initializeFormGroup();
  }

  searchFormSubmit() {
    if (!this.searchForm.valid) {
      this.markFormGroupAsTouched(this.searchForm);
      return;
    }


    const data = {
      pensionerId: this.searchForm.value['pensionerId'],
      nationalCode: this.searchForm.value['nationalCode'],
    };


    this.afterSubmit.emit(data);
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
          this.pensionerList = [];
        });
      }  else {
        this.searchForm.get('pensionerId').setValue(this.pensionerList = []);
      }
    }));
  }
  wirteClick() {
    this.isWrite = true;
  }
  selectClick() {
    this.isWrite = false;
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
      value: 'fishPension',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso , this.searchParams)
      .then(result => {
        this.isDisabled = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }
}
