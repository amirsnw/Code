import {Component, Injector, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {OccureFormGeneratorService} from '../occure-form-generator.service';
import {Urls} from '../../../settings/urls';
import {OccurenceMeta} from '../occurence-meta';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['../main-occurence/main-occurrence.component.css']
})
export class OccurrenceFormComponent extends TaminPageBaseComponent {

  private _overlay: any;

  /* Forms */
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;

  /* Gallery Items */
  @ViewChild('occurrenceDocumentGallery') occurrenceDocumentGallery: TaminImageGalleryManagedComponent;

  formValidationError: boolean;
  occurrenceDocumentMissing: boolean;
  occurrenceUploadExceed: boolean;

  // isMainInsured: boolean;
  lockIdentity: boolean;
  isLegal: boolean;

  dataInput: any;
  userData: any;
  enableWorkshopFields: boolean;

  dateTemp = '';

  meta: OccurenceMeta;

  /* Form Data Structures */
  nationalityList = [
    {'value': 1, 'name': 'ایرانی'},
    {'value': 2, 'name': 'غیر ایرانی'},
  ];

  isuTypeList = [
    {'value': 1, 'name': 'نوع اول'},
    {'value': 2, 'name': 'نوع دوم'},
  ];

  maritalStatusList = [
    {'value': 1, 'name': 'مجرد'},
    {'value': 2, 'name': 'متاهل'},
  ];

  occurrenceTimeList = [
    {'value': 0, 'name': '00:00'},
    {'value': 1, 'name': '01:00'},
    {'value': 2, 'name': '02:00'},
    {'value': 3, 'name': '03:00'},
    {'value': 4, 'name': '04:00'},
    {'value': 5, 'name': '05:00'},
    {'value': 6, 'name': '06:00'},
    {'value': 7, 'name': '07:00'},
    {'value': 8, 'name': '08:00'},
    {'value': 9, 'name': '09:00'},
    {'value': 10, 'name': '10:00'},
    {'value': 11, 'name': '11:00'},
    {'value': 12, 'name': '12:00'},
    {'value': 13, 'name': '13:00'},
    {'value': 14, 'name': '14:00'},
    {'value': 15, 'name': '15:00'},
    {'value': 16, 'name': '16:00'},
    {'value': 17, 'name': '17:00'},
    {'value': 18, 'name': '18:00'},
    {'value': 19, 'name': '19:00'},
    {'value': 20, 'name': '20:00'},
    {'value': 21, 'name': '21:00'},
    {'value': 22, 'name': '22:00'},
    {'value': 23, 'name': '23:00'},
  ];

  occurrenceResultList = [
    {'value': 0, 'name': 'فوت'},
    {'value': 1, 'name': 'از کارافتادگی کلی'},
    {'value': 2, 'name': 'از کارافتادگی جزیی(درصد کاهش توانایی بین 33% تا 66%)'},
    {'value': 3, 'name': 'نقص عضو(درصد کاهش توانایی کمتر از 33%)'},
    /*{'value': 4, 'name': 'بهبودی کامل'},*/
    {'value': 4, 'name': 'در حال استراحت پزشکی'},
    {'value': 5, 'name': 'دریافت غرامت دستمزد و بهبودی'},
    /*{'value': 7, 'name': 'غرامت نقص عضو'},*/
  ];

  constructor(injector: Injector, public formGenerator: OccureFormGeneratorService) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.formOne = this.formGenerator.getFormOne(1);
    this.formTwo = this.formGenerator.getFormTwo();
    this.formThree = this.formGenerator.getFormThree();

    /* Download - Upload Address */
    this.occurrenceDocumentGallery.saveUrl = Urls.UploadImage;

