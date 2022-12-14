import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as momentNs from 'jalali-moment';
import {StageThreeFormGeneratorService} from '../form-downloader.service';
import {AppHelper} from '../../../settings/app-helper';

@Component({
  selector: 'app-medical-committee-cardboard',
  templateUrl: './medical-committee-cardboard.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class MedicalCommitteeCardboardComponent extends TaminPageBaseComponent {

  private overlay: any;

  /* Forms */
  documentForm: FormGroup;
  objectionForm: FormGroup;

  demandItem: any;
  demandInfoId: any;

  resultMessage = '';
  backUrl = 'app-request';

  state: string;
  message: string;

  dateTemp: any;
  letterScanIds: any;

  showMainDownloader: boolean;
  showDownloader: boolean;
  noObjection: boolean;
  isAppeal: boolean;
  showReintroductionInfo: boolean;

  /* Gallery Items */
  @ViewChild('sessionGrid') sessionGrid: TaminDataGridComponent;
  @ViewChild('missMainDocumentGallery') missMainDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('missDocumentGallery') missDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('mainDocTypeCombo') mainDocTypeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('docTypeCombo') docTypeCombo: TaminFieldComboBoxStaticComponent;

  missMainDocumentGalleryMissing: boolean;
  missDocumentGalleryMissing: boolean;

  /* Constructor */
  constructor(injector: Injector, private activeRoute: ActivatedRoute, private route: Router,
              private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);
    /*route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('prev:', event.url);
        if (event.url === '/app-request') {
          this.backUrl = 'app-request';
        }
      });*/
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.missMainDocumentGalleryMissing = false;
    this.missDocumentGalleryMissing = false;
    this.showReintroductionInfo = false;
    this.noObjection = false;
    this.isAppeal = false;
    this.message = '';
    this.documentForm = this.formBuilder.group({
      selectedItem: ['', ],
      selectedItem2: ['', ]
    });
    this.objectionForm = this.formBuilder.group({
      objectionMessage: ['', [Validators.maxLength(1000)]],
    });
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
    this.demandItem = this.activeRoute.snapshot.data;
    if (this.demandItem.refCode) {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.MedicalCommitteeLastDetails)
        .then(items => {
          if (items.data.list != null && items.data.list.length !== 0) {
            this.demandItem = items.data.list.find(item => item.refId === this.demandItem.refCode);
          } else {
            throw items;
          }
          this.demandInfoId = this.demandItem.demandInfoId;
          switch (this.demandItem.status) {
            case '04':
              if (this.demandItem.commissionPollDate == null || this.demandItem.commissionPollDate === undefined
                || this.demandItem.commissionPollDate === '') {
                this.hideOverlay(this.overlay);
                this.showInfoMessageBox('پیام سیستم', 'تاریخ ابلاغ رأی یافت نشد، مجددا تلاش کنید', () => {
                  this.redirectTo(`${this.backUrl}`);
                });
                return;
              }
              if (this.demandItem.committeePollType.pollDetailId !== '19') {
                const pollDate = new Date(this.demandItem.commissionPollDate);
                const expDate = new Date(pollDate.setDate(pollDate.getDate() + 31)).getTime();
                if (this.demandItem.referTypeCode === '01' && (this.demandItem.demandTypeCode === '01'
                  || this.demandItem.demandTypeCode === '18')) {
                  if (new Date().getTime() >= expDate) {
                    this.noObjection = true;
                    this.showInfoMessageBox('پیام سیستم', 'ثبت اعتراض برای این درخواست مقدور نیست. (مدت ثبت اعتراض تا 31 روز پس از اعلام نتیجه می باشد)');
                  }
                  this.state = 'objection';
                }
              } else {
                this.hideOverlay(this.overlay);
                this.showInfoMessageBox('پیام سیستم', 'موردی برای پیگیری وجود ندارد', () => {
                  this.redirectTo(`${this.backUrl}`);
                  setTimeout(function () {
                    location.reload();
                  }, 500);
                });
                break;
              }
              this.state = 'result';
              this.objectionForm.get('objectionMessage').setValue('اینجانب نسبت به رأی صادره کمیسیون پزشکی اعتراض دارم.');
              this.dateTemp = this.demandItem.commissionPollDate ?
                momentNs.from(new Date(this.demandItem.commissionPollDate).toString(), 'en').locale('fa').format('YYYY/M/D') : '';
              if (this.demandItem.referTypeCode === '02') { // تجدید نظر
                this.isAppeal = true;
                if ((this.demandItem.committeePollType.pollHeadId === '02'
                  && this.demandItem.committeePollType.pollDetailId === '05')
                || (this.demandItem.committeePollType.pollHeadId === '02'
                    && this.demandItem.committeePollType.pollDetailId === '25')) {
                  this.restService.getAll(`${Urls.MedicalDataGet}?demandId="${this.demandItem.referBadviCode}`)
                    .then(result => {
                      if (result.data.committeePollType.pollHeadId === '02'
                        && result.data.committeePollType.pollDetailId === '05') {
                        this.showReintroductionInfo = true;
                      } else {
                        this.showReintroductionInfo = false;
                      }
                      this.hideOverlay(this.overlay);
                    }).catch(error => {
                    this.hideOverlay(this.overlay);
                    throw error;
                  });
                }
              } else if (this.demandItem.referTypeCode === '01') { // کمیسیون
                this.isAppeal = false;
                if (this.demandItem.committeePollType.pollHeadId === '02'
                  && this.demandItem.committeePollType.pollDetailId === '05' && this.noObjection) {
                  this.restService.getAll(`${Urls.MedicalCommitteeProtestDemand}/${this.demandInfoId}`)
                    .then(result => {
                      if (result.data == null) {
                        this.showReintroductionInfo = true;
                      } else {
                        this.showReintroductionInfo = false;
                      }
                      this.hideOverlay(this.overlay);
                    }).catch(error => {
                    this.hideOverlay(this.overlay);
                    throw error;
                  });
                }
              }
              break;
            case '05':
              this.hideOverlay(this.overlay);
              if (this.demandItem.committeeDisapprovalType != null
                && this.demandItem.committeeDisapprovalType.disapprovalCode === '04') {
                this.state = 'miss-document';
                this.findMissings();
                break;
              }
              this.state = 'reject-detail';
              break;
            case '06':
              this.hideOverlay(this.overlay);
              if (this.demandItem.committeeDisapprovalType != null
                && this.demandItem.committeeDisapprovalType.disapprovalCode === '04') {
                this.state = 'miss-document';
                this.findMissings();
                break;
              }
              this.state = 'reject-detail';
              break;
            case '08':
              this.hideOverlay(this.overlay);
              this.initializeSessionGrid(this.demandItem.commissionCentralId);
              this.sessionGrid.refreshData();
              this.state = 'turn';
              break;
            default:
              this.hideOverlay(this.overlay);
              this.showInfoMessageBox('پیام سیستم', 'موردی برای پیگیری وجود ندارد', () => {
                this.redirectTo(`${this.backUrl}`);
                setTimeout(function () {
                  location.reload();
                }, 500);
              });
          }
        }).catch(error => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست مورد نظر یافت نشد.', () => {
          this.redirectTo(`${this.backUrl}`);
        });
      });
    } else {
      this.showInfoMessageBox('پیام سیستم', 'در حال حاضر مجاز به مشاهده این صفحه نیستید.', () => {
        this.redirectTo(`${this.backUrl}`);
      });
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
  }

  private findMissings() {
    this.restService.getAll(`${Urls.MedicalCommitteeGetMissDocs}/${this.demandInfoId}`)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.missMainDocumentGallery.saveUrl = Urls.UploadImage;
        this.missDocumentGallery.saveUrl = Urls.UploadImage;
        if (result.data != null && result.data.list.length !== 0
          && result.data.list[0].docInfos.length !== 0) {
          if (this.demandItem.status === '06') {
            this.dateTemp = new Date(result.data.list[0].deadlineDate);
            if (new Date().getTime() > this.dateTemp.getTime()) {
              this.message = 'مهلت بارگذاری مدارک جهت تکمیل مدارک برای این درخواست منقضی شده.';
              return;
            }
            this.dateTemp = momentNs.from(this.dateTemp.toString(), 'en').locale('fa').format('YYYY/M/D');
            this.letterScanIds = result.data.list[0].LetterScanIdList;
            let dex = 0;
            let dex2 = 0;
            const missDocList = Array();
            const docList = Array();
            result.data.list[0].docInfos.map((currentValue, index, arr) => {
              if (currentValue.bodyInfos === null) {
                const obj: any = {
                  title: currentValue.documentDesc,
                  type: currentValue.docType,
                  requestNo: currentValue.requestNo,
                  requestInfoId: currentValue.requestInfoId
                };
                if (currentValue.requestNo) {
                  obj.model = this.demandItem.committeeRequestInfoList.find(request => {
                    return request.requestInfoId === currentValue.requestInfoId;
                  });
                  if (obj.model) {
                    obj.title += (obj.model ? '(' + obj.model.mainDoctorFirstName + ' ' + obj.model.mainDoctorLastName + ')' : '');
                  } else {
                    return;
                  }
                }
                if (currentValue.requiredDocType === 2) {
                  dex++;
                  obj.id = dex;
                  missDocList.push(obj);
                } else {
                  dex2++;
                  obj.id = dex2;
                  docList.push(obj);
                }
              } else {
                for (const item of currentValue.bodyInfos) {
                  const obj: any = {
                    title: currentValue.documentDesc + ' ' + item.bodyDesc,
                    type: currentValue.docType,
                    requestNo: currentValue.requestNo,
                    requestInfoId: currentValue.requestInfoId
                  };
                  if (currentValue.requiredDocType === 2) {
                    dex++;
                    obj.id = dex;
                    missDocList.push(obj);
                  } else {
                    dex2++;
                    obj.id = dex2;
                    docList.push(obj);
                  }
                }
              }
            });
            this.mainDocTypeCombo.dataItems = missDocList;
            this.docTypeCombo.dataItems = docList;
          } else {
            result.data.list[0].docInfos.map((currentValue, index, arr) => {
              arr[index] = {
                title: currentValue.documentDesc,
                type: currentValue.docType,
                id: index,
                requestNo: currentValue.requestNo,
                requestInfoId: currentValue.requestInfoId
              };
              if (currentValue.requestNo) {
                arr[index].model = this.demandItem.committeeRequestInfoList.find(request => {
                  return request.requestInfoId === currentValue.requestInfoId;
                });
              }
            });
            this.mainDocTypeCombo.dataItems = result.data.list[0].docInfos;
          }
        } else {
          this.showInfoMessageBox('پیام سیستم', 'موردی یافت نشد', () => {
            this.redirectTo(`${this.backUrl}`);
          });
        }
      }).catch(error => {
      this.hideOverlay(this.overlay);
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo(`${this.backUrl}`);
      });
    });
  }

  downloadDocument(missCase: Number) {
    let doc;
    if (missCase === 1) {
      if (this.documentForm.value.selectedItem === undefined || this.documentForm.value.selectedItem === '' || this.documentForm.value.selectedItem === null) {
        this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
        return;
      }
      doc = this.mainDocTypeCombo.dataItems.find(item => item.id === this.documentForm.value.selectedItem);
    } else {
      if (this.documentForm.value.selectedItem2 === undefined || this.documentForm.value.selectedItem2 === '' || this.documentForm.value.selectedItem2 === null) {
        this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
        return;
      }
      doc = this.docTypeCombo.dataItems.find(item => item.id === this.documentForm.value.selectedItem2);
    }
    switch (doc.type) {
      case '158':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadFinancialPdfDesktop(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate).getTime(), this);
        } else {
          this.pdfFormGenerator.downloadFinancialPdfMobile(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate).getTime(), this);
        }
        break;
      case '157':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadFinalPdfDesktop(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate).getTime(), this);
        } else {
          this.pdfFormGenerator.downloadFinalPdfMobile(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate).getTime(), this);
        }
        break;
      case '152':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm1PdfDesktop(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate), this.demandItem.insuranceNumber,
            this.demandItem.commNationalCode,
            this.demandItem.demandInfoId, this);
        } else {
          this.pdfFormGenerator.downloadForm1PdfMobile(this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate), this.demandItem.insuranceNumber,
            this.demandItem.commNationalCode,
            this.demandItem.demandInfoId, this);
        }
        break;
      case '25':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm4PdfDesktop(doc.model.requestNumber, this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate), doc.model.mainDoctorFirstName, doc.model.mainDoctorLastName, doc.model.mainDoctorSpeciality,
            this.demandItem.demandInfoId, 'A', this);
        } else {
          this.pdfFormGenerator.downloadForm4PdfMobile(doc.model.requestNumber, this.demandItem.commNationalCode,
            new Date(this.demandItem.commBirthDate), doc.model.mainDoctorFirstName, doc.model.mainDoctorLastName, doc.model.mainDoctorSpeciality,
            this.demandItem.demandInfoId, 'A', this);
        }
        break;
    }
  }

  /* Upload Files */
  uploadMissMainDocument() {
    this.documentForm.get('selectedItem2').reset();
    if (this.documentForm.value.selectedItem !== null
      && this.documentForm.value.selectedItem !== undefined
      && this.documentForm.value.selectedItem !== '') {
      const doc = this.mainDocTypeCombo.dataItems.find(item => item.id === this.documentForm.value.selectedItem);
      this.missMainDocumentGallery.selectImage(doc.title, doc.type);
      return;
    }

    this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
    return;
  }

  uploadMissDocument() {
    this.documentForm.get('selectedItem').reset();
    if (this.documentForm.value.selectedItem2 !== null
      && this.documentForm.value.selectedItem2 !== undefined
      && this.documentForm.value.selectedItem2 !== '') {
      const doc = this.docTypeCombo.dataItems.find(item => item.id === this.documentForm.value.selectedItem2);
      this.missDocumentGallery.selectImage(doc.title, doc.type);
      return;
    }

    this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
    return;
  }

  /* On Submission */
  onMissSubmit() {
    if (this.checkImagesMissingStatus()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    const demandJson: any = JSON.parse(JSON.stringify(this.demandItem));
    demandJson.committeeDemandInfoDocumentList = Array(0);
    demandJson.committeeRequestInfoList = Array(0);
    demandJson.demandInfoId = this.demandInfoId.toString();
    demandJson.demandStage = 4;

    this.mainDocTypeCombo.dataItems.forEach((item, index) => {
      if (item.requestNo != null && demandJson.committeeRequestInfoList.find(req => req.requestInfoId === item.requestInfoId) === undefined) {
        demandJson.committeeRequestInfoList.push({
          requestNumber: item.requestNo,
          requestInfoId: item.requestInfoId,
          committeeRequestInfoDocumentList: Array(0)
        });
      }
    });

    this.docTypeCombo.dataItems.forEach((item, index) => {
      if (item.requestNo != null && demandJson.committeeRequestInfoList.find(req => req.requestInfoId === item.requestInfoId) === undefined) {
        demandJson.committeeRequestInfoList.push({
          requestNumber: item.requestNo,
          requestInfoId: item.requestInfoId,
          committeeRequestInfoDocumentList: Array(0)
        });
      }
    });

    for (const image of this.missMainDocumentGallery.images) {
      const documentItem = this.mainDocTypeCombo.dataItems.find(item => {
        return item.title === image.title;
      });

      if (documentItem.requestNo == null) {
        demandJson.committeeDemandInfoDocumentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      } else {
        demandJson.committeeRequestInfoList
          .find(item => item.requestNumber === documentItem.requestNo).committeeRequestInfoDocumentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    for (const image of this.missDocumentGallery.images) {
      const documentItem = this.docTypeCombo.dataItems.find(item => {
        return item.title === image.title;
      });

      if (documentItem.requestNo == null) {
        demandJson.committeeDemandInfoDocumentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      } else {
        demandJson.committeeRequestInfoList
          .find(item => item.requestNumber === documentItem.requestNo).committeeRequestInfoDocumentList.push({
          'documentTypeId': image.tag,
          'documentFileId': image.guid
        });
      }
    }

    this.overlay = this.showOverlay();
    return this.restService.update(Urls.MedicalCommitteeEditData, this.demandInfoId.toString(), demandJson)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', `مدارک شما بارگذاری شد`, () => {
          this.redirectTo(`${this.backUrl}`);
        });
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

  /* Image Validation Method */
  private checkImagesMissingStatus() {
    this.missMainDocumentGalleryMissing = false;
    this.missDocumentGalleryMissing = false;
    for (const documentItem of this.mainDocTypeCombo.dataItems) {
      const images = this.missMainDocumentGallery.images.filter(item => {
        return (item.title === documentItem.title);
      });
      this.missMainDocumentGalleryMissing = images.length === 0 || !this.missMainDocumentGallery.areAllImagesUploaded();
    }
    for (const documentItem of this.docTypeCombo.dataItems) {
      const images = this.missDocumentGallery.images.filter(item => {
        return (item.title === documentItem.title);
      });
      this.missDocumentGalleryMissing = images.length === 0 || !this.missDocumentGallery.areAllImagesUploaded();
    }

    if (this.missMainDocumentGalleryMissing || this.missDocumentGalleryMissing) {
      return true;
    } else {
      return false;
    }
  }

  private initializeSessionGrid(commissionCentralId: string) {
    const searchParam = new SearchParam();
    searchParam.value = commissionCentralId;
    searchParam.operator = SearchOperator.EQ;
    searchParam.property = 'centralCommissionId';

    this.sessionGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .clearActionColumns()
      .setFirstLoad(true)
      .addSearchParam(searchParam)
      .addUrl(Urls.MedicalCommitteeCheckTurn)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'sessionDate', columnCaption: 'تاریخ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sessionTime', columnCaption: 'ساعت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'specsDescription', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowPager(true)
      .setPagerSize(10)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onObjectionSubmit() {
    if (!this.objectionForm.valid) {
      /* Marking Main Form */
      this.markFormGroupAsTouched(this.objectionForm);
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    const demandJson = {...this.demandItem};
    demandJson['objectionMessage'] = 'اینجانب نسبت به رأی صادره کمیسیون پزشکی اعتراض دارم.';
    demandJson['referTypeCode'] = '03';
    demandJson['referBadviCode'] = this.demandItem.demandInfoId;
    demandJson['demandStage'] = 1;
    demandJson['demandInfoId'] = '';
    delete demandJson['committeeRequestInfoList'];
    delete demandJson['committeeDemandInfoDocumentList'];

    this.overlay = this.showOverlay();
    return this.restService.create(Urls.MedicalCommitteeFinalSubmit, demandJson)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', `درخواست اعتراض با شماره رهگیری ${result.data} ثبت شد. نتیجه از طریق پیامک به اطلاع شما خواهد رسید.
حداکثر تا 10 روز، نتیجه بررسی به شما اعلام خواهد شد.`);
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

  downloadForm() {
    this.pdfFormGenerator.downloadForm6(this.demandItem.nationalCode,
      this.demandItem.commissionCentralId, this.demandItem.demandInfoId, this);
  }

  downloadMissDocForm(letterId) {
    this.pdfFormGenerator.downloadMissDoc(this.demandItem.nationalCode,
      this.demandInfoId, letterId, this);
  }

  onBack() {
    location.href = `/view/#/${this.backUrl}`;
  }
}
