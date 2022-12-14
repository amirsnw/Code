import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {Urls} from '../../settings/urls';
import {HttpClient} from '@angular/common/http';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {EnquiryComponent} from './enquiry/enquiry.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('text') text: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('smsTab') smsTab: TaminTabComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  @ViewChild('imageTab') imageTab: TaminTabComponent;
  @ViewChild('enquiry') enquiry: EnquiryComponent;
  private _overlay: any;
  selectedItem: any;
  quota: string;
  quotaText: string;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }


  protected loadPageData(): void {
    this.restService
      .getAll(Urls.MY_INBOX_QUOTA)
      .then(value => {
        // value.usage = '100';
        const tmp = ((value.usage * 100) / value.total).toFixed(0).toString();
        this.quota = tmp + '%';

        // this.quotaText = this.getPersianNumber('50 مگابایت از 300 مگابایت (%17)');
       // debugger;
        this.quotaText = this.getPersianNumber(value.usage + ' مگابایت از ' + value.total + ' مگابایت ' + '(' + tmp + '%)');
      })
      .catch(reason => {
      });
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
      .addUrl(Urls.Announcement)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'id', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'sentDate', columnCaption: 'تاریخ ارسال', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'type.typeDesc', columnCaption: 'سیستم', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'subType.typeDesc', columnCaption: 'موضوع', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'nationalCode', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'mobileNumber', columnCaption: 'موبایل', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'email', columnCaption: 'ایمیل', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'seenDate', columnCaption: 'تاریخ مشاهده', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'seen', columnCaption: 'مشاهده شده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'permission.dateTo', columnCaption: 'قابل استعلام تا', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'permission.password', columnCaption: 'کد رمز', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'رویت مکاتبه',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'view',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'link',
        columnCaption: 'اتصال به ایران پوشه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'iranFolder',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'enquiry',
        columnCaption: 'صدور مجوز استعلام',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'enquiry',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'enquiryRemove',
        columnCaption: 'لغو مجوز استعلام',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'enquiryRemove',
        isActionAuthorized: false,
        visible: true,
        enable: true
      }).addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
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
      .getData();

    this.dataGrid.actionRender = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'view'));
      result.push(actionCells.find(c => c.columnActionName === 'iranFolder'));

      if (item.permission && item.permission.dateTo) {
        result.push(actionCells.find(c => c.columnActionName === 'enquiryRemove'));
      } else {
        result.push(actionCells.find(c => c.columnActionName === 'enquiry'));
      }
      if (item.type.typeCode === '0005' || item.type.typeCode === '0006' || item.subType.typeCode === '201') {
        result.push(actionCells.find(c => c.columnActionName === 'delete'));
      }
      return result;
    };

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'seen' && item.seen) {
        return {handled: true, data: '<i class="icon-ok"></i>'};
      }

      if (column.columnName === 'sentDate' && !item.sentDate) {
        return {handled: true, data: '<span>در انتظار ارسال</span>'};
      }

      if (column.columnName === 'permission.dateTo') {
        if (!item.permission || !item.permission.dateTo) {
          return {handled: true, data: '<span>ندارد</span>'};
        } else {
          return {handled: true, data: this.getPersianDate(item.permission.dateTo)};
        }
      }

      if (column.columnName === 'permission.password') {
        if (!item.permission || item.permission.dateTo == null) {
          return {handled: true, data: ''};
        }
      }

      return {handled: false, data: ''};
    };
  }


  removeEnquiry(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از لغو مجوز اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.update(Urls.Announcement, id, {
        operation: 'cancel'
      })
        .then(value => {
          this.hideOverlay(this._overlay);
          this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پیام سیستم', 'لغو مجوز استعلام با موفقیت انجام شد.', () => {
            this.dataGrid.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        });
    }, () => {
    });
  }

  onView(data) {
    this.pdfTab.visible = false;
    this.smsTab.visible = false;
    this.imageTab.visible = false;
    switch (data.actionColumn.columnName) {
      case 'view':
        // this.iframe.nativeElement.src = '';
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
                    this.dataGrid.refreshData(false);
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
        //   const pdfUrl = `${Urls.Announcement}/${data.item.id}/pdf`;
        //   this.restService.getAll(pdfUrl)
        //     .then(value => {
        //       this.documentViewer.loadPdfBased64(value.data.pdf);
        //       this.dataGrid.refreshData(false);
        //     })
        //     .catch(reason => {
        //     });
        // }
        // if (data.item.hasImage) {
        //   this.imageTab.visible = true;
        //   const imgUrl = `${Urls.Announcement}/${data.item.id}/image`;
        //   this.restService.getAll(imgUrl)
        //     .then(value => {
        //       this.image.nativeElement.src = 'data:application/jpg;base64, ' + value.data.image;
        //     })
        //     .catch(reason => {
        //     });
        // }
        // if (data.item.hasText) {
        //   this.smsTab.visible = true;
        //   const txtUrl = `${Urls.Announcement}/${data.item.id}/text`;
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
      case 'enquiry':
        this.enquiry.show(data.item.id, data.item.permission ? data.item.permission.dateTo : null);
        break;
      case 'enquiryRemove':
        this.removeEnquiry(data.item.id.toString());
        break;
      case 'delete':
        this.delete(data.item.id.toString());
        break;
    }
  }


  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.hasPDF) {
        this.pdfTab.visible = true;
        const pdfUrl = `${Urls.Announcement}/${data.item.id}/pdf`;
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

  loadImage(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.hasImage) {
        this.imageTab.visible = true;
        const imgUrl = `${Urls.Announcement}/${data.item.id}/image`;
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
        const txtUrl = `${Urls.Announcement}/${data.item.id}/text`;
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


  onSearch(filter) {
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

  delete(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(Urls.Announcement, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پیام سیستم', 'حذف با موفقیت انجام شد.', () => {
            this.dataGrid.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }, () => {
    });
  }

  backToPanelClick() {
    this.redirectTo('me');
  }
}
