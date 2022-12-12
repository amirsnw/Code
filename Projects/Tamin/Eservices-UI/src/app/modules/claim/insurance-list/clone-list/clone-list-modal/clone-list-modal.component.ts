import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaminModalComponent, TaminDataGridComponent, DataColumnViewType, TaminDataGridConfigurationFactory, SearchOperator, OverlayService } from 'tamin-framework';
import { Urls } from '../../../../../settings/urls';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-clone-list-modal',
  templateUrl: './clone-list-modal.component.html',
  styleUrls: ['./clone-list-modal.component.css']
})
export class CloneListModalComponent implements OnInit {
  private _secondOverlay: any;

  // @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  private CloneListId = null;
  @ViewChild('docDetail') docDetail: ElementRef;
  @ViewChild('iframe') iframe: ElementRef;


  constructor(
    private overlayService: OverlayService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request + '/clone-list-error-entity')
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'errorMassage', columnCaption: 'توضیحات خطا', columnViewType: DataColumnViewType.Label })
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
    // this.dataGrid.searchParams.push({ property: 'CloneList.id', operator:  SearchOperator.EQUAL, value: this.CloneListId });
    // this.dataGrid.refreshData();
  }

  show(CloneListId: any) {
    debugger;
    // this.theModal.show();
    // this.iframe.nativeElement.src = '';
    // this.iframe.nativeElement.src = Urls.PaymentReport + '/' + CloneListId.claimOrder.organizationId +
    //   '/' + CloneListId.claimOrder.orderNumber + '/' + CloneListId.orderSequence+'_dc=1544596135705';
  }

  hide() {
    // this.theModal.hide();
  }

  cloaseNewHeader() {
    // this.theModal.hide();
  }

}
