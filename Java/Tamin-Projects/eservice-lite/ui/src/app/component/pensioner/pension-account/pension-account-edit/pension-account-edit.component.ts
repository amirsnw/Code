import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam, TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminFieldComboBoxComponent, TaminFieldComboBoxStaticComponent,
  TaminPageBaseComponent
} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PersonalModel} from '../../../../models/registration/personal.model';
import {Urls} from '../../../../settings/urls';
import {PensionAccountModel} from '../../../../models/pensioner/pensionAccountModel';
import {Subscription} from 'rxjs';




@Component({
  selector: 'app-pension-account-edit',
  templateUrl: './pension-account-edit.component.html',
  styleUrls: ['./pension-account-edit.component.css']
})
export class PensionAccountEditComponent extends TaminPageBaseComponent {
  public personalId: string;
  public formAccountData: FormGroup;
  public pensionAccountModel: PensionAccountModel;
  accountTypes = [];
  pensionerIds = [];
  banks = [];
  isWrite = true;
  pensionerList = [];
  public nationality: string;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldComboBoxComponent;
  @ViewChild('branch') branch: TaminFieldComboBoxComponent;
  buttonTitle: string;

  private _overlay: any;
  private id: number;
  private searchParams: SearchParam[];
  private router: ActivatedRoute;
  private _subscription = new Subscription();
  branchCodes = [];
  cities = [];


  initialize(personalId) {
    if (personalId === null) {
      this.personalId = this.router.snapshot.params['personalid'];

      if (this.personalId !== '-1') {

        this.loadData(this.personalId);
      }
      if (this.personalId === '-1') {
        this.personalId = null;
      }
    } else {
      this.personalId = personalId;
      this.loadData(this.personalId);
    }

  }

