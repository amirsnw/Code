import {Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {CommitteeModel} from '../../committee-model';
import {DiseaseModel} from '../disease-model';
import {StageThreeFormGeneratorService} from '../../form-downloader.service';

@Component({
  selector: 'app-stage-three-document-medical-committee',
  templateUrl: './committee-stage-three-document.component.html',
  styleUrls: ['../../main-committee/main-committee.component.css'],
})
export class CommitteeStageThreeDocumentComponent extends TaminPageBaseComponent {

  public overlay: any;

  /* Forms */
  documentForm: FormGroup;

  /* Gallery Items */
  @ViewChild('documentGallery') documentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('uploadModal') uploadModal: TaminModalComponent;
  @ViewChild('uploadTypeCombo') uploadTypeCombo: TaminFieldComboBoxStaticComponent;

  documentGalleryMissing: boolean;

  /* Data diseaseModel */
  @Input() mainModel: CommitteeModel;
  @Input() diseaseModel: DiseaseModel;
  @Output() formError = new EventEmitter();

  /* Constructor */
  constructor(injector: Injector, private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {

    this.uploadModal.hide();
    this.documentGalleryMissing = false;

    /* Initializing Forms */
    this.documentForm = this.formBuilder.group({
      bloodTest: [false, ],
      angiography: [false, ],
      CTScan: [false, ],
      sonography: [false, ],
      earTape: [false, ],
      outpatientRecords: [false, ],
      MRI: [false, ],
      lungTape: [false, ],
      echo: [false, ],
      muscleTape: [false, ],
      otherMedicalRecords: [false, ],
      graphics: [false, ],
      pathologyReport: [false, ],
      writtenRequest: [false, ],
      selectedType: ['', ]
    });
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
    /* Download - Upload Address */
    this.documentGallery.saveUrl = Urls.UploadImage;
    this.initSubscribes();
    this.documentForm.reset();
  }

  initSubscribes() {
    this.documentForm.get('outpatientRecords').valueChanges.subscribe(value => {
      if (!value && this.mainModel.nintyOneChecked) {
        this.documentForm.get('outpatientRecords').setValue(true);
      }
    });
  }

  /* Upload Files */
  uploadDocument() {
    if (this.documentForm.value.selectedType === undefined || this.documentForm.value.selectedType === '') {
      this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
      return;
    }
    this.documentGallery.selectImage(this.documentTypeTranslator(this.documentForm.value.selectedType),
      this.documentForm.value.selectedType);
  }

  get stageValidateAndSave() {
    if (this.checkImagesMissingStatus()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      this.formError.emit();
      return false;
    }
    this.diseaseModel.documentGalleryImages = this.documentGallery.images;
    this.diseaseModel.documentForm = this.documentForm;
    this.formError.emit();
    return true;
  }

  /* Image Validation Method */
  private checkImagesMissingStatus() {
    this.documentGalleryMissing = false;

    const typeList = Object.keys(this.documentForm.controls).filter(key => {
      return this.documentForm.get(key).value === true;
    });

    for (const typeName of typeList) {
      const typeObject = this.documentNameTranslator(typeName);
      const images = this.documentGallery.images.filter(item => {
        return item.tag === typeObject.tag;
      });
      if (this.documentForm.value[typeName] && (images.length === 0
        || !this.documentGallery.areAllImagesUploaded())) {
        this.documentGalleryMissing = true;
        return true;
      }
    }
    return false;
  }

  showModal() {
    this.uploadTypeCombo.dataItems = Array(0);
    if (this.mainModel.nintyOneChecked) {
      this.documentForm.get('outpatientRecords').setValue(true);
    }
    this.documentForm.get('selectedType').setValue('');
    const typeList = Object.keys(this.documentForm.controls).filter(key => {
      return this.documentForm.get(key).value === true;
    });

    for (const typeName of typeList) {
      this.uploadTypeCombo.dataItems.push(this.documentNameTranslator(typeName));
    }
    this.uploadTypeCombo.dataItems.push(this.documentNameTranslator('otherMedicalRecords'));

    this.uploadModal.show();
  }

  hideModal() {
    if (this.checkImagesMissingStatus()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }
    this.uploadModal.hide();
  }

  documentTypeTranslator(item) {
    switch (item) {
      case '79':
        return 'آزمایش خون';
      case '67':
        return 'آنژیوگرافی';
      case '48':
        return 'سی تی اسکن';
      case '54':
        return 'سونوگرافی';
      case '52':
        return 'نوار گوش';
      case '128':
        return 'مدارک بیمارستانی بستری و سرپایی';
      case '49':
        return 'ام آر آی';
      case '87':
        return 'نوار ریه';
      case '50':
        return 'اکو';
      case '60':
        return 'نوار عضله';
      case '86':
        return 'سایر مدارک پزشکی';
      case '47':
        return 'گرافی';
      case '66':
        return 'گزارش پاتولوژی';
      default:
        return '';
    }
  }

  documentNameTranslator(item): any {
    switch (item) {
      case 'bloodTest':
        return {
          title: 'آزمایش خون',
          tag: '79'
        };
      case 'angiography':
        return {
          title: 'آنژیوگرافی',
          tag: '67'
        };
      case 'CTScan':
        return {
          title: 'سی تی اسکن',
          tag: '48'
        };
      case 'sonography':
        return {
          title: 'سونوگرافی',
          tag: '54'
        };
      case 'earTape':
        return {
          title: 'نوار گوش',
          tag: '52'
        };
      case 'outpatientRecords':
        return {
          title: 'مدارک بیمارستانی بستری و سرپایی',
          tag: '128'
        };
      case 'MRI':
        return {
          title: 'ام آر آی',
          tag: '49'
        };
      case 'lungTape':
        return {
          title: 'نوار ریه',
          tag: '87'
        };
      case 'echo':
        return {
          title: 'اکو',
          tag: '50'
        };
      case 'muscleTape':
        return {
          title: 'نوار عضله',
          tag: '60'
        };
      case 'otherMedicalRecords':
        return {
          title: 'سایر مدارک پزشکی',
          tag: '86'
        };
      case 'graphics':
        return {
          title: 'گرافی',
          tag: '47'
        };
      case 'pathologyReport':
        return {
          title: 'گزارش پاتولوژی',
          tag: '66'
        };
      default:
        return '';
    }
  }
}