    this.initSubscribes();
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
    this.formOne.get('nationCode').setValue(1);
    const restUserInfo = this.securityService.getCurrentUser();
    restUserInfo.then(res => {
      this.userData = res;
      if (!this.isLegal) {
        this.formOne.get('pNationalCode').setValue(res.nationalCode);
      }
      return this.restService.getAll(Urls.OccurrenceDocumentType);
    }).then(docType => {
      this.meta.docTypeObject = docType.data.list;
      for (const imageType of this.meta.docTypeObject) {
        this.meta.docTypeList.push({'value': imageType.docTypeId, 'name': imageType.docDesc});
      }
    }).catch(error => {
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    });
  }

  initSubscribes() {
    this.formThree.get('occurrenceDate').valueChanges.subscribe(occurrenceDate => {
      if (occurrenceDate !== null && occurrenceDate !== '') {
        if (!this.formOne.valid || !this.formTwo.valid) {
          this.formThree.get('occurrenceDate').reset();
          this.markFormGroupAsTouched(this.formOne);
          this.markFormGroupAsTouched(this.formTwo);
          this.showInfoMessageBox('پیام سیستم', 'لطفا ابتدا اطلاعات هویتی و کارگاه حادثه را تکمیل نمایید.');
          return;
        }
        const searchParams = Array(0);
        const workshopCode = new SearchParam();
        workshopCode.property = 'workshopCode';
        workshopCode.operator = SearchOperator.EQUAL;
        workshopCode.value = this.formTwo.value.workshopCode;
        searchParams.push(workshopCode);

        const nationalCode = new SearchParam();
        nationalCode.property = 'nationalCode';
        nationalCode.operator = SearchOperator.EQUAL;
        nationalCode.value = this.formOne.value.pNationalCode;
        searchParams.push(nationalCode);

        const branchCode = new SearchParam();
        branchCode.property = 'branchCode';
        branchCode.operator = SearchOperator.EQUAL;
        branchCode.value = this.formTwo.value.workshopBranchCode;
        searchParams.push(branchCode);

        const insuranceId = new SearchParam();
        insuranceId.property = 'insuranceNumber';
        insuranceId.operator = SearchOperator.EQUAL;
        insuranceId.value = this.formOne.value.insuranceId;
        searchParams.push(insuranceId);

        const employeeDate = new SearchParam();
        employeeDate.property = 'occurrenceDate';
        employeeDate.operator = SearchOperator.EQUAL;
        employeeDate.value = new Date(occurrenceDate).getTime().toString();
        searchParams.push(employeeDate);

        this._overlay = this.showOverlay();
        this.restService.getAll(Urls.OccurrenceDateValidate, searchParams).then(res => {
          this.hideOverlay(this._overlay);
          if (res.data === false) {
            this.formThree.get('occurrenceDate').reset();
            this.showInfoMessageBox('پیام سیستم', 'تاریخ حادثه با تاریخ شغل انتخاب شده مطابقت ندارد.');
            return;
          }
        }).catch(error => {
          this.hideOverlay(this._overlay);
          this.formThree.get('occurrenceDate').reset();
          this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
      }
    });

    this.formTwo.get('workshopCode').valueChanges.subscribe(workshopCode => {
      this.formThree.reset();
      if (!this.meta.noWorkShopFound && this.formTwo.get('workshopCode').valid) {
        const workshop = this.meta.workshopList.find(item => {
          return item.value === workshopCode;
        });

        const searchParams = Array(0);
        const workshopCodeParam = new SearchParam();
        workshopCodeParam.property = 'workshopCode';
        workshopCodeParam.operator = SearchOperator.EQUAL;
        workshopCodeParam.value = workshop.value;
        searchParams.push(workshopCodeParam);

        const branchCode = new SearchParam();
        branchCode.property = 'branchCode';
        branchCode.operator = SearchOperator.EQUAL;
        branchCode.value = workshop.branchCode;
        searchParams.push(branchCode);

        this._overlay = this.showOverlay();
        this.restService.getAll(Urls.OccurrenceSingleWorkShop, searchParams)
          .then(result => {
            if (result.data === '' || result.data === null) {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', `اطلاعات کارگاه مورد نظر یافت نشد.`);
              return;
            }
            this.enableWorkshopFields = result.data !== undefined;
            this.formTwo.get('workshopName').setValue(result.data.workshopName);
            this.formTwo.get('bossFullName').setValue(result.data.employerName);
            this.formTwo.get('workshopAddress').setValue(result.data.lastAddress);
            this.formTwo.get('workshopBranchCode').setValue(result.data.brhCode);
            this.dateTemp = momentNs.from(workshop.startDate, 'en').locale('fa').format('YYYY/M/D');
            this.hideOverlay(this._overlay);
          }).catch(error => {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', `اطلاعات کارگاه مورد نظر یافت نشد.`);
        });
      }
    });
  }

  getIdentity() {
    if (this.formOne.get('birthDate').valid && this.formOne.get('pNationalCode').valid) {
      if (this.isLegal && this.formOne.value.pNationalCode === this.userData.nationalCode) {
        this.showInfoMessageBox('پیام سیستم', 'کد ملی حادثه دیده نمیتواند با کد ملی کارفرما یکی باشد.');
        this.formOne.get('pNationalCode').reset();
        return;
      }
      const searchParams: Array<SearchParam> = [];
      const nationalCode = new SearchParam();
      nationalCode.property = 'nationalCode';
      nationalCode.operator = SearchOperator.EQUAL;
      nationalCode.value = this.formOne.get('pNationalCode').value;
      searchParams.push(nationalCode);

      const birthDate = new SearchParam();
      birthDate.property = 'birthDate';
      birthDate.operator = SearchOperator.EQUAL;
      birthDate.value = this.formOne.get('birthDate').value.getTime().toString();
      searchParams.push(birthDate);
      this._overlay = this.showOverlay();
      this.restService.getAll(Urls.OccurrenceCase, [nationalCode]).then(data => {
        const response = data.data;
        if (response != null) {
          this.dataInput = response;
        } else {
          throw {noCase: 'اطلاعاتی یافت نشد'};
        }
        return this.restService.getAll(Urls.OccurrencePersonalInfo, searchParams);
      }).then(result => {
          this.formOne.patchValue({
            insuranceId: this.dataInput.insuranceId,
            pNationalCode: nationalCode.value,
            birthDate: new Date(result.data.birthDate),
            pFirstName: result.data.firstName,
            pLastName: result.data.lastName,
            gender: result.data.gender === '02' ? 2 : 1,
            genderDesc: result.data.gender === '02' ? 'زن' : 'مرد',
            isuTypecode: this.dataInput.isuType,
            isuTypeDesc: this.dataInput.isuTypeDesc,
            branchCode: this.dataInput.brhCode,
            branchName: this.dataInput.brhName,
          });
          this.lockIdentity = true;
          /*const moment = momentNs;
          this.birthDateTemp = moment.from(new Date(result.data.birthDate).toString(), 'en').locale('fa').format('YYYY/M/D');*/

          return this.restService.getAll(Urls.OccurrenceAllWorkShops, [nationalCode]);
        }).then(works => {
        this.meta.workshopList = Array(0);
        for (const workshop of works.data.list) {
          this.meta.workshopList.push({'value': workshop[0], 'title': `${workshop[0]} - شعبه ${workshop[1]}`,
            'branchCode': workshop[1]});
        }
        this.meta.noWorkShopFound = this.meta.workshopList.length === 0;
        this.hideOverlay(this._overlay);
      }).catch(error => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'مشخصات وارد شده در پایگاه داده یافت نشد.');
      });
    } else {
      this.formOne.get('pNationalCode').markAsTouched();
      this.formOne.get('birthDate').markAsTouched();
    }
  }

  unlockIdentity() {
    this.formOne.patchValue({
      nationCode: 1,
      pNationalCode: this.userData.nationalCode,
      insuranceId: '',
      pFirstName: '',
      pLastName: '',
      birthDate: '',
      gender: '',
      genderDesc: '',
      marriageStatusCode: '',
      jobDesc: '',
      reportJobLocation: ['', Validators.required],
      branchCode: '',
      branchName: '',
      reportAddress: '',
      reportTelephone: '',
      reportPostalCode: '',
      reportOwner: '',
      employeeDate: '',
      isuTypecode: '',
      isuTypeDesc: ''
    });
    this.formTwo.reset();
    this.formThree.reset();
    this.lockIdentity = false;
    this.enableWorkshopFields = false;
    this.meta.workshopList = Array(0);
  }

  /* Upload Files */
  uploadMainFile() {
    if (this.formThree.value.occurDocumentType !== '' && this.formThree.value.occurDocumentType !== null) {
      const selectedImageType = this.formThree.getRawValue().occurDocumentType;
      const fileTypeItem = this.meta.docTypeObject.find(value => {
        return value.docTypeId === selectedImageType;
      });
      this.occurrenceDocumentGallery.selectImage(fileTypeItem.docDesc, fileTypeItem.docTypeId);
    } else {
      this.formThree.get('occurDocumentType').markAsTouched();
    }
  }

  get validate() {
    this.formValidationError = false;
    const missingStatus = /*this.checkImageMissingStatus()*/false;
    if (!this.formOne.valid || !this.formTwo.valid
        || !this.formThree.valid || missingStatus) {

      /* Marking Main Form */
      this.markFormGroupAsTouched(this.formOne);
      this.markFormGroupAsTouched(this.formTwo);
      this.markFormGroupAsTouched(this.formThree);
      this.formValidationError = true;
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return false;
    }
    return true;
  }

  onRemoveImage(max: Number) {
    this.occurrenceUploadExceed = this.occurrenceDocumentGallery.images.length === max;
  }

  onInsertImage(max: Number) {
    this.occurrenceUploadExceed = this.occurrenceDocumentGallery.images.length === max;
  }

  private checkImageMissingStatus() {
    this.occurrenceDocumentMissing = false;

    if (this.occurrenceDocumentGallery.images.length === 0
      || !this.occurrenceDocumentGallery.areAllImagesUploaded()) {
      this.occurrenceDocumentMissing = true;
      return true;
    }
    return false;
  }
}
