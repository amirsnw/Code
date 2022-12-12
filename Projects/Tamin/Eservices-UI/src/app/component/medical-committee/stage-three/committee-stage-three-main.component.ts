import {Component, EventEmitter, Injector, Input, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {DiseaseModel} from './disease-model';
import {CommitteeStageThreeHistoryComponent} from './history/committee-stage-three-history.component';
import {CommitteeModel} from '../committee-model';
import {CommitteeStageThreeDocumentComponent} from './documents/committee-stage-three-document.component';
import {Urls} from '../../../settings/urls';
import {BehaviorSubject} from 'rxjs';
import * as momentNs from 'jalali-moment';

@Component({
  selector: 'app-stage-three-main-medical-committee',
  templateUrl: './committee-stage-three-main.component.html',
  styleUrls: ['../main-committee/main-committee.component.css']
})
export class CommitteeStageThreeMainComponent extends TaminPageBaseComponent {

  private overlay: any;
  formValidationError: boolean;
  _showDoctorGrid: boolean;
  dataInput: any;

  @Input() model: CommitteeModel;
  @Input() diseaseModel: DiseaseModel;

  @Output() showGridEvent = new EventEmitter<boolean>();

  @ViewChild('historyComponent') historyComponent: CommitteeStageThreeHistoryComponent;
  @ViewChild('documentComponent') documentComponent: CommitteeStageThreeDocumentComponent;
  @ViewChild('requestDiseaseGrid') requestDiseaseGrid: TaminDataGridComponent;

  private gridItemSubject: BehaviorSubject<number>;

  constructor(injector: Injector) {
    super(injector);
    this.diseaseModel = new DiseaseModel();
  }

  get showDoctorGrid() {
    return this._showDoctorGrid;
  }

  set showDoctorGrid(state: boolean) {
    if (state) {
      this.historyComponent.diseaseForm.reset();
      this.historyComponent.historyForm.reset();
      this.historyComponent.diseaseGallery.clearImages();
      this.historyComponent.profileGallery.clearImages();
      this.historyComponent.taminCommissionGallery.clearImages();
      this.documentComponent.documentForm.reset();
      this.documentComponent.documentGallery.clearImages();
      this.diseaseModel = new DiseaseModel();
    }
    this._showDoctorGrid = state;
    this.showGridEvent.emit(state);
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
    this.formValidationError = false;
    this._showDoctorGrid = true;
  }

  /* Loads After Page Render */
  loadPageData() {
    const moment = momentNs;
    this.initializeRequestDiseaseGrid();
    if (this.model.gridItem.demandStage > 2 || this.model.diseaseAdded) {
      this.showDoctorGrid = true;
      this.requestDiseaseGrid.refreshData();
    } else {
      this.showDoctorGrid = false;
      this.historyComponent.diseaseForm.get('requestNumber').setValue(this.model.stageOneFormOne.value.commNationalCode.substring(6)
        + moment.from(new Date().toString(), 'en').locale('fa').format('YYYYMMDDss').substring(2)
        + '1');
    }
  }

  /* Add New Disease - Used by Main component*/
  addNewDisease() {
    const moment = momentNs;
    this.historyComponent.diseaseForm.reset();
    this.historyComponent.historyForm.reset();
    this.historyComponent.diseaseGallery.clearImages();
    this.historyComponent.profileGallery.clearImages();
    this.historyComponent.taminCommissionGallery.clearImages();
    this.documentComponent.documentForm.reset();
    this.documentComponent.documentGallery.clearImages();
    this.diseaseModel = new DiseaseModel();
    if (this.requestDiseaseGrid.dataItems.length > 0) {
      this.historyComponent.diseaseForm.get('requestNumber').setValue(this.model.stageOneFormOne.value.commNationalCode.substring(6)
        + moment.from(new Date().toString(), 'en').locale('fa').format('YYYYMMDDss').substring(2)
        + (this.requestDiseaseGrid.dataItems.length + 1).toString());
      let tempReqNo = this.historyComponent.diseaseForm.value.requestNumber;
      this.requestDiseaseGrid.dataItems.forEach((item) => {
        if (tempReqNo === item.requestNumber) {
          tempReqNo = (Number(this.historyComponent.diseaseForm.value.requestNumber) + 1).toString();
        }
      });
      this.historyComponent.diseaseForm.get('requestNumber').setValue(tempReqNo);
    } else {
      this.historyComponent.diseaseForm.get('requestNumber').setValue(this.model.stageOneFormOne.value.commNationalCode.substring(6)
        + moment.from(new Date().toString(), 'en').locale('fa').format('YYYYMMDDss').substring(2)
        + '1');
    }
    this.showDoctorGrid = false;
    window.scrollTo(0, 0);
  }

  public showErrorBox() {
    this.formValidationError = true;
  }

  /* Request-Disease Data Grid */
  private initializeRequestDiseaseGrid() {
    const sortParam = new SortParam();
    sortParam.property = 'requestNumber';
    sortParam.direction = SortDirection.DESC;

    this.requestDiseaseGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .clearActionColumns()
      .setFirstLoad(true)
      .addSortParam(sortParam)
      .addUrl(Urls.MedicalCommitteeLastDiseases)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'requestSaveDate', columnCaption: 'تاریخ ثبت بیماری', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'requestNumber', columnCaption: 'شماره درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'illnessDesc', columnCaption: 'نام بیماری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorFullName', columnCaption: 'نام پزشک معالج', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorInfoId', columnCaption: 'شماره نظام پزشکی', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
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
      .setShowPager(true)
      .setPagerSize(10)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.requestDiseaseGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      return result;
    };

    this.requestDiseaseGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'doctorFullName') {
        const tmp = item.mainDoctorFirstName + ' ' + item.mainDoctorLastName;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'doctorInfoId' && item.doctorInfoId == null) {
        return {handled: true, data: item.doctorInfoIdTemp};
      }
      return {handled: false, data: ''};
    };

    this.requestDiseaseGrid.dataItems = [];
  }

  onRequestAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
          const restDeleteDisease = this.restService.delete(Urls.DeleteCommitteeDisease, param.item.requestInfoId);
          this.overlay = this.showOverlay();
          restDeleteDisease.then(data => {
            this.requestDiseaseGrid.refreshData();
            if (this.requestDiseaseGrid.dataItems.length - 1 === 0) {
              this.model.gridItem.demandStage = 2;
              this.addNewDisease();
            }
            this.hideOverlay(this.overlay);
          }).catch(error => {
            this.hideOverlay(this.overlay);
            this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        }, () => {
        });
        break;
      case 'edit':
        this.historyComponent.diseaseForm.reset();
        this.historyComponent.historyForm.reset();
        this.historyComponent.diseaseGallery.clearImages();
        this.historyComponent.profileGallery.clearImages();
        this.historyComponent.taminCommissionGallery.clearImages();
        this.documentComponent.documentForm.reset();
        this.documentComponent.documentGallery.clearImages();
        this.diseaseModel = new DiseaseModel();

        this.historyComponent.diseaseGallery.getUrl = Urls.UploadImage;
        this.historyComponent.profileGallery.getUrl = Urls.UploadImage;
        this.historyComponent.taminCommissionGallery.getUrl = Urls.UploadImage;
        this.documentComponent.documentGallery.getUrl = Urls.UploadImage;

        this.historyComponent.inactive = true;

        this.historyComponent.diseaseForm.patchValue({
          requestSaveDate: param.item.requestSaveDate,
          requestInfoId: param.item.requestInfoId,
          requestNumber: param.item.requestNumber,
          illnessDesc: param.item.illnessDesc,
          mainDoctorFirstName: param.item.mainDoctorFirstName,
          mainDoctorLastName: param.item.mainDoctorLastName,
          mainDoctorSpeciality: param.item.mainDoctorSpeciality
        });
        if (param.item.doctorInfoIdTemp != null) {
          this.historyComponent.lockFirstOrgunIdentity = true;
          this.historyComponent.doctorInfoIdTemp = param.item.doctorInfoIdTemp;
          this.historyComponent.diseaseForm.get('doctorInfoId').setValue(param.item.doctorInfoIdTemp);
        } else {
          this.historyComponent.lockFirstOrgunIdentity = true;
          this.historyComponent.diseaseForm.get('doctorInfoId').setValue(param.item.doctorInfoId);
        }
        this.historyComponent.historyForm.patchValue({
          hasOtherDoctor: Boolean(Number(param.item.hasOtherDoctor)),
          hasHospitalization: Boolean(Number(param.item.hasHospitalization)),
          hasCommissionTaminOrgan: param.item.hasCommissionTaminOrgan,
          hasCommissionOtherOrgan: param.item.hasCommissionOtherOrgan,
          commissionOtherOrganDesc: param.item.commissionOtherOrganDesc,
          hasSupportOrgan: param.item.hasSupportOrgan,
          supportOrganDesc: param.item.supportOrganDesc,
          bookletTypeCode: param.item.bookletTypeCode,
          refrenceReasonCode: param.item.refrenceReasonCode,
          hasDrugUsageBoolean: Boolean(Number(param.item.hasDrugUsage)),
          hasSurgeryBoolean: Boolean(Number(param.item.hasSurgery)),
          hasOtherDarmanBoolean: Boolean(Number(param.item.hasOtherDarman)),
          otherDarmanDesc: param.item.otherDarmanDesc,
        });
        param.item.committeeRequestInfoDoctorList.forEach((item, index) => {
          if (item.doctorOrganNumber == null) {
            item.doctorOrganNumber = item.doctorOrganNumberTemp;
          } else {
            item.doctorOrganNumberTemp = item.doctorOrganNumber;
          }
        });
        this.historyComponent.doctorHDataGrid.dataItems = JSON.parse(JSON.stringify(param.item.committeeRequestInfoDoctorList));
        this.historyComponent.hospitalHDataGrid.dataItems = JSON.parse(JSON.stringify(param.item.committeeRequestInfoHospitalList));

        this.historyComponent.doctorHDataGrid.dataItems.map((currentValue, index) => {
          currentValue.index = index;
        });

        this.historyComponent.hospitalHDataGrid.dataItems.map((currentValue, index) => {
          currentValue.index = index;
        });

        this.diseaseModel.doctorHistoryList = [...param.item.committeeRequestInfoDoctorList].map((item, index) => {
          item.committeeRequestInfoDoctorDocumentList.map(inerItem => {
            delete inerItem['committeeRequestInfoDoctor'];
            delete inerItem['doctorDocumentId'];
            return inerItem;
          });
          delete item['doctorId'];
          delete item['committeeRequestInfo'];
          item.index = index;
          return item;
        });

        this.diseaseModel.hospitalizationHistoryList = [...param.item.committeeRequestInfoHospitalList].map((item, index) => {
          item.committeeRequestInfoHospitalDocumentList.map(inerItem => {
            delete inerItem['committeeRequestInfoHospital'];
            delete inerItem['hospitalDocumentId'];
            return inerItem;
          });
          delete item['hospitalizedProvinceCode'];
          delete item['hospitalizedCause'];
          delete item['hospitalId'];
          delete item['committeeRequestInfo'];
          item.index = index;
          return item;
        });
        this.historyComponent.inactive = false;

        this.historyComponent.hospitalHDataGrid.dataItems = this.diseaseModel.hospitalizationHistoryList;
        this.historyComponent.doctorHDataGrid.dataItems = this.diseaseModel.doctorHistoryList;

        const diseaseItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '39';
        });
        const taminCommissionItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '44';
        });

        /*committeeRequestInfoDoctorList
        committeeRequestInfoHospitalList*/

        const bloodTestItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '79';
        });

        const angiographyItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '67';
        });

        const CTScanItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '48';
        });

        const sonographyItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '54';
        });

        const earTapeItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '52';
        });

        const outpatientRecordsItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '128';
        });

        const MRIItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '49';
        });

        const lungTapeItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '87';
        });

        const echoItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '50';
        });

        const muscleTapeItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '60';
        });

        const otherMedicalRecordsItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '86';
        });

        const graphicsItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '47';
        });

        const pathologyReportItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '66';
        });

        const writtenRequestItems = param.item.committeeRequestInfoDocumentList.filter(value => {
          return value.documentTypeId === '14';
        });

        this.documentComponent.documentForm.patchValue({
          bloodTest: bloodTestItems.length > 0,
          angiography: angiographyItems.length > 0,
          CTScan: CTScanItems.length > 0,
          sonography: sonographyItems.length > 0,
          earTape: earTapeItems.length > 0,
          outpatientRecords: outpatientRecordsItems.length > 0,
          MRI: MRIItems.length > 0,
          lungTape: lungTapeItems.length > 0,
          echo: echoItems.length > 0,
          muscleTape: muscleTapeItems.length > 0,
          otherMedicalRecords: otherMedicalRecordsItems.length > 0,
          graphics: graphicsItems.length > 0,
          pathologyReport: pathologyReportItems.length > 0,
          writtenRequest: writtenRequestItems.length > 0,
        });

        for (const item of diseaseItems) {
          this.historyComponent.diseaseGallery.downloadImage(item.documentFileId, 'گواهی پزشک معالج', item.documentTypeId, '0', true, item.documentTypeId);
          this.historyComponent.onInsertImage(this.historyComponent.diseaseGallery.images, item.documentTypeId, 2);
        }
        for (const item of taminCommissionItems) {
          this.historyComponent.taminCommissionGallery.downloadImage(item.documentFileId, 'شرکت در کمیسیون پزشکی سازمان تامین اجتماعی', item.documentTypeId, '0', true, item.documentTypeId);
          this.historyComponent.onInsertImage(this.historyComponent.taminCommissionGallery.images, item.documentTypeId, 2);
        }
        for (const item of bloodTestItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'آزمایش خون', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of angiographyItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'آنژیوگرافی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of CTScanItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'سی تی اسکن', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of sonographyItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'سونوگرافی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of earTapeItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'نوار گوش', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of outpatientRecordsItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'مدارک بیمارستانی بستری و سرپایی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of MRIItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'ام آر آی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of lungTapeItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'نوار ریه', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of echoItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'اکو', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of muscleTapeItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'نوار عضله', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of otherMedicalRecordsItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'سایر مدارک پزشکی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of graphicsItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'گرافی', item.documentTypeId, '0', true, item.documentTypeId);
        }
        for (const item of pathologyReportItems) {
          this.documentComponent.documentGallery.downloadImage(item.documentFileId, 'گزارش پاتولوژی', item.documentTypeId, '0', true, item.documentTypeId);
        }

        this.showDoctorGrid = false;
        window.scrollTo(0, 0);
        break;
    }
  }
}
