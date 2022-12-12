import {Component, EventEmitter, Injector, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import * as momentNs from 'jalali-moment';
import {CommitteeModel} from '../../committee-model';
import {Urls} from '../../../../settings/urls';
import {StageOneFormGeneratorService} from '../stage-one-form-generator.service';

@Component({
  selector: 'app-medical-committee',
  templateUrl: './committee-case-two.component.html',
  styleUrls: ['../../main-committee/main-committee.component.css'],
})
export class CommitteeCaseTwoComponent extends TaminPageBaseComponent implements OnDestroy {

  public overlay: any;
  private lockCascade: boolean;

  expCitySubscribe: any;
  relationSubscribe: any;
  residenceSubscribe: any;

  /* Forms */
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  formFour: FormGroup;

  @ViewChild('liveProvince') liveProvince: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('expCityCombo') expCityCombo: TaminFieldAutoCompleteDataGridComponent;

  formValidationError: boolean;
  hasCurRelation: boolean;

  birthDateTemp: any;
  commRelationTypeTemp: any;
  historyGridItem: any;

  lockIdentity: boolean;

  /* Data Model */
  @Input() dataInput: any;
  @Input() model: CommitteeModel;
  @Output() lockEmit = new EventEmitter<boolean>();

  /* Form Data Structures */
  liveCityList = [];
  provinces = [];
  commMarriageStatusList = [
    {'value': '1', 'name': 'مجرد'},
    {'value': '2', 'name': 'متاهل'},
    {'value': '3', 'name': 'متکفل'}
  ];
  commGenderList = [];
  commNationalityList = [
    {'value': '01', 'name': 'ایرانی'},
    {'value': '02', 'name': 'غیر ایرانی'}
  ];
  commRelationTypeCodeList = [
    {'value': '05', 'name': 'پدر'},
    {'value': '03', 'name': 'فرزند (پسر)'},
    {'value': '04', 'name': 'فرزند (دختر)'},
    {'value': '06', 'name': 'مادر'}
  ];
  demandTypeCodeList = [
    {'value': '01', 'name': 'از کار افتادگي'},
  ];
  referTypeCodeList = [
    {'value': '01', 'name': 'بدوی'},
  ];

  /* Constructor */
  constructor(injector: Injector, public formGenerator: StageOneFormGeneratorService) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {

    this._initializeProvince();
    this._initializeExpCityCombo();
    const restUserInfo = this.securityService.getCurrentUser();

    /* Initializing Forms */
    this.formOne = this.formGenerator.getFormOne(2);
    this.formTwo = this.formGenerator.getFormTwo();
    this.formThree = this.formGenerator.getFormThree();
    this.formFour = this.formGenerator.getFormFour(2);

    this.formValidationError = false;
    if (!this.model.firstStageDone) {
      restUserInfo.then(result => {
        if (result !== undefined && result != null) {
          this.lockCascade = true;
          this.populatePageData(result);
          this.initSubscribes();
          if (!this.model.demandStage) {
            this.formOne.get('commRelationTypeCode').setValue('05');
          } else {
            this.formOne.get('commExpCityCode').setValue(this.model.gridItem.commExpCityCode);
            this.formOne.get('commExpCityCodeCombo').setValue(this.model.gridItem.commExpCityCode);
            this.formTwo.get('commResidenceProvinceCode').setValue(this.model.gridItem.commResidenceProvinceCode);
          }
          this.lockCascade = false;
        } else {
          throw result;
        }
        this.lockEmit.emit(false);
      }).catch(error => {
        this.lockEmit.emit(true);
        if (error !== undefined && error != null && error.status !== 500) {
          if (error.pstatdesc) {
            this.showInfoMessageBox('پیام سیستم', error.pstatdesc, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          } else if (error.isuStatusDesc) {
            this.showInfoMessageBox('پیام سیستم', `با توجه به وضعیت بیمه شده «${error.isuStatusDesc}»، ثبت درخواست برای شما ممکن نمی باشد.`, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          } else if (error.otherDesc) {
            this.showInfoMessageBox('پیام سیستم', error.relationType === '99' ? 'بیمه شده گرامی، صرفا بیمه پردازان فعال  مجاز به ثبت درخواست میباشند' : error.otherDesc, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          }
        }
        this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('/');
          setTimeout(function () {
                    location.reload();
                  }, 500);
        });
      });
    } else {
      this.lockEmit.emit(false);
      const moment = momentNs;
      this.formOne = this.model.stageOneFormOne;
      this.formTwo = this.model.stageOneFormTwo;
      this.formThree = this.model.stageOneFormThree;
      this.formFour = this.model.stageOneFormFour;
      this.securityService.getCurrentUser().then(result => {
        if (result !== undefined && result != null) {
          this.lockCascade = true;
          this.populatePageData(result);
          this.initSubscribes();
          this.commRelationTypeTemp = this.commRelationTypeCodeList.find(item => {
            return item.value === this.formOne.value.commRelationTypeCode;
          }).name;
          this.birthDateTemp = moment.from(this.formOne.getRawValue().commBirthDate.toString(), 'en').locale('fa').format('YYYY/M/D');
          if (this.model.gridItem.commGender === '02') {
            this.commGenderList = [{'value': '02', 'name': 'زن'}];
            setTimeout( () => this.formThree.get('commGender').setValue('02'), 1000);
          } else {
            this.commGenderList = [{'value': '01', 'name': 'مرد'}];
            setTimeout( () => this.formThree.get('commGender').setValue('01'), 1000);
          }
          this.lockCascade = true;
        }
      });
    }
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
  }

  initSubscribes() {
    this.relationSubscribe = this.formOne.get('commRelationTypeCode').valueChanges.subscribe(requestValue => {
      if (this.lockCascade) {
        return;
      }
      this.formOne.get('commNationalCode').reset();
      this.formOne.get('commBirthDate').reset();
      this.formOne.get('commFirstName').reset();
      this.formOne.get('commLastName').reset();
      this.formOne.get('commFatherName').reset();
      this.formOne.get('commIdNumber').reset();
      this.formOne.get('commExpCityCode').reset();
      this.formOne.get('commExpCityName').reset();
      this.model.lockIdentity = false;
    });

    this.formOne.get('commRelationTypeCode').valueChanges.subscribe(requestValue => {
      switch (requestValue) {
        case '02':
          this.commGenderList = [{'value': '01', 'name': 'مرد'}];
          setTimeout( () => this.formThree.get('commGender').setValue('01'), 500);
          break;
        case '03':
          this.commGenderList = [{'value': '01', 'name': 'مرد'}];
          setTimeout( () => this.formThree.get('commGender').setValue('01'), 500);
          break;
        case '04':
          this.commGenderList = [{'value': '02', 'name': 'زن'}];
          setTimeout( () => this.formThree.get('commGender').setValue('02'), 500);
          break;
        case '05':
          this.commGenderList = [{'value': '01', 'name': 'مرد'}];
          setTimeout( () => this.formThree.get('commGender').setValue('01'), 500);
          break;
        case '06':
          this.commGenderList = [{'value': '02', 'name': 'زن'}];
          setTimeout( () => this.formThree.get('commGender').setValue('02'), 500);
          break;
      }
    });

    this.residenceSubscribe = this.formTwo.get('commResidenceProvinceCode').valueChanges.subscribe(value => {
      if (value) {
        this.getCities(value)
          .then(val => {
            const data = [];
            (val.data.list as Array<any>).forEach(item => {
              data.push({
                name: item.cityName,
                value: item.cityCode
              });
            });
            this.liveCityList = data;
            if (this.model.commResidenceCityCode !== undefined) {
              setTimeout(() => {
                  this.formTwo.get('commResidenceCityCode').setValue(this.model.commResidenceCityCode);
                  this.model.commResidenceCityCode = undefined;
                }
                , 500);
            } else {
              this.formTwo.get('commResidenceCityCode').setValue(this.formTwo.value.commResidenceCityCode);
            }
          }).catch(reason => {
          this.liveCityList = [];
        });
      } else {
        this.formTwo.get('commResidenceCityCode').reset();
        this.liveCityList = [];
      }
    });

    this.expCitySubscribe = this.formOne.get('commExpCityCodeCombo').valueChanges.subscribe(value => {
      if (value !== '') {
        this.formOne.get('commExpCityCode').setValue(this.expCityCombo['currentValue']);
      }
    });

    this.formFour.get('demandTypeCode').valueChanges.subscribe(value => {
      if (value === '01') {
        this.checkHistory();
      }
    });
  }

  private populatePageData(data) {
    const moment = momentNs;
    this.formOne.get('insuranceNumber').setValue(this.dataInput.insuranceId);
    this.formOne.get('isuStatusTypeCode').setValue(this.dataInput.relationType);
    this.formOne.get('isuStatusTypeDesc').setValue(this.dataInput.relationTypeDesc);
    this.formOne.get('isuTypeCode').setValue(this.dataInput.isuType);
    this.formOne.get('isuTypeDesc').setValue(this.dataInput.isuTypeDesc);
    this.formOne.get('branchCode').setValue(this.dataInput.brhCode);
    this.formOne.get('branchName').setValue(this.dataInput.brhName);
    this.formOne.get('isuCityCode').setValue(this.dataInput.isuCityCode);
    this.formOne.get('isuCityName').setValue(this.dataInput.isuCityName);
    this.formOne.get('pensionerCode').setValue(this.dataInput.pensionerId);
    this.formOne.get('commInsuredTypeCode').setValue(3); // تبعی | اصلی
    this.formOne.get('dependencyTypeCode').setValue(1); // کفالت متقاضي بيمه شده اصلي / مستمري بگير | کفالت بازمانده

    if (data.gender === 'f') {
      this.commRelationTypeCodeList.push({'value': '02', 'name': 'همسر (شوهر)'});
    }

    if (this.historyGridItem !== undefined) {
      this.formTwo.get('commAddress').setValue(this.historyGridItem.commAddress);
      this.formTwo.get('commTelephoneNumber').setValue(this.historyGridItem.commTelephoneNumber);
      this.formTwo.get('commMobileNumber').setValue(this.historyGridItem.commMobileNumber);
      this.formTwo.get('commPostalCode').setValue(this.historyGridItem.commPostalCode);
      this.formThree.get('commMarriageStatus').setValue(this.historyGridItem.commMarriageStatus);
      this.formThree.get('commNationality').setValue(this.historyGridItem.commNationality);
    }

    if (this.model.demandStage > 0 && !this.model.firstStageDone) {
      this.model.lockIdentity = true;
      this.birthDateTemp = moment.from(new Date(this.model.gridItem.commBirthDate).toString(), 'en').locale('fa').format('YYYY/M/D');
      this.commRelationTypeTemp = this.commRelationTypeCodeList.find(item => {
        return item.value === this.model.gridItem.commRelationTypeCode;
      }).name;
      this.formOne.get('commRelationTypeCode').setValue(this.model.gridItem.commRelationTypeCode);
      this.formOne.get('commNationalCode').setValue(this.model.gridItem.commNationalCode);
      this.formOne.get('commBirthDate').setValue(new Date(this.model.gridItem.commBirthDate));
      this.formOne.get('insuranceNumber').setValue(this.model.gridItem.insuranceNumber);
      this.formOne.get('commFirstName').setValue(this.model.gridItem.commFirstName);
      this.formOne.get('commLastName').setValue(this.model.gridItem.commLastName);
      this.formOne.get('commFatherName').setValue(this.model.gridItem.commFatherName);
      this.formOne.get('commIdNumber').setValue(this.model.gridItem.commIdNumber);
      this.formOne.get('commExpCityName').setValue(this.model.gridItem.commExpCityName);

      this.formTwo.get('commResidenceCityCode').setValue(this.model.gridItem.commResidenceCityCode);
      this.formTwo.get('commTelephoneNumber').setValue(this.model.gridItem.commTelephoneNumber);
      this.formTwo.get('commMobileNumber').setValue(this.model.gridItem.commMobileNumber);
      this.formTwo.get('commAddress').setValue(this.model.gridItem.commAddress);
      this.formTwo.get('commPostalCode').setValue(this.model.gridItem.commPostalCode);

      this.formThree.get('commMarriageStatus').setValue(this.model.gridItem.commMarriageStatus);
      if (this.model.gridItem.commGender === '02') {
        this.commGenderList = [{'value': '02', 'name': 'زن'}];
        setTimeout( () => this.formThree.get('commGender').setValue('02'), 500);
      } else {
        this.commGenderList = [{'value': '01', 'name': 'مرد'}];
        setTimeout( () => this.formThree.get('commGender').setValue('01'), 500);
      }
      this.formThree.get('commNationality').setValue(this.model.gridItem.commNationality);

      this.formFour.get('demandTypeCode').setValue(this.model.gridItem.demandTypeCode);
    } else {
      if (data.gender === 'f') {
        this.commGenderList = [{'value': '02', 'name': 'زن'}];
        setTimeout( () => this.formThree.get('commGender').setValue('02'), 1000);
      } else {
        this.commGenderList = [{'value': '01', 'name': 'مرد'}];
        setTimeout( () => this.formThree.get('commGender').setValue('01'), 1000);
      }
    }
  }

  private checkHistory(relDate?: any) {
    const moment = momentNs;
    /*const date = this.hasCurRelation ? moment.from(new Date(relDate ? relDate : this.formFour.value.relationDate).toString(), 'en')
      .locale('fa').format('YYYYMMDD') : null;*/
    const searchParams: Array<SearchParam> = [];

    const nationalParam = new SearchParam();
    nationalParam.value = this.formOne.value.commNationalCode;
    nationalParam.operator = SearchOperator.EQ;
    nationalParam.property = 'nationalCode';
    searchParams.push(nationalParam);

    const typeParam = new SearchParam();
    typeParam.value = '2';
    typeParam.operator = SearchOperator.EQ;
    typeParam.property = 'type';
    searchParams.push(typeParam);

    /*const dateParam = new SearchParam();
    dateParam.value = date;
    dateParam.operator = SearchOperator.EQ;
    dateParam.property = 'baseDate';
    searchParams.push(dateParam);*/

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.MedicalCommitteeCheckHistory, searchParams)
      .then(result => {
        if (result.data === '2') {
          this.showInfoMessageBox('پیام سیستم', 'متقاضی گرامی شما بدوا با توجه به سابقه پرداخت حق بیمه به عنوان بیمه شده اصلی نسبت به ثبت تقاضای کمیسیون پزشکی اقدام نمایید و در صورت عدم احراز شرایط قانونی و اعلام شعبه میتوانید به عنوان افراد خانواده تقاضای خود را ثبت کنید.', () => {
            location.reload();
          });
        }
        this.hideOverlay(this.overlay);
      }).catch(error => {
      this.hideOverlay(this.overlay);
      this.formFour.get('demandTypeCode').reset();
      this.formFour.get('demandTypeCode').markAsTouched();
      this.showInfoMessageBox('پیام سیستم', 'کنترل سابقه برای بیمه شده ی اصلی با خطا مواجه شده است');
    });
  }

  private _initializeProvince() {
    this.liveProvince.valueField = 'provinceCode';
    this.liveProvince.displayField = 'provinceName';
    this.liveProvince.searchPattern = '*{term}*%';
    this.liveProvince.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(true)
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

  private _initializeExpCityCombo() {
    this.expCityCombo.valueField = 'cityCode';
    this.expCityCombo.displayField = 'cityName';
    this.expCityCombo.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(true)
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

  private getCities(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provinceCode';

      this.restService.getPage(Urls.MedicalCommitteeCity, 1, 40, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getIdentity() {
    if (this.formOne.get('commBirthDate').valid && this.formOne.get('commNationalCode').valid) {
      const searchParams: Array<SearchParam> = [];
      const typeCode = new SearchParam();
      typeCode.property = 'commRelationTypeCode';
      typeCode.operator = SearchOperator.EQUAL;
      typeCode.value = this.formOne.value.commRelationTypeCode;
      searchParams.push(typeCode);

      const commNationalCode = new SearchParam();
      commNationalCode.property = 'commNationalCode';
      commNationalCode.operator = SearchOperator.EQUAL;
      commNationalCode.value = this.formOne.get('commNationalCode').value;
      searchParams.push(commNationalCode);

      const birthDate = new SearchParam();
      birthDate.property = 'commBirthDate';
      birthDate.operator = SearchOperator.EQUAL;
      birthDate.value = this.formOne.get('commBirthDate').value.getTime().toString();
      searchParams.push(birthDate);
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.MedicalCommitteeIdentitySystem, searchParams)
        .then(result => {
          if (result.data.result !== undefined && result.data.result !== '00') {
            this.hideOverlay(this.overlay);
            this.showInfoMessageBox('پیام سیستم', result.data.vretdesc, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          }
          const moment = momentNs;

          this.birthDateTemp = moment.from(new Date(result.data.birthDate).toString(), 'en').locale('fa').format('YYYY/M/D');
          this.formOne.get('commNationalCode').setValue(result.data.nationalId);
          this.formOne.get('commBirthDate').setValue(new Date(result.data.birthDate));
          this.formOne.get('commFirstName').setValue(result.data.firstName);
          this.formOne.get('commLastName').setValue(result.data.lastName);
          this.formOne.get('commFatherName').setValue(result.data.fatherName);
          this.formOne.get('commIdNumber').setValue(result.data.idCardNumber);
          this.formOne.get('branchCode').setValue(this.dataInput.brhCode);
          this.formOne.get('branchName').setValue(this.dataInput.brhName);
          this.formOne.get('isuCityCode').setValue(this.dataInput.isuCityCode);
          this.formOne.get('isuCityName').setValue(this.dataInput.isuCityName);
          this.model.lockIdentity = true;
          this.hideOverlay(this.overlay);
        }).catch(error => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'مشخصات وارد شده در پایگاه داده یافت نشد.');
      });
    } else {
      this.formOne.get('commNationalCode').markAsTouched();
      this.formOne.get('commBirthDate').markAsTouched();
    }
  }

  unlockIdentity() {
    this.formOne.get('commNationalCode').reset();
    this.formOne.get('commBirthDate').reset();
    this.formOne.get('commFirstName').reset();
    this.formOne.get('commLastName').reset();
    this.formOne.get('commFatherName').reset();
    this.formOne.get('commIdNumber').reset();
    this.model.lockIdentity = false;
  }

  get stageValidate() {
    this.formValidationError = false;
    if (!this.formOne.valid || !this.formTwo.valid || !this.formThree.valid
      || !this.formFour.valid) {
      /* Marking Main Form */
      this.markFormGroupAsTouched(this.formOne);
      this.markFormGroupAsTouched(this.formTwo);
      this.markFormGroupAsTouched(this.formThree);
      this.markFormGroupAsTouched(this.formFour);
      this.formValidationError = true;
      if (!this.formOne.controls.commExpCityCode.valid) {
        this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، محل صدور شناسنامه معتبر نمیباشد.');
      } else {
        this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      }
      return false;
    } else {
      if (this.mainFormDateValidate()) {
        this.formValidationError = true;
        this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
        return false;
      }
    }

    this.model.firstStageDone = true;
    this.model.stageOneFormOne = this.formOne;
    this.model.stageOneFormTwo = this.formTwo;
    this.model.commResidenceCityCode = this.formTwo.value.commResidenceCityCode;
    this.model.stageOneFormThree = this.formThree;
    this.model.stageOneFormFour = this.formFour;
    this.model.stageOneFormFive = this.formGenerator.getFormFive();
    return true;
  }

  /* Date Validation */
  private mainFormDateValidate() {
    let error = false;
    const now = new Date().getTime();
    if (this.formOne.get('commBirthDate').value > now) {
      this.formOne.get('commBirthDate').reset();
      this.formOne.get('commBirthDate').markAsTouched();
      error = true;
    }
    return error;
  }

  ngOnDestroy(): void {
    if (this.expCitySubscribe !== undefined) {
      this.expCitySubscribe.unsubscribe();
    }
    if (this.relationSubscribe !== undefined) {
      this.relationSubscribe.unsubscribe();
    }
    if (this.residenceSubscribe !== undefined) {
      this.residenceSubscribe.unsubscribe();
    }
  }
}
