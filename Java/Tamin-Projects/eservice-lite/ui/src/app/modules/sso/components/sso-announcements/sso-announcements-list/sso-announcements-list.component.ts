import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-announcements-list',
  templateUrl: './sso-announcements-list.component.html',
  styleUrls: ['./sso-announcements-list.component.css']
})
export class SsoAnnouncementsListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  // @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('text') text: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('smsTab') smsTab: TaminTabComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  @ViewChild('secondPdfTab') secondPdfTab: TaminTabComponent;
  @ViewChild('imageTab') imageTab: TaminTabComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('secondDocumentViewer') secondDocumentViewer: TaminDocumentViewerComponent;
  selectedItem: any;
  private _overlay: any;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  initializePage() {
    this.initializeDataGrid();
  }

  private initializeDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.AnnouncementSso)
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
    this.secondPdfTab.visible = false;
    this.imageTab.visible = false;
    this.smsTab.visible = false;
    switch (data.actionColumn.columnName) {
      case 'view':
        this.image.nativeElement.src = '';
        this.text.nativeElement.textContent = '';
        this._overlay = this.showOverlay();
        this.loadPdf(data)
          .then(value => {
            this.loadSecondPdf(data)
              .then(value3 => {
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
        const pdfUrl = `${Urls.AnnouncementSso}/${data.item.id}/pdf`;
        this.restService.getAll(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdfBased64(value.data.pdf);
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

  loadSecondPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.type.typeCode === '0002' && (data.item.subType.typeCode === '02' || data.item.subType.typeCode === '09')) {
        this.secondPdfTab.visible = true;
        const pdfUrl = `${Urls.AnnouncementSecondPdf}/${data.item.details.eblaghNo}/${data.item.details.branchCode}`;
        this.restService.getBlob(pdfUrl)
          .then(value => {
            this.documentViewer.loadPdf(URL.createObjectURL(value));
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
        const txtUrl = `${Urls.AnnouncementSso}/${data.item.id}/text`;
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


  search(filter) {
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

}
