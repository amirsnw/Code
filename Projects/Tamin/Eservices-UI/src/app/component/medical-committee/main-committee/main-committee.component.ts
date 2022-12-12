import {ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, Type, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {CommitteeStageTwoComponent} from '../stage-two/committee-stage-two.component';
import {CommitteeCaseOneComponent} from '../stage-one/case-one/committee-case-one.component';
import {CommitteeCaseTwoComponent} from '../stage-one/case-two/committee-case-two.component';
import {CommitteeCaseThreeComponent} from '../stage-one/case-three/committee-case-three.component';
import {CommitteeCaseFourComponent} from '../stage-one/case-four/committee-case-four.component';
import {DCDirective} from '../mc-directive/dc.directive';
import {CommitteeModel} from '../committee-model';
import {Urls} from '../../../settings/urls';
import {CommitteeStageThreeMainComponent} from '../stage-three/committee-stage-three-main.component';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StageThreeFormGeneratorService} from '../form-downloader.service';
import {AppHelper} from '../../../settings/app-helper';
import {CommitteeIntroQuestionComponent} from '../intro-question/committee-intro-question.component';
import {CommitteeDemandGridComponent} from '../demand-grid/committee-demand-grid.component';
import {CommitteeModelHandlerService} from '../committee-model-handler.service';
import * as momentNs from 'jalali-moment';


class CommitteeItem {
  constructor(public component: Type<any>, public data: CommitteeModel, public response: any) {
  }
}

@Component({
  selector: 'app-main-medical-committee',
  templateUrl: './main-committee.component.html',
  styleUrls: ['./main-committee.component.css']
})
export class MainCommitteeComponent extends TaminPageBaseComponent {

  private overlay: any;
  public mobileSize: boolean;
  private _stage: number;
  private _case: number;
  private looper;

  /* Forms */
  checkForm: FormGroup;
  documentForm: FormGroup;

  isSSO: boolean;
  ssoNationalCode: string;
  ssoTicket: string;

  dateOfRelation: string;

  showMainDownloader: boolean;
  showDownloader: boolean;

  /* Gallery Items */
  @ViewChild('finalDocumentGallery') finalDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('missMainDocumentGallery') missMainDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('missDocumentGallery') missDocumentGallery: TaminImageGalleryManagedComponent;

  /* Modal Items */
  @ViewChild('theAgreementModal') theAgreementModal: TaminModalComponent;
  @ViewChild('finalUploadModal') finalUploadModal: TaminModalComponent;

  /* Combo Items */
  @ViewChild('uploadTypeCombo') uploadTypeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('mainDocTypeCombo') mainDocTypeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('docTypeCombo') docTypeCombo: TaminFieldComboBoxStaticComponent;

  missMainDocumentGalleryMissing: boolean;
  missDocumentGalleryMissing: boolean;
  finalDocumentGalleryMissing: boolean;

  dataOut: any;
  model: CommitteeModel;
  componentRef: any;
  stageMax: number;
  showDemandGrid: boolean;
  diseaseAdded: boolean;
  finalDocumentCheckMissing: boolean;

  get allowSubmit() {
    const reviewCheck = this.model.isFamily ? true : this.checkForm.value.reviewCheck;
    return !(reviewCheck && this.checkForm.value.noOtherRequest && this.checkForm.value.documentCheck
      && this.model.gridItem.committeeRequestInfoList.length !== 0);
  }

