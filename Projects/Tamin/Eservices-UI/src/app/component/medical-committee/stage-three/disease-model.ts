import {FormGroup} from '@angular/forms';

export class DiseaseModel {

  pastItem: any;

  diseaseForm: FormGroup;
  historyForm: FormGroup;
  documentForm: FormGroup;

  diseaseGalleryImages: any;
  taminCommissionGalleryImages: any;
  documentGalleryImages: any;

  diseaseUploadExceed: boolean;
  hospitalizationUploadExceed: boolean;
  doctorUploadExceed: boolean;

  documentUploadExceed: boolean;

  /* Other Properties */
  mainDocumentFileList: any[];
  hospitalizationHistoryList: any[];
  doctorHistoryList: any[];

  constructor() {
    this.mainDocumentFileList = Array(0);
    this.hospitalizationHistoryList = Array(0);
    this.doctorHistoryList = Array(0);
  }
}
