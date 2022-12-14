import {Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {CommitteeModel} from '../committee-model';
import {AppHelper} from '../../../settings/app-helper';
import {StageThreeFormGeneratorService} from '../form-downloader.service';
import {CommitteeRequestListComponent} from '../request-list/committee-request-list.component';
import * as momentNs from 'jalali-moment';
import {CommitteeModelHandlerService} from '../committee-model-handler.service';

@Component({
  selector: 'app-demand-grid-medical-committee',
  templateUrl: './committee-demand-grid.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class CommitteeDemandGridComponent extends TaminPageBaseComponent {

  private overlay: any;

  documentForm: FormGroup;
  objectionForm: FormGroup;

  @ViewChild('demandDataGrid') demandDataGrid: TaminDataGridComponent;
  @ViewChild('sessionGrid') sessionGrid: TaminDataGridComponent;
  @ViewChild('requestListComponent') requestListComponent: CommitteeRequestListComponent;
  @ViewChild('requestListModal') requestListModal: TaminModalComponent;
  @ViewChild('mainDocTypeCombo') mainDocTypeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('docTypeCombo') docTypeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('objectionModal') objectionModal: TaminModalComponent;
  @ViewChild('resultModal') resultModal: TaminModalComponent;
  @ViewChild('rejectDetailModal') rejectDetailModal: TaminModalComponent;
  @ViewChild('missMainDocumentGallery') missMainDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('missDocumentGallery') missDocumentGallery: TaminImageGalleryManagedComponent;
  @ViewChild('missDocumentModal') missDocumentModal: TaminModalComponent;
  @ViewChild('turnModal') turnModal: TaminModalComponent;

  showMainDownloader: boolean;
  showDownloader: boolean;
  message: string;
  messageTwo: string;
  messageThree: string;
  dateTemp: any;
  letterScanIds: Array<any>;
  missMainDocumentGalleryMissing: boolean;
  missDocumentGalleryMissing: boolean;

  downloadItems: Array<any>;

  @Input() model: CommitteeModel;
  @Input() isSSO: boolean;
  @Input() ssoNationalCode: any;
  @Input() ssoTicket: any;
  @Output() review = new EventEmitter<boolean>();

  /* Constructor */
  constructor(injector: Injector, private pdfFormGenerator: StageThreeFormGeneratorService, private modelHandler: CommitteeModelHandlerService) {
    super(injector);
    this.model = this.modelHandler.model;
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.initializeDemandDataGrid();
    this.initializeSessionGrid();

    this.documentForm = this.formBuilder.group({
      selectedItem: ['', ],
      selectedItem2: ['', ]
    });
    this.objectionForm = this.formBuilder.group({
      objectionMessage: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /* Loads After Page Render */
  loadPageData() {

    this.demandDataGrid.refreshData();

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
      this.downloadItems = doc.downloadItems;
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

    this.missMainDocumentGallery.saveUrl = Urls.UploadImage;
    this.missDocumentGallery.saveUrl = Urls.UploadImage;
  }

  /* Request-Data Data Grid */
  private initializeDemandDataGrid() {
    this.demandDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.MedicalCommitteeLastDetails)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'demandSaveDate', columnCaption: 'تاریخ ثبت تقاضا', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'demandTypeCode', columnCaption: 'نوع تقاضا', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellDemandTypeTranslator})
      .addVisibleColumn({columnName: 'referTypeCode', columnCaption: 'نوع مراجعه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellReferTypeTranslator})
      .addVisibleColumn({columnName: 'commNationalCode', columnCaption: 'کدملی متقاضی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchCode', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'refId', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellNoneTranslator})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'view',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'objection',
        columnCaption: 'اعتراض',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'objection',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'result',
        columnCaption: 'ابلاغ رای و نتیجه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'result',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'reject-detail',
        columnCaption: 'علت عدم تایید',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'reject-detail',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'miss-document',
        columnCaption: 'تکمیل مدارک',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'miss-document',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'turn',
        columnCaption: 'نمایش نوبت دهی',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'turn',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'request-list',
        columnCaption: 'نمایش لیست درخواست ها',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'request-list',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'reject-request',
        columnCaption: 'لغو درخواست',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'reject-request',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).setPagerSize(10)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.demandDataGrid.actionRenderer = (item, actionCells) => {
      const result = [];

      switch (item.status) {
        case '01':
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          if (item.referTypeCode === '01') {
            result.push(actionCells.find(c => c.columnActionName === 'reject-request'));
          }
          break;
        case '02':
          break;
        case '03':
          break;
        case '04':
          result.push(actionCells.find(c => c.columnActionName === 'result'));
          if (item.referTypeCode === '01' && (item.demandTypeCode === '01' || item.demandTypeCode === '18') && !(item.committeePollType.pollDetailId === '19'
            || item.committeePollType.pollDetailId === '61')) {
            result.push(actionCells.find(c => c.columnActionName === 'objection'));
          }
          break;
        case '05':
          if (item.committeeDisapprovalType != null && item.committeeDisapprovalType.disapprovalCode === '04') {
            result.push(actionCells.find(c => c.columnActionName === 'miss-document'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'reject-detail'));
          break;
        case '06':
          if (item.committeeDisapprovalType != null && item.committeeDisapprovalType.disapprovalCode === '04') {
            result.push(actionCells.find(c => c.columnActionName === 'miss-document'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'reject-detail'));
          break;
        case '07':
          break;
        case '08':
          result.push(actionCells.find(c => c.columnActionName === 'turn'));
          break;
        case '09':
          break;
        case '10':
          break;
      }
      if (item.referTypeCode !== '02' && item.referTypeCode !== '03') {
        result.push(actionCells.find(c => c.columnActionName === 'request-list'));
      }
      return result;
    };

    this.demandDataGrid.dataItems = [];
  }

  downloadDocument(missCase: Number, letterScanId: number) {
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
          this.pdfFormGenerator.downloadFinancialPdfDesktop(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate).getTime(), this);
        } else {
          this.pdfFormGenerator.downloadFinancialPdfMobile(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate).getTime(), this);
        }
        break;
      case '157':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadFinalPdfDesktop(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate).getTime(), this);
        } else {
          this.pdfFormGenerator.downloadFinalPdfMobile(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate).getTime(), this);
        }
        break;
      case '152':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm1PdfDesktop(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate), this.model.gridItem.insuranceNumber,
            this.model.gridItem.commNationalCode,
            this.model.gridItem.demandInfoId, this);
        } else {
          this.pdfFormGenerator.downloadForm1PdfMobile(this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate), this.model.gridItem.insuranceNumber,
            this.model.gridItem.commNationalCode,
            this.model.gridItem.demandInfoId, this);
        }
        break;
      case '25':
        if (AppHelper.isWeb()) {
          this.pdfFormGenerator.downloadForm4PdfDesktop(doc.model.requestNumber, this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate), doc.model.mainDoctorFirstName, doc.model.mainDoctorLastName, doc.model.mainDoctorSpeciality,
            this.model.gridItem.demandInfoId, 'A', this);
        } else {
          this.pdfFormGenerator.downloadForm4PdfMobile(doc.model.requestNumber, this.model.gridItem.commNationalCode,
            new Date(this.model.gridItem.commBirthDate), doc.model.mainDoctorFirstName, doc.model.mainDoctorLastName, doc.model.mainDoctorSpeciality,
            this.model.gridItem.demandInfoId, 'A', this);
        }
        break;
    }
    if (letterScanId) {
      this.pdfFormGenerator.downloadDefectiveLetters(letterScanId, this.model.gridItem.commNationalCode, this.model.gridItem.demandInfoId, doc.type, this);
    }
  }

  /* Data Grid Translator */
  gridCellReferTypeTranslator(item) {
    switch (item) {
      case '01':
        return 'بدوی';
      case '02':
        return 'تجدید نظر';
      case '03':
        return 'اعتراض';
      default:
        return 'نامشخص';
    }
  }

  gridCellDemandTypeTranslator(item) {
    switch (item) {
      case '01':
        return 'از کار افتادگي';
      case '18':
        return 'استفاده از تسهيلات موضوع بخشنامه شماره 19/1';
      case '04':
        return 'کار سبک / تغيير شرايط شغلی';
      case '02':
        return 'استراحت پزشکی';
      case '10':
        return 'بازنشستگی همكاران معلول عادی و ناشی ازکار';
      case '11':
        return 'بازنشستگی پیش از موعد همکاران سازمانی';
      case '12':
        return 'بازنشستگی معلولین عادی بخش عمومی غیر دولتی';
      case '13':
        return 'بازنشستگی معلولین ناشی از کار بخش عمومی غیر دولتی';
      default:
        return 'نامشخص';
    }
  }

  gridCellNoneTranslator(item) {
    if (item === '') {
      return '-';
    } else {
      return item;
    }
  }

  gridCellStatusTranslator(item) {
    switch (item) {
      case '01':
        return 'ثبت درخواست';
      case '02':
        return 'در حال بررسی شعبه';
      case '03':
        return 'در حال بررسی کمیسیون پزشکی';
      case '04':
        return 'مختومه رأی نهایی';
      case '05':
        return 'عدم تایید - شعبه';
      case '06':
        return 'عدم تایید - کمیسیون';
      case '07':
        return 'ثبت اعتراض';
      case '08':
        return 'نوبت دهی کمیسیون';
      case '09':
        return 'عدم تایید اعتراض';
      case '10':
        return 'لغو به علت اشتباه در ثبت';
      default:
        return 'نامشخص';
    }
  }

  private initializeSessionGrid() {
    this.sessionGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .clearActionColumns()
      .addUrl(Urls.MedicalCommitteeLastDetails)
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

  /* Grid Actions */
  onRequestAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'view':
        this.model.gridItem = param.item;
        this.model.demandStage = param.item.demandStage;
        this.model.demandInfoId = param.item.demandInfoId;
        this.review.emit(true);
        break;
      case 'objection':
        if (param.item.commissionPollDate == null || param.item.commissionPollDate === undefined
          || param.item.commissionPollDate === '') {
          this.showInfoMessageBox('پیام سیستم', 'تاریخ ابلاغ رأی یافت نشد، مجددا تلاش کنید');
          return;
        }
        const pollDate = new Date(param.item.commissionPollDate);
        const expDate = new Date(pollDate.setDate(pollDate.getDate() + 31)).getTime();
        if (new Date().getTime() > expDate) {
          this.showInfoMessageBox('پیام سیستم', 'ثبت اعتراض برای این درخواست مقدور نیست. (مدت ثبت اعتراض تا 31 روز پس از اعلام نتیجه می باشد)');
          return;
        }
        this.model.gridItem = param.item;
        this.model.demandInfoId = param.item.demandInfoId;
        this.objectionForm.reset();
        this.objectionModal.show();
        this.objectionForm.get('objectionMessage').setValue('اینجانب نسبت به رأی صادره کمیسیون پزشکی اعتراض دارم.');
        break;
      case 'result':
        this.model.gridItem = param.item;
        this.message = param.item.commissionPollDesc;
        this.dateTemp = param.item.commissionPollDate ?
          momentNs.from(new Date(param.item.commissionPollDate).toString(), 'en').locale('fa').format('YYYY/M/D') : '';
        this.resultModal.show();
        break;
      case 'reject-detail':
        this.model.gridItem = param.item;
        this.message = param.item.committeeDisapprovalType.disapprovalDesc;
        this.messageTwo = param.item.committeeDisapprovalType.disapprovalDescAdditional;
        this.messageThree = param.item.branchDisapprovalDesc;
        this.rejectDetailModal.show();
        break;
      case 'miss-document':
        this.model.gridItem = param.item;
        this.model.demandInfoId = param.item.demandInfoId;
        this.documentForm.reset();
        this.missMainDocumentGallery.clearImages();
        this.missDocumentGallery.clearImages();
        this.mainDocTypeCombo.dataItems = [];
        this.docTypeCombo.dataItems = [];
        this.overlay = this.showOverlay();
        this.restService.getAll(`${Urls.MedicalCommitteeGetMissDocs}/${this.model.demandInfoId}`)
          .then(result => {
            this.hideOverlay(this.overlay);
            if (result.data != null && result.data.list.length !== 0
              && result.data.list[0].docInfos.length !== 0) {
              if (param.item.status === '06') {
                this.dateTemp = new Date(result.data.list[0].deadlineDate).setHours(23, 59, 59);
                if (new Date().getTime() >= this.dateTemp) {
                  this.showInfoMessageBox('پیام سیستم', 'مهلت بارگذاری مدارک، جهت تکمیل برای این درخواست به اتمام رسیده است.');
                  return;
                }
                this.dateTemp = momentNs.from(new Date(this.dateTemp).toString(), 'en').locale('fa').format('YYYY/M/D');
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
                      obj.model = this.model.gridItem.committeeRequestInfoList.find(request => {
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
                      obj.downloadItems = currentValue.examinationScanIdList;
                      obj.title = obj.title + ' ' + currentValue.description;
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
                    arr[index].model = this.model.gridItem.committeeRequestInfoList.find(request => {
                      return request.requestInfoId === currentValue.requestInfoId;
                    });
                    arr[index].title += (arr[index].model ? '(' + arr[index].model.mainDoctorFirstName + ' ' + arr[index].model.mainDoctorLastName + ')' : '');
                  }
                });
                this.mainDocTypeCombo.dataItems = result.data.list[0].docInfos;
              }
              this.missDocumentModal.show();
            } else {
              this.showInfoMessageBox('پیام سیستم', 'موردی یافت نشد');
            }
          }).catch(error => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
        break;
      case 'turn':
        const searchParam = new SearchParam();
        searchParam.value = param.item.commissionCentralId;
        searchParam.operator = SearchOperator.EQ;
        searchParam.property = 'centralCommissionId';
        this.overlay = this.showOverlay();
        this.restService.getAll(Urls.MedicalCommitteeCheckTurn, [searchParam])
          .then(result => {
            this.hideOverlay(this.overlay);
            this.sessionGrid.dataItems = result.data.list;
            this.turnModal.show();
          }).catch(err => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('پیام سیستم', 'موردی یافت نشد');
        });
        break;
      case 'request-list':
        this.requestListModal.show();
        this.requestListComponent.demandItem = param.item;
        this.requestListComponent.requestItem = null;
        this.requestListComponent.refreshGrid();
        break;
      case 'reject-request':
        const demandJson: any = {};
        demandJson.demandInfoId = param.item.demandInfoId.toString();
        demandJson.demandStage = 0;
        this.overlay = this.showOverlay();
        this.restService.update(Urls.MedicalCommitteeEditData, param.item.demandInfoId.toString(), demandJson)
          .then(result => {
            this.hideOverlay(this.overlay);
            this.demandDataGrid.refreshData();
            this.showInfoMessageBox('پیام سیستم', `درخواست با موفقیت لغو گردید`);
          })
          .catch(error => {
            this.hideOverlay(this.overlay);
            if (error && error.error && error.error.data && error.error.data.message) {
              this.showInfoMessageBox('پیام سیستم', error.error.data.message);
            } else {
              this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            }
          });
        break;
    }
  }

  hideMissModalAndSend() {
    if (this.checkMissImagesMissingStatus()) {
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    const demandJson = JSON.parse(JSON.stringify(this.model.gridItem));
    demandJson.committeeDemandInfoDocumentList = Array(0);
    demandJson.committeeRequestInfoList = Array(0);
    demandJson.demandInfoId = this.model.demandInfoId.toString();
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
    return this.restService.update(Urls.MedicalCommitteeEditData, this.model.demandInfoId.toString(), demandJson)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.missDocumentModal.hide();
        this.demandDataGrid.refreshData();
        this.showInfoMessageBox('پیام سیستم', `مدارک شما بارگذاری شد`);
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

  onObjectionSubmit() {
    if (!this.objectionForm.valid) {
      /* Marking Main Form */
      this.markFormGroupAsTouched(this.objectionForm);
      this.showInfoMessageBox('پیام سیستم', 'خطا در اطلاعات، لطفا اطلاعات ناقص را تکمیل کنید.');
      return;
    }

    // const demandJson = JSON.parse(JSON.stringify(this.model.gridItem));
    const demandJson = {...this.model.gridItem};
    demandJson['objectionMessage'] = this.objectionForm.value.objectionMessage;
    demandJson['referTypeCode'] = '03';
    demandJson['referBadviCode'] = this.model.demandInfoId;
    demandJson['demandStage'] = 1;
    demandJson['demandInfoId'] = '';
    delete demandJson['committeeRequestInfoList'];
    delete demandJson['committeeDemandInfoDocumentList'];

    this.overlay = this.showOverlay();
    return this.restService.create(Urls.MedicalCommitteeFinalSubmit + (this.isSSO ? `/${this.ssoNationalCode}/${this.ssoTicket}` : ''),
      demandJson)
      .then(result => {
        this.objectionModal.hide();
        this.hideOverlay(this.overlay);
        this.demandDataGrid.refreshData();
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

  hideResult() {
    this.message = '';
    this.resultModal.hide();
  }

  hideRejectDetail() {
    this.message = '';
    this.rejectDetailModal.hide();
  }

  downloadMissDocForm(letterId) {
    this.pdfFormGenerator.downloadMissDoc(this.model.gridItem.nationalCode,
      this.model.demandInfoId, letterId, this);
  }

  private checkMissImagesMissingStatus() {
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

  downloadForm() {
    this.pdfFormGenerator.downloadForm6(this.model.gridItem.nationalCode,
      this.model.gridItem.commissionCentralId, this.model.gridItem.demandInfoId, this);
  }

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
}
