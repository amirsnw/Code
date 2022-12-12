import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent, TaminDataGridComponent, SearchParam, OverlayService, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerModalComponent, TaminPdfViewerComponent } from 'tamin-framework';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-register-property-registration',
  templateUrl: './register-property-registration.component.html',
  styleUrls: ['./register-property-registration.component.css']
})
export class RegisterPropertyRegistrationComponent extends TaminPageBaseComponent {

  @ViewChild('RegisterPropertyRegistrationGrid') RegisterPropertyRegistrationGrid: TaminDataGridComponent;
  @ViewChild('pdfViewer') pdfViewer: TaminPdfViewerComponent;

  searchParams: SearchParam[];
  registerPropertyRegistrationSearchForm: FormGroup;
  private _overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroup();
    this._initializeDataGrid();
  }

  private _initializeFromGroup() {
    this.title = 'وضعیت بدهی کارگاه';
    this.registerPropertyRegistrationSearchForm = this.fb.group({
      workshopId: [''],
      branchCode: ['']
    });
  }

  private _initializeDataGrid() {
    this.RegisterPropertyRegistrationGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.registerPropertyRegistration)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'id', columnCaption: 'کد رهگیری/tracking code', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'createDatePersian', columnCaption: 'تاریخ درخواست/request\'s date', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshop.workshopId', columnCaption: 'کد کارگاه/workshop id', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshop.workshopName', columnCaption: 'نام کارگاه/workshop\'s name', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshop.branch.organizationName', columnCaption: 'شعبه/branch', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshop.character.characterDesc', columnCaption: 'شخصیت کارگاه/character', columnViewType: 'Label' })
      // .addVisibleColumn({ columnName: 'workshop.workshopStatus.workshopStatusDesc', columnCaption: 'وضعیت کارگاه/status', columnViewType: 'Label' })
      // .addVisibleColumn({ columnName: 'workshop.workshopActivity.activityDesc', columnCaption: 'فعالیت', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'officeName', columnCaption: 'واحد درخواست کننده/office\'s name', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'status', columnCaption: 'وضعیت/status', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getRequestStatus })
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
        // isActionAuthorized: true,
        //icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.RegisterPropertyRegistrationGrid.actionRender = (item, actionCells) => {
      const result = [];
      if (item.status == '2')
        result.push(actionCells.find(c => c.columnActionName === 'showInspectionReport'));
      return result;
    };
  }

  getRequestStatus(item) {
    if (item != null) {
      switch (item) {
        case '1':
          return 'در انتظار بازرسی';
        case '2':
          return 'اتمام بازرسی';
      }
    } else {
      return '-';
    }
  }

  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.registerPropertyRegistrationSearchForm.get('workshopId').value;
    const branchCode = this.registerPropertyRegistrationSearchForm.get('branchCode').value;
    if (workshopId != undefined && workshopId !== '') {
      this.searchParams.push({
        property: 'workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (branchCode != undefined && branchCode !== '') {
      this.searchParams.push({
        property: 'branchCode',
        value: branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.RegisterPropertyRegistrationGrid.pagerCurrentPage = 1;
    this.RegisterPropertyRegistrationGrid.searchParams = this.searchParams;
    this.RegisterPropertyRegistrationGrid.refreshData();
  }
  resetForm() {
    this.searchParams = new Array<SearchParam>();
    this.RegisterPropertyRegistrationGrid.pagerCurrentPage = 1;
    this.RegisterPropertyRegistrationGrid.searchParams = this.searchParams;
    this.RegisterPropertyRegistrationGrid.refreshData();
    this.registerPropertyRegistrationSearchForm.reset();
  }

  onGridAction(param: any) {
    const me = this;
    const actionColumn = param.actionColumn.columnActionName;
    const data = param.item;
    if (actionColumn === 'showInspectionReport') {
      if (actionColumn === 'showInspectionReport') {
        this._overlay = this.showOverlay();
        this.pdfViewer.open(`${Urls.InspectionLegalReport}/` + data.wisInsno);
        this.hideOverlay(this._overlay);
      }
    }
  }

}
