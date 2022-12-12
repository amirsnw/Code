import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { SsoWorkshopInsuranceProcrastinationNewComponent } from '../sso-workshop-insurance-procrastination-new/sso-workshop-insurance-procrastination-new.component';

@Component({
  selector: 'sso-app-workshop-insurance-procrastination-list',
  templateUrl: './sso-workshop-insurance-procrastination-list.component.html',
  styleUrls: ['./sso-workshop-insurance-procrastination-list.component.css']
})
export class SsoWorkshopInsuranceProcrastinationListComponent extends TaminPageBaseComponent {
  @ViewChild('ssoWorkshopInsuranceProcrastination') SsoWorkshopInsuranceProcrastinationComponent: SsoWorkshopInsuranceProcrastinationNewComponent;
  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;
  @Output() sendRecord = new EventEmitter<any>();
  private overlay: any;
  private rowData: any;
  searchParams: SearchParam[];
  employerSearchForm: FormGroup;

  initializePage() {
    this._initializeDataGrid();
    // this.loadData();
  }

  loadPageData() {
    this.loadData();
  }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'activityName', columnCaption: 'فعالیت ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.code', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'branch.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setShowActionColumn(true)
      .setRowDeletable(false)
      .setFirstLoad(false)
      .setRowEditable(false)
      .addActionColumn({
        columnName: 'action',
        columnCaption: 'ثبت نام',
        columnViewType: 'Button',
        columnActionName: 'action',
        icon: '',
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'approve',
        columnCaption: 'تایید',
        columnViewType: 'Button',
        columnActionName: 'approve',
        icon: '',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;
    if (actionColumn.columnName === 'action') {
      this.SsoWorkshopInsuranceProcrastinationComponent.show(dataItem, true);
    }
    if (actionColumn.columnName === 'approve') {
      this.rowData = dataItem;
      this.checkProcrastinationIsExsit(dataItem);
    }
  }
  loadData(item = null) {
    if (item == null || item.nationalCode == "" && item.workshopId == "" && item.branchCode == "") return;
    this.searchParams = [];
    debugger;
    if (item.ticketCode == null || item.ticketCode == '') {
      alert('وارد نمودن کد اعتباری کارفرما الزامیست');
      return;
    }
    else if (item.nationalCode == null || item.nationalCode == '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (item && item.workshopId !== undefined && item.workshopId !== '' && item.workshopId !== null) {
      this.searchParams.push({
        property: 'workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item && item.nationalCode !== undefined && item.nationalCode !== '' && item.nationalCode !== null) {
      this.searchParams.push({
        property: 'nationalCode',
        value: item.nationalCode,
        operator: SearchOperator.EQ

      });
    }
    if (item && item.ticketCode !== undefined && item.ticketCode !== '' && item.ticketCode !== null) {
      this.searchParams.push({
        property: 'ticketCode',
        value: item.ticketCode,
        operator: SearchOperator.EQ
      });
    }
    if (item && item.branchCode !== undefined && item.branchCode !== '' && item.branchCode !== null) {
      this.searchParams.push({
        property: 'branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.searchParams.push({
      property: 'serviceName',
      value: 'workshopProcrastination',
      operator: SearchOperator.EQ

    });
    this.workshopListGrid.pagerCurrentPage = 1;
    this.workshopListGrid.serviceUrl = `${Urls.employerWorkshopsCRM}`;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
  }

  onItemSelect(param: any) {
    this.sendRecord.emit(param);
  }

  onLoadData(params: any) {
    this.loadData(params);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  checkProcrastinationIsExsit(dataItem) {
    this.hideOverlay(this.overlay);
    this.restService
      .getById(`${Urls.SSO_getInsuranceProcrestination}`, `${dataItem.workshopId}/${dataItem.branchCode}`)
      .then(value => {
        this.hideOverlay(this.overlay);
        if (value.data.length > 0 && value.data[0].mastcustcrisisId != null) {
          this.isApprovehide(value.data[0]);
        } else {
          this.showErrorMessageBox('پیام سیستم', 'ابتدا به ثبت درخواست اقدام نموده و سپس از دکمه تایید استفاده نمایید.');
        }
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
        }
      });
  }
  isApprovehide(value) {
    var workshop = {
      workshopId: this.rowData.workshopId,
      branchCode: this.rowData.branchCode
    }
    var object = {
      mastcustcrisisId: value.mastcustcrisisId,
      workshop: workshop,
    };
    let message = '';
    message = '';
    message += '<div>';
    message += '<p>ماه های انتخاب شده جهت امهال حق بیمه به شرح ذیل میباشد:</p>';
    message += '<ul>';
    if (value.selected1)
      message += `<li>اسفند ماه  سال 1398 -  درصد حق بیمه سهم کارفرما: ${value.yeramon1} درصد </li>`;
    if (value.selected2)
      message += `<li>فروردین ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${value.yeramon2} درصد </li>`;
    if (value.selected3)
      message += `<li>اردیبهشت ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${value.yeramon3} درصد </li>`;
    message += '</ul>';
    if (value.approveDateTime != null && value.approveDateTime != "")
      message += `<p style="font-weight: bold;color: #2aa1c0;">آخرین تاریخ تائید و ارسال به شعبه: ${this.getPersianDate(value.approveDateTime)} </p>`;
    message += '<p>آیا از تایید نهایی اطمینان دارید؟</p>';
    message += '</div>';

    this.showQuestionBox('پیام سیستم', message, () => {
      this.overlay = this.showOverlay();
      this.restService
        .update(`${Urls.SSO_approveInsuranceProcrestination}`, value.mastcustcrisisId.toString(), object)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.loadData();
          const msg = 'وضعیت با موفقیت تایید شد.';
          this.showInfoMessageBox('توجه', msg);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          // this.loadData();
          // const msg = 'وضعیت با موفقیت تایید شد.';
          // this.showInfoMessageBox('توجه', msg);
          if (reason.error.status == 404) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 500) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 200) {
            this.showErrorMessageBox('پیام سیستم', 'وضعیت با موفقیت تایید شد');
          }
        });
    }, () => {
      return;
    });
  }
}
