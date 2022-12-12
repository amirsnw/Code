import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  TaminDataGridComponent, TaminDataColumn, DataColumnViewType, TaminDocumentViewerComponent,
  TaminDataGridConfigurationFactory, TaminPageBaseComponent,
  TaminModalComponent, TaminTabComponent
} from 'tamin-framework';
import { CloneListModel } from 'src/app/models/insurance-list/cloneList.model';
import { Urls } from 'src/app/settings/urls';
import { TaminActionColumn } from 'tamin-framework/lib/models/tamin-action-column.model';
import { CloneListModalComponent } from '../clone-list-modal/clone-list-modal.component';
import { FormGroup, Validators } from '@angular/forms';
import {ClaimUrls} from '../../../claim-urls';

@Component({
  selector: 'app-clone-list-list',
  templateUrl: './clone-list-list.component.html',
  styleUrls: ['./clone-list-list.component.css']
})
export class CloneListListComponent extends TaminPageBaseComponent {

  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('theNewModal') theNewModal: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  // @ViewChild('theNewModal') theNewModal: NewRequestComponent;
  public restUrl;
  newForm: FormGroup;

  items: CloneListModel[];
  private overlay: any;
  private dataItem: any;
  selectedItem: CloneListModel;
  visibleColumns: TaminDataColumn[];
  public restUrlCloneListPut;
  public Askyear;
  public Askmon;
  public AskmcurrentYear;
  public AskmcurrentMonth;
  searchParams: any[] = [];
  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];

  initializePage() {
    this._initializeDataGrid();
    this.newForm = this.formBuilder.group({
      displayDate: [''],//, Validators.required
      newDate: [''],
    });

  }
  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.workshopHistories)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'workshop.code',
        columnCaption: 'شماره کارگاه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'year',
        columnCaption: 'سال',
        columnViewType: DataColumnViewType.Label,
      })
      .addVisibleColumn({
        columnName: 'month.monthDescription',
        columnCaption: 'ماه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'creationTime',
        columnCaption: 'تاریخ ارسال',
        columnViewType: DataColumnViewType.PersianDate,
      })
      .addVisibleColumn({
        columnName: 'summary.employeesCount',
        columnCaption: 'تعدا نفرات',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'summary.totalMonthlyWages',
        columnCaption: 'جمع دستمزد ماهانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'summary.totalInclusiveBenefit',
        columnCaption: 'جمع مزایای مشمول ماهانه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'summary.totalEmployeePremium',
        columnCaption: 'حق بیمه سهم بیمه شده',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'summary.totalEmployerPremium',
        columnCaption: 'حق بیمه سهم کارفرما',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'summary.totalUnemploymentPremium',
        columnCaption: 'حق بیمه بیکاری',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'traceCode',
        columnCaption: 'شماره پیگیری',
        columnViewType: DataColumnViewType.Label
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(true)
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'کپی',
        columnViewType: 'Button',
        columnActionName: 'edit',
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onGridAction(param: any) {
    this.dataItem = param.item;
    if (param.actionColumn.columnName === 'edit') {
      this.newForm.get('displayDate').setValue(`${this.dataItem.year}/${this.dataItem.month.code}`);
      this.theModal.show();
    }
  }

  newClick() {
    this.selectedItem = undefined;
    this.redirectTo(`/request/edit${-1}`);
  }

  backToPanelClick() {
    this.redirectTo('/main');
  }

  loadPageData() {
  }
  newFormSubmit(value, valid) {
    if (value.newDate != null && value.newDate != '') {
      var dateSelected = this.getPersianDate(value.newDate).split('/');
      this.Askyear = this.dataItem.year;
      this.Askmon = this.dataItem.month.code;
      this.AskmcurrentYear = dateSelected[0];
      this.AskmcurrentMonth = dateSelected[1];
      this.theNewModal.show();
    }
    else {
      this.showErrorMessageBox('پیام سیستم', 'تاریخ جدید را وارد کنید.');
    }
  }
  AskYes(value, valid) {
    var dateSelected = this.getPersianDate(value.newDate).split('/');
    var data = [{
      mon: this.dataItem.month.code,
      year: this.dataItem.year,
      workshopId: this.dataItem.workshop.id,
      currentYear: dateSelected[0],
      currentMonth: dateSelected[1]
    }];
    this.overlay = this.showOverlay();
    this.restService.create(`${ClaimUrls.customURL}/copy`, data)
    .then(value => {
      this.hideOverlay(this.overlay);
      this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت اضافه شد ');
      this.theNewModal.hide();
      this.redirectTo('/il/clone-list');
    })
    .catch(reason => {
      this.hideOverlay(this.overlay);
      this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
    });
  }
  AskNo(value, valid) {
    var dateSelected = this.getPersianDate(value.newDate).split('/');
    var data = [{
      mon: this.dataItem.month.code,
      year: this.dataItem.year,
      workshopId: this.dataItem.workshop.id,
      currentYear: dateSelected[0],
      currentMonth: dateSelected[1]
    }];
    this.overlay = this.showOverlay();
    this.restService.create(`${ClaimUrls.customURL}/copy/edit`, data)
    .then(value => {
      this.hideOverlay(this.overlay);
      this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ویرایش شد ');
      this.theNewModal.hide();
      this.redirectTo('/il/list-full-operation');
    })
    .catch(reason => {
      this.hideOverlay(this.overlay);
      this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
    });
  }
  hide() {
    this.theModal.hide();
  }
  Askhide() {
    this.theNewModal.hide();
  }
}
