import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, SearchOperator,
  SearchParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from "tamin-framework";
import {Urls} from "../../../../../../settings/urls";

@Component({
  selector: 'app-sso-subdominant-list',
  templateUrl: './sso-subdominant-list.component.html',
  styleUrls: ['./sso-subdominant-list.component.css']
})
export class SsoSubdominantListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  searchParams: SearchParam[];

  private _overlay: any;

  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'pensionerNationalId',
        columnCaption: 'کدملی مستمری بگیر',
        columnViewType: 'Label'
      })
      .addVisibleColumn({columnName: 'pensionerId', columnCaption: 'شماره مستمری', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'nationalId', columnCaption: 'کد ملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'dependency', columnCaption: 'نسبت', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'creationTime',
        columnCaption: 'تاریخ ثبت',
        columnViewType: DataColumnViewType.PersianDate
      })
      .setShowActionColumn(true)

      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'نمایش و اصلاح',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addUrl(Urls.FAMILY_INFO)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();


  }

  onGridAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {
      case 'edit':
        // if (param.item.personal.request.status !== null && param.item.personal.request.status.requestCode !== null) {
        //   this.showErrorMessageBox('خطا', 'اطلاعات این درخواست قابل حذف یا اصلاح نمی باشد.');
        //   return;
        // }
        this.redirectTo('/sso/subdominant/' + param.item.id.toString());

        break;
      case 'delete':

        break;

    }
  }

  loadData(item) {
    this.searchParams = [];
    if (item.pensionerId !== undefined && item.pensionerId !== '' && item.pensionerId !== null) {
      this.searchParams.push({
        property: 'pensionerId',
        value: item.pensionerId,
        operator: SearchOperator.EQ

      });
    }
    if (item.pensionerNationalId !== undefined && item.pensionerNationalId !== '' && item.pensionerNationalId !== null) {
      this.searchParams.push({
        property: 'pensionerNationalId',
        value: item.pensionerNationalId,
        operator: SearchOperator.EQ

      });
    }
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.searchParams = this.searchParams;
    this.dataGrid.refreshData();
  }


  AddClick() {
    this.redirectTo('/sso/subdominant');
  }

}
