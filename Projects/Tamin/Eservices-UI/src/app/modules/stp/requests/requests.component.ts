import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {TaminActionColumn} from 'tamin-framework/lib/models/tamin-action-column.model';
import {StpRequestViewComponent} from './stp-request-view/stp-request-view.component';
import {StpUrls} from '../stp-urls';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  @ViewChild('requestTypes') requestTypes: TaminFieldComboBoxComponent;
  @ViewChild('systemTypes') systemTypes: TaminFieldComboBoxComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('stpRequestView') stpRequestView: StpRequestViewComponent;
  private _overlay: any;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      requestId: [''],
      requestHelpTypeDescs: [''],
      requestDate: [''],
      reqHlpTypes: [''],
    });
    this._initializeRequestTypeComboBox();
    this._initializeSystemTypeComboBox();
  }

  protected loadPageData(): void {
    this._initializeDataGrid();
    this.dataGrid.sortParams.push({direction: 'DESC', property: 'request.requestId'});
    this.dataGrid.refreshData();
  }

  private _initializeRequestTypeComboBox() {
    this.requestTypes.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(StpUrls.STP_RequestType)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'requestDesc', columnCaption: 'عنوان', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('')
      .setPagerCurrentPage(1)
      .setPagerSize(100)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeSystemTypeComboBox() {
    this.systemTypes.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(StpUrls.STP_SystemType)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'statusName', columnCaption: 'عنوان', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('')
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(StpUrls.STP_Requests)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'request.requestId', columnCaption: 'سریال درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'identity.insuranceFamily', columnCaption: 'نام و نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'identity.insuranceName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'identity.nationalCode', columnCaption: 'شماره ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'requestHelpTypeDesc', columnCaption: 'نوع درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'request.requestDate', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'request.statusName', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'shorttemRequestId', columnCaption: 'سریال درخواست سامانه متمرکز', columnViewType: DataColumnViewType.Label})
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'نمایش و پیگیری',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'view',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'اصلاح',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: ' ',
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
      // .addActionColumn({
      //   columnName: 'result',
      //   columnCaption: 'نتیجه اقدامات',
      //   columnViewType: 'Button',
      //   columnIconUrl: '',
      //   icon: '',
      //   columnActionName: 'result',
      //   isActionAuthorized: false,
      //   visible: true,
      //   enable: true
      // })
      // .addActionColumn({
      //   columnName: 'followup',
      //   columnCaption: 'پیگیری درخواست',
      //   columnViewType: 'Button',
      //   columnIconUrl: '',
      //   icon: '',
      //   columnActionName: 'followup',
      //   isActionAuthorized: false,
      //   visible: true,
      //   enable: true
      // })
      .setActionColumnCaption('')
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();

    this.dataGrid.actionRenderer = (item: any, actionCells: Array<TaminActionColumn>) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'view'));
      // result.push(actionCells.find(c => c.columnActionName === 'followup'));
      if (item.request.statusId === '0') {
        result.push(actionCells.find(c => c.columnActionName === 'delete'));
      }
      if (item.request.statusId === '0' || item.request.statusId === '4') {
        result.push(actionCells.find(c => c.columnActionName === 'edit'));
      }
      return result;
    };

  }

  onAction(data) {
    let url = '';
    switch (data.actionColumn.columnName) {
      case 'view':
        switch (data.item.requestHelpType) {
          case '01' :
            url = 'stp/indemnity-view/';
            break;
          case '02' :
            url = 'stp/pregnancy-view/';
            break;
          case '05' :
            url = 'stp/marriage-view/';
            break;
          case '04' :
            url = 'stp/orthosis-prosthesis-view/';
            break;
          case '07' :
            url = 'stp/funeral-view/';
            break;
        }
        this.redirectTo(url + data.item.request.requestId);
        break;
      case 'edit':
        switch (data.item.requestHelpType) {
          case '01' :
            url = 'stp/indemnity/';
            break;
          case '02' :
            url = 'stp/pregnancy/';
            break;
          case '05' :
            url = 'stp/marriage/';
            break;
          case '04' :
            url = 'stp/orthosis-prosthesis/';
            break;
          case '07' :
            url = 'stp/funeral/';
            break;
        }
        this.redirectTo(url + data.item.request.requestId);
        break;
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(StpUrls.STP_DeleteRequest, data.item.request.requestId.toString())
            .then(value => {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت حذف شد.', () => {
                this.dataGrid.refreshData();
              });
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        }, () => {
        });
        break;
      case 'result':
        this.redirectTo(`stp/request-result/${data.item.request.requestId.toString()}`);
        break;
      case 'followup':
        if (data.item.shorttemRequestId === '' || data.item.shorttemRequestId === undefined || data.item.shorttemRequestId === null) {
          this.showInfoMessageBox('پیام سیستم', 'این درخواست در سامانه متمرکز ثبت نشده است.');
          return;
        }

        this._overlay = this.showOverlay();
        this.restService.getAll(StpUrls.STP_shorttermPursuit + '/' + data.item.shorttemRequestId)
          .then(value => {
            this.hideOverlay(this._overlay);
            if (value.data.list[0].stat !== null || value.data.list[0].stat !== undefined) {
              this.showInfoMessageBox('پیام سیستم', ' درخواست شما در مرحله ' + value.data.list[0].stat + ' میباشد. ');
            } else {
              this.showInfoMessageBox('پیام سیستم', 'این شماره سریال موجود نمیباشد.');
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  search() {
    const values = this.theForm.getRawValue();
    const searchParams = [];
    if (values.requestId && values.requestId !== '') {
      searchParams.push({property: 'request.requestId', value: values.requestId, operator: 'EQUAL'});
    }

    if (values.requestHelpTypeDescs && values.requestHelpTypeDescs !== '') {
      searchParams.push({property: 'requestHelpType', value: values.requestHelpTypeDescs, operator: 'EQUAL'});
    }

    if (values.requestDate && values.requestDate !== '') {
      const tmp = new Date(values.requestDate);
      const tmpString = `${tmp.getFullYear()}/${(tmp.getMonth() + 1)}/${tmp.getDate()}`;
      searchParams.push({property: 'request.requestDate', value: tmpString, operator: 'EQUAL'});
    }

    if (values.reqHlpTypes && values.reqHlpTypes !== '') {
      searchParams.push({property: 'request.status', value: values.reqHlpTypes, operator: 'EQUAL'});
    }

    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.pagerCurrentPage = 1;
      this.dataGrid.refreshData();
    }
  }

  showAll() {
    this.theForm.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.refreshData();
  }
}