  @ViewChild(DCDirective) dcDirective: DCDirective;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetector: ChangeDetectorRef, private activeRoute: ActivatedRoute, private router: Router,
              private pdfFormGenerator: StageThreeFormGeneratorService, private modelHandler: CommitteeModelHandlerService) {
    super(injector);
    window['alertify'].defaults.closable = false;
    this.model = this.modelHandler.resetModel();
    changeDetector.detach();
    this.looper = setInterval(() => {
      try {
        this.changeDetector.checkNoChanges();
      } catch (err) {
        this.changeDetector.detectChanges();
      }
    }, 200);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.mobileSize = window.screen.width <= 767 ? true : false;
    this.finalDocumentGalleryMissing = false;
    this.missMainDocumentGalleryMissing = false;
    this.missDocumentGalleryMissing = false;
    this.finalDocumentCheckMissing = false;
    this.diseaseAdded = false;
    this.checkForm = this.formBuilder.group({
      noOtherRequest: [false, ],
      reviewCheck: [false, ],
      documentCheck: [false, ],
    });

    this.documentForm = this.formBuilder.group({
      selectedItem: ['', ],
      selectedItem2: ['', ]
    });
  }

  /* Loads After Page Render */
  loadPageData() {
    if (this.activeRoute.snapshot.data.nationalCode !== undefined
      && this.activeRoute.snapshot.data.ticket !== undefined) {
      this.isSSO = true;
      this.ssoNationalCode = this.activeRoute.snapshot.data.nationalCode;
      this.ssoTicket = this.activeRoute.snapshot.data.ticket;
    } else {
      if (this.router.url.includes('sso/medical-committee')) {
        this.redirectTo('sso/medical-committee');
      }
    }

    this.documentForm.get('selectedItem').valueChanges.subscribe(value => {
      const doc = this.mainDocTypeCombo.dataItems.find(item => item.id === value);
      if (!doc) {
        this.showMainDownloader = false;
        return;
      }
      switch (doc.type) {
        case '158':
        case '157':
        case '152':
        case '25':
          this.showMainDownloader = true;
          break;
        default:
          this.showMainDownloader = false;
      }
    });

    this.documentForm.get('selectedItem2').valueChanges.subscribe(value => {
      const doc = this.docTypeCombo.dataItems.find(item => item.id === value);
      if (!doc) {
        this.showDownloader = false;
        return;
      }
      switch (doc.type) {
        case '158':
        case '157':
        case '152':
        case '25':
          this.showDownloader = true;
          break;
        default:
          this.showDownloader = false;
      }
    });

    this.finalDocumentGallery.saveUrl = Urls.UploadImage;
    this.stageMax = 3;
    this.stage = -2;
  }

  set stage(num: number) {
    this._stage = num;
    switch (num) {
      case -1:
        this.model = this.modelHandler.resetModel();
        this.dcDirective.viewContainerRef.clear();
        this.showDemandGrid = true;
        this.displayComponent(CommitteeDemandGridComponent);
        this.componentRef.instance.isSSO = this.isSSO;
        this.componentRef.instance.ssoNationalCode = this.ssoNationalCode;
        this.componentRef.instance.ssoTicket = this.ssoTicket;
        this.componentRef.instance.review.subscribe(
          (status: any) => {
            this.componentRef.instance.review.unsubscribe();
            this.dateOfRelation = this.model.gridItem.baseDate;
            this.stage = 1;
          }
        );
        break;
      case 0:
        this.theAgreementModal.show();
        break;
      case 1:
        this.showDemandGrid = false;
        const moment = momentNs;
        const date = this.dateOfRelation ? moment.from(new Date(this.dateOfRelation).toString(), 'en').locale('fa').format('YYYYMMDD') : undefined;
        const url = date ? Urls.MedicalCommitteeCaseByDate
                    : Urls.MedicalCommitteeCase + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : '');
        const restMedicalCommitteeCase = date ? this.restService.getAll(url, [{value: date, operator: SearchOperator.EQ, property: 'date'}])
                      : this.restService.getAll(url);
        this.overlay = this.showOverlay();
        restMedicalCommitteeCase.then(data => {
          const response = data.data;
          if (response != null) {
            this.dataOut = response;
            const searchParam = new SearchParam();
            searchParam.value = response.brhCode;
            searchParam.operator = SearchOperator.EQ;
            searchParam.property = 'branchCode';

            switch (response.isuStatus) {
              case '01':
                if (response.pensionerId != null) {
                  if (response.relationWithTaminId === '38') {
                    console.log('Form Case: 2');
                    this.model.formCase = 2;
                    this.case = 2;
                    return;
                  }
                }
                console.log('Form Case: 1');
                this.model.formCase = 1;
                this.case = 1;
                return;
              case '02':
                if (response.pensionerId == null) {
                  response.message = 'شما در حال حاضرتحت کفالت بیمه شده اصلی هستید، لطفا از طریق بیمه شده اصلی اقدام به ثبت کمیسیون پزشکی نمایید. و یا بعنوان بیمه شده ی اصلی می توانید به تاریخ گذشته تقاضای خود را ثبت نمایید.';
                  throw response;
                }
                console.log('Form Case: 3');
                this.model.formCase = 3;
                this.case = 3;
                return;
              case '03':
                if (response.pensionerId != null) {
                  console.log('Form Case: 2');
                  this.model.formCase = 2;
                  this.case = 2;
                  return;
                }
                console.log('Form Case: 1');
                this.model.formCase = 1;
                this.case = 1;
                return;
              default:
                if (response.isuStatus == null) {
                  if (response.relationType === '99') {
                    console.log('Form Case: 1');
                    this.model.formCase = 1;
                    this.case = 1;
                    return;
                  } else if (response.relationType === '6') {
                    throw {notEliable: 'شما فاقد رابطه با سازمان تامین اجتماعی می باشید'};
                  }
                }
                throw response;
            }
          } else {
            /*console.log('Form Case: 4');
            this.model.formCase = 4;
            this.case = 4;*/
            throw {retryMessage: 'مجددا تلاش کنید'};
          }
        }).then(done => {
          this.componentRef.instance.lockEmit.subscribe(
            (status: any) => {
              if (status) {
                this.hideOverlay(this.overlay);
                this.changeStage = function () {
                  this.componentRef.instance.lockEmit.unsubscribe();
                  location.href = '/';
                  setTimeout(function () {
                    location.reload();
                  }, 500);
                };
              } else {
                this.hideOverlay(this.overlay);
              }
            }
          );
          this.restService.getAll(Urls.MedicalCommitteeLastDetails).then( result => {
            this.componentRef.instance.historyGridItem = result.data.list.length > 0 ? result.data.list[0] : undefined;
          });
        }).catch(error => {
          this.hideOverlay(this.overlay);
          if (error.retryMessage !== undefined) {
            this.showInfoMessageBox('پیام سیستم', error.retryMessage, () => {
              location.reload();
            });
            return;
          }
          if (error.notEliable !== undefined) {
            this.showInfoMessageBox('پیام سیستم', error.notEliable, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          }
          if (error.error && error.error.data && error.error.data.message) {
            this.showErrorMessageBox('پیام سیستم', error.error.data.message, () => {
              this.redirectTo('/');
              setTimeout(function () {
                location.reload();
              }, 500);
            });
            return;
          }
          if (error.message !== undefined) {
            this.showInfoMessageBox('پیام سیستم', error.message, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
            return;
          }
          this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/');
            setTimeout(function () {
                    location.reload();
                  }, 500);
          });
        });
        break;
      case 2:
        this.displayComponent(CommitteeStageTwoComponent);
        break;
      case 3:
        this.checkForm.reset();
        this.displayComponent(CommitteeStageThreeMainComponent);
        this.componentRef.instance.showGridEvent.subscribe(state => {
          this.diseaseAdded = state;
        });
        break;
      default:
        this.dcDirective.viewContainerRef.clear();
        this.dateOfRelation = undefined;
        this.showDemandGrid = false;
        this.displayComponent(CommitteeIntroQuestionComponent);
        this.componentRef.instance.onPreDemand.subscribe(
          () => {
            this.componentRef.instance.onPreDemand.unsubscribe();
            this.componentRef.instance.onNewDemand.unsubscribe();
            this.componentRef.instance.onPastDemand.unsubscribe();
            this.stage = -1;
          }
        );
        this.componentRef.instance.onPastDemand.subscribe(
          (relDate: any) => {
            this.componentRef.instance.onPreDemand.unsubscribe();
            this.componentRef.instance.onNewDemand.unsubscribe();
            this.componentRef.instance.onPastDemand.unsubscribe();
            this.dateOfRelation = relDate;
            this.stage = 0;
          }
        );
        this.componentRef.instance.onNewDemand.subscribe(
          () => {
            this.componentRef.instance.onPreDemand.unsubscribe();
            this.componentRef.instance.onNewDemand.unsubscribe();
            this.componentRef.instance.onPastDemand.unsubscribe();
            this.stage = 0;
          }
        );
    }
  }

  get stage() {
    return this._stage;
  }

  set case(num: number) {
    switch (num) {
      case 1:
        this.displayComponent(CommitteeCaseOneComponent);
        break;
      case 2:
        this.displayComponent(CommitteeCaseTwoComponent);
        break;
      case 3:
        this.displayComponent(CommitteeCaseThreeComponent);
        break;
      case 4:
        this.displayComponent(CommitteeCaseFourComponent);
        break;
    }
  }

  get case() {
    return this._case;
  }

  displayComponent(component: any) {
    let componentFactory;
    let viewContainerRef;

    const committeeItem = new CommitteeItem(component, this.model, this.dataOut);
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(committeeItem.component);
    viewContainerRef = this.dcDirective.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.dataInput = committeeItem.response;
    this.componentRef.instance.model = committeeItem.data;
  }

  changeStage() {
    switch (this.stage) {
      case 1:
        if (!this.componentRef.instance.stageValidate) {
          return;
        }
        this.onStageOneSubmit();
        break;
      case 2:
        if (!this.componentRef.instance.stageValidate) {
          return;
        }
        this.onStageTwoSubmit();
        break;
    }
  }

  previousStage() {
    if (this.stage > 1) {
      if (!this.diseaseAdded && this.stage === 3 && this.model.demandStage > 2) {
        this.stage = 3;
        return;
      }
      this.stage--;
      this.diseaseAdded = false;
    } else {
      this.stage = -2;
    }
  }

  /* Add New Disease */
  addNewDisease() {
    if (this.stage === 3) {
      this.componentRef.instance.addNewDisease();
    }
  }

  /* On Form Submission */
  onStageOneSubmit() {
    const jsondata = Object.assign(this.model.stageOneFormOne.getRawValue(),
      this.model.stageOneFormTwo.getRawValue(),
      this.model.stageOneFormThree.getRawValue(),
      this.model.stageOneFormFour.getRawValue(),
      this.model.stageOneFormFive.getRawValue());

    jsondata.commBirthDate = new Date(jsondata.commBirthDate).getTime().toString();
    jsondata['demandSaveDate'] = new Date().getTime().toString();
    jsondata['commCaseTypeCode'] = this.model.formCase;
    jsondata['demandInfoId'] = this.model.demandInfoId;
    jsondata['demandStage'] = 1;
    jsondata['baseDate'] = new Date(this.dateOfRelation).getTime();
    delete jsondata['branchName'];
    delete jsondata['commExpCityName'];
    delete jsondata['isuCityCode'];
    delete jsondata['isuCityName'];
    delete jsondata['isuTypeDesc'];
    delete jsondata['demandSaveDate'];
    delete jsondata['commResidenceProvinceCode'];
    delete jsondata['isuStatusTypeDesc'];
    delete jsondata['commExpCityCodeCombo'];
    delete jsondata['noDarmanCheck'];
    delete jsondata['financialWealthCheck'];

    this.model.nintyOneChecked = jsondata.demandTypeCode === '18';
    this.model.noEmployee = this.model.isMainInsured && jsondata.isuTypeCode === '01';
    this.model.militaryDutyDisable = (jsondata.demandTypeCode === '01'
      || (jsondata.demandTypeCode === '18' && this.model.isMainInsured)) ? false : true;
    this.model.form4DownloadDisable = jsondata.demandTypeCode === '04';
    this.model.gender = jsondata.commGender === '02' ? 'f' : 'm';
    this.securityService.getCurrentUser().then(res => {
      this.model.isFamily = (this.model.formCase === 1 && jsondata.commNationalCode !== res.nationalCode)
        || (this.model.formCase === 2 && jsondata.commNationalCode !== res.nationalCode);
    });

    this.overlay = this.showOverlay();
    return this.restService.create(Urls.MedicalCommitteeStageOneDataSubmit + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : ''),
      jsondata)
      .then(result => {
        if (this.stage < this.stageMax) {
          this.stage++;
        }
        this.model.demandInfoId = Number.parseInt(result.data);
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', `مرحله اول ثبت نام با موفقیت انجام شد.`);
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

  onStageTwoSubmit() {
    const jsondata = this.model.stageTwoForm.getRawValue();

    const documentList = Array(0);

    if (this.model.formCase === 1 && this.model.stageTwoForm.value.divan === '1') {
      for (const image of this.model.divanGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.hasVisitBeforeJob === '1') {
      for (const image of this.model.visitBeforeJobGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.hasVisitInJob === '1') {
      for (const image of this.model.visitInJobGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.hasContract === '1') {
      for (const image of this.model.expertJobGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.hasHealthyCertificate === '1') {
      for (const image of this.model.contractGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.hasDrivingCertificate === '1') {
      for (const image of this.model.healthyCertificateGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.divan === '1') {
      for (const image of this.model.drivingCertificateGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.militaryStatusCode < 4) {
      for (const image of this.model.militaryDutyGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    if (this.model.stageTwoForm.value.militaryStatusCode === '5') {
      for (const image of this.model.pendingMilitaryDutyGalleryImages) {
        documentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    jsondata['demandInfoId'] = this.model.demandInfoId;
    jsondata['committeeDemandInfoDocumentList'] = documentList;
    jsondata['demandStage'] = 2;

    this.overlay = this.showOverlay();
    return this.restService.update(Urls.MedicalCommitteeEditData, this.model.demandInfoId.toString(), jsondata)
      .then(result => {
        if (this.stage < this.stageMax) {
          this.stage++;
        }
        this.model.committeeDocumentStageTwoList = Array(documentList);
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', `مرحله دوم ثبت نام با موفقیت انجام شد.`);
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

  onStageThreeSubmit() {
    if (this.stage !== 3) {
      return;
    }
    if (!this.componentRef.instance.historyComponent.stageValidateAndSave) {
      return this.componentRef.instance.documentComponent.stageValidateAndSave;
    }
    if (!this.componentRef.instance.documentComponent.stageValidateAndSave) {
      return;
    }
    this.componentRef.instance.formValidationError = false;
    const doctorInfoIdTemp = this.componentRef.instance.historyComponent.doctorInfoIdTemp;
    const diseaseModel: any = {};

    diseaseModel['hospitalizationHistoryList'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.hospitalizationHistoryList));
    diseaseModel['doctorHistoryList'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.doctorHistoryList));
    diseaseModel['diseaseGalleryImages'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.diseaseGalleryImages));
    diseaseModel['mainDocumentFileList'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.mainDocumentFileList));
    diseaseModel['taminCommissionGalleryImages'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.taminCommissionGalleryImages));
    diseaseModel['documentGalleryImages'] = JSON.parse(JSON.stringify(this.componentRef.instance.diseaseModel.documentGalleryImages));


    diseaseModel.hospitalizationHistoryList.forEach((item, index) => {
      item.hospitalizedStartDate = new Date(item.hospitalizedStartDate).getTime().toString();
      item.hospitalizedEndDate = new Date(item.hospitalizedEndDate).getTime().toString();
      delete item.gallery;
      delete item.index;
    });

    diseaseModel.doctorHistoryList.forEach((item, index) => {
      delete item.gallery;
      delete item.index;
    });

    for (const image of diseaseModel.diseaseGalleryImages) {
      diseaseModel.mainDocumentFileList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of diseaseModel.taminCommissionGalleryImages) {
      diseaseModel.mainDocumentFileList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of diseaseModel.documentGalleryImages) {
      diseaseModel.mainDocumentFileList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    const jsondata = Object.assign(this.componentRef.instance.diseaseModel.diseaseForm.getRawValue(),
      this.componentRef.instance.diseaseModel.historyForm.getRawValue());

    jsondata['committeeRequestInfoDocumentList'] = diseaseModel.mainDocumentFileList;
    jsondata['committeeRequestInfoHospitalList'] = diseaseModel.hospitalizationHistoryList;
    jsondata['committeeRequestInfoDoctorList'] = diseaseModel.doctorHistoryList;
    jsondata['demandInfoIdTemp'] = this.model.demandInfoId;
    // delete jsondata['hasOtherDoctor'];
    // delete jsondata['hasHospitalization'];
    if (jsondata.requestInfoId == null || jsondata.requestInfoId === '') {
      delete jsondata['requestInfoId'];
    }
    if (doctorInfoIdTemp && doctorInfoIdTemp !== '') {
      jsondata['doctorInfoId'] = '';
      jsondata['doctorInfoIdTemp'] = doctorInfoIdTemp;
    }
    if (jsondata['requestSaveDate'] == null) {
      delete jsondata['requestSaveDate'];
    }

    this.overlay = this.showOverlay();
    return this.restService.create(Urls.MedicalCommitteeStageThreeDataSubmit + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : ''),
      jsondata)
      .then(result => {
        this.componentRef.instance.showDoctorGrid = true;
        this.componentRef.instance.requestDiseaseGrid.refreshData();
        this.diseaseAdded = true;
        this.model.diseaseAdded = true;
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', `مرحله سوم ثبت نام با موفقیت انجام شد.`);
      }).catch(error => {
        this.diseaseAdded = false;
        this.hideOverlay(this.overlay);
        if (error && error.error && error.error.data && error.error.data.message) {
          this.showInfoMessageBox('پیام سیستم', error.error.data.message);
        } else {
          this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        }
      });
  }

  onFinalSubmit() {
    const searchParam = new SearchParam();
    searchParam.value = this.model.stageOneFormOne.value.commNationalCode;
    searchParam.operator = SearchOperator.EQ;
    searchParam.property = 'commNationalCode';

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.MedicalCommitteeCheckDocument
      + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : ''), [searchParam])
      .then(result => {
        if (result.data != null && result.data.length !== 0) {
          this.hideOverlay(this.overlay);
          this.uploadTypeCombo.dataItems = result.data;
          if (!this.finalDocumentCheckMissing) {
            this.finalDocumentCheckMissing = true;
            this.showFinalModal();
          }
        } else {
          this.hideFinalMissDocument();
          this.restService.create(Urls.MedicalCommitteeFinalSubmit + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : ''), {
            demandInfoId: this.model.demandInfoId,
            referTypeCode: this.model.stageOneFormFour.value.referTypeCode
          }).then(success => {
            this.hideOverlay(this.overlay);
            this.showInfoMessageBox('پیام سیستم', `درخواست شما با شماره رهگیری ${success.data} ثبت شد. نتیجه از طریق پیامک به اطلاع شما خواهد رسید.
حداکثر تا 10 روز، نتیجه بررسی به شما اعلام خواهد شد.`, () => {
              this.redirectTo('/');
              setTimeout(function () {
                    location.reload();
                  }, 500);
            });
          }).catch(error => {
            this.hideOverlay(this.overlay);
            const message = error.error.data !== undefined ? error.error.data.message : null;
            if (message !== undefined && message != null) {
              this.showInfoMessageBox('پیام سیستم', message);
            } else {
              this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            }
          });
        }
      }).catch(error => {
      this.hideOverlay(this.overlay);
      const message = error.error.data !== undefined ? error.error.data.message : null;
      if (message !== undefined && message != null) {
        this.showInfoMessageBox('پیام سیستم', message);
      } else {
        this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
      }
    });
  }

  hideFinalModalAndSend() {
    if (this.checkFinalImagesMissingStatus()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    const bossIntroImage = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '151';
    });

    const formOneImage = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '152';
    });

    const formFourImages = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '25';
    });

    const profileImage = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '45';
    });

    const financialImages = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '157';
    });

    const historyImages = this.finalDocumentGallery.images.filter(image => {
      return image.tag === '158';
    });

    const demandJson: any = {};
    demandJson.committeeDemandInfoDocumentList = Array(0);
    demandJson.committeeRequestInfoList = JSON.parse(JSON.stringify(this.componentRef.instance.requestDiseaseGrid.dataItems));
    demandJson.demandInfoId = this.model.demandInfoId.toString();
    demandJson.demandStage = 3;

    for (const image of bossIntroImage) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of formOneImage) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    demandJson.committeeRequestInfoList.forEach((item, index) => item.committeeRequestInfoDocumentList = new Array(0));
    for (const image of formFourImages) {
      const comboItem = this.uploadTypeCombo.dataItems.find(item => item.title === image.title);
      const requestItem = demandJson.committeeRequestInfoList.find(item => item.requestInfoId === comboItem.id);
      requestItem.committeeRequestInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of profileImage) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of financialImages) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    for (const image of historyImages) {
      demandJson.committeeDemandInfoDocumentList.push({
        'documentTypeId': image.tag,
        'documentFileId': image.guid
      });
    }

    demandJson.committeeRequestInfoList.forEach((item, index) => {
      item['committeeDemandInfo'] = null;
    });

    this.overlay = this.showOverlay();
    return this.restService.update(Urls.MedicalCommitteeEditData, this.model.demandInfoId.toString(), demandJson)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.onFinalSubmit();
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        if (error && error.error && error.error.data && error.error.data.message) {
          this.showInfoMessageBox('پیام سیستم', error.error.data.message);
          return;
        } else {
          this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
          return;
        }
      });
  }

  /* Image Validation Methods */
  private checkFinalImagesMissingStatus() {
    this.finalDocumentGalleryMissing = false;
    for (const documentItem of this.uploadTypeCombo.dataItems) {
      const images = this.finalDocumentGallery.images.filter(item => {
        return item.tag === documentItem.type;
      });
      if (!(this.model.nintyOneChecked && documentItem.type === '25')
        && (images.length === 0 || !this.finalDocumentGallery.areAllImagesUploaded())) {
        this.finalDocumentGalleryMissing = true;
        return true;
      }
    }
    return false;
  }

  /* Upload Files */
  uploadFinalDocument() {
    if (this.documentForm.value.selectedItem === undefined || this.documentForm.value.selectedItem === '' || this.documentForm.value.selectedItem === null) {
      this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
      return;
    }
    const doc = this.uploadTypeCombo.dataItems.find(item => item.id === this.documentForm.value.selectedItem);
    if (this.finalDocumentGallery.images.find(item => (item.tag === doc.type && item.title === doc.title)) === undefined) {
      this.finalDocumentGallery.selectImage(doc.title, doc.type);
    } else {
      this.showErrorMessageBox('خطا', 'انتخاب مدرک تکراری امکانپذیر نیست.');
      return;
    }
  }

  private showFinalModal() {
    this.documentForm.get('selectedItem').setValue('');
    this.finalUploadModal.show();
  }

  downloadFinalForm() {
    if (AppHelper.isWeb()) {
      this.pdfFormGenerator.downloadFinalPdfDesktop(this.dataOut.nationalId,
        new Date(this.dataOut.birthDate).getTime(), this);
    } else {
      this.pdfFormGenerator.downloadFinalPdfMobile(this.dataOut.nationalId,
        new Date(this.dataOut.birthDate).getTime(), this);
    }
  }

  /* First Question Modal Actions */
  onNewDemand() {
    this.stage = 0;
  }

  onPreDemand() {
    this.stage = -1;
  }

  /* Agreement Modal Actions */
  onAgree() {
    this.theAgreementModal.hide();
    this.model = this.modelHandler.resetModel();
    this.stage = 1;
  }

  hideFinalMissDocument() {
    this.finalDocumentCheckMissing = false;
    this.finalUploadModal.hide();
  }

  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }

  protected destroyPage() {
    clearInterval(this.looper);
    this.changeDetector.reattach();
    window['alertify'].defaults.closable = true;
  }
}
