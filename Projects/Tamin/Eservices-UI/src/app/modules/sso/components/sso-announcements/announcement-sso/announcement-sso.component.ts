import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {SsoDebitObjectionSearchComponent} from '../../sso-debit-objection/sso-debit-objection-search/sso-debit-objection-search.component';
import {FormBuilder} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-announcement-sso',
  templateUrl: './announcement-sso.component.html',
  styleUrls: ['./announcement-sso.component.css']
})
export class AnnouncementSsoComponent extends TaminPageBaseComponent {

  @ViewChild('search') search: SsoDebitObjectionSearchComponent;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('text') text: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('smsTab') smsTab: TaminTabComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  @ViewChild('imageTab') imageTab: TaminTabComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  private _overlay: any;
  public SearchAnnouncementParams: SearchParam[];
  selectedItem: any;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  initializePage() {
    this.initializeDataGrid();
  }

  onSearchAnnouncement(param: any) {
    this.SearchAnnouncementParams = [];
    this.SearchAnnouncementParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });
    this.SearchAnnouncementParams.push({
      property: 'serviceName',
      value: 'announcement',
      operator: SearchOperator.EQ
    });
    this.SearchAnnouncementParams.push({
      property: 'ticketCode',
      value: param.ticketCode,
      operator: SearchOperator.EQ
    });
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.serviceUrl = Urls.AnnouncementKargozari;
    this.dataGrid.searchParams = this.SearchAnnouncementParams;
    this.dataGrid.dataItems = [];
    this.dataGrid.refreshData().then(value => {
    }).catch(reason => {
      this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
    });
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'id', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sentDate', columnCaption: 'تاریخ ارسال', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'type.typeDesc', columnCaption: 'سیستم', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'subType.typeDesc', columnCaption: 'موضوع', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'nationalCode', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'mobileNumber', columnCaption: 'موبایل', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'email', columnCaption: 'ایمیل', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'seenDate', columnCaption: 'تاریخ مشاهده', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'seen', columnCaption: 'مشاهده شده', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'رویت',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'view',
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
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'seen' && item.seen) {
        return {handled: true, data: '<i class="icon-ok"></i>'};
      }
      if (column.columnName === 'sentDate' && !item.sentDate) {
        return {handled: true, data: '<span>در انتظار ارسال</span>'};
      }

      return {handled: false, data: ''};
    };
  }

  onView(data) {
    this.pdfTab.visible = false;
    this.smsTab.visible = false;
    this.imageTab.visible = false;
    switch (data.actionColumn.columnName) {
      case 'view':
        this.image.nativeElement.src = '';
        this.text.nativeElement.textContent = '';
        this._overlay = this.showOverlay();
        this.loadPdf(data)
          .then(value => {
            this.loadImage(data)
              .then(value1 => {
                this.loadText(data)
                  .then(value2 => {
                    this.hideOverlay(this._overlay);
                    this.theModal.show();
                  })
                  .catch(reason => {
                    this.hideOverlay(this._overlay);
                    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
                  });
              })
              .catch(reason => {
                this.hideOverlay(this._overlay);
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              });
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });


        // if (data.item.hasPDF) {
        //   this.pdfTab.visible = true;
        //   const pdfUrl = `${Urls.AnnouncementSso}/${data.item.id}/pdf`;
        //   this.restService.getAll(pdfUrl)
        //     .then(value => {
        //       this.documentViewer.loadPdfBased64(value.data.pdf);
        //     })
        //     .catch(reason => {
        //     });
        // }

        // if (data.item.hasImage) {
        //   this.imageTab.visible = true;
        //   const imgUrl = `${Urls.AnnouncementSso}/${data.item.id}/image`;
        //   this.restService.getAll(imgUrl)
        //     .then(value => {
        //       this.image.nativeElement.src = 'data:application/jpg;base64, ' + value.data.image;
        //     })
        //     .catch(reason => {
        //     });
        // }

        // if (data.item.hasText) {
        //   this.smsTab.visible = true;
        //   const txtUrl = `${Urls.AnnouncementSso}/${data.item.id}/text`;
        //   this.restService.getAll(txtUrl)
        //     .then(value => {
        //       this.text.nativeElement.textContent = this.getPersianNumber(value.data.text);
        //     })
        //     .catch(reason => {
        //     });
        // }
        // this.theModal.show();
        break;
      case 'link':
        window.open('https://inbox.iran.gov.ir/faces/InboxLogin ', '_blank');
        break;
    }
  }

  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.hasPDF) {
        this.pdfTab.visible = true;
        const pdfUrl = `${Urls.AnnouncementKargozari}/${data.item.id}/pdf`;
        const searchParams = [];
        searchParams.push({
          property: 'nationalCode',
          value: this.search.searchForm.value.nationalCode,
          operator: SearchOperator.EQ
        });
        searchParams.push({
          property: 'serviceName',
          value: 'announcement',
          operator: SearchOperator.EQ
        });
        searchParams.push({
          property: 'ticketCode',
          value: this.search.searchForm.value.ticketCode,
          operator: SearchOperator.EQ
        });
        const requestEntity = {
          refrenceid: data.item.id,
          nationalCodeBoss: this.search.searchForm.value.nationalCode,
          requestType: {
            id: '17'
          }
        };
        this.restService.getAll(pdfUrl, searchParams)
          .then(value => {
            this.documentViewer.loadPdfBased64(value.data.pdf);
            this.restService.create(Urls.AnnouncementSaveAgent, requestEntity);
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }

  loadImage(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.hasImage) {
        this.imageTab.visible = true;
        const imgUrl = `${Urls.AnnouncementSso}/${data.item.id}/image`;
        this.restService.getAll(imgUrl)
          .then(value => {
            this.image.nativeElement.src = 'data:application/jpg;base64, ' + value.data.image;
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }

  loadText(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.hasText) {
        this.smsTab.visible = true;
        const txtUrl = `${Urls.AnnouncementKargozari}/${this.search.searchForm.value.nationalCode}/${data.item.id}/text`;
        this.restService.getAll(txtUrl)
          .then(value => {
            this.text.nativeElement.textContent = this.getPersianNumber(value.data.text);
            resolve();
          })
          .catch(reason => {
            reject(reason);
          });
      } else {
        resolve();
      }
    });
  }
}
