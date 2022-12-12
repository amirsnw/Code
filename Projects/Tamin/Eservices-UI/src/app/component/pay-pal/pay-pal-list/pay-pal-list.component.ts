import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { TaminDataGridComponent, TaminDataColumn, DataColumnViewType, TaminDocumentViewerComponent,
  TaminDataGridConfigurationFactory, TaminPageBaseComponent,
  TaminModalComponent, TaminTabComponent } from 'tamin-framework';
import { PayPalModel } from 'src/app/models/pay-pal/payPal.model';
import { TaminActionColumn } from 'tamin-framework/lib/models/tamin-action-column.model';
import { PayPalModalComponent } from '../pay-pal-modal/pay-pal-modal.component';
import { Urls } from 'src/app/settings/urls';
import {StpUrls} from '../../../modules/stp/stp-urls';
import {ClaimUrls} from '../../../modules/claim/claim-urls';

@Component({
  selector: 'app-pay-pal-list',
  templateUrl: './pay-pal-list.component.html',
  styleUrls: ['./pay-pal-list.component.css']
})
export class PayPalListComponent extends TaminPageBaseComponent {

  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
   @ViewChild('theModal') theModal: TaminModalComponent;
   @ViewChild('theNewModal') theNewModal: PayPalModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  // @ViewChild('theNewModal') theNewModal: NewRequestComponent;
  public restUrl;
  items: PayPalModel[];
  private _overlay: any;
  selectedItem: PayPalModel;
  visibleColumns: TaminDataColumn[];
  public restUrlPayPalPut;
  searchParams: any[] = [];
  sortParams: any[] = [ /*{ property: 'edictNumber', direction: 'ASC' }*/];

  initializePage() {
    this._initializeDataGrid();

  }
  private _initializeDataGrid() {
    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.Claimorder)
      .setShowPager(true)
      .setFirstLoad(true)
      // .addVisibleColumn({
      //   columnName: 'contractNumber',
      //   columnCaption: 'ردیف پیمان',
      //   columnViewType: DataColumnViewType.Labelng
      // })
      .addVisibleColumn({
        columnName: 'claimOrder.mastCustomerTypeCode',
        columnCaption: 'کد کارگاه',
        columnViewType: DataColumnViewType.Label,
      })
      .addVisibleColumn({
        columnName: 'claimOrder.organizationId',
        columnCaption: 'نام شعبه',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'claimOrder.orderNumber',
        columnCaption: 'شماره برگه پرداخت',
        columnViewType: DataColumnViewType.Label,
      })
      .addVisibleColumn({
        columnName: 'paymentSequenceAmount',
        columnCaption: 'مبلغ',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'status',
        columnCaption: 'وضعیت',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'paymentSequenceDate',
        columnCaption: 'تاریخ صدور',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({
        columnName: 'statusDate',
        columnCaption: 'تاریخ وصول',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({
        columnName: 'recipt',
        columnCaption: 'وضعیت وصول',
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
        columnCaption: 'پرداخت',
        columnViewType: 'Button',
        columnActionName: 'edit',
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'مشاهده',
        columnViewType: 'Button',
        columnActionName: 'view',
        icon: 'icon-info',
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
    if (param.actionColumn.columnName === 'edit') {
      this.redirectTo(`/request/edit/${dataItem.id}`);
    }
    if (param.actionColumn.columnName === 'view') {
          //  this.theNewModal.show(dataItem);
          this.loadPdf(dataItem);
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
  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const pdfUrl = `${StpUrls.paymentReport}/${data.claimOrder.organizationId}/${data.claimOrder.orderNumber}/${data.orderSequence}`;
            this.restService.getBlob(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
            this.theModal.show();
          })
          .catch(reason => {
              this.showErrorMessageBox('پیام سیستم', reason.error.text);
          });
    });
  }
}
