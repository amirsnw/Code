import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {RelationTaminModel} from '../../../../models/registration/relationTamin.model';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-tcr-price-certificate',
  templateUrl: './tcr-price-certificate.component.html',
  styleUrls: ['./tcr-price-certificate.component.css']
})
export class TcrPriceCertificateComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private _overlay: any;

  initializePage() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.TCR_PRICECERTIFICATE)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({
        columnName: 'noPazir',
        columnCaption: 'شماره پذیرش',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'maliCode',
        columnCaption: 'کد ملی بیمار',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'nameFamil',
        columnCaption: 'نام بیمار',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({columnName: 'datePaz', columnCaption: 'تاریخ پذیرش', columnViewType: DataColumnViewType.Label})

      // .addVisibleColumn({
      //   columnName: 'statusDesc',
      //   columnCaption: 'وضعیت پرونده',
      //   columnViewType: DataColumnViewType.Label
      // })
      .setShowActionColumn(true)

      .addActionColumn({
        columnName: 'print',
        columnCaption: 'مشاهده گواهی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'print',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'announcement',
        columnCaption: 'ارسال به صندوق شخصی',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'announcement',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    // this.dataGrid.actionRender = (item: any, actionCells: Array<any>) => {
    //   // if (this.actionRenderResult.length !== 0) {
    //   //   return this.actionRenderResult;
    //   // }
    //   const result = [];
    //   if (item.status === '7' && (item.payStatus === '2' || item.payStatus === '3' || item.payStatus === '4' || item.payStatus === '5' || item.payStatus === '6')) {
    //     result.push(actionCells.find(c => c.columnActionName === 'print'));
    //     result.push(actionCells.find(c => c.columnActionName === 'announcement'));
    //     return result;
    //   }
    // };
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {
      case 'print':
        this.restService
          .getBlob(Urls.TCR_PRICECERTIFICATE + '/report/' + param.item.repId.toString(), null)
          .then(result => {
            this.hideOverlay(this._overlay);
            const a = document.createElement('a'),
              url = URL.createObjectURL(result);
            a.href = url;
            a.download = 'price_certificate_' + this.getPersianDate(new Date()) + '.pdf';
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

        break;
      case 'announcement':
        this._overlay = this.showOverlay();
        this.restService
          .getById(Urls.TCR_PRICECERTIFICATE + '/announcement', param.item.repId.toString())
          .then(result => {
            this.hideOverlay(this._overlay);
            this.showInfoMessageBox('پیام مسیستم', 'ارسال گواهی بازپرداخت هزینه های درمانی با موفقیت انجام شد');
            this.redirectTo('/me');
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
    }
  }

}
