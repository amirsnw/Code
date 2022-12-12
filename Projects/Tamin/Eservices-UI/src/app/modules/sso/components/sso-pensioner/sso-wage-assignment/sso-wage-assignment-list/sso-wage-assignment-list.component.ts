import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, SearchOperator,
  SearchParam, TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup} from "@angular/forms";
import {WageAssignmentModel} from "../../../../../../models/pensioner/wageAssignment.model";
import {SubdominantInfoComponent} from "../../../../../../component/pensioner/wage-assignment/subdominant-info/subdominant-info.component";
import {Urls} from "../../../../../../settings/urls";

@Component({
  selector: 'app-sso-wage-assignment-list',
  templateUrl: './sso-wage-assignment-list.component.html',
  styleUrls: ['./sso-wage-assignment-list.component.css']
})
export class SsoWageAssignmentListComponent extends TaminPageBaseComponent {
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
      .addVisibleColumn({columnName: 'pensionerNationalId', columnCaption: 'کدملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'pensionerId', columnCaption: 'شماره مستمری', columnViewType: 'Label'})
      // .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: 'Label'})
      // .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: 'Label'})

      .addVisibleColumn({columnName: 'bankCode', columnCaption: 'بانک', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'guaranteeAmount', columnCaption: 'مبلغ ضمانت', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'requestDate',
        columnCaption: 'تاریخ درخواست',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({
        columnName: 'expireDate',
        columnCaption: 'تاریخ اعتبار',
        columnViewType: DataColumnViewType.PersianDate
      })
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
      .addUrl(Urls.SSO_WAGE_ASSIGNMENT_OLD)
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
        this.redirectTo('/sso/wage-assignment-view/' + param.item.id.toString());

        break;
      case 'delete':
        if (param.item.personal.request.status !== null && param.item.personal.request.status.requestCode !== null) {
          this.showErrorMessageBox('خطا', 'اطلاعات این درخواست قابل حذف یا اصلاح نمی باشد.');
          return;
        }
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(Urls.PersonalPost, param.item.personal.id.toString()).then(value => {
            this.hideOverlay(this._overlay);
            //this.loadData(null);
          }).catch(error => {
            this.hideOverlay(this._overlay);
          });
        }, () => {
        });
        break;

    }
  }

  loadData(item) {
    this.searchParams = [];
    if (item.pensionerId !== undefined && item.pensionerId !== '' &&item.pensionerId !== null) {
      this.searchParams.push({
        property: 'pensionerId',
        value: item.pensionerId,
        operator: SearchOperator.EQ

      });
    }
    if (item.pensionerNationalId !== undefined && item.pensionerNationalId !== ''&& item.pensionerNationalId !== null) {
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

    this.redirectTo('/sso/wage-assignment-view' );
  }

}
