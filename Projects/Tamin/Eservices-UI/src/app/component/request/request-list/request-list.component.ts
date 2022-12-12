import {Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, SortDirection, SortParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {RequestModel} from 'src/app/models/dynamic-request/request.model';
import {RequestModalComponent} from '../request-modal/request-modal.component';
import {Urls} from '../../../settings/urls';
import {RequestFaqViewComponent} from '../../common/request-faq/request-faq-view/request-faq-view.component';
import {Router} from '@angular/router';
import {SsoPenaltyReliefComponent} from '../../../modules/sso/components/sso-penalty-relief/sso-penalty-relief.component';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends TaminPageBaseComponent {
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  // @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('theNewModal') theNewModal: RequestModalComponent;
  @ViewChild('faqView') faqView: RequestFaqViewComponent;
  @ViewChild('container', {read: ViewContainerRef}) container;
  items: RequestModel[];
  private _overlay: any;
  selectedItem: RequestModel;

  constructor(injector: Injector, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  initializePage() {
    const sortParam = new SortParam();
    sortParam.property = 'refCode';
    sortParam.direction = SortDirection.DESC;

    const searchParam = new SearchParam();
    searchParam.value = '03';
    searchParam.operator = SearchOperator.EQUAL;
    searchParam.property = 'operation';

    this.taminDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Request)
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam(sortParam)
      .addSearchParam(searchParam)
      .addVisibleColumn({columnName: 'refCode', columnCaption: 'شماره پیگیری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'title', columnCaption: 'عنوان درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'userName', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'comment', columnCaption: 'توضیحات', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'createByName', columnCaption: 'کاربر درخواست کننده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'creationTime', columnCaption: 'تاریخ درخواست', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'status.requestDesc', columnCaption: 'وضعیت درخواست', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'deliverCode', columnCaption: 'کد تحویل', columnViewType: DataColumnViewType.Label})
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
        columnCaption: 'نمایش و اصلاح درخواست',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'edit',
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
        columnName: 'committee-result',
        columnCaption: 'پیگیری نتیجه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'committee-result',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'committee-request-list',
        columnCaption: 'مشاهده درخواست ها',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'committee-request-list',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'guardian',
        columnCaption: 'پیگیری کفالت',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'guardian',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'guardianObjection',
        columnCaption: 'اعتراض کفالت',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'guardianObjection',
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
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
    this.taminDataGrid.actionRender = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'faq'));
      switch (item.requestType.id) {
        // stp_old new
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:

        // ----
        case 0:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 1:
        case 2:
        case 3:
        case 18:
          if (item.status == null || item.status.requestCode === '0001' || item.status.requestCode === '0006') {
            result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }
          if (item.status !== null && item.status.requestCode === '0006') {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
          }
          break;
        case 4: // Inspection
          result.push(actionCells.find(c => c.columnActionName === 'objection'));
          break;
        case 6:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 8:
          if (item.status !== null && item.status.requestCode === '0016') {
            result.push(actionCells.find(c => c.columnActionName === 'objection'));
          }

          break;
        case 9:
          if (item.status !== null && item.status.requestCode === '0019') {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
            // result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }
          break;
        case 19:
          if (item.status !== null && item.status.requestCode === '0019') {
            result.push(actionCells.find(c => c.columnActionName === 'error'));
            // result.push(actionCells.find(c => c.columnActionName === 'edit'));
          }
          break;
        case 20:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 27:
          if (item.status.requestCode === '0041' || item.status.requestCode === '0022'
              || item.status.requestCode === '0042' || item.status.requestCode === '0043') {
              result.push(actionCells.find(c => c.columnActionName === 'committee-result'));
          }
          if (item.comment !== 'درخواست اعتراض' && item.comment !== 'درخواست تجديد نظر') {
            result.push(actionCells.find(c => c.columnActionName === 'committee-request-list'));
          }
          break;
        case 29:
          result.push(actionCells.find(c => c.columnActionName === 'view'));
          break;
        case 28:
          if (item.status.requestCode === '0021') {
            result.push(actionCells.find(c => c.columnActionName === 'guardian'));
          } else if (item.status.requestCode === '0034' || item.status.requestCode === '0039') {
            result.push(actionCells.find(c => c.columnActionName === 'guardianObjection'));
          }
          break;
      }
      return result;
    };
    this.taminDataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'status.requestDesc' && !item.status) {
        return {handled: true, data: '<span>در انتظار ثبت درخواست</span>'};
      }
      return {handled: false, data: ''};
    };
  }

  onGridAction(param: any) {
    this.selectedItem = param.item;
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {
      case 'view':
        this.handleViewMenuItem(this.selectedItem.requestType.id, param.item);
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
      case 'faq':
        this.handleFAQMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'committee-result':
        param.item.comType = '00';
        this.handleViewMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'committee-request-list':
        param.item.comType = '01';
        this.handleViewMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'guardian':
        this.handleViewMenuItem(this.selectedItem.requestType.id, param.item);
        break;
      case 'guardianObjection':
        this.handleViewMenuItem(this.selectedItem.requestType.id, param.item);
        break;
    }
  }

  newClick() {
    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  }

  backToPanelClick() {
    this.redirectTo('/me');
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
      case 9:
        this._overlay = this.showOverlay();

        const searchParams3 = new Array<SearchParam>();
        const searchParam3 = new SearchParam();
        searchParam3.property = 'refrenceCode';
        searchParam3.value = this.selectedItem.refCode;
        searchParam3.operator = SearchOperator.EQ;
        searchParams3.push(searchParam3);
        this.restService.getPage(Urls.PersonalPost, 1, 10, searchParams3, [])
          .then(value => {
            this.hideOverlay(this._overlay);
            this.redirectTo('/request-account/' + value.data.list[0].id + '/update');
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
    this.theNewModal.show(this.selectedItem.id);
  }

  private handleApproveMenuItem(requestId, selectedItem) {
    this._overlay = this.showOverlay();

    this.restService.update(Urls.Request + '/confirm-user', '', selectedItem)
      .then(result => {
        this.hideOverlay(this._overlay);
        setTimeout(this.taminDataGrid.refreshData(), 0);
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        setTimeout(this.taminDataGrid.refreshData(), 0);
      });
  }

  private handleObjectionMenuItem(requestId, selectedItem) {
    if (selectedItem.requestType.id === 4) {
      this.redirectTo('/inspection-objection-list/' + selectedItem.refrenceid);
    }

    if (selectedItem.requestType.id === 8) {
      this.redirectTo('/objection-response/' + selectedItem.refrenceid);
    }
  }

  private handleViewMenuItem(requestId, selectedItem) {
    switch (requestId) {
      case 6:
        this.redirectTo('/booklet');
        break;
      // stp_old new
      case 12:
        this.redirectTo('stp/orthosis-and-prosthesis-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 10:
        this.redirectTo('stp/indemnity-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 11:
        this.redirectTo('stp/pregnancy-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 13:
        this.redirectTo('stp/marriage-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 15:
        this.redirectTo('stp/funeral-view-new' + '/' + selectedItem.refrenceid);
        break;
      case 20:
        this.container.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SsoPenaltyReliefComponent);
        const componentRef = this.container.createComponent(componentFactory);
        this.changeDetectorRef.detectChanges();
        componentRef.instance.show(selectedItem.refrenceid);
        break;
      case 22:
        this.redirectTo('wage-assignment' + '/' + selectedItem.id);
        break;
      case 23:
        this.redirectTo('pension-request-view' + '/' + selectedItem.id);
        break;
      case 24:
        this.redirectTo('pension-account-view' + '/' + selectedItem.id);
        break;
      case 25:
      case 26:
        this.redirectTo('objection-view' + '/' + selectedItem.refrenceid);
        break;
      case 27:
        if (selectedItem.comType === '00') {
          const route = this.router.config.find(r => r.path === 'medical-committee-cardboard');
          route.data = selectedItem;
          this.router.navigateByUrl('medical-committee-cardboard');
        } else {
          const route = this.router.config.find(r => r.path === 'committee-request-list');
          route.data = selectedItem;
          this.router.navigateByUrl('committee-request-list');
        }
        break;
      case 29:
        this.redirectTo('income/remove-paper-display/' + '/' + selectedItem.refrenceid);
        break;
      case 28:
        if (selectedItem.status.requestCode === '0021') {
          this.redirectTo('guardian-cardboard' + '/' + selectedItem.id);
        } else if (selectedItem.status.requestCode === '0034' || selectedItem.status.requestCode === '0039') {
          const route = this.router.config.find(r => r.path === 'guardian-objection');
          route.data = selectedItem;
          this.router.navigateByUrl('guardian-objection');
        }
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

    this.faqView.open(type, status);
    // this.redirectTo('/request-faq-view/' + selectedItem.requestType.id + '/' + status);
  }
}
