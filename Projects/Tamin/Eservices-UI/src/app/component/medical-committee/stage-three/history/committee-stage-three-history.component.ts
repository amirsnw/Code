import {Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {DiseaseModel} from '../disease-model';
import {CommitteeModel} from '../../committee-model';
import {AppHelper} from '../../../../settings/app-helper';
import {StageThreeFormGeneratorService} from '../../form-downloader.service';

@Component({
  selector: 'app-stage-three-history-medical-committee',
  templateUrl: './committee-stage-three-history.component.html',
  styleUrls: ['../../main-committee/main-committee.component.css'],
})
export class CommitteeStageThreeHistoryComponent extends TaminPageBaseComponent {

  overlay: any;
  timeout: any;

  inactive: boolean;

  /* Forms */
  diseaseForm: FormGroup;
  historyForm: FormGroup;
  doctorHistoryForm: FormGroup;
  hospitalizationHistoryForm: FormGroup;
  documentForm: FormGroup;

  /* Gallery Items */
  @ViewChild('diseaseGallery') diseaseGallery: TaminImageGalleryManagedComponent;
  @ViewChild('profileGallery') profileGallery: TaminImageGalleryManagedComponent;
  @ViewChild('taminCommissionGallery') taminCommissionGallery: TaminImageGalleryManagedComponent;
  @ViewChild('hospitalizationHistoryGallery') hospitalizationHistoryGallery: TaminImageGalleryManagedComponent;
  @ViewChild('doctorHistoryGallery') doctorHistoryGallery: TaminImageGalleryManagedComponent;

  @ViewChild('hospitalDocTypeCombo') hosDocTypeCombo: TaminFieldComboBoxStaticComponent;

  /* Modal Items */
  @ViewChild('profileUploadModal') profileUploadModal: TaminModalComponent;
  @ViewChild('hospitalDocModal') hospitalDocModal: TaminModalComponent;

  /* Combo Item */
  @ViewChild('hospitalProvince') hospitalProvince: TaminFieldAutoCompleteDataGridComponent;

  /* Data Grids */
  @ViewChild('hospitalHDataGrid') hospitalHDataGrid: TaminDataGridComponent;
  @ViewChild('doctorHDataGrid') doctorHDataGrid: TaminDataGridComponent;

  /* Data Model */
  @Input() mainModel: CommitteeModel;
  @Input() diseaseModel: DiseaseModel;
  @Output() formError = new EventEmitter();

  hasCommissionTaminOrgan: boolean;
  lockFirstOrgunIdentity: boolean;
  lockSecondOrgunIdentity: boolean;

  diseaseFormValidationError: boolean;
  doctorFormValidationError: boolean;
  hospitalizationFormValidationError: boolean;

  /* Image Validation Properties*/
  diseaseGalleryMissing: boolean;
  taminCommissionGalleryMissing: boolean;
  doctorHistoryGalleryMissing: boolean;
  hosHistoryGalleryMissing: boolean;

  diseaseUploadExceed: boolean;
  profileUploadExceed: boolean;
  taminCommissionUploadExceed: boolean;
  doctorHistoryUploadExceed: boolean;
  hosHistoryUploadExceed: boolean;

  /* Edit Mode Index */
  hospitalHDataGridEditIndex: number;
  doctorHDataGridEditIndex: number;

  doctorInfoIdTemp: string;
  doctorOrganNumberTemp: string;

  haveOrNotHave = [
    {'value': '0', 'name': 'خیر'},
    {'value': '1', 'name': 'بله'}
  ];

  bookletTypeList = [
    {'value': '0', 'name': 'درمان آزاد'},
    {'value': '1', 'name': 'دفترچه تامین اجتماعی'},
    {'value': '2', 'name': 'دفترچه بیمه سلامت'},
    {'value': '3', 'name': 'دفترچه بیمه نیروهای مسلح'},
    {'value': '4', 'name': 'دفترچه سایر بیمه ها'}
  ];

  refrenceReasonList = [
    {'value': '03', 'name': 'بیماری عادی'},
    {'value': '02', 'name': 'حادثه ناشی از کار'},
    {'value': '04', 'name': 'حادثه غیر ناشی از کار'},
  ];

  hospitalCityList = [];
  hideDownloadForm4: boolean;

  /* Constructor */
  constructor(injector: Injector, private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);

    const UID = {
      _current: 0,
      getNew: function () {
        this._current++;
        return this._current;
      }
    };

    HTMLElement.prototype['pseudoStyle'] = function (pseudo, prop, value) {
      const _this_ = this;
      const _sheetId = 'pseudoStyles';
      const _head = document.head || document.getElementsByTagName('head')[0];
      const _sheet = document.getElementById(_sheetId) || document.createElement('style');
      _sheet.id = _sheetId;
      const className = 'pseudoStyle' + UID.getNew();

      // Add class to selected element
      _this_.className += ' ' + className;

      _sheet.innerHTML += ' .' + className + ':' + pseudo + '{' + prop + ':' + value + '}';
      _head.appendChild(_sheet);
      return this;
    };
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
      this.hideDownloadForm4 = this.mainModel.nintyOneChecked || this.mainModel.form4DownloadDisable
        || this.mainModel.isFamily;

    this.initializeProvince();
    this.inactive = false;

    /* Initializing States */
    this.diseaseFormValidationError = false;
    this.doctorFormValidationError = false;
    this.hospitalizationFormValidationError = false;

    this.diseaseGalleryMissing = false;
    this.doctorHistoryGalleryMissing = false;
    this.hosHistoryGalleryMissing = false;

    this.diseaseUploadExceed = false;
    this.profileUploadExceed = false;
    this.doctorHistoryUploadExceed = false;
    this.hosHistoryUploadExceed = false;

    this.hospitalHDataGridEditIndex = -1;
    this.doctorHDataGridEditIndex = -1;

    this.lockFirstOrgunIdentity = true;
    this.lockSecondOrgunIdentity = true;

    /* Initializing Forms */
    this.diseaseForm = this.formBuilder.group({
      requestSaveDate: ['', ],
      requestInfoId: ['', ],
      requestNumber: ['', Validators.required],
      illnessDesc: ['', Validators.required],
      mainDoctorFirstName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      mainDoctorLastName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      doctorInfoId: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      mainDoctorSpeciality: ['', [Validators.required]],
    });

    this.historyForm = this.formBuilder.group({
      hasOtherDoctor: [false, Validators.required],
      hasHospitalization: [false, Validators.required],
      hasCommissionTaminOrgan: [ , Validators.required],
      hasCommissionOtherOrgan: [ , ],
      commissionOtherOrganDesc: ['', [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      hasSupportOrgan: [ , Validators.required],
      supportOrganDesc: ['', [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      bookletTypeCode: [ , Validators.required],
      refrenceReasonCode: [ , Validators.required],
      hasDrugUsageBoolean: [false, Validators.required],
      hasSurgeryBoolean: [false, Validators.required],
      hasOtherDarmanBoolean: [false, Validators.required],
      otherDarmanDesc: ['', Validators.required]
    });

    if (!this.mainModel.nintyOneChecked) {
      this.historyForm.controls['hasCommissionOtherOrgan'].setValidators(Validators.required);
    }

    this.doctorHistoryForm = this.formBuilder.group({
      doctorFirstName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      doctorLastName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      doctorOrganNumber: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      doctorSpecialty: ['', [Validators.required]]
    });

    this.hospitalizationHistoryForm = this.formBuilder.group({
      hospitalName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      hospitalizedProvinceCode: ['', [Validators.required]],
      hospitalizedCityCode: ['', [Validators.required]],
      hospitalizedStartDate: ['', [Validators.required]],
      hospitalizedEndDate: ['', [Validators.required]]
    });

    this.documentForm = this.formBuilder.group({
      selectedItem: ['', ],
    });

    if (this.mainModel.isFortyPercent) {
      this.refrenceReasonList = [{'value': '02', 'name': 'حادثه ناشی از کار'}];
    }

    if (this.mainModel.formCase === 1) {
      if (!this.mainModel.isMainInsured) {
        this.refrenceReasonList = [
          {'value': '03', 'name': 'بیماری عادی'},
          {'value': '04', 'name': 'حادثه غیر ناشی از کار'},
        ];
      }
    } else {
      this.refrenceReasonList = [
        {'value': '03', 'name': 'بیماری عادی'},
        {'value': '04', 'name': 'حادثه غیر ناشی از کار'},
      ];
    }
  }

  /* Loads After Page Render */
  protected loadPageData(): void {

    /* Initialize Data Grids */
    this.initializeHospitalHDataGrid();
    this.initializeDoctorHDataGrid();
    this.initSubscribes();
    this.hospitalHDataGrid.dataItems = this.diseaseModel.hospitalizationHistoryList;
    this.doctorHDataGrid.dataItems = this.diseaseModel.doctorHistoryList;

    /* Download - Upload Address */
    this.diseaseGallery.saveUrl = Urls.UploadImage;
    this.profileGallery.saveUrl = Urls.UploadImage;
    this.taminCommissionGallery.saveUrl = Urls.UploadImage;
    this.hospitalizationHistoryGallery.saveUrl = Urls.UploadImage;
    this.doctorHistoryGallery.saveUrl = Urls.UploadImage;

    this.diseaseGallery.getUrl = Urls.UploadImage;
    this.profileGallery.getUrl = Urls.UploadImage;
    this.taminCommissionGallery.getUrl = Urls.UploadImage;
    this.hospitalizationHistoryGallery.getUrl = Urls.UploadImage;
    this.doctorHistoryGallery.getUrl = Urls.UploadImage;

    const labels = document.querySelectorAll('.tamin-form-control-label-required');
    [].forEach.call(labels, function (label) {
      label.pseudoStyle('after', 'content', '\'\' !important');
    });
  }

  private zeroPlacer(zeroCount: number, value: string): string {
    while (zeroCount > 0) {
      value = '0' + value;
      zeroCount--;
    }
    return value;
  }

  initSubscribes() {
    this.diseaseForm.get('doctorInfoId').valueChanges.subscribe(value => {
      if (this.inactive) {
        return;
      }
      clearTimeout(this.timeout);
      if (value != null && value.length < 10) {
        this.timeout = setTimeout(() => {
          const zeroCount = 10 - value.length;
          this.diseaseForm.get('doctorInfoId').setValue(this.zeroPlacer(zeroCount, value));
        }, 2500);
      }
    });

    this.doctorHistoryForm.get('doctorOrganNumber').valueChanges.subscribe(value => {
      if (this.inactive) {
        return;
      }
      clearTimeout(this.timeout);
      if (value != null && value.length < 10) {
        this.timeout = setTimeout(() => {
          const zeroCount = 10 - value.length;
          this.doctorHistoryForm.get('doctorOrganNumber').setValue(this.zeroPlacer(zeroCount, value));
        }, 2500);
      }
    });

    this.historyForm.get('hasCommissionTaminOrgan').valueChanges.subscribe(value => {
      this.taminCommissionGallery.clearImages();
      this.taminCommissionUploadExceed = false;
      if (value === '1') {
        this.hasCommissionTaminOrgan = true;
      } else {
        this.hasCommissionTaminOrgan = false;
      }
    });

    this.hospitalizationHistoryForm.get('hospitalizedProvinceCode').valueChanges.subscribe(value => {
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
            this.hospitalCityList = data;
            this.hospitalizationHistoryForm.get('hospitalizedCityCode')
              .setValue(this.hospitalizationHistoryForm.value.hospitalizedCityCode);
          }).catch(reason => {
          this.hospitalCityList = [];
        });
      } else {
        this.hospitalCityList = [];
      }
    });

    this.diseaseForm.get('doctorInfoId').valueChanges.subscribe(value => {
      if (this.inactive) {
        return;
      }
      if (this.diseaseForm.get('doctorInfoId').valid) {
        this.restService.getAll(`${Urls.MedicalCommitteeDoctorSource}/${value}`)
          .then(response => {
            if (response.data !== undefined && response.data != null) {
              this.diseaseForm.get('mainDoctorFirstName').setValue(response.data.doctorFirstName);
              this.diseaseForm.get('mainDoctorLastName').setValue(response.data.doctorLastName);
              this.diseaseForm.get('mainDoctorSpeciality')
                .setValue(response.data.committeeDoctorSpecialitySource.specialityDesc);
              this.doctorInfoIdTemp = '';
              this.lockFirstOrgunIdentity = true;
            } else {
              throw new Error();
            }
          })
          .catch(error => {
            if (!this.inactive) {
              this.diseaseForm.get('mainDoctorFirstName').setValue('');
              this.diseaseForm.get('mainDoctorLastName').setValue('');
              this.diseaseForm.get('mainDoctorSpeciality').setValue('');
            }
            this.doctorInfoIdTemp = value;
            this.lockFirstOrgunIdentity = false;
          });
      }
    });

    this.doctorHistoryForm.get('doctorOrganNumber').valueChanges.subscribe(value => {
      if (this.inactive) {
        return;
      }
      if (this.doctorHistoryForm.get('doctorOrganNumber').valid) {
        this.restService.getAll(`${Urls.MedicalCommitteeDoctorSource}/${value}`)
          .then(response => {
            if (response.data !== undefined && response.data != null) {
              this.doctorHistoryForm.get('doctorFirstName').setValue(response.data.doctorFirstName);
              this.doctorHistoryForm.get('doctorLastName').setValue(response.data.doctorLastName);
              this.doctorHistoryForm.get('doctorSpecialty')
                .setValue(response.data.committeeDoctorSpecialitySource.specialityDesc);
              this.doctorOrganNumberTemp = '';
              this.lockSecondOrgunIdentity = true;
            } else {
              throw new Error();
            }
          })
          .catch(error => {
            if (!this.inactive) {
              this.doctorHistoryForm.get('doctorFirstName').setValue('');
              this.doctorHistoryForm.get('doctorLastName').setValue('');
              this.doctorHistoryForm.get('doctorSpecialty').setValue('');
            }
            this.doctorOrganNumberTemp = value;
            this.lockSecondOrgunIdentity = false;
          });
      }
    });
  }

  /* On HospitalizationHistory Form Submission */
  addHospitalizationHistory() {
    this.hospitalDocModal.hide();
    this.hospitalizationFormValidationError = false;
    const missingStatus = this.checkHospitalMissImagesStatus();
    this.hospitalDateCheck();
    if (!this.hospitalizationHistoryForm.touched || !this.hospitalizationHistoryForm.valid) {
      this.hosHistoryGalleryMissing = missingStatus;
      this.hospitalizationFormValidationError = true;
      this.markFormGroupAsTouched(this.hospitalizationHistoryForm);
      return;
    }

    const obj = {};
    Object.keys(this.hospitalizationHistoryForm.value).map(control => {
      obj[control] = this.hospitalizationHistoryForm.get(control).value;
    });

    // delete obj['hospitalizedProvinceCode'];

    if (this.hospitalHDataGridEditIndex !== -1) {
      // Edit Mode
      obj['index'] = this.hospitalHDataGridEditIndex;
      this.diseaseModel.hospitalizationHistoryList[this.hospitalHDataGridEditIndex] = obj;
    } else {
      // New Mode
      obj['index'] = this.diseaseModel.hospitalizationHistoryList.length;
      this.diseaseModel.hospitalizationHistoryList.push(obj);
    }

    this.hospitalHDataGrid.dataItems = this.diseaseModel.hospitalizationHistoryList;
    this.hospitalCityList = [];
    this.documentForm.reset();
    this.hospitalizationHistoryForm.reset();
    this.hospitalHDataGridEditIndex = -1;
  }

  finishedHosHistoryDocs() {
    this.hospitalDocModal.hide();
    this.hospitalizationFormValidationError = false;
    const missingStatus = this.checkHospitalMissImagesStatus();
    if (missingStatus) {
      this.hosHistoryGalleryMissing = missingStatus;
      return;
    }

    const documentList = Array(0);
    for (const image of this.hospitalizationHistoryGallery.images) {
      documentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid,
      });
    }

    const obj = this.hospitalHDataGrid.dataItems[this.hospitalHDataGridEditIndex];
    obj['committeeRequestInfoHospitalDocumentList'] = documentList;
    obj['gallery'] = this.hospitalizationHistoryGallery.images;

    // Edit Mode
    obj['index'] = this.hospitalHDataGridEditIndex;
    this.diseaseModel.hospitalizationHistoryList[this.hospitalHDataGridEditIndex] = obj;

    this.hospitalizationHistoryGallery.clearImages();
    this.hospitalHDataGridEditIndex = -1;
  }

  /* On doctorHistory Form Submission */
  addDoctorHistory() {
    this.doctorFormValidationError = false;
    const missingStatus = this.doctorHistoryGallery.images.length === 0 || !this.doctorHistoryGallery.areAllImagesUploaded();
    if (!this.doctorHistoryForm.touched || !this.doctorHistoryForm.valid
      || missingStatus) {
      this.doctorHistoryGalleryMissing = missingStatus;
      this.doctorFormValidationError = true;
      this.markFormGroupAsTouched(this.doctorHistoryForm);
      return;
    } else {
      const item = this.diseaseModel.doctorHistoryList.find(value => {
        return value.doctorOrganNumber === this.doctorHistoryForm.get('doctorOrganNumber').value;
      });
      if (item) {
        this.doctorHistoryForm.get('doctorOrganNumber').reset();
        this.doctorHistoryForm.get('doctorOrganNumber').markAsTouched();
        this.doctorFormValidationError = true;
        this.showInfoMessageBox('پیام سیستم', 'پزشک معالج تکراری می باشد.');
        return;
      }
    }

    const documentList = Array(0);
    for (const image of this.doctorHistoryGallery.images) {
      documentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid,
      });
    }

    const obj = {};
    Object.keys(this.doctorHistoryForm.value).map(control => {
      obj[control] = this.doctorHistoryForm.get(control).value;
    });
    obj['committeeRequestInfoDoctorDocumentList'] = documentList;
    obj['gallery'] = this.doctorHistoryGallery.images;

    if (this.doctorHDataGridEditIndex !== -1) {
      obj['index'] = this.doctorHDataGridEditIndex;
      this.diseaseModel.doctorHistoryList[this.doctorHDataGridEditIndex] = obj;
    } else {
      obj['index'] = this.diseaseModel.doctorHistoryList.length;
      this.diseaseModel.doctorHistoryList.push(obj);
    }
    if (this.doctorOrganNumberTemp !== '') {
      obj['doctorOrganNumber'] = '';
      obj['doctorOrganNumberTemp'] = this.doctorOrganNumberTemp;
    }
    this.doctorHDataGrid.dataItems = this.diseaseModel.doctorHistoryList;
    this.doctorOrganNumberTemp = '';
    this.doctorHistoryForm.reset();
    this.doctorHistoryGallery.clearImages();
    this.doctorHDataGridEditIndex = -1;
  }

  get stageValidateAndSave() {
    this.diseaseFormValidationError = false;
    if (!this.historyForm.value.hasOtherDarmanBoolean) {
      this.historyForm.get('otherDarmanDesc').setValue(' ');
    }
    const missingStatus = this.checkImagesMissingStatus(); /*false;*/
    if (!this.diseaseForm.valid || !this.historyForm.valid || missingStatus) {
      // Marking Main Form
      this.markFormGroupAsTouched(this.diseaseForm);
      this.markFormGroupAsTouched(this.historyForm);
      this.diseaseFormValidationError = true;
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      this.formError.emit();
      return false;
    }
    this.mainModel.profileGalleryImages = this.profileGallery.images;
    this.diseaseModel.diseaseGalleryImages = this.diseaseGallery.images;
    this.diseaseModel.taminCommissionGalleryImages = this.taminCommissionGallery.images;
    this.diseaseModel.diseaseForm = this.diseaseForm;
    this.diseaseModel.historyForm = this.historyForm;
    return true;
  }

  /* Upload Files */
  uploadDiseaseFile() {
    this.diseaseGallery.selectImage('گواهی پزشک معالج', '39');
    this.diseaseGalleryMissing = false;
  }

  uploadProfileFile() {
    this.profileGallery.selectImage('عکس پرسنلی', '45');
  }

  uploadTaminCommissionFile() {
    this.taminCommissionGallery.selectImage('شرکت در کمیسیون پزشکی سازمان تامین اجتماعی', '44');
    this.taminCommissionGalleryMissing = false;
  }

  uploadHospitalizationFile() {
    if (!this.documentForm.value.selectedItem || this.documentForm.value.selectedItem === '') {
      this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
      return;
    }
    this.hosHistoryGalleryMissing = false;
    this.hospitalizationHistoryGallery.selectImage(this.hospitalDocTypeTranslator(this.documentForm.value.selectedItem),
      this.documentForm.value.selectedItem);
  }

  uploadDoctorFile() {
    this.doctorHistoryGallery.selectImage('پزشکان معالج', '72');
    this.doctorHistoryGalleryMissing = false;
  }

  /* Hospitalization History Data Grid */
  private initializeHospitalHDataGrid() {
    this.hospitalHDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'hospitalName', columnCaption: 'نام بیمارستان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'hospitalizedStartDate', columnCaption: 'تاریخ شروع بستری', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'hospitalizedEndDate', columnCaption: 'تاریخ خاتمه بستری', columnViewType: DataColumnViewType.PersianDate})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'download',
        columnCaption: 'دانلود فرم درخواست پرونده بستری',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'download',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'upload',
        columnCaption: 'بارگذاری مدارک',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'upload',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();

    this.hospitalHDataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      result.push(actionCells.find(c => c.columnActionName === 'download'));
      result.push(actionCells.find(c => c.columnActionName === 'upload'));
      return result;
    };
  }

  onHospitalAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.hospitalizationHistoryForm.get('hospitalizedProvinceCode').setValue(param.item.hospitalizedProvinceCode);
        this.hospitalizationHistoryForm.get('hospitalizedCityCode').setValue(param.item.hospitalizedCityCode);
        this.hospitalizationHistoryForm.get('hospitalName').setValue(param.item.hospitalName);
        this.hospitalizationHistoryForm.get('hospitalizedStartDate').setValue(param.item.hospitalizedStartDate);
        this.hospitalizationHistoryForm.get('hospitalizedEndDate').setValue(param.item.hospitalizedEndDate);
        // this.hospitalizationHistoryGallery.images = param.item.gallery === undefined ? Array(0) : param.item.gallery;
        this.hospitalHDataGridEditIndex = param.item.index;
        this.hospitalizationHistoryForm.markAsTouched();
        this.hospitalizationFormValidationError = false;
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
          this.diseaseModel.hospitalizationHistoryList.splice(param.item.index, 1);
          let newIndex = 0;
          this.diseaseModel.hospitalizationHistoryList.forEach((object: any) => {
            object.index = newIndex;
            newIndex++;
          });
        }, () => {
        });
        break;
      case 'download':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadHospitalFormPdfDesktop(this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, param.item.hospitalName, this.diseaseForm.value.requestNumber,
            this.mainModel.demandInfoId, param.item.index, this);
        } else {
          this.pdfFormGenerator.downloadHospitalFormPdfMobile(this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, param.item.hospitalName, this.diseaseForm.value.requestNumber,
            this.mainModel.demandInfoId, param.item.index, this);
        }
        break;
      case 'upload':
        this.hospitalHDataGridEditIndex = param.item.index;
        this.hosDocTypeCombo.dataItems = Array(0);
        this.hosDocTypeCombo.dataItems = [
          {'title': `برگ پذيرش و خلاصه ترخیص (بیمارستان ${param.item.hospitalName})`, 'tag': '164'},
          {'title': `برگ شرح حال و معاینه بدنی (بیمارستان ${param.item.hospitalName})`, 'tag': '161'},
          {'title': `برگ خلاصه پرونده (بیمارستان ${param.item.hospitalName})`, 'tag' : '162'},
          {'title': `برگ گزارش عمل جراحی (در صورت وجود) (بیمارستان ${param.item.hospitalName})`, 'tag': '163'},
        ];
        if (param.item.committeeRequestInfoHospitalDocumentList) {
          param.item.committeeRequestInfoHospitalDocumentList.forEach(item => {
            this.hospitalizationHistoryGallery.downloadImage(item.documentFileId,
              this.hospitalDocTypeTranslator(item.documentTypeId), item.documentTypeId, '0', true,
              item.documentTypeId);
            this.onInsertImage(this.hospitalizationHistoryGallery.images, '', 20);
          });
        }
        this.hospitalDocModal.show();
        break;
    }
  }

  /* Doctor History Data Grid */
  private initializeDoctorHDataGrid() {
    this.doctorHDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'doctorFirstName', columnCaption: 'نام پزشک معالج', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorLastName', columnCaption: 'نام خانوادگی پزشک معالج', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorSpecialty', columnCaption: 'تخصص پزشک معالج', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorOrganNumber', columnCaption: 'شماره نظام پزشکی', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();

    this.doctorHDataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'doctorOrganNumber' && item.doctorOrganNumber === '') {
        return {handled: true, data: item.doctorOrganNumberTemp};
      }
      return {handled: false, data: ''};
    };

    this.doctorHDataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      return result;
    };
  }

  onDoctorAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.inactive = true;
        this.doctorHistoryForm.get('doctorFirstName').setValue(param.item.doctorFirstName);
        this.doctorHistoryForm.get('doctorLastName').setValue(param.item.doctorLastName);
        this.doctorHistoryForm.get('doctorSpecialty').setValue(param.item.doctorSpecialty);
        this.doctorHistoryForm.get('doctorOrganNumber').setValue(param.item.doctorOrganNumber);
        this.doctorHistoryGallery.images = param.item.gallery === undefined ? Array(0) : param.item.gallery;
        this.doctorHDataGridEditIndex = param.item.index;
        this.doctorHistoryForm.markAsTouched();
        this.doctorFormValidationError = false;
        this.doctorHistoryGalleryMissing = false;
        this.inactive = false;
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
          this.diseaseModel.doctorHistoryList.splice(param.item.index, 1);
          let newIndex = 0;
          this.diseaseModel.doctorHistoryList.forEach((object: any) => {
            object.index = newIndex;
            newIndex++;
          });
        }, () => {
        });
        break;
    }
  }

  private initializeProvince() {
    this.hospitalProvince.valueField = 'provinceCode';
    this.hospitalProvince.displayField = 'provinceName';
    this.hospitalProvince.searchPattern = '*{term}*%';
    this.hospitalProvince.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.MedicalCommitteeProvince)
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

  onRemoveImage(imageList: Array<any>, tag: string, max: Number) {
    this.maxUploadValidation(imageList, tag, max);
  }

  onInsertImage(imageList: Array<any>, tag: string, max: Number) {
    this.maxUploadValidation(imageList, tag, max);
  }

  private maxUploadValidation(imageList, tag, max) {
    switch (tag) {
      case '39':
        this.diseaseUploadExceed = imageList.length === max;
        break;
      case '45':
        this.profileUploadExceed = imageList.length === max;
        break;
      case '44':
        this.taminCommissionUploadExceed = imageList.length === max;
        break;
      case '72':
        this.doctorHistoryUploadExceed = imageList.length === max;
        break;
      default:
        this.doctorHistoryUploadExceed = imageList.length === max;
        if (this.doctorHistoryUploadExceed) {
          this.showInfoMessageBox('پیام سیستم', `بارگذاری مدارک بیشتر از ${max} برگ مجاز نمیباشد`);
        }
    }
  }

  /* Image Validation Method */
  private checkImagesMissingStatus() {
    this.diseaseGalleryMissing = false;
    let missDoc = false;

    if (this.diseaseGallery.images.length === 0
      || !this.diseaseGallery.areAllImagesUploaded()) {
      this.diseaseGalleryMissing = true;
      missDoc = true;
    }

    if (this.hasCommissionTaminOrgan && (this.taminCommissionGallery.images.length === 0
      || !this.taminCommissionGallery.areAllImagesUploaded())) {
      this.taminCommissionGalleryMissing = true;
      missDoc = true;
    }

    return missDoc;
  }

  private hospitalDateCheck() {
    const now = new Date().getTime();
    if (this.hospitalizationHistoryForm.get('hospitalizedStartDate').value > now
      || this.hospitalizationHistoryForm.get('hospitalizedStartDate').value > this.hospitalizationHistoryForm.get('hospitalizedEndDate').value) {
      this.hospitalizationHistoryForm.get('hospitalizedStartDate').reset();
    }
    if (this.hospitalizationHistoryForm.get('hospitalizedEndDate').value > now) {
      this.hospitalizationHistoryForm.get('hospitalizedEndDate').reset();
    }
  }

  downloadForm4PDF() {
    if (!this.mainModel.stageOneFormOne.value.commNationalCode || !this.mainModel.stageOneFormOne.value.commBirthDate
      || !this.diseaseForm.controls.mainDoctorFirstName.valid || !this.diseaseForm.controls.mainDoctorLastName.valid
      || !this.diseaseForm.controls.mainDoctorSpeciality.valid || !this.diseaseForm.controls.doctorInfoId.valid) {
      this.showErrorMessageBox('پیام سیستم', 'اطلاعات تکمیل نشده');
      this.diseaseForm.controls.mainDoctorFirstName.markAsTouched();
      this.diseaseForm.controls.mainDoctorLastName.markAsTouched();
      this.diseaseForm.controls.mainDoctorSpeciality.markAsTouched();
      return;
    }

    const searchParams: Array<SearchParam> = [];
    const searchCommNationalCode = new SearchParam();
    searchCommNationalCode.property = 'commNationalCode';
    searchCommNationalCode.operator = SearchOperator.EQUAL;
    searchCommNationalCode.value = this.mainModel.stageOneFormOne.value.commNationalCode;
    searchParams.push(searchCommNationalCode);

    const searchDemandInfoId = new SearchParam();
    searchDemandInfoId.property = 'demandIdInfo';
    searchDemandInfoId.operator = SearchOperator.EQUAL;
    searchDemandInfoId.value = this.mainModel.demandInfoId.toString();
    searchParams.push(searchDemandInfoId);

    const restMedicalCommitteeCase = this.restService.getAll(Urls.MedicalCommitteeCheckProfileImage, searchParams);
    this.overlay = this.showOverlay();
    restMedicalCommitteeCase.then(response => {
      if (response.data == null) {
        this.hideOverlay(this.overlay);
        this.profileUploadModal.show();
      } else {
        this.hideOverlay(this.overlay);
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm4PdfDesktop(this.diseaseForm.value.requestNumber, this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, this.diseaseForm.value.mainDoctorFirstName,
            this.diseaseForm.value.mainDoctorLastName, this.diseaseForm.value.mainDoctorSpeciality,
            this.mainModel.demandInfoId, this);
        } else {
          this.pdfFormGenerator.downloadForm4PdfMobile(this.diseaseForm.value.requestNumber, this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, this.diseaseForm.value.mainDoctorFirstName,
            this.diseaseForm.value.mainDoctorLastName, this.diseaseForm.value.mainDoctorSpeciality,
            this.mainModel.demandInfoId, this);
        }
        this.profileGallery.images = Array(0);
        this.onRemoveImage(this.profileGallery.images, '45', 1);
      }
    }).catch(error => {
      this.hideOverlay(this.overlay);
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });
  }

  hideModalAndSave() {
    if (this.profileGallery.images.length === 0
      || !this.profileGallery.areAllImagesUploaded()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا عکس پرسنلی متقاضی را بارگذاری نمایید.');
      return;
    }

    const demandJson: any = {};
    demandJson.committeeDemandInfoDocumentList = Array(0);
    demandJson.demandInfoId = this.mainModel.demandInfoId.toString();
    demandJson.demandStage = 3;

    for (const image of this.profileGallery.images) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    this.overlay = this.showOverlay();
    return this.restService.update(Urls.MedicalCommitteeEditData, this.mainModel.demandInfoId.toString(), demandJson)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.profileUploadModal.hide();
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm4PdfDesktop(this.diseaseForm.value.requestNumber, this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, this.diseaseForm.value.mainDoctorFirstName,
            this.diseaseForm.value.mainDoctorLastName, this.diseaseForm.value.mainDoctorSpeciality,
            this.mainModel.demandInfoId, this);
        } else {
          this.pdfFormGenerator.downloadForm4PdfMobile(this.diseaseForm.value.requestNumber, this.mainModel.stageOneFormOne.value.commNationalCode,
            this.mainModel.stageOneFormOne.value.commBirthDate, this.diseaseForm.value.mainDoctorFirstName,
            this.diseaseForm.value.mainDoctorLastName, this.diseaseForm.value.mainDoctorSpeciality,
            this.mainModel.demandInfoId, this);
        }
        this.profileGallery.images = Array(0);
        this.onRemoveImage(this.profileGallery.images, '45', 1);
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        if (error && error.error && error.error.data && error.error.data.message) {
          this.showInfoMessageBox('پیام سیستم', error.error.data.message);
        } else {
          this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        }
      });
  }

  hospitalDocTypeTranslator(item) {
    switch (item) {
      case '161':
        return 'برگ شرح حال و معاینه بدنی';
      case '162':
        return 'برگ خلاصه پرونده';
      case '163':
        return 'برگ گزارش عمل جراحی';
      case '164':
        return 'برگ پذيرش و خلاصه ترخیص';
      default:
        return '';
    }
  }

  private checkHospitalMissImagesStatus() {
    this.hosHistoryGalleryMissing = false;
    if (!this.hospitalizationHistoryGallery.areAllImagesUploaded()
      /*|| this.hosDocTypeCombo.dataItems.length === 0*/) {
      return true;
    }
    /*for (const documentItem of this.hosDocTypeCombo.dataItems) {
      if (documentItem.tag === '163') {
        continue;
      }
      const images = this.hospitalizationHistoryGallery.images.filter(item => {
        return (item.tag === documentItem.tag);
      });
      this.hosHistoryGalleryMissing = images.length === 0;
    }*/

    return this.hosHistoryGalleryMissing;
  }
}