  private createForm() {
    this.formAccountData = this.formBuilder.group({
      pensionerId: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accounttype: ['', [Validators.required]],
      dateOfStart: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      province: ['',  [Validators.required]],
      city: ['' , [Validators.required]],
      branch: ['', [Validators.required]],
    });

    this._subscription.add(this.formAccountData.get('province').valueChanges.subscribe(value => {
      if (value) {
        this.getCities(value)
          .then(val => {
            const data = [];
            (val.data.list as Array<any>).forEach(item => {
              data.push(
                {
                  name: item.cityName,
                  value: item.cityCode
                });
            });
            this.cities = data;
          })
          .catch(reason => {
            this.cities = [];
          });
      } else {
        this.cities = [];
      }
      // this.city.theGrid.searchParams = [];
      // this.branch.theGrid.searchParams = [];
      // this.formAccountData.get('city').setValue('');
      // this.formAccountData.get('branch').setValue('');
      // if (value) {
      //   this.city.theGrid.searchParams.push({
      //     operator: 'EQ',
      //     value: value,
      //     property: 'provincecode'
      //   });
      // }
    }));

    this._subscription.add(this.formAccountData.get('city').valueChanges.subscribe(value => {
      // this.branch.theGrid.searchParams = [];
      // this.formAccountData.get('branch').setValue('');
      // if (value) {
        if (value) {
          this.getBranches(value)
            .then(val => {
              const data = [];
              (val.data.list as Array<any>).forEach(item => {
                data.push(
                  {
                    name: `${item.name} ${'-'} ${item.branchAddress !== null ? item.branchAddress : ''}`,
                    value: item.code
                  });
              });
              this.branchCodes = data;
            })
            .catch(reason => {
              this.branchCodes = [];
            });
        } else {
          this.branchCodes = [];
        }
        // this.branch.theGrid.searchParams.push({
        //   operator: 'EQ',
        //   value: value,
        //   property: 'cityCode'
        // });
      // }
    }));
    this._initializeProvince();
    // this._initializeCity();
    // this._initializeBranch();
  }
  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }
  get formValues() {
    return this.formAccountData.getRawValue();
  }

  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'provinceName';
    this.province.searchPattern = '*{term}*%';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('provinceCode')
      .addVisibleColumn({columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label'})
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

  // private _initializeCity() {
  //   this.city.valueField = 'cityCode';
  //   this.city.displayField = 'cityName';
  //   // this.city.searchPattern = '*{term}*%';
  //   this.city.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .addUrl(Urls.cities)
  //     .setShowPager(true)
  //     .setFirstLoad(false)
  //     .setId('cityCode')
  //     .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
  //     .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setShowFooter(false)
  //     .setShowPager(true)
  //     .setViewType('GridView')
  //     .getData();
  // }

  // private _initializeBranch() {
  //   this.branch.valueField = 'code';
  //   this.branch.displayField = 'name';
  //   // this.branch.searchPattern = '%{term}%';
  //   this.branch.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
  //     .clearActionColumns()
  //     .clearSearchParams()
  //     .clearSortParams()
  //     .clearVisibleColumns()
  //     .addUrl(Urls.BranchesByCity)
  //     .setShowPager(true)
  //     .setFirstLoad(false)
  //     .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
  //     .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
  //     .setPagerCurrentPage(1)
  //     .setPagerSize(10)
  //     .setRowDeletable(false)
  //     .setRowEditable(false)
  //     .setShowActionColumn(false)
  //     .setShowFooter(false)
  //     .setShowPager(true)
  //     .setViewType('GridView')
  //     .getData();
  // }

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
    // this.initialize(null);
    // if (this.router.snapshot.params['mode'] === 'update') {
      this.buttonTitle = 'ثبت و تایید اطلاعات حساب بانکی';
    // } else {
    //   this.buttonTitle = 'ثبت اطلاعات حساب بانکی';
    // }
    this._initializePensioner();
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
    debugger;
    if (!this.formAccountData.valid) {
      this.markFormGroupAsTouched(this.formAccountData);
      return;
    }
    if (new Date(values.dateOfStart).getTime() > new Date().getTime()) {
      this.showErrorMessageBox('خطا', 'تاریخ شروع از تاریخ روز نمی تواند بزرگتر باشد.');
      return;
    }
    const jsondata = new PensionAccountModel();
    jsondata.accountNumber = values.accountNumber,
      jsondata.bank = values.bank,
      jsondata.accounttype = values.accounttype,
      // jsondata.personal = new PersonalModel(),
      jsondata.dateOfStart = values.dateOfStart;
      // jsondata.personal.id = parseInt(this.personalId, 10);
      jsondata.pensionerId = values.pensionerId;
      jsondata.organizationId = values.branch;
      jsondata.id = this.id;
    this._overlay = this.showOverlay();
    if (this.id == null) {
      this.restService.create(Urls.PENSION_Account_POST, jsondata)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.pensionAccountModel = resulttt.data as PensionAccountModel;
          this.id = this.pensionAccountModel.id;
          // if (this.router.snapshot.params['mode'] === 'update') {
          const massage = 'درخواست شما با کد پیگیری  ' + this.pensionAccountModel.refrenceid  + 'ثبت و در انتظار بررسی شعبه می باشد.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          if (reason && reason.error && reason.error.data && reason.error.data.message !== '') {
            if (reason.error.data.message === 'pension.account.not.valid') {
              this.showErrorMessageBox('پیام سیستم', 'شماره حساب معتبر نمی باشد،لطفا اطلاعات را بررسی و مجدد تلاش نمایید.');
            } else if (reason.error.data.message === 'pension.account.request.saved.before') {
              this.showErrorMessageBox('پیام سیستم', 'شماره حساب شما قبلا در سامانه ثبت گردیده است.');
            } else if (reason.error.data.message === 'pension.account.request.not.allowed') {
              this.showErrorMessageBox('پیام سیستم', 'تنها بازنشستگان و مستمری بگیران محترم سازمان تامین اجتماعی امکان ثبت شماره حساب بانکی را دارا می باشند.');
            } else {
              this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
            }
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }
        });
    } else {
      this.restService.update(Urls.PENSION_Account_POST, this.id.toString(), jsondata)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.pensionAccountModel = resulttt.data as PensionAccountModel;
          this.id = this.pensionAccountModel.id;
          // if (this.router.snapshot.params['mode'] === 'update') {
            const massage = 'درخواست شما با کد پیگیری  ' + this.pensionAccountModel.refrenceid  + 'ثبت و در انتظار بررسی شعبه می باشد.';
            this.showInfoMessageBox('پیام سیستم', massage, () => {
              this.redirectTo('/me');
            });
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
        this.formAccountData.patchValue(value.data.list[0]);
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.id = value.data.list[0].id;
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
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
        this.formAccountData.get('pensionerId').setValue(this.pensionerList[0].value);
        this.isWrite = false;
      }

    })
      .catch(reason => {

      });

  }
  wirteClick() {
    this.isWrite = true;
  }
  selectClick() {
    this.isWrite = false;
  }

  private getBranches(cityCode): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = cityCode;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'cityCode';


      this.restService.getPage(Urls.BranchesByCity, 1, 100, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getCities(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provincecode';

      this.restService.getPage(Urls.cities, 1, 100, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
