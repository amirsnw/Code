import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FacUrls} from '../../fac-urls';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-stack-holders',
  templateUrl: './stack-holders.component.html',
  styleUrls: ['./stack-holders.component.css']
})
export class StackHoldersComponent  extends TaminPageBaseComponent {

  @ViewChild('dataGridHyatModire') dataGridHyatModire: TaminDataGridComponent;
  @ViewChild('dataGridSahebaneEmza') dataGridSahebaneEmza: TaminDataGridComponent;
  private requestId: any;
  private editMode: any;
  private _overlay: any;
   setDisableDafaterAddress: any;
  private theUrl: any;
  private hasExecutive: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGridHM();
    this._initializeDataGridSE();
    this.setDisableDafaterAddress = false;
  }
  private _initializeDataGridHM() {
    debugger;
    const theUrl = `${FacUrls.STACK_HOLDERS}/${this.requestId}`;
    this.dataGridHyatModire.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'nationality', columnCaption: 'ملیت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNationality})
      .addVisibleColumn({columnName: 'nationCode', columnCaption: 'کد ملی/شماره فراگیر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام و   نام خانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'position', columnCaption: 'سمت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServicePosition})
      .addVisibleColumn({columnName: 'movazaf', columnCaption: 'عضو موظف / غیر موظف ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceMovazaf})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'دوره تصدی  از', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'endDate', columnCaption: 'دوره تصدی تا',  columnViewType: DataColumnViewType.PersianDate})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'editModir',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'editModir',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
       .addActionColumn({
        columnName: 'deleteModir',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'deleteModir',
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

    // this.dataGridHyatModire.cellRenderer = (item, column) => {
    //   if (column.columnName === 'startDate' && item.startDate && item.startDate.length === 6) {
    //     const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
    //     return {handled: true, data: tmp};
    //   }
    //   return {handled: false, data: ''};
    // };

    this.dataGridHyatModire.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'editModir'));
      result.push(actionCells.find(c => c.columnActionName === 'deleteModir'));
      return result;
    };
     }
  private _initializeDataGridSE() {
    debugger;
    const theUrl = `${FacUrls.SIG_OWNER}/${this.requestId}`;
    this.dataGridSahebaneEmza.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'nationCode', columnCaption: 'کد ملی/شماره فراگیر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام و نام خانوادگی', columnViewType: 'Label'})
      // .addVisibleColumn({columnName: 'positionDesk', columnCaption: 'سمت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServicePosition})
      .addVisibleColumn({columnName: 'position', columnCaption: 'سمت ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServicePosition})
      .addVisibleColumn({columnName: 'sigOwner', columnCaption: 'صاحبان امضاء ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceSigOwner})
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

    this.dataGridSahebaneEmza.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      return result;
    };
    this.dataGridSahebaneEmza.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };
  }
  gridCellServicePosition(item) {
    switch (item) {
        case '1':
        return 'مدیرعامل';
      case '2':
        return 'رئیس هیئت مدیره';
      case '3':
        return 'نائب رئیس هیئت مدیره';
      case '4':
        return 'اعضاء هیئت مدیره';
      case '5':
        return 'بازرس';
      case '6':
        return 'بازرس علی البدل';

    }
  }

  gridCellServiceMovazaf(item) {
    switch (item) {
      case '1':
        return 'موظف';
      case '2':
        return 'غیر موظف';
      case '0':
        return 'نامشخص';

    }
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
  gridCellServiceSigOwner(item) {
    switch (item) {
      case '1':
        return 'مجاز  مشترک';
      case '2':
        return 'مجاز منفرد';
      case '0':
        return 'نامشخص';

    }
  }
  onNewSigOwner() {
    debugger;
    this.redirectTo('/fac/newDetStackholders/' + '0/0/' + this.requestId);
  }
  onNewHeyateModi() {
    // new= 0 edit =1 (modir = 1 sahebeEmza =0)
    debugger;
    this.redirectTo('/fac/newDetStackholders/' + '0/1/' + this.requestId);
  }
  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
     case 'editModir':
        this.redirectTo('/fac/newDetStackholders/' + '1/1/' + this.requestId);
        break;
      case 'deleteModir':
        this.delete(param.item.detStackholdersId.toString());
        break;
      case 'edit':
        this.redirectTo('/fac/newDetStackholders/' + '1/0/' + this.requestId);
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
            this.dataGridSahebaneEmza.refreshData();
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
  onBackStackHolder() {
    this.redirectTo('/fac/infHaghighiHoghoghi/' +  this.requestId);
  }
  onCompleteStackHolder() {
    this.theUrl = `${FacUrls.SIG_OWNER}/` + this.requestId;
    this.restService.getAll(this.theUrl)
      .then(values => {
        debugger;
        if (values.data.total === '0') {
          this.showErrorMessageBox('پیام سیستم', 'کاربر گرامی، لطفا اطلاعات صاحبان امضاء را وارد نمایید.');
          return;
        }
        if (values.data.list.length < 2) {
          for (let i = 0; i < values.data.list.length; i++) {
            if (values.data.list[0].sigOwner === '1') {
              this.showErrorMessageBox('پیام سیستم', 'کاربر گرامی در حالتی که صاحب امضاء مجاز مشترک دارید، حداقل دو ردیف در لیست صاحبان امضاء باید وارد نمایید.');
              return;
            }
          }
        }
        this.hasExecutive = false;
        for (let i = 0; i < values.data.list.length; i++) {
          if (values.data.list[i].position === '1') {
            this.hasExecutive = true;
            break;
          }
          if (values.data.list[i].character === '1') {
            this.hasExecutive = true;
            break;
          }
        }
        if ( this.hasExecutive) {
          ///??????gharare chi beshe
          // var me = this;
          // var params = window.location.hash.split('/').slice(1)[0];
          // var requestId = {requestId: params.split(',').slice(0)[0]};
          //
          // Ext.Ajax.request({
          //   url: Audit.helper.Urls.getUrl('statusDetStackholders') + "/" + requestId.requestId + "/3",
          //   method: 'GET',
          //   callback: function (options, success, response) {
          //     if (success) {
          //       me.redirectTo('det-responsible/' + requestId.requestId);
          //     }
          //   }
          // });
        } else {
          this.showErrorMessageBox('خطا ', 'کاربر گرامی لطفا اطلاعات مدیر عامل را وارد نمایید در غیر این صورت امکان تکمیل اطلاعات برای این صفحه وجود ندارد');
        }

      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}
