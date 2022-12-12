import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Urls} from '../../../settings/urls';
import {AgreementComponent} from '../../common/agreement/agreement.component';
import {DataColumnViewType, OverlayService, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-booklet-cart',
  templateUrl: './booklet-cart.component.html',
  styleUrls: ['./booklet-cart.component.css']
})
export class BookletCartComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

 
  private _overlay: any;
  private overlayService: OverlayService;


  initializePage() {
    this._initializeDataGrid();

  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BookletOrder)
      .setShowPager(true)
      .setFirstLoad(false)
      // .addVisibleColumn({columnName: 'id', columnCaption: 'شناسه درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({
        columnName: 'orderHead.requestType',
        columnCaption: 'نام خدمت',
        columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator
      })
      .addVisibleColumn({columnName: 'info3', columnCaption: 'نوع خدمت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceTypeTranslator})
      .addVisibleColumn({columnName: 'id', columnCaption: 'دریافت کننده خدمت', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'creationTime', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
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
  gridCellServiceTypeTranslator(item) {
    switch (item) {
      case '1':
        return 'اولین بار';
      case '2':
        return 'تجدید';
      case '4':
        return 'تامین اعتبار';
      default:
        return 'نامشخص';
    }
  }
  gridCellServiceNameTranslator(item) {
    switch (item) {
      case '6':
        return 'دفترچه درمانی';
      case '1':
        return '';
      case '2':
        return '';
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

  onGridAction(data) {
    const actionColumn = data.actionColumn;
    const dataItem = data.item;
    const id = this.dataGrid.selectedDataItem.id;
    const code = this.dataGrid.selectedDataItem.code;
    switch (actionColumn.columnName) {
      case 'delete':
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          const theUrl = `${Urls.BookletOrder}`;
          this.restService.delete(theUrl, id)
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
  onCompleteRequest(){
    this.redirectTo('/confirm-cart');
  }
  onNewOrder(){
    this.redirectTo('/order');
  }
  

}
