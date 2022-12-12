import {FormGroup} from '@angular/forms';

export class CommitteeModel {

  demandInfoId: number;
  gridItem: any;

  demandStage: number;
  formCase: number;

  stageOneFormOne: FormGroup;
  stageOneFormTwo: FormGroup;
  stageOneFormThree: FormGroup;
  stageOneFormFour: FormGroup;
  stageOneFormFive: FormGroup;

  commResidenceCityCode: string;

  stageTwoForm: FormGroup;

  divanGalleryImages: any;
  visitBeforeJobGalleryImages: any;
  visitInJobGalleryImages: any;
  expertJobGalleryImages: any;
  contractGalleryImages: any;
  healthyCertificateGalleryImages: any;
  drivingCertificateGalleryImages: any;
  militaryDutyGalleryImages: any;
  pendingMilitaryDutyGalleryImages: any;
  profileGalleryImages: any;

  divanUploadExceed: boolean;
  visitBeforeJobUploadExceed: boolean;
  visitInJobUploadExceed: boolean;
  expertJobUploadExceed: boolean;
  contractUploadExceed: boolean;
  healthyCertificateUploadExceed: boolean;
  drivingCertificateUploadExceed: boolean;
  militaryDutyUploadExceed: boolean;
  pendingMilitaryDutyUploadExceed: boolean;

  /* Other Properties */
  committeeDocumentStageTwoList: any[];
  hospitalizationHistoryList: any[];
  doctorHistoryList: any[];

  hasMedicalTest: boolean;
  hasSkillCard: boolean;
  hasEmploymentOrder: boolean;
  hasHealthCert: boolean;
  hasDrivingLicense: boolean;
  finishedMilitaryDutyStatus: boolean;
  isMainInsured: boolean;
  gender: string;
  form4CheckStatus: boolean;
  reviewCheckStatus: boolean;

  nintyOneChecked: boolean;
  militaryDutyDisable: boolean;
  form4DownloadDisable: boolean;
  isFamily: boolean;
  isFortyPercent: boolean;
  noEmployee: boolean;

  firstStageDone: boolean;
  secondStageDone: boolean;

  lockIdentity: boolean;

  diseaseAdded: boolean;

  constructor() {
    this.gridItem = {};
    this.demandStage = 0 ;

    this.divanUploadExceed = false;
    this.visitBeforeJobUploadExceed = false;
    this.expertJobUploadExceed = false;
    this.contractUploadExceed = false;
    this.healthyCertificateUploadExceed = false;
    this.drivingCertificateUploadExceed = false;
    this.militaryDutyUploadExceed = false;
    this.pendingMilitaryDutyUploadExceed = false;

    this.hasMedicalTest = false;
    this.hasSkillCard = false;
    this.hasEmploymentOrder = false;
    this.hasHealthCert = false;
    this.hasDrivingLicense = false;
    this.finishedMilitaryDutyStatus = false;
    this.isMainInsured = false;
    this.form4CheckStatus = false;
    this.reviewCheckStatus = false;

    this.committeeDocumentStageTwoList = Array(0);
    this.hospitalizationHistoryList = Array(0);
    this.doctorHistoryList = Array(0);

    this.firstStageDone = false;
    this.secondStageDone = false;

    this.nintyOneChecked = false;
    this.isFortyPercent = false;
    this.lockIdentity = false;

    this.diseaseAdded = false;
  }
}
