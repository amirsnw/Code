import {Component, ComponentFactoryResolver, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminTabComponent} from 'tamin-framework';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Urls} from 'src/app/settings/urls';
import {ElementRef} from '@angular/core';
import {ClaimUrls} from '../../../../claim/claim-urls';

@Component({
  selector: 'app-sso-eblagh-mofasa',
  templateUrl: './sso-eblagh-mofasa.component.html',
  styleUrls: ['./sso-eblagh-mofasa.component.css']
})
export class SsoEblaghMofasaComponent extends TaminPageBaseComponent {


  searchForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('pdfTab') pdfTab: TaminTabComponent;
  @ViewChild('text') text: ElementRef;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  private _overlay: any;

  status = [
    {'id': '1', 'name': 'در انتظار ابلاغ'},
    {'id': '2', 'name': 'ابلاغ شده'}
  ];

  type = [
    {'id': '1', 'name': 'کارفرمای پیمانکار'},
    {'id': '2', 'name': 'کارفرمای واگذارنده'}
  ];

  systemTypes = [
    {'id': '1', 'name': 'فرم شماره 1 تبصره الحاقی'},
    {'id': '2', 'name': 'فرم شماره 2 تبصره الحاقی'},
    {'id': '3', 'name': 'مفاصا حساب ماده 38'},
    {'id': '4', 'name': 'مبانی محاسباتی'}
  ];

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  private initializeEblaghDataGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam({
        property: 'id',
        direction: 'DESC'
      })
      .addUrl(Urls.EblaghMofasaSso)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه پیمانکار', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'brchCode', columnCaption: 'کد شعبه پیمانکار', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'nationalCode', columnCaption: 'کد ملی کارفرما', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'aWorkshopId', columnCaption: 'کدکارگاه واگذارنده', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'abrchCode', columnCaption: 'کد شعبه واگذارنده', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'creationTime', columnCaption: 'تاریخ ایجاد', columnViewType: DataColumnViewType.PersianDate, columnSortable: true})
      .addVisibleColumn({columnName: 'modifyTime', columnCaption: 'تاریخ ابلاغ', columnViewType: DataColumnViewType.PersianDate, columnSortable: true})
      .addVisibleColumn({columnName: 'eblaghClientType', columnCaption: 'نوع ارتباط', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'sendFlag', columnCaption: 'وضعیت ابلاغ', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'systemType', columnCaption: 'نوع ابلاغیه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .setActionColumnCaption('عملیات')
      .addActionColumn({
          columnName: 'view',
          columnCaption: 'رویت مکاتبه',
          columnViewType: 'Button',
          columnActionName: 'view',
          columnIconUrl: '',
          icon: '',
          visible: true, enable: true
        }
      )
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();

    this.dataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'eblaghClientType') {
        const tmp = this.type.find(c => c.id === item.eblaghClientType).name;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'sendFlag') {
        const tmp = this.status.find(c => c.id === item.sendFlag).name;
        return {handled: true, data: tmp};
      }
      if (column.columnName === 'systemType') {
        const tmp = this.systemTypes.find(c => c.id === item.systemType).name;
        return {handled: true, data: tmp};
      }
      return {handled: false, data: ''};
    };
  }

  protected initializePage(): void {
    this.searchForm = this.formBuilder.group({
      workshopId: [''],
      contractRow: [''],
      contractNumber: [''],
      brchCode: [''],
      nationalCode: [''],
      aWorkshopId: [''],
      abrchCode: [''],
      sendFlag: [''],
      systemType: ['']
    });

    this.initializeEblaghDataGrid();
  }


  resetForm() {
    this.searchForm.reset();
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.searchParams = [];
    this.dataGrid.refreshData();
  }

  doSearch() {
    const values = this.searchForm.getRawValue();
    const searchParams = new Array<SearchParam>();
    let searchParam = new SearchParam();


    if (values.workshopId) {
      searchParam = new SearchParam();
      searchParam.property = 'workshopId';
      searchParam.value = values.workshopId;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.contractRow) {
      searchParam = new SearchParam();
      searchParam.property = 'contractRow';
      searchParam.value = values.contractRow;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.contractNumber) {
      searchParam = new SearchParam();
      searchParam.property = 'contractNumber';
      searchParam.value = values.contractNumber;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.brchCode) {
      searchParam = new SearchParam();
      searchParam.property = 'brchCode';
      searchParam.value = values.brchCode;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.nationalCode) {
      searchParam = new SearchParam();
      searchParam.property = 'nationalCode';
      searchParam.value = values.nationalCode;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.aWorkshopId) {
      searchParam = new SearchParam();
      searchParam.property = 'aWorkshopId';
      searchParam.value = values.aWorkshopId;
      searchParam.operator = SearchOperator.LIKE;
      searchParams.push(searchParam);
    }

    if (values.abrchCode) {
      searchParam = new SearchParam();
      searchParam.property = 'abrchCode';
      searchParam.value = values.abrchCode;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.sendFlag) {
      searchParam = new SearchParam();
      searchParam.property = 'sendFlag';
      searchParam.value = values.sendFlag;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (values.systemType) {
      searchParam = new SearchParam();
      searchParam.property = 'systemType';
      searchParam.value = values.systemType;
      searchParam.operator = SearchOperator.EQ;
      searchParams.push(searchParam);
    }

    if (searchParams.length !== 0) {
      this.dataGrid.searchParams = searchParams;
      this.dataGrid.refreshData();
    }
  }

  onShowDetails(data) {
    this.pdfTab.visible = false;
    switch (data.actionColumn.columnActionName) {
      case 'view':
        this._overlay = this.showOverlay();
        this.loadPdf(data)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.theModal.show();
            this.dataGrid.refreshData(false);
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
    }
  }

  loadPdf(data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (data.item.mofasaPdfId) {
        this.pdfTab.visible = true;
        const pdfUrl = `${Urls.EblaghMofasaPdfSso}/${data.item.mofasaPdfId}`;
        try {
          this.documentViewer.loadPdf(pdfUrl);
          resolve();
        } catch (reason) {
          reject(reason);
        }
      } else {
        resolve();
      }
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.dataGrid.searchParams = null;
    this.dataGrid.refreshData();
  }
}
