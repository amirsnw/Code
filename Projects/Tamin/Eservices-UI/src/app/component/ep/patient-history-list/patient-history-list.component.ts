import {Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {DataColumnViewType, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {PatientHistoryListDetailComponent} from '../patient-history-list-detail/patient-history-list-detail.component';

@Component({
  selector: 'app-patient-history-list',
  templateUrl: './patient-history-list.component.html',
  styleUrls: ['./patient-history-list.component.css']
})
export class PatientHistoryListComponent  extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('patientHistoryListDetail') patientHistoryListDetail: PatientHistoryListDetailComponent;
  searchParams: SearchParam[];
  @ViewChild('container', {read: ViewContainerRef}) container;
  selectedItem: any;
  natCod: any;
  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  protected initializePage(): void {
    this.securityService.getCurrentUser()
      .then(value => {
        this.natCod = value.login ;
        this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
          .clearActionColumns()
          .clearSearchParams()
          .clearSortParams()
          .clearVisibleColumns()
          .setFirstLoad(false)
          .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
          .addVisibleColumn({columnName: 'docID', columnCaption: 'کد نظام پزشکی', columnViewType: DataColumnViewType.Label, columnSortable: false})
          .addVisibleColumn({columnName: 'docName', columnCaption: 'نام پزشک', columnViewType: DataColumnViewType.Label})
          .addVisibleColumn({columnName: 'specDesc', columnCaption: 'تخصص پزشک', columnViewType: DataColumnViewType.Label})
          .addVisibleColumn({columnName: 'prescName', columnCaption: 'نوع نسخه', columnViewType: DataColumnViewType.Label})
          .addVisibleColumn({columnName: 'prescDate', columnCaption: 'تاریخ ویزیت', columnViewType: DataColumnViewType.Label})
          .addVisibleColumn({columnName: 'location', columnCaption: 'محل ویزیت', columnViewType: DataColumnViewType.Label})
          .setActionColumnCaption('جزئیات نسخه')
          .setShowActionColumn(true)
          .addActionColumn({
            columnName: 'detail',
            columnCaption: 'جزئیات نسخه',
            columnViewType: 'Button',
            icon: '',
            columnIconUrl: '',
            columnActionName: 'detail',
            isActionAuthorized: false,
            visible: true,
            enable: true
          })
          .addUrl(Urls.PATIENT_HISTORY + '/' + this.natCod + '/6/0/0')
          .setPagerCurrentPage(1)
          .setPagerSize(10)
          .setRowDeletable(false)
          .setRowEditable(false)
          .setShowFooter(false)
          .setShowPager(false)
          .setViewType('GridView')
          .getData();
        this.dataGrid.actionRenderer = (item, actionCells) => {
          const result = [];
          result.push(actionCells.find(c => c.columnActionName === 'detail'));
          return result;
        };
        this.dataGrid.pagerCurrentPage = 1;
        this.dataGrid.searchParams = this.searchParams;
        this.dataGrid.refreshData();
      })
      .catch(reason => {
      });
  }
  loadData(item) {
    this.securityService.getCurrentUser()
      .then(value => {
          this.natCod = value.login ;
      })
      .catch(reason => {
      });
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'docID', columnCaption: 'کد نظام پزشکی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'docName', columnCaption: 'نام پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'specDesc', columnCaption: 'تخصص پزشک', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'prescName', columnCaption: 'نوع نسخه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'prescDate', columnCaption: 'تاریخ ویزیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'location', columnCaption: 'محل ویزیت', columnViewType: DataColumnViewType.Label})
      .setActionColumnCaption('جزئیات نسخه')
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'detail',
        columnCaption: 'جزئیات نسخه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'detail',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addUrl(Urls.PATIENT_HISTORY + '/' + this.natCod + '/' + item.prescType + '/' + item.prescDateFrom + '/' + item.prescDateTo)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
    this.dataGrid.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'detail'));
      return result;
    };
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.searchParams = this.searchParams;
    this.dataGrid.refreshData();

  }
  onGridAction(param: any) {
    this.selectedItem = param.item;
    switch (param.actionColumn.columnActionName) {
      case 'detail':
        this.handleDetailsMenuItem(this.selectedItem.noteHeadEprescID, param.item);
        break;
    }
  }
  private handleDetailsMenuItem(noteHeadEprescID, selectedItem) {
    this.container.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PatientHistoryListDetailComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
    componentRef.instance.open(noteHeadEprescID,selectedItem.patientID);
  }

}
