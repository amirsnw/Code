import {Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {RequestModalComponent} from '../../../../../component/request/request-modal/request-modal.component';
import {RequestModel} from '../../../../../models/dynamic-request/request.model';
import {Urls} from '../../../../../settings/urls';
import {SsoRequestDetailsComponent} from '../sso-request-details/sso-request-details.component';
import {BookletViewComponent} from '../sso-request-details/booklet-view/booklet-view.component';
import {RequestFaqViewComponent} from '../../../../../component/common/request-faq/request-faq-view/request-faq-view.component';
import {UnsavedHistoryViewComponent} from '../sso-request-details/unsaved-history-view/unsaved-history-view.component';
import {ConflictHistoryViewComponent} from '../sso-request-details/conflict-history-view/conflict-history-view.component';
import {SSoRequestModalComponent} from '../request-modal/sso-request-modal.component';
import {SsoRequestResponseComponent} from '../sso-request-response/sso-request-response.component';
import {SsoRequestFaqViewComponent} from '../../sso-request-faq-view/sso-request-faq-view.component';
import {SsoDebitInstallmentComponent} from '../../sso-debit-installment/sso-debit-installment.component';
import {SsoPenaltyReliefComponent} from '../../sso-penalty-relief/sso-penalty-relief.component';

@Component({
  selector: 'app-sso-request-list',
  templateUrl: './sso-request-list.component.html',
  styleUrls: ['./sso-request-list.component.css']
})
export class SsoRequestListComponent extends TaminPageBaseComponent {

  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  @ViewChild('requestModal') requestModal: RequestModalComponent;
  @ViewChild('requestResult') requestResult: RequestModalComponent;
  @ViewChild('requestDetails') requestDetails: SsoRequestDetailsComponent;
  @ViewChild('bookletView') bookletView: BookletViewComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('unsavedHistoryView') unsavedHistoryView: UnsavedHistoryViewComponent;
  @ViewChild('conflictHistoryView') conflictHistoryView: ConflictHistoryViewComponent;
  @ViewChild('faqView') faqView: RequestFaqViewComponent;
  @ViewChild('container', {read: ViewContainerRef}) container;
  @ViewChild('theModal') theModal: TaminModalComponent;
  items: RequestModel[];
  private _overlay: any;
  selectedItem: RequestModel;
  actionRenderResult = [];

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  initializePage() {
    const sortParam = new SortParam();
    sortParam.property = 'refCode';
    sortParam.direction = SortDirection.DESC;

    const searchParam = new SearchParam();
    searchParam.value = '02';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';

    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.SSO_Request)
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam(sortParam)
      .addSearchParam(searchParam)
      .addVisibleColumn({columnName: '', columnCaption: '#', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({
        columnName: 'refCode',
        columnCaption: 'شماره پیگیری',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({columnName: 'title', columnCaption: 'عنوان درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'userName', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'comment', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({
        columnName: 'createdBy',
        columnCaption: 'کاربر درخواست کننده',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'creationTime',
        columnCaption: 'تاریخ درخواست',
        columnViewType: DataColumnViewType.Label
      })
      .addVisibleColumn({
        columnName: 'status.requestDesc',
        columnCaption: 'وضعیت درخواست',
        columnViewType: DataColumnViewType.Label
      })
      // .addVisibleColumn({columnName: 'deliverCode', columnCaption: 'کد تحویل', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'view',
        columnCaption: 'نمایش درخواست',
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
        columnCaption: 'اصلاح درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'approve',
        columnCaption: 'کنترل تایید توسط همکار سازمانی',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'approve',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'error',
        columnCaption: 'نمایش خطاها',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'error',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'objection',
        columnCaption: 'پیگیری اعتراض',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'objection',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'response',
        columnCaption: 'مختومه نمودن غیرمکانیزه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'response',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'details',
        columnCaption: 'شعب مسئول رسیدگی',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'details',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'faq',
        columnCaption: 'راهنمای هوشمند',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'faq',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'finalResult',
        columnCaption: 'نتیجه نهایی',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'finalResult',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'viewPayment',
        columnCaption: 'وضعیت پرداخت ها',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'viewPayment',
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
    this.taminDataGrid.actionRender = (item: any, actionCells: Array<any>) => {
      // if (this.actionRenderResult.length !== 0) {
      //   return this.actionRenderResult;
      // }
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'faq'));
      switch (item.requestType.id) {
        case 10:
        case 12:
        case 11:
        case 13:
        case 15:
          if (item.status !== null && (item.status.requestCode === '0001')) {
            result.push(actionCells.find(c => c.columnActionName === 'response'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 0:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 1:
        case 2:
        case 3:
        case 18:
          /*if (item.status == null || (item.status.requestCode === '0001' && item.status.requestCode === '0004')) {
            result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }*/
          if (item.status !== null && (item.status.requestCode === '0006' || item.status.requestCode === '0017')) {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
          }
          if (item.status !== null && (item.status.requestCode === '0004' || item.status.requestCode === '0017')) {
            result.push(actionCells.find(c => c.columnActionName === 'approve'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'response'));
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));

          break;
        case 4:
          result.push(actionCells.find(c => c.columnActionName === 'objection'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          break;
        case 6:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          break;
        case 8:
          if (item.status !== null && item.status.requestCode === '0016') {
            result.push(actionCells.find(c => c.columnActionName === 'objection'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 9:
          if (item.status !== null && item.status.requestCode === '0019') {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
            // result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 19:
          if (item.status !== null && item.status.requestCode === '0019') {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
            // result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 20:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 22:

          result.push(actionCells.find(c => c.columnActionName === 'view'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          break;

        case 23:

          result.push(actionCells.find(c => c.columnActionName === 'view'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          //    if (item.status !== null && item.status.requestCode === '0018') {
          //    result.push(actionCells.find(c => c.columnActionName === 'finalResult'));
          // }
          break;
        case 24:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          result.push(actionCells.find(c => c.columnActionName === 'details'));
          break;
        case 25:
        case 26:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 32:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          if (item.status !== null && item.status.requestCode === '0014') {
            result.push(actionCells.find(c => c.columnActionName === 'viewPayment'));
          }
          break;
      }
      this.actionRenderResult = result;
      return result;
    };
    this.taminDataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'status.requestDesc' && !item.status) {
        return {handled: true, data: '<span>در انتظار ثبت درخواست</span>'};
      }

      if (column.columnName === 'creationTime') {

        const date = new Date(item.creationTime);
        const persianDate = this.getPersianDate(date);
        const hours = (date.getHours() > 9) ? `${date.getHours().toString()}` : `${'0' + date.getHours().toString()}`;
        const minutes = (date.getMinutes() > 9) ? `${date.getMinutes().toString()}` : `${'0' + date.getMinutes().toString()}`;
        const seconds = (date.getSeconds() > 9) ? `${date.getSeconds().toString()}` : `${'0' + date.getSeconds().toString()}`;
        const result = `${hours}:${minutes}:${seconds} ${persianDate}`;
        return {handled: true, data: `<span class="nowrap">${result}</span>`};

      }

      return {handled: false, data: ''};
    };
  }

  // protected loadPageData(): void {
  //   this.taminDataGrid.refreshData();
  // }

  onGridAction(param: any) {
    this.selectedItem = param.item;
    window.sessionStorage.setItem('sso-request-search-param', JSON.stringify(this.taminDataGrid.searchParams));
    switch (param.actionColumn.columnActionName) {
      case 'view':
        this.handleViewMenuItem(this.selectedItem.id, param.item);
        break;
      case 'edit':
        this.handleEditMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'error':
        this.handleErrorMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'approve':
        this.handleApproveMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'objection':
        this.handleObjectionMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'response':
        this.handleResponseMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'details':
        this.handleDetailsMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'faq':
        this.handleFAQMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'finalResult':
        this.handleFinalResultMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'viewPayment':
        this.handleViewPaymentMenuItem(this.selectedItem.requestType.id, param.item);
        break;

    }
  }

  search(filter: any) {
    this.taminDataGrid.searchParams = filter;
    this.taminDataGrid.pagerCurrentPage = 1;
    this.actionRenderResult = [];
    this.taminDataGrid.refreshData();
  }

  private handleEditMenuItem(requestId, selectedItem) {
    switch (requestId) {
      case 1:
        this._overlay = this.showOverlay();

        const searchParams = new Array<SearchParam>();
        const searchParam = new SearchParam();
        searchParam.property = 'refrenceCode';
        searchParam.value = this.selectedItem.refCode;
        searchParam.operator = SearchOperator.EQ;
        searchParams.push(searchParam);
        this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams, [])
          .then(value => {
            this.hideOverlay(this._overlay);
            this.redirectTo('/personal/' + value.data.list[0].id);
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
          });
        break;
      case 2:
        this._overlay = this.showOverlay();

        const searchParams1 = new Array<SearchParam>();
        const searchParam1 = new SearchParam();
        searchParam1.property = 'refrenceCode';
        searchParam1.value = this.selectedItem.refCode;
        searchParam1.operator = SearchOperator.EQ;
        searchParams1.push(searchParam1);
        this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams1, [])
          .then(value => {
            this.hideOverlay(this._overlay);
            this.redirectTo('/request-relation-tamin/' + value.data.list[0].id);
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
          });
        break;
      case 3:
        this._overlay = this.showOverlay();

        const searchParams2 = new Array<SearchParam>();
        const searchParam2 = new SearchParam();
        searchParam2.property = 'refrenceCode';
        searchParam2.value = this.selectedItem.refCode;
        searchParam2.operator = SearchOperator.EQ;
        searchParams2.push(searchParam2);
        this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams2, [])
          .then(value => {
            this.hideOverlay(this._overlay);
            this.redirectTo('/subdomain/' + value.data.list[0].id);
          })
          .catch(error => {
            this.hideOverlay(this._overlay);
          });
        break;
      case 18:
        this.redirectTo('employer-registration/personal/' + this.selectedItem.id);
        break;
    }
  }

  private handleErrorMenuItem(requestId, selectedItem) {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SSoRequestModalComponent);
    const componentRef = this.container.createComponent(componentFactory);
    // this.requestModal.show(this.selectedItem.id);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.show(this.selectedItem.id);
  }

  private handleViewPaymentMenuItem(requestId, selectedItem) {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SsoDebitInstallmentComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.show(selectedItem.refrenceid);
  }

  private handleResponseMenuItem(requestId, selectedItem) {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SsoRequestResponseComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.show(this.selectedItem.id);
  }

  private handleDetailsMenuItem(requestId, selectedItem) {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SsoRequestDetailsComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.open(this.selectedItem.id);
  }

  private handleApproveMenuItem(requestId, selectedItem) {
    this._overlay = this.showOverlay();

    this.restService.update(Urls.SSO_Request + '/confirm-user', selectedItem.id.toString(), selectedItem)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'انتقال به سامانه بیمه ای متمرکز با موفقیت انجام شد.', () => {
          this.taminDataGrid.refreshData();
        });
      })
      .catch(error => {
        this.taminDataGrid.refreshData();
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('خطا', 'انتقال به سامانه بیمه ای متمرکز با اشکال مواجه گردید.');
      });
  }

  private handleObjectionMenuItem(requestId, selectedItem) {
    // this.redirectTo('/objection-response/' + selectedItem.refrenceid);
    if (selectedItem.requestType.id === 4) {
      this.redirectTo('/inspection-objection-list/' + selectedItem.refrenceid);
    }

    if (selectedItem.requestType.id === 8) {
      this.redirectTo('/objection-response/' + selectedItem.refrenceid);
    }
  }

  private handleFinalResultMenuItem(requestId, selectedItem) {
    this.redirectTo('sso/sso-pension-final-result/' + selectedItem.id);
  }

  private handleViewMenuItem(requestId, selectedItem) {
    // if (this.selectedItem.requestType.id == 10 ) {
    //   this.redirectTo('/sso/indemnity-view-new/' + selectedItem.refrenceid + '/' +selectedItem.createdBy);
    // }

    /*if (this.selectedItem.requestType.id !== 6 && this.selectedItem.requestType.id !== 8 && this.selectedItem.requestType.id !== 10 && this.selectedItem.requestType.id !== 11 && this.selectedItem.requestType.id !== 12 && this.selectedItem.requestType.id !== 13 && this.selectedItem.requestType.id !== 14 && this.selectedItem.requestType.id !== 15) {
      this.redirectTo('/registration-summary/' + requestId);
    }
    if (this.selectedItem.requestType.id === 6) {
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BookletViewComponent);
      const componentRef = this.container.createComponent(componentFactory);
      this.changeDetectorRef.detectChanges();
      componentRef.instance.open(this.selectedItem.refrenceid);
    }
    if (this.selectedItem.requestType.id === 8 && this.selectedItem.refrenceid.substr(0, 1) === '3') {
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConflictHistoryViewComponent);
      const componentRef = this.container.createComponent(componentFactory);
      this.changeDetectorRef.detectChanges();
      componentRef.instance.open(this.selectedItem.refrenceid);
    }
    if (this.selectedItem.requestType.id === 8 && this.selectedItem.refrenceid.substr(0, 1) === '4') {
      this.container.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UnsavedHistoryViewComponent);
      const componentRef = this.container.createComponent(componentFactory);
      this.changeDetectorRef.detectChanges();
      componentRef.instance.open(this.selectedItem.refrenceid);
    }*/

    switch (selectedItem.requestType.id) {
      case 12:
        this.redirectTo('sso/orthosis-and-prosthesis-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 10:
        this.redirectTo('sso/indemnity-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 11:
        this.redirectTo('sso/pregnancy-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 13:
        this.redirectTo('sso/marriage-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 15:
        this.redirectTo('sso/funeral-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 22:
        this.redirectTo('sso/wage-assignment-evaluate' + '/' + selectedItem.id);
        break;
      case 6:
        this.container.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BookletViewComponent);
        const componentRef = this.container.createComponent(componentFactory);
        this.changeDetectorRef.detectChanges();
        componentRef.instance.open(selectedItem.refrenceid);
        break;
      case 8:
        if (this.selectedItem.refrenceid.substr(0, 1) === '3') {
          this.container.clear();
          const componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(ConflictHistoryViewComponent);
          const componentRef2 = this.container.createComponent(componentFactory2);
          this.changeDetectorRef.detectChanges();
          componentRef2.instance.open(this.selectedItem.refrenceid);
        } else if (this.selectedItem.refrenceid.substr(0, 1) === '4') {
          if (this.selectedItem.requestType.id === 8 && this.selectedItem.refrenceid.substr(0, 1) === '4') {
            this.container.clear();
            const componentFactory3 = this.componentFactoryResolver.resolveComponentFactory(UnsavedHistoryViewComponent);
            const componentRef3 = this.container.createComponent(componentFactory3);
            this.changeDetectorRef.detectChanges();
            componentRef3.instance.open(this.selectedItem.refrenceid);
          }
        }
        break;
      case 18:
        this.redirectTo('/registration-summary/' + requestId);
        break;
      case 20:
        this.container.clear();
        const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(SsoPenaltyReliefComponent);
        const componentRef1 = this.container.createComponent(componentFactory1);
        this.changeDetectorRef.detectChanges();
        componentRef1.instance.show(selectedItem.refrenceid);
        break;
      case 23:
        if (this.selectedItem.status.requestCode === '0017') {
          this.redirectTo('sso/pension-request' + '/' + selectedItem.id);
        } else {
          this.redirectTo('pension-request-view' + '/' + selectedItem.id);
        }
        break;
      case 24:
        if (this.selectedItem.status.requestCode === '0017') {
          this.redirectTo('sso/pension-account' + '/' + selectedItem.id);
        } else {
          this.redirectTo('pension-account-view' + '/' + selectedItem.id);
        }
        break;
      case 25:
      case 26:
        this.redirectTo('sso/debit-objection' + '/' + selectedItem.refrenceid);
        break;
      case 32:
        const pdfUrl = `${Urls.InstallmentReports}/installment/${selectedItem.refrenceid}`;
        this.loadPdf(selectedItem.refrenceid, pdfUrl)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.theModal.show();
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  private handleFAQMenuItem(requestId, selectedItem) {
    let status = '0000';
    let type = '0';

    if (selectedItem.status !== null) {
      status = selectedItem.status.requestCode;
    }

    if (this.selectedItem.requestType.id !== null) {
      type = this.selectedItem.requestType.id.toString();
    }
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SsoRequestFaqViewComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.open(type, status);
  }

  loadPdf(data, pdfUrl) {
    return new Promise<void>((resolve, reject) => {
      if (data) {
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

}
