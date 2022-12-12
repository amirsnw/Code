import {Component, EventEmitter, Injector, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {CommitteeModel} from '../../committee-model';
import {Urls} from '../../../../settings/urls';
import {StageOneFormGeneratorService} from '../stage-one-form-generator.service';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-medical-committee',
  templateUrl: './committee-case-three.component.html',
  styleUrls: ['../../main-committee/main-committee.component.css'],
})
export class CommitteeCaseThreeComponent extends TaminPageBaseComponent implements OnDestroy {

  public expCitySubscribe: any;
  public residenceSubscribe: any;

  commRelationTypeTemp: any;

  /* Forms */
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  formFour: FormGroup;

  @ViewChild('liveProvince') liveProvince: TaminFieldAutoCompleteDataGridComponent;

  formValidationError: boolean;

  historyGridItem: any;
  deathDateTemp: string;
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
    const restUserInfo = this.securityService.getCurrentUser();

    /* Initializing Forms */
    this.formOne = this.formGenerator.getFormOne(3);
    this.formTwo = this.formGenerator.getFormTwo();
    this.formThree = this.formGenerator.getFormThree();
    this.formFour = this.formGenerator.getFormFour(3);

    this.formValidationError = false;

    if (!this.model.firstStageDone) {
      restUserInfo.then(result => {
        if (result !== undefined && result != null) {
          this.populatePageData(result);
          this.initSubscribes();
          if (this.model.demandStage) {
            this.formTwo.get('commResidenceProvinceCode').setValue(this.model.gridItem.commResidenceProvinceCode);
          }
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
      this.formOne = this.model.stageOneFormOne;
      this.formTwo = this.model.stageOneFormTwo;
      this.formThree = this.model.stageOneFormThree;
      this.formFour = this.model.stageOneFormFour;
      this.securityService.getCurrentUser().then(result => {
        if (result !== undefined && result != null) {
          this.populatePageData(result);
          this.initSubscribes();
          this.commRelationTypeTemp = this.commRelationTypeCodeList.find(item => {
            return item.value === this.formOne.value.commRelationTypeCode;
          }).name;
          this.formOne.get('commRelationTypeCode').setValue(this.formOne.value.commRelationTypeCode);
          if (this.model.gridItem.commGender === '02') {
            this.commGenderList = [{'value': '02', 'name': 'زن'}];
            setTimeout( () => this.formThree.get('commGender').setValue('02'), 1000);
          } else {
            this.commGenderList = [{'value': '01', 'name': 'مرد'}];
            setTimeout( () => this.formThree.get('commGender').setValue('01'), 1000);
          }
        }
      });
    }
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
  }

  initSubscribes() {
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
  }

  private populatePageData(data) {
    const moment = momentNs;
    this.formOne.get('commNationalCode').setValue(this.dataInput.nationalId);
    this.formOne.get('nationalCode').setValue(this.dataInput.parentNationalId);
    this.formOne.get('guardianNationalCode').setValue(this.dataInput.parentNationalId);
    this.formOne.get('commBirthDate').setValue(new Date(this.dataInput.birthDate));
    this.formOne.get('insuranceNumber').setValue(this.dataInput.parentRisuId);
    this.formOne.get('commFirstName').setValue(this.dataInput.parentFirstName);
    this.formOne.get('commLastName').setValue(this.dataInput.parentLastName);
    this.formOne.get('commFatherName').setValue(this.dataInput.fatherName);
    this.formOne.get('commIdNumber').setValue(this.dataInput.identityId);
    this.formOne.get('commExpCityCode').setValue(this.dataInput.idCityCode);
    this.formOne.get('commExpCityName').setValue(this.dataInput.idCityName);
    this.formOne.get('isuTypeCode').setValue(this.dataInput.isuType);
    this.formOne.get('isuTypeDesc').setValue(this.dataInput.isuTypeDesc);
    this.formOne.get('branchCode').setValue(this.dataInput.brhCode);
    this.formOne.get('branchName').setValue(this.dataInput.brhName);
    this.formOne.get('isuCityCode').setValue(this.dataInput.isuCityCode);
    this.formOne.get('isuCityName').setValue(this.dataInput.isuCityName);
    this.formOne.get('isuStatusTypeCode').setValue(this.dataInput.relationType);
    this.formOne.get('isuStatusTypeDesc').setValue(this.dataInput.relationTypeDesc);
    this.formOne.get('pensionerCode').setValue(this.dataInput.pensionerId);
    this.formOne.get('commInsuredTypeCode').setValue(3); // تبعی | اصلی
    this.formOne.get('dependencyTypeCode').setValue(2); // کفالت متقاضي بيمه شده اصلي / مستمري بگير | کفالت بازمانده

    if (this.dataInput.parentDeathDate != null) {
      this.formOne.get('deadDate').setValue(new Date(Number(this.dataInput.parentDeathDate)));
      this.deathDateTemp = moment.from(this.formOne.getRawValue().deadDate.toString(), 'en').locale('fa').format('YYYY/M/D');
    }
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
      this.commRelationTypeTemp = this.commRelationTypeCodeList.find(item => {
        return item.value === this.model.gridItem.commRelationTypeCode;
      }).name;
      this.formOne.get('commBirthDate').setValue(new Date(this.model.gridItem.commBirthDate));
      if (this.dataInput.parentDeathDate != null) {
        this.formOne.get('deadDate').setValue(new Date(Number(this.dataInput.parentDeathDate)));
      } else {
        this.formOne.get('deadDate').setValue(new Date(this.model.gridItem.deadDate));
      }
      this.formOne.get('commRelationTypeCode').setValue(this.model.gridItem.commRelationTypeCode);
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
    if (this.formOne.get('deadDate').value > now) {
      this.formOne.get('deadDate').reset();
      this.formOne.get('deadDate').markAsTouched();
      error = true;
    }
    return error;
  }

  ngOnDestroy(): void {
    if (this.expCitySubscribe !== undefined) {
      this.expCitySubscribe.unsubscribe();
    }
    if (this.residenceSubscribe !== undefined) {
      this.residenceSubscribe.unsubscribe();
    }
  }
}
