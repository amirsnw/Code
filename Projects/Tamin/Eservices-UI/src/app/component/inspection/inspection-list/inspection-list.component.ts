import {Component, Injector, ViewChild} from '@angular/core';
import {InspectionModel} from 'src/app/models/inspection/inspection.model';
import {Urls} from '../../../settings/urls';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {sanitizeHtml} from '@angular/core/src/sanitization/sanitization';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('documentViewerModal') documentViewerModal: TaminDocumentViewerModalComponent;
  items: InspectionModel[];
  private _overlay: any;
  private subscription = new Subscription();
  pageTitle = '';

  constructor(injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'inspectionNo', columnCaption: 'شناسه بازرسی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceNo', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopNo', columnCaption: 'شماره کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'relationType', columnCaption: 'نوع ارتباط با کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'inspectionDate', columnCaption: 'تاریخ بازرسی', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'activityDesc', columnCaption: 'نوع فعالیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchdesc', columnCaption: 'شعبه تامین اجتماعی', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'details',
        columnCaption: 'جزییات',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'details',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
        columnName: 'objection',
        columnCaption: 'اعتراض',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'objection',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();

    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'details'));
      if (item.objectable === '1') {
        result.push(actionCells.find(c => c.columnActionName === 'objection'));
      }
      return result;
    };
  }

  initializePage() {
    this.initializeDataGrid();
  }

  protected loadPageData(): void {
    this.subscription.add(this.activatedRoute.params.subscribe(params => {
      switch (this.activatedRoute.snapshot.params['state']) {
        case '0':
          this.dataGrid.serviceUrl = Urls.InspectionList;
          this.pageTitle = 'در صورتیکه در بازرسی های انجام شده از کارگاه محل اشتغال ،شماره بیمه شما ثبت شده باشد، میتوانید از این فرم جهت مشاهده بازرسی استفاده نمایید.';
          this.dataGrid.refreshData();
          break;
        case '1':
          this.dataGrid.serviceUrl = Urls.InspectionListManager;
          const message = '<p>کارفرمایان گرامی توجه داشته باشید</p>' +
            '<p><i class="icon-ok"></i><span>در این قسمت لیست بازرسی های انجام شده از کارگاه هایی که دارای ارتباط کارفرمایی با شما می باشد نمایش داده میشود.</span></p>' +
            '<p><i class="icon-ok"></i><span>اعتراض به بازرسی فقط برای آخرین بازرسی انجام شده سال جاری امکان پذیر است.</span></p>' +
          '<p><i class="icon-ok"></i><span>جهت اعتراض به بدهی های خود از منوی مدیریت بدهی و گزینه اعتراض به بدهی اقدام نمایید.</span></p>';

          // this.pageTitle = 'در این قسمت لیست بازرسی های انجام شده از کارگاه هایی که دارای ارتباط کارفرمایی با شما می باشند نمایش داده میشود.';
          this.pageTitle = message;
          this.dataGrid.refreshData();
          break;
        default:
          this.redirectTo('/');
      }
    }));
  }

  destroyPage() {
    this.subscription.unsubscribe();
  }

  onShowReport(data) {
    const inspectionNumber = data.item.inspectionNo;
    const insuranceNumber = data.item.insuranceNo;
    switch (data.actionColumn.columnName) {
      case 'details' :
        this._overlay = this.showOverlay();
        this.restService.getBlob(`${Urls.InspectionReport}/${inspectionNumber}`)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.documentViewerModal.openPdf(URL.createObjectURL(value));
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        this.pageTitle = 'در صورتیکه در بازرسی های انجام شده از کارگاه محل اشتغال ،شماره بیمه شما ثبت شده باشد، میتوانید از این فرم جهت مشاهده بازرسی استفاده نمایید.';
        break;
      case 'objection' :
        const theUrl = `inspection-objection/${inspectionNumber}/${insuranceNumber}`;
        this.pageTitle = 'در این قسمت لیست بازرسی های انجام شده از کارگاه هایی که دارای ارتباط کارفرمایی با شما می باشد نمایش داده میشود.';
        this.redirectTo(theUrl);
        break;
    }
  }

  afterLoadReport() {
    this.hideOverlay(this._overlay);
  }

  beforeLoadReport() {
    this._overlay = this.showOverlay();
  }

  onError() {
    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  }
}
