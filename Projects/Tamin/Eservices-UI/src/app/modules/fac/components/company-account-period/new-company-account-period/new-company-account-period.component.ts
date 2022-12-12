import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-company-account-period',
  templateUrl: './new-company-account-period.component.html',
  styleUrls: ['./new-company-account-period.component.css']
})
export class NewCompanyAccountPeriodComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('hasBookletComboBox') hasBookletComboBox: TaminFieldComboBoxStaticComponent;
 editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private companyAccountPeriodId: any;
  private startDate: any;
  private endDate: any;
  private validDatee:  any;
  private fiscalStart: any;
  private fiscalEnd: any;
  private diffInDays: any;
  private activeStartDate: any;
  private activeEndDate: any;
  companyAccountPeriodList = [];
  private difDate: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      companyAccountPeriodId: [''],
      startDate: [''],
      endDate: [''],
      hasBooklet: [''],
     requests: [''],
     });
   this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.hasBookletComboBox.dataItems = [
      {
        name: 'سفید و نانویس',
        value: '1'
      },
      {
        name:  'مخدوش',
        value: '2'
      },
      {
        name: 'فاقد',
        value: '3'
      },
      {
        name:  'دارد',
        value: '0'
      },
    ];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.COMPANY_ACCOUNT_PERIOD}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.companyAccountPeriodId = values.data.list[0].companyAccountPeriodId;
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
 cellServiceHasBooklet(item) {
    switch (item) {
      case '1':
        return 'سفید و نانویس';
      case '2':
        return 'مخدوش';
      case '3':
        return 'فاقد';
      case '0':
        return 'دارد';
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    this.validDate();
    this.validStartDate(values.startDate);
    const jsondata = new CompanyAccountPeriod();
    jsondata.startDate = values.startDate;
    jsondata.endDate = values.endDate;
    jsondata.hasBooklet = values.hasBooklet;
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId = this.requestId;
    if ( this.editMode === '1' || this.companyAccountPeriodId !== undefined ) {
      jsondata.companyAccountPeriodId = this.companyAccountPeriodId ;
    }
   debugger;
    if (this.companyAccountPeriodId === undefined || this.companyAccountPeriodId === '') {
      this.restService.create(FacUrls.COMPANY_ACCOUNT_PERIOD_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/companyAccountPeriod/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.COMPANY_ACCOUNT_PERIOD_EDIT,  this.companyAccountPeriodId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/companyAccountPeriod/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }
  validDate() {
    this.startDate = this.editForm.get('startDate').value;
    this.endDate = this.editForm.get('endDate').value;
    if (this.startDate > this.endDate) {
      this.validDatee = false;
      this.showErrorMessageBox('خطا', 'تاریخ شروع باید از تاریخ پایان کوچکتر باشد');
      return;
    }

    if (this.endDate < this.fiscalStart) {
      this.validDatee = false;
      this.showErrorMessageBox('خطا', 'کاربر گرامی، دوره مالی وارد شده، دوره درخواست را پوشش نمیدهد.');
      return;
    }

    if (this.endDate < this.fiscalEnd) {
      this.validDatee = false;
      this.showErrorMessageBox('خطا', 'کاربر گرامی، دوره مالی وارد شده، دوره درخواست را پوشش نمیدهد.');
      return;
    }

    this.validDatee = this.diffYear(this.startDate, this.endDate);
    if (this.validDatee !== 0) {
      this.validDatee = false;
      this.showErrorMessageBox('خطا', 'کاربر گرامی دوره(های) مالی شرکت حداکثر میتواند یکساله تعریف شود');
      return;
    }
    const theUrl = `${FacUrls.COMPANY_ACCOUNT_PERIOD}/${this.requestId}`;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.list) {
          for (let i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].companyAccountPeriodId !== this.companyAccountPeriodId) {
              this.activeStartDate = this.startDate;
              this.activeEndDate = this.endDate;
              this.startDate = values.data.list[i].startDate;
              this.endDate =  values.data.list[i].endDate;
              if (this.activeStartDate >= this.startDate && this.activeStartDate <= this.endDate) {
                this.validDatee = false;
                this.showErrorMessageBox('خطا',  'کاربر گرامی شروع سال مالی شرکت با دوره هایی که قبلا ثبت شده همپوشانی دارد.');
                 return;
              }
              if (this.activeEndDate >= this.startDate && this.activeEndDate <= this.endDate) {
                this.validDatee = false;
                this.showErrorMessageBox('خطا',  'کاربر گرامی شروع سال مالی شرکت با دوره هایی که قبلا ثبت شده همپوشانی دارد.');
                return;
              }
            }
          }
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  diffYear (startDate, endDate) {
    this.diffInDays = 0 ;// Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (this.diffInDays <= 366) {
      return 0;
    } else {
      return this.diffInDays;
    }
   }

  validStartDate (date) {
    this.validDatee = true;
    const theUrl = `${FacUrls.COMPANY_ACCOUNT_PERIOD}/${this.requestId}`;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.list) {
          for (let i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].companyAccountPeriodId !== this.companyAccountPeriodId) {
              this.companyAccountPeriodList.push(values.data.list[i].data);
            }
          }
        if (this.companyAccountPeriodList.length !== 0) {
             this.difDate =  0 ; //Math.round((date.getValue().getTime() - this.companyAccountPeriodList[this.companyAccountPeriodList.length - 1].endDate) / (1000 * 60 * 60 * 24));
            if (this.difDate !== 1) {
              this.validDatee = false;
              this.showErrorMessageBox('خطا',   'کاربر گرامی، تاریخ شروع سال مالی دقیقا باید یک روز بعد از آخرین دوره مالی وارد شده باشد. ');
              return;
            }
          }
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  back() {
    this.redirectTo('/fac/companyAccountPeriod/' +  this.requestId);
  }

}
