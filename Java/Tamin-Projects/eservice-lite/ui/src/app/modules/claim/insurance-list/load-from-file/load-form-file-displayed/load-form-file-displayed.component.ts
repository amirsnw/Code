import { Component, EventEmitter, Injector, Output, OnInit, ViewChild } from '@angular/core';
import { Urls } from 'src/app/settings/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplayErrorModalComponent } from './display-error-modal/display-error-modal.component';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent,
  TaminModalComponent,
  TaminDocumentViewerComponent,
  PersianNumberPipe
} from 'tamin-framework';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { LoadFormfileModel } from 'src/app/models/insurance-list/loadFormfile.model';
import { DisplayInfoWorkerModalComponent } from './display-info-worker-modal/display-info-worker-modal.component';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-load-form-file-displayed',
  templateUrl: './load-form-file-displayed.component.html',
  styleUrls: ['./load-form-file-displayed.component.css']
})
export class LoadFormFileDisplayedComponent extends TaminPageBaseComponent {

  private _routerSubscription: Subscription;
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @ViewChild('displayErrorModalComponent') displayErrorModalComponent: DisplayErrorModalComponent;
  @ViewChild('displayInfoWorkerModalComponent') displayInfoWorkerModalComponent: DisplayInfoWorkerModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];

  @Output() afterSubmit = new EventEmitter<any>();
  public router: ActivatedRoute;
  public persianNumberPipe: PersianNumberPipe;
  public countNumber: number;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  private overlay: any;
  detailForm: FormGroup;
  public loadFormfileModel: LoadFormfileModel;

  private _overlay: any;

  searchParams: SearchParam[];

  initializePage() {
    this.countNumber = 0;
    this.persianNumberPipe = new PersianNumberPipe();

    this.title = 'تهیه لیست بیمه';
    this.detailForm = this.formBuilder.group({
      totalEmployeePremium: [''],
      totalEmployerPremium: [''],
      hardJobPremium: [''],
      totalUnemploymentPremium: [''],
    });
    this._initializeDataGrid();
    this.searchFormSubmit(this.router.snapshot.params['tracecode']);
    this.searchFormSubmitInfo(this.router.snapshot.params['tracecode']);
  }
  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workerHistories)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'firstName',
        columnCaption: 'نام',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'lastName',
        columnCaption: 'نام خانوادگی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'nationalCode',
        columnCaption: 'کدملی',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'insuranceNumber',
        columnCaption: 'شماره بیمه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'jobDescription',
        columnCaption: 'شغل',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'workingDays',
        columnCaption: 'کارکرد',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'dailyWage',
        columnCaption: 'دستمزد روزانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'monthlyWage',
        columnCaption: 'دستمزد ماهانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'inclusiveBenefit',
        columnCaption: 'مزایای ماهانه',
        columnViewType: DataColumnViewType.Label
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده',
        columnViewType: 'Button',
        columnActionName: 'view',
        icon: 'icon-view',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  resetForm() {
    this.detailForm.reset();
    this.taminDataGrid.searchParams = new Array<SearchParam>();
    this.taminDataGrid.refreshData();
  }


  searchFormSubmit(tracecode) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'workshopHistory.traceCode';
    searchParam.value = tracecode;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.taminDataGrid.searchParams = this.searchParams;
    this.taminDataGrid.refreshData();
  }
  searchFormSubmitInfo(tracecode) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'traceCode';
    searchParam.value = tracecode;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.restService.getAll(ClaimUrls.workshopHistories, this.searchParams, [])
      .then(data => {
        this.loadFormfileModel = data.data.list[0] as LoadFormfileModel;
        this.detailForm.patchValue(data.data.list[0]);
        if (data.data.list[0].errors.length > 0) this.displayErrorModalComponent.show(data.data.list[0].errors)
      }).catch(error => {
      });

  }
  refreshData() { }
  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;
    switch (actionColumn.columnName) {
      case 'view':
         this.displayInfoWorkerModalComponent.show(dataItem)
        break;
    }
  }

  saveForm(values) {
    if (!this.detailForm.valid) {
      return;
    }
    values.operation = "00"
    this.overlay = this.showOverlay();
    this.restService
      .update(ClaimUrls.listRecord, this.router.snapshot.params['listid'], values)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد ');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason);
      });
  }
  newCustomer() {
    this.redirectTo(`/il/list-details-item-row/${this.router.snapshot.params['listid']}`);
  }
  showErrore() {
    if (this.loadFormfileModel.errors.length > 0) this.displayErrorModalComponent.show(this.loadFormfileModel.errors)
  }
  paymentReportt() {
      return new Promise<void>((resolve, reject) => {
          const pdfUrl = `${ClaimUrls.paymentReport}/${this.loadFormfileModel.id}`;//20036856
              this.restService.getBlob(pdfUrl)
            .then(value => {
              this.documentViewer.loadPdf(URL.createObjectURL(value));
              this.theModal.show();
            })
            .catch(reason => {
                this.showErrorMessageBox('پیام سیستم', reason.error.text);
            });
      });
  }
  dataWorker() {
    const el = document.getElementById('taminDataGridstayl');
    el.style.display = "block"
  }
  approveAndExportation() {
    this.countNumber = this.countNumber + 1;
    this.overlay = this.showOverlay();
    var dataId = {
      id: this.loadFormfileModel.id
    };
    this.restService
      .update(ClaimUrls.workerHistories, this.loadFormfileModel.id.toString(), dataId)
      .then(value => {
        this.hideOverlay(this.overlay);
       // this.redirectTo(`/il/load-from-file/${this.router.snapshot.params['tracecode']}/${value.data.status.id}`);
       this.redirectTo('/il/pursue-list');
      })
      .catch(reason => {
        // this.hideOverlay(this.overlay);
        // if (reason.error.data.cause != "communication failure") {
        //   this.countNumber = 0;
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        // } else {
        //   if (this.countNumber <= 3)
        //     setTimeout(() => {
        //       this.approveAndExportation();
        //     }, 18000);
        // }
      });
  }
}
