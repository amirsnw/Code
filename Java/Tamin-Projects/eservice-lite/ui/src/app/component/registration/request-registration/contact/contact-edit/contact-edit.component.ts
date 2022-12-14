import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  SearchOperator,
  SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Urls} from "../../../../../settings/urls";
import {PersonalModel} from "../../../../../models/registration/personal.model";
import {ContactModel} from "../../../../../models/registration/contact.model";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent extends TaminPageBaseComponent {
  public personalId: string;
  public formcontactdata: FormGroup;
  public contactModel: ContactModel;

  public nationality: string;
  @ViewChild('cityId') city: TaminFieldAutoCompleteDataGridComponent;
  buttonTitle: string;

  private _overlay: any;
  private id: number;
  private searchParams: SearchParam[];
  private router: ActivatedRoute;


  initialize(personalId) {
    debugger;
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
    this.formcontactdata = this.formBuilder.group({
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(15)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      zipCode: ['', [Validators.required, Validators.maxLength(10)]],
      cityId: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]]
    });
  }

  get formValues() {
    return this.formcontactdata.getRawValue();
  }


  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    debugger;
    this.createForm();

    this._initializecity();
    this.initialize(null);
    if (this.router.snapshot.params['mode'] === 'update') {
      this.buttonTitle = 'ثبت و تایید اطلاعات نشانی';
    } else {
      this.buttonTitle = 'ثبت اطلاعات نشانی'
    }
  }

  private _initializecity() {
    this.city.valueField = 'cityCode';
    this.city.displayField = 'cityName';
    this.city.searchPattern = '*{term}*';
    this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }
  confirmClick(values, valid) {
    debugger;
    if (!this.formcontactdata.valid) {
      this.markFormGroupAsTouched(this.formcontactdata);
      return;
    }
    if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const jsondata = new ContactModel();


    jsondata.cityId = values.cityId,
      jsondata.personal = new PersonalModel(),
      jsondata.dateOfStart = values.dateOfStart;
    jsondata.personal.id = parseInt(this.personalId, 10);
    jsondata.address=values.address;
    jsondata.mobile=values.mobile;
    jsondata.zipCode=values.zipCode;
    jsondata.phoneNumber=values.phoneNumber;
    jsondata.id = this.id;
    if (this.id == null) {
      this.restService.create(Urls.Contact, jsondata)
        .then(resulttt => {
          this.contactModel = resulttt.data as ContactModel;
          this.id = this.contactModel.id;
          if (this.router.snapshot.params['mode'] === 'update') {
            const massage = 'درخواست شما با کد  ' + this.contactModel.personal.refrenceCode + ' در صف بررسی مرکز قرار گرفته است.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات نشانی با موفقیت ثبت شد.');
          }

        })
        .catch(result => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    } else {
      this.restService.update(Urls.Contact, this.id.toString(), jsondata)
        .then(resulttt => {
          this.contactModel = resulttt.data as ContactModel;
          this.id = this.contactModel.id;
          if (this.router.snapshot.params['mode'] === 'update') {
            const massage = 'درخواست شما با کد  ' + this.contactModel.personal.refrenceCode + ' در صف بررسی مرکز قرار گرفته است.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
          } else {
            this.showInfoMessageBox('پیام سیستم', 'اطلاعات نشانی با موفقیت ثبت شد.');
          }
        })
        .catch(result => {
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
    this.restService.getPage(Urls.Contact, 1, 10, this.searchParams, [])
      .then(value => {
        this.hideOverlay(this._overlay);
        this.formcontactdata.patchValue(value.data.list[0]);
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });

  }


}
