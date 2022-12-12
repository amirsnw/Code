import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {TaminModalComponent, TaminDataGridComponent, DataColumnViewType, TaminDataGridConfigurationFactory, SearchOperator, OverlayService} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {HttpClient} from '@angular/common/http';
import {StpUrls} from '../../../modules/stp/stp-urls';


@Component({
  selector: 'app-pay-pal-modal',
  templateUrl: './pay-pal-modal.component.html',
  styleUrls: ['./pay-pal-modal.component.css']
})
export class PayPalModalComponent implements OnInit {
  private _secondOverlay: any;

  // @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private payPalId = null;
  @ViewChild('docDetail') docDetail: ElementRef;
  @ViewChild('iframe') iframe: ElementRef;


  constructor(
    private overlayService: OverlayService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    // this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request + '/pay-pal-error-entity')
      .setShowPager(true)
      .addVisibleColumn({columnName: 'errorMassage', columnCaption: 'توضیحات خطا', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(false)
      .getData();
  }

  loadData() {
    // this.dataGrid.searchParams = [];
    // this.dataGrid.searchParams.push({ property: 'payPal.id', operator:  SearchOperator.EQUAL, value: this.payPalId });
    // this.dataGrid.refreshData();
  }

  show(payPalId: any) {
    // this.theModal.show();
    this.iframe.nativeElement.src = '';
    this.iframe.nativeElement.src = StpUrls.PaymentReport + '/' + payPalId.claimOrder.organizationId +
      '/' + payPalId.claimOrder.orderNumber + '/' + payPalId.orderSequence + '_dc=1544596135705';
  }

  hide() {
    // this.theModal.hide();
  }

  cloaseNewHeader() {
    // this.theModal.hide();
  }

}
