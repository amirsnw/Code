import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { SearchParam, SearchOperator, DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { ImportantPapersNewComponent } from '../important-papers-new/important-papers-new.component';
import { ImportantPapersDisplayComponent } from '../important-papers-display/important-papers-display.component';

@Component({
  selector: 'app-important-papers-list',
  templateUrl: './important-papers-list.component.html',
  styleUrls: ['./important-papers-list.component.css']
})
export class ImportantPapersListComponent extends TaminPageBaseComponent {

  @ViewChild('workshopListGrid') workshopListGrid: TaminDataGridComponent;
  @ViewChild('importantPapersNewComponent') importantPapersNewComponent: ImportantPapersNewComponent;
  @ViewChild('importantPapersDisplayComponent') importantPapersDisplayComponent: ImportantPapersDisplayComponent;

  @Output() sendRecord = new EventEmitter<any>();

  searchParams: SearchParam[];
  private overlay: any;
  isDesabled: boolean;
  initializePage() {
    this._initializeDataGrid();
  }

  // loadPageData() {
  //   this.isDesabled = true;
  // }

  private _initializeDataGrid() {
    this.workshopListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshopid', columnCaption: 'شماره کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'contract.workshop.workshopName', columnCaption: 'نام کارگاه', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'contract.branch.organizationName', columnCaption: 'شعبه تامین اجتمایی', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractrow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contract.contractNumber', columnCaption: 'شماره قرارداد ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'ourag_date1', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridDateConvert })
      .addVisibleColumn({ columnName: 'ourag_price1', columnCaption: 'مبلغ کل بابت اصل حق بیمه', columnViewType:  DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'ourag_price2', columnCaption: 'مبلغ کل بابت حفظ قدرت خرید', columnViewType:  DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'statusDesc', columnCaption: 'وضیعت', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contract.contractSubject', columnCaption: 'شرح قرارداد', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(false)
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnActionName: 'delete',
        icon: '',
        visible: true,
        enable: true
      })
      // .addActionColumn({
      //   columnName: 'edit',
      //   columnCaption: 'ویرایش',
      //   columnViewType: 'Button',
      //   columnActionName: 'edit',
      //   icon: '',
      //   visible: true,
      //   enable: true
      // })
      .addActionColumn({
        columnName: 'approve',
        columnCaption: 'تایید',
        columnViewType: 'Button',
        columnActionName: 'approve',
        icon: '',
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'display',
        columnCaption: 'نمایش  جزئیات',
        columnViewType: 'Button',
        columnActionName: 'display',
        icon: '',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
      this.workshopListGrid.actionRender = (item, actionCells) => {
        const result = [];
        if(item.status=='0'){
          result.push(actionCells.find(c => c.columnActionName === 'delete'));
          // result.push(actionCells.find(c => c.columnActionName === 'edit'));
          result.push(actionCells.find(c => c.columnActionName === 'approve'));
        }
        result.push(actionCells.find(c => c.columnActionName === 'display'));
        return result;
      };
  }
  

  onGridAction(param: any) {
    const actionColumn = param.actionColumn;
    const dataItem = param.item;
    var oragObject = this.getSes("oragObject");
    if (actionColumn.columnName === 'edit') {
      this.redirectTo(`/request/edit/${dataItem.id}`);
    }
    if (actionColumn.columnName === 'delete') {
      this.restService
        .delete(`${Urls.importantPapers}-delete`, dataItem.orgempamountwid.toString())
        .then(value => {
          this.hideOverlay(this.overlay);
          const msg = 'اطلاعات با موفقیت حذف شد.';
          this.showInfoMessageBox('توجه', msg);
          this.loadData(oragObject.ourag_id);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          if (reason.error.status == 404) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 500) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 200) {
            this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
            //  this.redirectTo(`/il/load-from-file/${param.item.traceCode}/${param.item.status.id}`);
          }
        });
    }
    if (actionColumn.columnName === 'approve') {
      var url = `${Urls.importantPapers}-approve`;
      this.restService
        .update(url, dataItem.orgempamountwid.toString(), null)
        .then(value => {
          this.hideOverlay(this.overlay);
          const msg = 'اطلاعات با موفقیت تایید شد.';
          this.showInfoMessageBox('توجه', msg);
          this.loadData(oragObject.ourag_id);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          if (reason.error.status == 404) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 403) {
            this.showErrorMessageBox('پیام سیستم', 'امکان انجام عملیات تائید نهایی، فقط برای کاربر با نقش مدیر، میسر می باشد.');
          }
          if (reason.error.status == 500) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 200) {
            this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
            //  this.redirectTo(`/il/load-from-file/${param.item.traceCode}/${param.item.status.id}`);
          }
        });
    }
    if (actionColumn.columnName === 'display') {
      this.importantPapersDisplayComponent.show(dataItem);
    }
  }


  loadData(item = null) {
    this.searchParams = [];
    this.searchParams.push({
      property: 'paperId',
      value: item,
      operator: SearchOperator.EQ
    });
    this.workshopListGrid.pagerCurrentPage = 1;
    this.workshopListGrid.serviceUrl = `${Urls.importantPapers}-items`;
    this.workshopListGrid.searchParams = this.searchParams;
    this.workshopListGrid.dataItems = [];
    this.workshopListGrid.refreshData();
    this.isDesabled = true;
  }
  setDesable() {
    this.isDesabled = false;
  }


  onItemSelect(param: any) {
    this.sendRecord.emit(param);
  }
  newClick() {
    // this.selectedItem = undefined;
    // this.redirectTo(`/request/edit${-1}`);
    this.importantPapersNewComponent.show();
  }
  gridCellPrintStatusTranslator(item) {
    switch (item) {
      case '00':
        return 'درانتظار تایید شعبه';
      case '01':
        return 'تایید شده';
      case '02':
        return 'عدم تایید شعبه';
      default:
        return item;
    }
  }
  gridDateConvert(item) {
    if (item.length >= 8) {
      return `${item.substring(0, 4)}/${item.substring(4, 6)}/${item.substring(6, 8)}`;
    } else return item;
  }
  gridOrag1(item) {
    if (item.ourag_count1 == "" || item.ourag_count1 == null) item.ourag_count1 = 0;
    if (item.ourag_aprice1 == "" || item.ourag_aprice1 == null) item.ourag_aprice1 = 0;
    return (item.ourag_count1 * item.ourag_aprice1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    // }
  }
  gridOrag2(item) {
    if (item.ourag_count2 == "" || item.ourag_count2 == null) item.ourag_count2 = 0;
    if (item.ourag_aprice2 == "" || item.ourag_aprice2 == null) item.ourag_aprice2 = 0;
    return (item.ourag_count2 * item.ourag_aprice2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  onLoadData(params: any) {
    this.loadData(params);
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

}
