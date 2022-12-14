import {Component, Injector, Input, ViewChild} from '@angular/core';
import {DataColumnViewType, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {debounce, filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppHelper} from '../../../settings/app-helper';
import {StageThreeFormGeneratorService} from '../form-downloader.service';

@Component({
  selector: 'app-request-list-medical-committee',
  templateUrl: './committee-request-list.component.html',
  styleUrls: ['../main-committee/main-committee.component.css'],
})
export class CommitteeRequestListComponent extends TaminPageBaseComponent {

  private overlay: any;
  @ViewChild('requestGrid') requestGrid: TaminDataGridComponent;

  /* Data Model */
  @Input() demandItem: any;
  requestItem: any;
  cardBoardMode: boolean;

  /* Constructor */
  constructor(injector: Injector, private activeRoute: ActivatedRoute,
              private route: Router, private pdfFormGenerator: StageThreeFormGeneratorService) {
    super(injector);
    route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/committee-request-list') {
          this.cardBoardMode = true;
        } else {
          this.cardBoardMode = false;
        }
      });
  }

  /* Loads Before Page Render */
  protected initializePage(): void {
  }

  /* Loads After Page Render */
  protected loadPageData(): void {
    this.initializeRequestGrid();
    if (this.cardBoardMode) {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.MedicalCommitteeLastDetails)
        .then(items => {
          if (items.data.list != null && items.data.list.length !== 0) {
            this.demandItem = items.data.list.find(item => item.refId === this.activeRoute.snapshot.data.refCode);
            this.refreshGrid();
          } else {
            throw items;
          }
          this.hideOverlay(this.overlay);
        }).catch(error => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست مورد نظر یافت نشد.', () => {
          this.redirectTo(`app-request`);
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      });
    }
  }

  /* Request Data Grid */
  private initializeRequestGrid() {
    const sortParam = new SortParam();
    sortParam.property = 'requestNumber';
    sortParam.direction = SortDirection.DESC;

    this.requestGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .clearActionColumns()
      .setFirstLoad(true)
      .addSortParam(sortParam)
      .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'requestSaveDate', columnCaption: 'تاریخ ثبت بیماری', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'requestNumber', columnCaption: 'شماره درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'illnessDesc', columnCaption: 'نام بیماری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorFullName', columnCaption: 'نام پزشک معالج', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'doctorInfoId', columnCaption: 'شماره نظام پزشکی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'mainDoctorSpeciality', columnCaption: 'تخصص پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'refrenceReasonCode', columnCaption: 'علت مراجعه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellReasonTranslator})
      .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'show',
        columnCaption: 'نمایش وضعیت',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'show',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'download',
        columnCaption: 'دانلود مدارک',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'download',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setShowPager(true)
      .setPagerSize(10)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.requestGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      if (item.status === '05' || item.status === '06') {
        result.push(actionCells.find(c => c.columnActionName === 'show'));
        result.push(actionCells.find(c => c.columnActionName === 'download'));
      }
      return result;
    };

    this.requestGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'doctorFullName') {
        const tmp = item.mainDoctorFirstName + ' ' + item.mainDoctorLastName;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'doctorInfoId' && item.doctorInfoId == null) {
        return {handled: true, data: item.doctorInfoIdTemp};
      }
      return {handled: false, data: ''};
    };

    this.requestGrid.dataItems = [];
  }

  gridCellStatusTranslator(item) {
    switch (item) {
      case '01':
        return 'ثبت درخواست';
      case '02':
        return 'در حال بررسی شعبه';
      case '03':
        return 'تایید - شعبه';
      case '04':
        return 'تایید - کمیسیون';
      case '05':
        return 'عدم تایید - شعبه';
      case '06':
        return 'عدم تایید - کمیسیون';
      default:
        return 'نامشخص';
    }
  }

  gridCellReasonTranslator(item) {
    switch (item) {
      case '02':
        return 'بیماری عادی';
      case '03':
        return 'حادثه ناشی از کار';
      case '04':
        return 'حادثه غیر ناشی از کار';
      default:
        return 'نامشخص';
    }
  }

  onRequestAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'show':
        this.requestItem = param.item;
        break;
      case 'download':
        this.requestItem = param.item;
        this.overlay = this.showOverlay();
        this.restService.getAll(`${Urls.MedicalCommitteeGetMissDocs}/${this.demandItem.demandInfoId}`)
          .then(items => {
            this.hideOverlay(this.overlay);
            if (items.data != null && items.data.list.length !== 0
              && items.data.list[0].docInfos.length !== 0) {
              let requestItems: any = {};
              items.data.list[0].docInfos.find((currentValue, index) => {
                if (currentValue.requestNo === param.item.requestNumber) {
                  requestItems = {
                    title: currentValue.documentDesc,
                    type: currentValue.docType,
                    id: index,
                    requestNo: currentValue.requestNo,
                    requestInfoId: currentValue.requestInfoId,
                    model: param.item
                  };
                  return true;
                }
              });

              if (requestItems.length > 0) {
                if (AppHelper.isWeb()) {
                  this.pdfFormGenerator.downloadForm4PdfDesktop(requestItems.requestNumber, this.demandItem.commNationalCode,
                    this.demandItem.commBirthDate, requestItems.mainDoctorFirstName,
                    requestItems.mainDoctorLastName, requestItems.mainDoctorSpeciality,
                    this.demandItem.demandInfoId, 'A', this);
                } else {
                  this.pdfFormGenerator.downloadForm4PdfMobile(requestItems.requestNumber, this.demandItem.commNationalCode,
                    this.demandItem.commBirthDate, requestItems.mainDoctorFirstName,
                    requestItems.mainDoctorLastName, requestItems.mainDoctorSpeciality,
                    this.demandItem.demandInfoId, 'A', this);
                }
              } else {
                this.showInfoMessageBox('پیام سیستم', 'موردی یافت نشد');
              }
            } else {
              this.showInfoMessageBox('پیام سیستم', 'موردی یافت نشد');
            }
          }).catch(error => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
        break;
    }
  }

  refreshGrid() {
    this.requestGrid.dataItems = this.demandItem.committeeRequestInfoList;
  }

  onBack() {
    location.href = `/view/#/app-request`;
  }
}
