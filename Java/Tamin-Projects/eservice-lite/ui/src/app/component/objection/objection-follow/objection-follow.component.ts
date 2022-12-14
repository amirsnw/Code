import {Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ObjectionDetailComponent} from 'src/app/component/objection/objection-detail/objection-detail.component';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-objection-follow',
  templateUrl: './objection-follow.component.html',
  styleUrls: ['./objection-follow.component.css']
})
export class ObjectionFollowComponent extends TaminPageBaseComponent {

  @ViewChild('objectionGrid') objectionGrid: TaminDataGridComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('objectionDetail') objectionDetail: ObjectionDetailComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('container', {read: ViewContainerRef}) container;
  objectionSearchForm: FormGroup;
  searchObjectionParams: SearchParam[];
  private overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }


  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeObjectionGrid();
  }

  private _initializeFromGroupSearch() {
    this.objectionSearchForm = this.fb.group({
      workshopId: [''],
      seqNo: [''],
      debitNumber: ['']
    });
  }


  private _initializeObjectionGrid() {
    this.objectionGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.ObjectionAll)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'seqNo', columnCaption: 'شماره اعتراض', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'objectionDate', columnCaption: 'تاریخ اعتراض', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'objectionDesc', columnCaption: 'شرح اعتراض ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'voteType.voteTypeDesc', columnCaption: 'نوع رای ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({
        columnName: 'status',
        columnCaption: 'وضعیت درخواست',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator, columnStyle: this.gridCellStatusTypeStyle
      })
      .addVisibleColumn({
        columnName: 'objectionType',
        columnCaption: 'نوع درخواست',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellObjectionTypeTranslator
      })
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده اعتراض',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewObjection',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده پیامک ها',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewDetail',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'viewObjection':
        this.overlay = this.showOverlay();
        this.loadPdf(param)
          .then(value => {
            this.hideOverlay(this.overlay);
            this.theModal.show();
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
      case 'viewDetail':
        this.container.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ObjectionDetailComponent);
        const componentRef = this.container.createComponent(componentFactory);
        this.changeDetectorRef.detectChanges();
        componentRef.instance.open(param.item.seqNo);
        break;
    }
  }

  gridCellStatusTranslator(item) {
    switch (item) {
      case '1':
        return 'ثبت درخواست';
      case '2':
        return 'بازنگري محاسبات';
      case '3':
        return 'طرح در هيئت';
      case '4':
        return 'تجدید محاسبه شده';
      case '5':
        return 'تخصیص زمان';
      case '6':
        return 'تایید رای';
      default:
        return 'نامشخص';
    }
  }

  gridCellStatusTypeStyle(item) {
    switch (item) {
      case '1':
        return {'color': 'grey'};
      case '2':
        return {'color': 'red'};
      case '3':
        return {'color': 'blue'};
      case '4':
        return {'color': 'purple'};
    }
  }

  gridCellObjectionTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'اعتراض به بدهی برآوردی';
      case '2':
        return 'اعتراض به رای هیئت بدوی';
      case '3':
        return 'درخواست رسیدگی به بدهی قطعی موضوع ماده 16 آیین نامه هیئت ها';
    }
  }

  loadPdf(data) {
    return new Promise<void>((resolve, reject) => {
      if (data.item.seqNo) {
        let pdfUrl;
        switch (data.item.objectionType) {
          case '1':
          case '2':
            pdfUrl = `${Urls.ObjectionReports}/objection/${data.item.seqNo}`;
            break;
          case '3':
            pdfUrl = `${Urls.ObjectionReports}/comitte/${data.item.seqNo}`;
            break;
        }
        this.restService.getBlob(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  onSearchSubmit() {
    this.searchObjectionParams = new Array<SearchParam>();
    const workshopId = this.objectionSearchForm.get('workshopId').value;
    const seqNo = this.objectionSearchForm.get('seqNo').value;
    const debitNumber = this.objectionSearchForm.get('debitNumber').value;
    if (workshopId !== undefined && workshopId !== '' && workshopId !== null) {
      this.searchObjectionParams.push({
        property: 'workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (seqNo !== undefined && seqNo !== '' && seqNo !== null) {
      this.searchObjectionParams.push({
        property: 'seqNo',
        value: seqNo,
        operator: SearchOperator.EQ

      });
    }
    if (debitNumber !== undefined && debitNumber !== '' && debitNumber !== null) {
      this.searchObjectionParams.push({
        property: 'debitNumber',
        value: debitNumber,
        operator: SearchOperator.EQ

      });
    }
    this.objectionGrid.pagerCurrentPage = 1;
    this.objectionGrid.searchParams = this.searchObjectionParams;
    this.objectionGrid.refreshData();
  }

  resetObjectionForm() {
    this.searchObjectionParams = new Array<SearchParam>();
    this.objectionGrid.searchParams = this.searchObjectionParams;
    this.objectionGrid.refreshData();
    this.objectionSearchForm.reset();
  }
}
