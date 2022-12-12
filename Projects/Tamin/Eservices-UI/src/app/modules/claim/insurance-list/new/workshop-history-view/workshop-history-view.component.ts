import {Component, Injector, ViewChild} from '@angular/core';
import {ConstantsService, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-workshop-history-view',
  templateUrl: './workshop-history-view.component.html',
  styleUrls: ['./workshop-history-view.component.css']
})
export class WorkshopHistoryViewComponent extends TaminPageBaseComponent {

  private router: ActivatedRoute;
  private workshopHistoryId: string;
  @ViewChild('errorsDataGrid') errorsDataGrid: TaminDataGridComponent;
  @ViewChild('workersDataGrid') workersDataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  summary: any;
  errors: any;
  employee: any;
  private overlay: any;

  constructor(injector: Injector, private constantsService: ConstantsService) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  protected initializePage(): void {
    const id = this.router.snapshot.params['id'];
    if (!id || isNaN(Number(id))) {
      this.redirectTo('not-found');
    }
    this.workshopHistoryId = id;
    this.initializeErrorsDataGrid();
    this.initializeWorkersDataGrid();
    this.loadPageData();
  }

  protected loadPageData(): void {
    this.loadSummary();
    this.errorsDataGrid.showLoadOverlay = false;
    this.workersDataGrid.showLoadOverlay = false;
    this.errorsDataGrid.refreshData()
      .then(value => this.errorsDataGrid.showLoadOverlay = false)
      .catch(reason => this.errorsDataGrid.showLoadOverlay = false);
    this.workersDataGrid.refreshData()
      .then(value => this.workersDataGrid.showLoadOverlay = false)
      .catch(reason => this.workersDataGrid.showLoadOverlay = false);
  }

  loadSummary() {
    this.restService.getAll(ClaimUrls.workshopHistorySummary + '/' + this.workshopHistoryId)
      .then(value => {
        this.summary = value.data;
      })
      .catch(reason => {
        this.showErrorMessageBox('خطا', this.constantsService.getNetworkErrorMessage(), () => {
          this.redirectTo('il/workshop-history');
        });
      });
  }

  private initializeErrorsDataGrid() {
    this.errorsDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .setFirstLoad(false)
      .addUrl(ClaimUrls.workshopHistoryErrors + '/' + this.workshopHistoryId)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'error.errorClass.errorClassDesc', columnCaption: 'نوع', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'error.errorDescription', columnCaption: 'شرح', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.errorsDataGrid.rowStyler = (item) => {

      switch (item.error.errorClass.errorClassCode) {
        case '2':
          return {
            'background-color': '#feedb9',
            'color': 'black',
          };
        case '3':
          return {
            'background-color': '#fdc7c7',
            'color': 'black',
          };
      }
    };
  }

  private initializeWorkersDataGrid() {
    this.workersDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addUrl(ClaimUrls.workshopHistoryWorkers + '/' + this.workshopHistoryId)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'nationalCode', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'insuranceNumber', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'jobDescription', columnCaption: 'شغل', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workingDays', columnCaption: 'کارکرد (روز)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'dailyWage', columnCaption: 'دستمزد روزانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'monthlyWage', columnCaption: 'دستمزد ماهانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'wageAndBenefit', columnCaption: 'مزایای ماهانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addActionColumn({
          columnName: 'view',
          columnCaption: 'مشاهده ریز اطلاعات',
          columnViewType: 'Button',
          columnActionName: 'view',
          columnIconUrl: '',
          icon: '',
          visible: true, enable: true
        }
      )
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onItemAction(event: any) {
    this.employee = event.item;
    this.theModal.show();
  }

  onConfirm() {
    this.overlay = this.showOverlay();
    const theUrl = ClaimUrls.listConfirm + '/' + this.summary.workshopHistory.id;
    this.restService
      .create(theUrl, {})
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ارسال شد.', () => {
          this.redirectTo('il/workshop-history');
        });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('خطا', this.constantsService.getNetworkErrorMessage());
      });
  }
}
