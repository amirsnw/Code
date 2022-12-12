import { Component, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaminDataGridComponent, TaminPageBaseComponent, OverlayService, SearchParam, TaminDataGridConfigurationFactory, SearchOperator, DataColumnViewType, TaminPdfViewerComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-business-starters-indicator',
  templateUrl: './business-starters-indicator.component.html',
  styleUrls: ['./business-starters-indicator.component.css']
})
export class BusinessStartersIndicatorComponent extends TaminPageBaseComponent {

  @ViewChild('BusinessStartersIndicatorGrid') BusinessStartersIndicatorGrid: TaminDataGridComponent;
  @ViewChild('pdfViewer') pdfViewer: TaminPdfViewerComponent;

  searchParams: SearchParam[];
  businessStartersIndicatorSearchForm: FormGroup;
  private _overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroup();
    this._initializeDataGrid();
  }

  private _initializeFromGroup() {
    this.businessStartersIndicatorSearchForm = this.fb.group({
      legalId: ['']
    });
  }
  private _initializeDataGrid() {
    this.BusinessStartersIndicatorGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.InspectionBusinessStarterIndicator)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'requestId', columnCaption: 'کد رهگیری/tracking code', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'requestDatePersian', columnCaption: 'تاریخ درخواست/request\'s date', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'legalId', columnCaption: 'شناسه ملی/national id', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'نام شرکت/workshop\'s name', columnViewType: 'Label' })
      //.addVisibleColumn({ columnName: 'workshopAddress', columnCaption: 'workshop\'s address', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'provinceName', columnCaption: 'استان/province', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'status', columnCaption: 'وضعیت/status', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getRequestStatus })
      .addVisibleColumn({ columnName: 'branchName', columnCaption: 'شعبه/branch', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه/workshop id', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .setActionColumnCaption('عملیات/operation')
      .addActionColumn({
        columnName: 'showInspectionReport',
        columnCaption: 'مشاهده گزارش بازرسی',
        columnViewType: 'Button',
        columnActionName: 'showInspectionReport',
        isActionAuthorized: true,
        // icon: 'icon-report',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.BusinessStartersIndicatorGrid.actionRender = (item, actionCells) => {
      const result = [];
      if (item.workshopId != null)
        result.push(actionCells.find(c => c.columnActionName === 'showInspectionReport'));
      return result;
    };
  }

  getRequestStatus(item) {
    if (item != null) {
      switch (item) {
        case '1':
          return 'در انتظار تخصیص به شعبه';
        case '2':
          return 'تخصیص به شعبه';
        case '3':
          return 'اخذ کد کارگاهی';
      }
    } else {
      return '-';
    }
  }

  getInspectionReportStatus(item) {

  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const legalId = this.businessStartersIndicatorSearchForm.get('legalId').value;
    if (legalId != undefined && legalId !== '') {
      this.searchParams.push({
        property: 'legalId',
        value: legalId,
        operator: SearchOperator.EQ

      });
    }
    this.BusinessStartersIndicatorGrid.pagerCurrentPage = 1;
    this.BusinessStartersIndicatorGrid.searchParams = this.searchParams;
    this.BusinessStartersIndicatorGrid.refreshData();
  }
  resetForm() {
    this.searchParams = new Array<SearchParam>();
    this.BusinessStartersIndicatorGrid.pagerCurrentPage = 1;
    this.BusinessStartersIndicatorGrid.searchParams = this.searchParams;
    this.BusinessStartersIndicatorGrid.refreshData();
    this.businessStartersIndicatorSearchForm.reset();
  }

  onGridAction(param: any) {
    const me = this;
    const actionColumn = param.actionColumn.columnActionName;
    const data = param.item;
    if (actionColumn === 'showInspectionReport') {
      this._overlay = this.showOverlay();
      this.pdfViewer.open(`${Urls.InspectionLegalReport}/` + data.inspectionNo);
      this.hideOverlay(this._overlay);
    }
  }

}
