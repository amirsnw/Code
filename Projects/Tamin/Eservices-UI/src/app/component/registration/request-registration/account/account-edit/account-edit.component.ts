import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  SearchOperator,
  SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup, Validators} from "@angular/forms";
import {AccountModel} from "../../../../../models/registration/account.model";
import {ActivatedRoute} from "@angular/router";
import {Urls} from "../../../../../settings/urls";
import {PersonalModel} from "../../../../../models/registration/personal.model";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent extends TaminPageBaseComponent {
  public personalId: string;
  public formaccountdata: FormGroup;
  public accountModel: AccountModel;
  accountTypes = [];
  banks = [];
  public nationality: string;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  buttonTitle: string;

  private _overlay: any;
  private id: number;
  private searchParams: SearchParam[];
  private router: ActivatedRoute;


  initialize(personalId) {
    if (personalId === null) {
      this.personalId = this.router.snapshot.params['personalid'];

      if (this.personalId !== '-1') {

        this.loadData(this.personalId);
      }
      if (this.personalId === '-1') {
        this.personalId = null;
      }
    }
    else {
      this.personalId = personalId;
      this.loadData(this.personalId);
    }

  }

  private createForm() {
    this.formaccountdata = this.formBuilder.group({
      accountNumber: ['', [Validators.required]],
      accounttype: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]],
      bank: ['', [Validators.required]],
    });
  }

  get formValues() {
    return this.formaccountdata.getRawValue();
  }

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.createForm();
    this.banks = [
      {name: 'بانک رفاه', value: '01'},
      {name: 'بانک ملی ایران', value: '02'},
      {name: 'بانک ملت', value: '03'},
      {name: 'بانک تجارت', value: '04'},
      {name: 'بانک سپه', value: '07'},
      {name: 'بانک صادرات', value: '05'}
    ];
    this._initializeAccountType();
    this.initialize(null);
    if (this.router.snapshot.params['mode'] === 'update') {
      this.buttonTitle = 'ثبت و تایید اطلاعات حساب بانکی';
    } else {
      this.buttonTitle = 'ثبت اطلاعات حساب بانکی'
    }
  }

  private _initializeAccountType() {
    this.accountTypes = [
      {name: 'قرض الحسنه', value: '01'},
      {name: 'پس انداز عادی', value: '02'},
      {name: 'پس انداز همراه', value: '03'},
      {name: 'جاری عادی', value: '04'},
      {name: 'جاری همراه', value: '05'}
    ];
  }

  confirmClick(values, valid) {
    if (!this.formaccountdata.valid) {
      this.markFormGroupAsTouched(this.formaccountdata);
      return;
    }
    if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const jsondata = new AccountModel();
    jsondata.accountNumber = values.accountNumber,
      jsondata.bank = values.bank,
      jsondata.accounttype = values.accounttype,
      jsondata.personal = new PersonalModel(),
      jsondata.dateOfStart = values.dateOfStart;
    jsondata.personal.id = parseInt(this.personalId, 10);
    jsondata.id = this.id;
    this._overlay = this.showOverlay();
    if (this.id == null) {
      this.restService.create(Urls.Account_POST, jsondata)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.accountModel = resulttt.data as AccountModel;
          this.id = this.accountModel.id;
          if (this.router.snapshot.params['mode'] === 'update') {
            const massage = 'درخواست شما با کد  ' + this.accountModel.personal.refrenceCode + ' در صف بررسی مرکز قرار گرفته است.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات حساب با موفقیت ثبت شد.');
          }

        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    } else {
      this.restService.update(Urls.Account_POST, this.id.toString(), jsondata)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.accountModel = resulttt.data as AccountModel;
          this.id = this.accountModel.id;
          if (this.router.snapshot.params['mode'] === 'update') {
            const massage = 'درخواست شما با کد  ' + this.accountModel.personal.refrenceCode + ' در صف بررسی مرکز قرار گرفته است.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات حساب با موفقیت ثبت شد.');
          }
        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }

  loadData(personalId) {
    this.id = null;
    this.personalId = personalId;
    this._overlay = this.showOverlay();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'personal.id';
    searchParam.value = personalId;
    searchParam.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.Account, 1, 10, this.searchParams, [])
      .then(value => {
        this.hideOverlay(this._overlay);
        this.formaccountdata.patchValue(value.data.list[0]);
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });

  }


}
