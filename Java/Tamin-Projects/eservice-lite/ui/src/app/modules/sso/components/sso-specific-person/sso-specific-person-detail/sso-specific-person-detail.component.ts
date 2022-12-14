import {Component, EventEmitter, Injector, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataColumnViewType, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

declare var alertify: any;

@Component({
  selector: 'app-sso-specific-person-detail',
  templateUrl: './sso-specific-person-detail.component.html',
  styleUrls: ['./sso-specific-person-detail.component.css']
})
export class SsoSpecificPersonDetailComponent extends TaminPageBaseComponent {
  @ViewChild('specificPersons') specificPersons: TaminDataGridComponent;
  searchForm: FormGroup;
  private subscription = new Subscription();
  @Output() filterParams = new EventEmitter<any>();
  private _overlay: any;
  searchParams: SearchParam[];
  actionRenderResult = [];

  constructor(injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
  }

  initializePage() {
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    this.specificPersons.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'nationalId', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceId', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'تاریخ شروع', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'statusDesc', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label})
      // .addVisibleColumn({columnName: 'status', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label})
      .setShowActionColumn(true)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'inactive',
        columnCaption: 'قابل نمایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'inactive',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
        columnName: 'active',
        columnCaption: 'غیر قابل نمایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'active',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(true)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
    this.specificPersons.actionRenderer = (item, actionCells) => {
      const result = [];
      if (item.status === '1') {
        result.push(actionCells.find(c => c.columnActionName === 'inactive'));
      }
      if (item.status === '2') {
        result.push(actionCells.find(c => c.columnActionName === 'active'));
      }
      return result;
    };
  }

  onAdd() {
    this.redirectTo('sso/sso-specific-person-add');
  }

  protected loadPageData(): void {
    this.subscription.add(this.activatedRoute.params.subscribe(params => {

      this.specificPersons.serviceUrl = Urls.ExceptionPersonal;
      this.specificPersons.refreshData();

    }));
  }

  search(value: any) {
    this.specificPersons.searchParams = value;
    this.specificPersons.pagerCurrentPage = 1;
    this.actionRenderResult = [];
    this.specificPersons.refreshData();
  }

  onActive(data) {
    this.showQuestionBox('پیام سیستم', 'از فعال یا غیر فعال کردن این مورد اطمینان دارید؟', () => {
      const nationalId = data.item.nationalId;
      switch (data.actionColumn.columnName) {
        case 'active' :
          this._overlay = this.showOverlay();
          this.restService.update(Urls.ExceptionPersonalActive, nationalId, null)
            .then(value => {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد', () => {
                this.specificPersons.refreshData();
              });
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
          break;
        case 'inactive' :
          this._overlay = this.showOverlay();
          this.restService.update(Urls.ExceptionPersonalInActive, nationalId, null)
            .then(value => {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد', () => {
                this.specificPersons.refreshData();
              });
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
          break;
      }
    }, () => {
    });
  }

}
