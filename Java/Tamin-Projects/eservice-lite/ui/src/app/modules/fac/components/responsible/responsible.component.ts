import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.css']
})
export class ResponsibleComponent extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;

  private requestId: any;
  private editMode: any;
  private _overlay: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGrid();
   }
  private _initializeDataGrid() {
    debugger;
    const theUrl = `${FacUrls.RESPONSIBLE}/${this.requestId}`;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'nationality', columnCaption: 'ملیت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNationality})
      .addVisibleColumn({columnName: 'nationalId', columnCaption: 'کد ملی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام و نام خانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'phoneNumber', columnCaption: 'شماره تلفن ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'mobileNumber', columnCaption: 'تلفن همراه ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'position', columnCaption: 'سمت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServicePosition})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
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
      .setFirstLoad(true)
      .getData();

    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      debugger;
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      return result;
    };
    this.dataGrid.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };

  }
  gridCellServiceNationality(item) {
    switch (item) {
      case '1':
        return 'ایرانی';
      case '2':
        return 'تبعه خارجی';
      case '0':
        return 'نامشخص';

    }
  }
  gridCellServicePosition(item) {
    switch (item) {
      case '1':
        return 'مدیرعامل';
      case '2':
        return 'رئیس حسابداری';
      case '3':
        return 'معاون مالی';
      case '4':
        return '';
    }
  }
  onNew() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newResponsible/' + this.editMode + '/' +  this.requestId + '/1');
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newResponsible/' + this.editMode + '/' + this.requestId + '/' +  param.item.detResponsiblesId);
        break;
      case 'delete':
        this.delete(param.item.detStackholdersId.toString());
        break;
    }
  }
 delete(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          // this.theModal.hide();
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
  back() {
    this.redirectTo('/fac/portal-forms/' +  this.requestId);
  }
  onBackResponsible() {
    debugger;
    const theUrl = `${FacUrls.REQUEST}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        // &&  this.editMode === '1'
        if (values.data.list[0].requestReasonTypesId.code === 2 ) {
          this.redirectTo('/fac/infHaghighiHoghoghi/' +  this.requestId);
        } else {
          this.redirectTo('/fac/detStackholders/' +  this.requestId);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    }

  onCompleteResponsible() {
    const theUrl = `${FacUrls.RESPONSIBLE}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data.length === 0) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعات مدیر یا مسوول پاسخگو باید وارد شود.');
          return;
        }
        const theUrls = `${FacUrls.OK_INFO_SERVICE}/` + this.requestId + '/3';
        this.restService.getAll(theUrls)
          .then(value => {
            debugger;
            // info-sub-workshop
            this.redirectTo('/fac/infoSubWorkshop/' +  this.requestId);

          })
          .catch(error => {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
       })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
     }

}

