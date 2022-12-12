import {Component, Injector, Input, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {CommitteeModel} from '../committee-model';
import {AppHelper} from '../../../settings/app-helper';
import {StageThreeFormGeneratorService} from '../form-downloader.service';

@Component({
  selector: 'app-stage-two-medical-committee',
  templateUrl: './committee-stage-two.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class CommitteeStageTwoComponent extends TaminPageBaseComponent {

  /* Forms */
  form: FormGroup;

  /* Gallery Items */
  @ViewChild('divanGallery') divanGallery: TaminImageGalleryManagedComponent;
  @ViewChild('visitBeforeJobGallery') visitBeforeJobGallery: TaminImageGalleryManagedComponent;
  @ViewChild('visitInJobGallery') visitInJobGallery: TaminImageGalleryManagedComponent;
  @ViewChild('expertJobGallery') expertJobGallery: TaminImageGalleryManagedComponent;
  @ViewChild('contractGallery') contractGallery: TaminImageGalleryManagedComponent;
  @ViewChild('healthyCertificateGallery') healthyCertificateGallery: TaminImageGalleryManagedComponent;
  @ViewChild('drivingCertificateGallery') drivingCertificateGallery: TaminImageGalleryManagedComponent;
  @ViewChild('militaryDutyGallery') militaryDutyGallery: TaminImageGalleryManagedComponent;
  @ViewChild('pendingMilitaryDutyGallery') pendingMilitaryDutyGallery: TaminImageGalleryManagedComponent;

  divanGalleryMissing: boolean;
  visitBeforeJobGalleryMissing: boolean;
  visitInJobGalleryMissing: boolean;
  expertJobGalleryMissing: boolean;
  contractGalleryMissing: boolean;
  healthyCertificateGalleryMissing: boolean;
  drivingCertificateGalleryMissing: boolean;
  militaryDutyGalleryMissing: boolean;
  pendingMilitaryDutyGalleryMissing: boolean;

  committeeFormValidationError: boolean;

  hasDivan: boolean;
  hasVisitBeforeJob: boolean;
  hasVisitInJob: boolean;
  hasExpertJob: boolean;
  hasContract: boolean;
  hasHealthyCertificate: boolean;
  hasDrivingCertificate: boolean;
  hasMilitary: boolean;
  hasPendingMilitary: boolean;

  /* Data Model */
  @Input() model: CommitteeModel;

  militaryHaveOrNotHave = [
    {'value': '1', 'name': 'معافيت پزشکی'},
    {'value': '2', 'name': 'کارت پايان خدمت'},
    {'value': '3', 'name': 'معافيت غير پزشکی'},
    {'value': '4', 'name': 'غير مشمول'},
    {'value': '5', 'name': 'عدم اقدام جهت تعیین تکلیف سربازی'}
  ];

  committeeHaveOrNotHave = [
    {'value': '0', 'name': 'خیر'},
    {'value': '1', 'name': 'بله'}
  ];

  /* Constructor */
  constructor(injector: Injector, private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {

    this.divanGalleryMissing = false;
    this.visitBeforeJobGalleryMissing = false;
    this.visitInJobGalleryMissing = false;
    this.expertJobGalleryMissing = false;
    this.contractGalleryMissing = false;
    this.healthyCertificateGalleryMissing = false;
    this.drivingCertificateGalleryMissing = false;
    this.militaryDutyGalleryMissing = false;
    this.pendingMilitaryDutyGalleryMissing = false;

    this.committeeFormValidationError = false;

    /* Initializing Form */
    this.form = this.formBuilder.group({
      hasVisitBeforeJob: [ , ],
      hasVisitInJob: [ , Validators.required],
      hasExpertJob: [ , Validators.required],
      hasContract: [ , Validators.required],
      hasHealthyCertificate: [ , Validators.required],
      hasDrivingCertificate: [ , Validators.required],
      militaryStatusCode: [ , ],
    });

    if (this.model.formCase === 1) {
      this.form.addControl('divan', this.formBuilder.control('', Validators.required));
    }
    if (this.model.noEmployee && !this.model.nintyOneChecked) {
      this.form.controls['hasVisitBeforeJob'].setValidators(Validators.required);
    }

    if (!this.model.militaryDutyDisable) {
      this.form.controls['militaryStatusCode'].setValidators(Validators.required);
    }
  }

  /* Loads After Page Render */
  protected loadPageData(): void {

    this.initSubscribes();

    /* Download - Upload Address */
    this.divanGallery.getUrl = Urls.UploadImage;
    this.divanGallery.saveUrl = Urls.UploadImage;
    this.visitBeforeJobGallery.getUrl = Urls.UploadImage;
    this.visitBeforeJobGallery.saveUrl = Urls.UploadImage;
    this.visitInJobGallery.getUrl = Urls.UploadImage;
    this.visitInJobGallery.saveUrl = Urls.UploadImage;
    this.expertJobGallery.getUrl = Urls.UploadImage;
    this.expertJobGallery.saveUrl = Urls.UploadImage;
    this.contractGallery.getUrl = Urls.UploadImage;
    this.contractGallery.saveUrl = Urls.UploadImage;
    this.healthyCertificateGallery.getUrl = Urls.UploadImage;
    this.healthyCertificateGallery.saveUrl = Urls.UploadImage;
    this.drivingCertificateGallery.getUrl = Urls.UploadImage;
    this.drivingCertificateGallery.saveUrl = Urls.UploadImage;
    this.militaryDutyGallery.getUrl = Urls.UploadImage;
    this.militaryDutyGallery.saveUrl = Urls.UploadImage;
    this.pendingMilitaryDutyGallery.getUrl = Urls.UploadImage;
    this.pendingMilitaryDutyGallery.saveUrl = Urls.UploadImage;

    if (!this.model.secondStageDone) {
      if (this.model.gender === 'f') {
        this.form.get('militaryStatusCode').setValue('4');
      }
      if (this.model.demandStage > 1) {
        this.form.get('hasVisitBeforeJob').setValue(this.model.gridItem.hasVisitBeforeJob);
        this.form.get('hasVisitInJob').setValue(this.model.gridItem.hasVisitInJob);
        this.form.get('hasExpertJob').setValue(this.model.gridItem.hasExpertJob);
        this.form.get('hasContract').setValue(this.model.gridItem.hasContract);
        this.form.get('hasHealthyCertificate').setValue(this.model.gridItem.hasHealthyCertificate);
        this.form.get('hasDrivingCertificate').setValue(this.model.gridItem.hasDrivingCertificate);
        this.form.get('militaryStatusCode').setValue(this.model.gridItem.militaryStatusCode);

        if (this.model.formCase === 1) {
          this.form.get('divan').setValue(this.model.gridItem.divan);
        }

        const divanItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '126';
        });

        const visitBeforeJobItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '103';
        });

        const visitInJobItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '152';
        });

        const expertJobItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '94';
        });

        const contractItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '98';
        });

        const healthyCertificateItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '92';
        });

        const drivingCertificateItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '97';
        });

        const militaryDutyItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '40';
        });

        const pendingMilitaryDutyItems = this.model.gridItem.committeeDemandInfoDocumentList.filter(value => {
          return value.documentTypeId === '80';
        });

        for (const item of divanItems) {
          this.divanGallery.downloadImage(item.documentFileId, 'دادنامه دیوان عدالت', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of visitBeforeJobItems) {
          this.visitBeforeJobGallery.downloadImage(item.documentFileId, 'معاینه بدو بیمه گزاری', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of visitInJobItems) {
          this.visitInJobGallery.downloadImage(item.documentFileId, 'معاینات قبل از بکارگماری', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of expertJobItems) {
          this.expertJobGallery.downloadImage(item.documentFileId, 'کارت مهارت', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of contractItems) {
          this.contractGallery.downloadImage(item.documentFileId, 'قرارداد یا حکم کارگزینی', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of healthyCertificateItems) {
          this.healthyCertificateGallery.downloadImage(item.documentFileId, 'گواهی سلامت و بهداشت', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of drivingCertificateItems) {
          this.drivingCertificateGallery.downloadImage(item.documentFileId, 'گواهینامه رانندگی', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }
        for (const item of militaryDutyItems) {
          this.militaryDutyGallery.downloadImage(item.documentFileId, 'کارت پایان خدمت', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 2);
        }

        for (const item of pendingMilitaryDutyItems) {
          this.pendingMilitaryDutyGallery.downloadImage(item.documentFileId, 'عدم اقدام سربازی', item.documentTypeId, '0', true, item.documentTypeId);
          this.onInsertImage(item.documentTypeId, 1);
        }
      }
    } else {
      this.form.patchValue({
        hasVisitBeforeJob: this.model.stageTwoForm.value.hasVisitBeforeJob,
        hasVisitInJob: this.model.stageTwoForm.value.hasVisitInJob,
        hasExpertJob: this.model.stageTwoForm.value.hasExpertJob,
        hasContract: this.model.stageTwoForm.value.hasContract,
        hasHealthyCertificate: this.model.stageTwoForm.value.hasHealthyCertificate,
        hasDrivingCertificate: this.model.stageTwoForm.value.hasDrivingCertificate,
        militaryStatusCode: this.model.stageTwoForm.value.militaryStatusCode,
      });

      if (this.model.formCase === 1) {
        this.form.get('divan').setValue(this.model.stageTwoForm.value.divan);
      }

      this.divanGallery.images = this.model.divanGalleryImages;
      this.visitBeforeJobGallery.images = this.model.visitBeforeJobGalleryImages;
      this.expertJobGallery.images = this.model.expertJobGalleryImages;
      this.contractGallery.images = this.model.contractGalleryImages;
      this.healthyCertificateGallery.images = this.model.healthyCertificateGalleryImages;
      this.drivingCertificateGallery.images = this.model.drivingCertificateGalleryImages;
      this.militaryDutyGallery.images = this.model.militaryDutyGalleryImages;
      this.pendingMilitaryDutyGallery.images = this.model.pendingMilitaryDutyGalleryImages;

      this.divanGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.visitBeforeJobGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.expertJobGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.contractGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.healthyCertificateGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.drivingCertificateGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.militaryDutyGallery.images.forEach(item => {
        item.removeable = true;
      });
      this.pendingMilitaryDutyGallery.images.forEach(item => {
        item.removeable = true;
      });
    }
  }

  initSubscribes() {
    if (this.model.formCase === 1) {
      this.form.get('divan').valueChanges.subscribe(value => {
        this.divanGallery.clearImages();
        this.model.divanUploadExceed = false;
        if (value === '1') {
          this.hasDivan = true;
        } else {
          this.hasDivan = false;
        }
      });
    }
    this.form.get('hasVisitBeforeJob').valueChanges.subscribe(value => {
      this.visitBeforeJobGallery.clearImages();
      this.model.visitBeforeJobUploadExceed = false;
      if (value === '1') {
        this.hasVisitBeforeJob = true;
      } else {
        this.hasVisitBeforeJob = false;
      }
    });
    this.form.get('hasVisitInJob').valueChanges.subscribe(value => {
      this.visitInJobGallery.clearImages();
      this.model.visitInJobUploadExceed = false;
      if (value === '1') {
        this.hasVisitInJob = true;
      } else {
        this.hasVisitInJob = false;
      }
    });
    this.form.get('hasExpertJob').valueChanges.subscribe(value => {
      this.expertJobGallery.clearImages();
      this.model.expertJobUploadExceed = false;
      if (value === '1') {
        this.hasExpertJob = true;
      } else {
        this.hasExpertJob = false;
      }
    });
    this.form.get('hasContract').valueChanges.subscribe(value => {
      this.contractGallery.clearImages();
      this.model.contractUploadExceed = false;
      if (value === '1') {
        this.hasContract = true;
      } else {
        this.hasContract = false;
      }
    });
    this.form.get('hasHealthyCertificate').valueChanges.subscribe(value => {
      this.healthyCertificateGallery.clearImages();
      this.model.healthyCertificateUploadExceed = false;
      if (value === '1') {
        this.hasHealthyCertificate = true;
      } else {
        this.hasHealthyCertificate = false;
      }
    });
    this.form.get('hasDrivingCertificate').valueChanges.subscribe(value => {
      this.drivingCertificateGallery.clearImages();
      this.model.drivingCertificateUploadExceed = false;
      if (value === '1') {
        this.hasDrivingCertificate = true;
      } else {
        this.hasDrivingCertificate = false;
      }
    });
    this.form.get('militaryStatusCode').valueChanges.subscribe(value => {
      this.militaryDutyGallery.clearImages();
      this.pendingMilitaryDutyGallery.clearImages();
      this.model.militaryDutyUploadExceed = false;
      this.model.pendingMilitaryDutyUploadExceed = false;
      if (value < 4) {
        this.hasMilitary = true;
        this.hasPendingMilitary = !this.hasMilitary;
      } else if (value === '5') {
        this.hasMilitary = false;
        this.hasPendingMilitary = !this.hasMilitary;
      } else {
        this.hasMilitary = false;
        this.hasPendingMilitary = false;
      }
    });
  }

  /* Upload Files */
  uploadVisitBeforeJobFile() {
    this.visitBeforeJobGallery.selectImage('معاینه بدو بیمه گزاری', '103');
    this.visitBeforeJobGalleryMissing = false;
  }

  uploadVisitInJobFile() {
    this.visitInJobGallery.selectImage('معاینات قبل از بکارگماری', '152');
    this.visitInJobGalleryMissing = false;
  }

  uploadExpertJobFile() {
    this.expertJobGallery.selectImage('کارت مهارت', '94');
    this.expertJobGalleryMissing = false;
  }

  uploadContractFile() {
    this.contractGallery.selectImage('قرارداد یا حکم کارگزینی', '98');
    this.contractGalleryMissing = false;
  }

  uploadHealthyCertificateFile() {
    this.healthyCertificateGallery.selectImage('گواهی سلامت و بهداشت', '92');
    this.healthyCertificateGalleryMissing = false;
  }

  uploadDrivingCertificateFile() {
    this.drivingCertificateGallery.selectImage('گواهینامه رانندگی', '97');
    this.drivingCertificateGalleryMissing = false;
  }

  uploadMilitaryHistoryFile() {
    this.militaryDutyGallery.selectImage('کارت پایان خدمت', '40');
    this.militaryDutyGalleryMissing = false;
  }

  uploadPendingMilitaryHistoryFile() {
    this.pendingMilitaryDutyGallery.selectImage('عدم اقدام سربازی', '80');
    this.pendingMilitaryDutyGalleryMissing = false;
  }

  uploadDivanFile() {
    this.divanGallery.selectImage('دادنامه دیوان عدالت', '126');
    this.divanGalleryMissing = false;
  }

  get stageValidate() {
    this.committeeFormValidationError = false;
    const missingStatus = this.checkImagesMissingStatus();
    if (!this.form.valid || missingStatus) {
      /* Marking Main Form */
      this.markFormGroupAsTouched(this.form);
      this.committeeFormValidationError = true;
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return false;
    }

    this.model.secondStageDone = true;
    this.model.divanGalleryImages = this.divanGallery.images;
    this.model.visitBeforeJobGalleryImages = this.visitBeforeJobGallery.images;
    this.model.visitInJobGalleryImages = this.visitInJobGallery.images;
    this.model.expertJobGalleryImages = this.expertJobGallery.images;
    this.model.contractGalleryImages = this.contractGallery.images;
    this.model.healthyCertificateGalleryImages = this.healthyCertificateGallery.images;
    this.model.drivingCertificateGalleryImages = this.drivingCertificateGallery.images;
    this.model.militaryDutyGalleryImages = this.militaryDutyGallery.images;
    this.model.pendingMilitaryDutyGalleryImages = this.pendingMilitaryDutyGallery.images;

    this.model.stageTwoForm = this.form;

    /*const temp1 = this.committeeHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().hasVisitBeforeJob;
    });
    const temp2 = this.committeeHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().hasExpertJob;
    });
    const temp3 = this.committeeHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().hasContract;
    });
    const temp4 = this.committeeHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().hasHealthyCertificate;
    });
    const temp5 = this.committeeHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().hasDrivingCertificate;
    });
    const temp6 = this.militaryHaveOrNotHave.find(value => {
      return value.value === this.form.getRawValue().militaryStatusCode;
    });

    this.model.hasVisitBeforeJobReview = `معاینات قبل از استخدام ${temp1.name}`;
    this.model.hasExpertJobReview = `دارای سابقه کمیسیون پزشکی تامین اجتماعی ${temp2.name}`;
    this.model.hasContractReview = `دارای سابقه کمیسیون پزشکی سایر نهادها ${temp3.name}`;
    this.model.hasHealthyCertificateReview = `تحت پوشش نهادهای حمایتی ${temp4.name}`;
    this.model.hasDrivingCertificateReview = `تحت پوشش نهادهای حمایتی ${temp4.name}`;
    this.model.militaryStatusCodeReview = temp5.name;
    */

    return true;
  }

  /* Image Validation Method */
  private checkImagesMissingStatus() {
    this.divanGalleryMissing = false;
    this.visitBeforeJobGalleryMissing = false;
    this.visitInJobGalleryMissing = false;
    this.expertJobGalleryMissing = false;
    this.contractGalleryMissing = false;
    this.healthyCertificateGalleryMissing = false;
    this.drivingCertificateGalleryMissing = false;
    this.militaryDutyGalleryMissing = false;
    this.pendingMilitaryDutyGalleryMissing = false;
    let missingStatus = false;

    if (this.hasDivan && (this.divanGallery.images.length === 0
      || !this.divanGallery.areAllImagesUploaded())) {
      this.divanGalleryMissing = true;
      return true;
    }
    if (this.hasVisitBeforeJob && !this.visitBeforeJobGallery.areAllImagesUploaded()) {
      this.visitBeforeJobGalleryMissing = true;
      missingStatus = true;
    }
    if (this.hasVisitInJob && !this.visitInJobGallery.areAllImagesUploaded()) {
      this.visitInJobGalleryMissing = true;
      missingStatus = true;
    }
    if (this.hasExpertJob && !this.expertJobGallery.areAllImagesUploaded()) {
      this.expertJobGalleryMissing = true;
      missingStatus = true;
    }
    if (this.hasContract && !this.contractGallery.areAllImagesUploaded()) {
      this.contractGalleryMissing = true;
      missingStatus = true;
    }
    if (this.hasHealthyCertificate && !this.healthyCertificateGallery.areAllImagesUploaded()) {
      this.healthyCertificateGalleryMissing = true;
      missingStatus = true;
    }
    if (this.hasDrivingCertificate && !this.drivingCertificateGallery.areAllImagesUploaded()) {
      this.drivingCertificateGalleryMissing = true;
      missingStatus = true;
    }
    if (!this.model.militaryDutyDisable && this.hasMilitary && (this.militaryDutyGallery.images.length === 0
      || !this.militaryDutyGallery.areAllImagesUploaded())) {
      this.militaryDutyGalleryMissing = true;
      missingStatus = true;
    }
    if (!this.model.militaryDutyDisable && this.hasPendingMilitary && (this.pendingMilitaryDutyGallery.images.length === 0
      || !this.pendingMilitaryDutyGallery.areAllImagesUploaded())) {
      this.pendingMilitaryDutyGalleryMissing = true;
      missingStatus = true;
    }
    return missingStatus;
  }

  onRemoveImage(tag: string, max: Number) {
    this.maxUploadValidation(tag, max);
  }

  onInsertImage(tag: string, max: Number) {
    this.maxUploadValidation(tag, max);
  }

  private maxUploadValidation(tag, max) {
    switch (tag) {
      case '103':
        this.model.visitBeforeJobUploadExceed = this.visitBeforeJobGallery.images.length === max;
        break;
      case '152':
        this.model.visitInJobUploadExceed = this.visitInJobGallery.images.length === max;
        break;
      case '94':
        this.model.expertJobUploadExceed = this.expertJobGallery.images.length === max;
        break;
      case '98':
        this.model.contractUploadExceed = this.contractGallery.images.length === max;
        break;
      case '92':
        this.model.healthyCertificateUploadExceed = this.healthyCertificateGallery.images.length === max;
        break;
      case '97':
        this.model.drivingCertificateUploadExceed = this.drivingCertificateGallery.images.length === max;
        break;
      case '40':
        this.model.militaryDutyUploadExceed = this.militaryDutyGallery.images.length === max;
        break;
      case '80':
        this.model.pendingMilitaryDutyUploadExceed = this.pendingMilitaryDutyGallery.images.length === max;
        break;
      case '126':
        this.model.divanUploadExceed = this.divanGallery.images.length === max;
        break;
    }
  }

  downloadForm1PDF() {
    if (AppHelper.isWeb()) {
      this.pdfFormGenerator.downloadForm1PdfDesktop(this.model.stageOneFormOne.value.commNationalCode,
        this.model.stageOneFormOne.value.commBirthDate, this.model.stageOneFormOne.value.insuranceNumber,
        this.model.stageOneFormOne.value.commNationalCode,
        this.model.demandInfoId, this);
    } else {
      this.pdfFormGenerator.downloadForm1PdfMobile(this.model.stageOneFormOne.value.commNationalCode,
        this.model.stageOneFormOne.value.commBirthDate, this.model.stageOneFormOne.value.insuranceNumber,
        this.model.stageOneFormOne.value.commNationalCode,
        this.model.demandInfoId, this);
    }
  }

  downloadForm9PDF() {
    if (AppHelper.isWeb()) {
      this.pdfFormGenerator.downloadForm9PdfDesktop(this.model.stageOneFormOne.value.commNationalCode,
        this.model.stageOneFormOne.value.commBirthDate, this.model.stageOneFormOne.value.branchName, this);
    } else {
      this.pdfFormGenerator.downloadForm9PdfMobile(this.model.stageOneFormOne.value.commNationalCode,
        this.model.stageOneFormOne.value.commBirthDate, this.model.stageOneFormOne.value.branchName, this);
    }
  }
}
