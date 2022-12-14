import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, SearchOperator,
  SearchParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-wage-assignment-request-list',
  templateUrl: './sso-wage-assignment-request-list.component.html',
  styleUrls: ['./sso-wage-assignment-request-list.component.css']
})
export class SsoWageAssignmentRequestListComponent extends TaminPageBaseComponent {
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

      .addVisibleColumn({columnName: 'bank.bankName', columnCaption: 'بانک', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'bankBranch', columnCaption: 'شعبه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'guaranteeAmount', columnCaption: 'مبلغ ضمانت', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'installmentAmount', columnCaption: 'مبلغ قسط', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'installmentCount', columnCaption: 'تعداد قسط', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'creditAmount', columnCaption: 'مبلغ اعتبار', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'announcementPassword', columnCaption: 'کدرمز', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'request.status.requestDesc',
        columnCaption: 'وضعیت درخواست',
        columnViewType: 'Label'
      })
      .addVisibleColumn({columnName: 'active', columnCaption: 'ابطال شده', columnViewType: 'Label'})

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
      .addVisibleColumn({
        columnName: 'cancelDate',
        columnCaption: 'تاریخ ابطال',
        columnViewType: DataColumnViewType.PersianDate
      })
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'ابطال',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'print',
        columnCaption: 'چاپ گواهی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'print',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addUrl(Urls.SSO_WAGE_ASSIGNMENT)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.dataGrid.cellRenderer = (item, column) => {

      if (column.columnName === 'active') {
        if (!item.active) {
          return {handled: true, data: '<span><i class="icon-cancel"></span>'};
        } else {
          return {handled: true, data: '<span></span>'};
        }

      } else {
        return {handled: false, data: ''};
      }

    };

  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {

      case 'delete':
        if (!param.item.active) {
          this.showInfoMessageBox('پیام سیستم', 'درخواست ابطال شده است.');
        } else {


          this.redirectTo('/sso/wage-assignment-request/cancel/' + param.item.request.id.toString());
        }
        break;
      case 'print':
        if (!param.item.active) {
          this.showInfoMessageBox('پیام سیستم', 'درخواست ابطال شده است.');
        } else {


          this.restService
            .getBlob(Urls.SSO_WAGE_ASSIGNMENT + '/report/' + param.item.id.toString(), null)
            .then(result => {
              this.hideOverlay(this._overlay);
              const a = document.createElement('a'),
                url = URL.createObjectURL(result);
              a.href = url;
              a.download = 'wage_assignment_' + this.getPersianDate(new Date()) + '.pdf';
              document.body.appendChild(a);
              a.click();
              setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }, 0);
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        }
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
}
