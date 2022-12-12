import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../../../settings/urls';
import {AgreementComponent} from '../../common/agreement/agreement.component';
import {DataColumnViewType, OverlayService, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import { BookletPaymentModel } from '../../../models/booklet/bookletPayment.model';

@Component({
  selector: 'app-booklet-list',
  templateUrl: './booklet-list.component.html',
  styleUrls: ['./booklet-list.component.css']
})
export class BookletListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('agreement') agreement: AgreementComponent;

  private _overlay: any;
  private overlayService: OverlayService;

  // constructor(private router: Router) {
  // }

  // ngOnInit() {
  //   this._initializeDataGrid();
  // }

  initializePage() {
    this._initializeDataGrid();

  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BookletElectronicRequest)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'id', columnCaption: 'شناسه درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'bookletSsn', columnCaption: 'نام و نام خانوادگی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellNameTranslator})
      .addVisibleColumn({columnName: 'bookletSsn.insuranceId', columnCaption: 'شماره بیمه', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'requestType',
        columnCaption: 'نوع درخواست',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellRequestTypeTranslator, columnStyle: this.gridCellRequestTypeStyle
      })
      .addVisibleColumn({columnName: 'requestCreationTime', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'branchCreationTime', columnCaption: 'تاریخ صدور', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'recieveTime', columnCaption: 'تاریخ دریافت', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'printStatus', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPrintStatusTranslator})
      .addVisibleColumn({columnName: 'organization.organizationName', columnCaption: 'واحد صادر کننده', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'price', columnCaption: 'هزینه ارسال', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'user', columnCaption: 'کاربر', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellUserTranslator})
      // .addVisibleColumn({columnName: 'createdBy', columnCaption: 'کاربر', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'recieveType', columnCaption: 'نحوه دریافت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellRecieveTypeTranslator})
      .addVisibleColumn({columnName: 'errorDescription', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(true)
      .getData();
  }

  loadData(params) {
    this.dataGrid.searchParams = [];
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key].toString().trim() !== '') {
        if (key === 'requestCreationTimeFrom' || key === 'requestCreationTimeTo') {
          this.dataGrid.searchParams.push({property: key, operator: 'between', value: new Date(params[key]).getTime()});
        } else {
          this.dataGrid.searchParams.push({property: key, operator: 'eq', value: params[key]});
        }
      }
    });
    this.dataGrid.refreshData();
  }

  addNewRequestButtonClick(/*param: any*/) {
      // document.getElementById('amount').nodeValue = '100';
      //  document.getElementById('key').nodeValue = '0077849541';
      //  document.getElementById('username').nodeValue = '09124189532';
      //  document.getElementById('callback').nodeValue = 'https://eservices.tamin.ir/booklet';
      // // @ts-ignore
      //  document.getElementById('form').submit();
  



    if (this.dataGrid.dataItems !== null && this.dataGrid.dataItems.length > 0) {
      this.onAgree();
    } else {
      this.agreement.show();
    }

  }

  onAgree() {
    this.redirectTo('/booklet/new');
  }


  backToPanelClick() {
    this.redirectTo('/');
  }

  gridCellUserTranslator(item) {
    if (item !== null && item !== '') {
      return `${item.firstName} - ${item.lastName}`;
    } else {
      return '';
    }
  }

  gridCellNameTranslator(item) {
    if (item.firstName !== null && item.lastName !== null) {
      return `${item.firstName} - ${item.lastName}`;
    } else {
      return 'فاقد شماره تامین اجتماعی،لطفا پس از حذف این درخواست جهت تخصیص شماره SSN به آخرین شعبه بیمه پردازی مراجعه نمایید.';
    }
  }

  gridCellRecieveTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'حضوری';
      case '2':
        return 'پیک';
      default :
        return item;
    }
  }

  gridCellRequestTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'اولین بار';
      case '2':
        return 'تجدید';
      // case '3':
      //   return 'المثنی';
      case '4':
        return 'تامین اعتبار';
      default:
        return 'نامشخص';
    }
  }

  gridCellRequestTypeStyle(item) {
    switch (item) {
      case '1':
        return {'color': 'grey'};
      case '2':
        return {'color': 'red'};
      case '3':
        return {'color': 'blue'};
      case '4':
        return {'color': 'purple'};
    }
  }

  gridCellPrintStatusTranslator(item) {
    switch (item) {
      case '0':
        return 'ثبت درخواست';
      case '1':
        return 'صف چاپ';
      case '2':
        return 'چاپ شده';
      case '3':
        return 'بازگشت درخواست';
      case '4':
        return 'تحویل درخواست';
      default :
        return item;
    }
  }

  // cancelRegisterationRequest() {
  //   this._overlay = this.overlayService.show();
  //   this.restService.delete(`${Urls.ConflictIdentityCancel}/`, '0010705308')
  //     .then(value => {
  //       this.overlayService.hide(this._overlay);
  //       alert('انصراف از اصلاح هویت با موفقیت انجام شد');
  //       this.dataGrid.refreshData();
  //     })
  //     .catch(error => {
  //       this.overlayService.hide(this._overlay);
  //     });
  // }

  onGridAction(data) {
    const actionColumn = data.actionColumn;
    const dataItem = data.item;
    if (this.dataGrid.selectedDataItem.printStatus !== '0' && this.dataGrid.selectedDataItem.printStatus !== '3') {
      this.showErrorMessageBox('پیام سیستم', 'امکان حذف درخواستی که خاتمه یافته یا در حال پردازش شعبه می باشد وجود ندارد.');
      return;
    }

    switch (actionColumn.columnName) {
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          // const theUrl = `${Urls.BookletElectronicRequest}/delete/${this.dataGrid.selectedDataItem.id}`;
          const theUrl = `${Urls.BookletElectronicRequest}/delete`;
          this.restService.delete(theUrl, this.dataGrid.selectedDataItem.id.toString())
            .then(value => {
              this.dataGrid.refreshData();
              this.hideOverlay(this._overlay);
            })
            .catch(error => {
              this.hideOverlay(this._overlay);
            });
        }, () => {
        });
        break;
    }
  }
}
