import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {ClaimUrls} from '../../../../claim-urls';

@Component({
  selector: 'app-online-list-details',
  templateUrl: './online-list-details.component.html',
  styleUrls: ['./online-list-details.component.css']
})
export class OnlineListDetailsComponent extends TaminPageBaseComponent {

  private listId: any;
  listData: any;

  @ViewChild('employeesDataGrid') employeesDataGrid: TaminDataGridComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
    this.listId = this.activeRoute.snapshot.params['id'];
  }

  protected loadPageData() {
    this.initializeEmployeesDataGrid();
    this.loadData();
  }

  loadData() {
    this.restService
      .getAll(ClaimUrls.listRecord + '/' + this.listId)
      .then(value => {
        this.listData = value.data;
      })
      .catch(reason => {
      });
  }

  private initializeEmployeesDataGrid() {
    this.employeesDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: '', columnCaption: 'ردیف', columnViewType: DataColumnViewType.RowNumber})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'nationalCode', columnCaption: 'کد ملی', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'insuranceNumber', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'jobDescription', columnCaption: 'شغل', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'workingDays', columnCaption: 'کارکرد (روز)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'dailyWage', columnCaption: 'دستمزد روزانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'monthlyWage', columnCaption: 'دستمزد ماهانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addVisibleColumn({columnName: 'wageAndBenefit', columnCaption: 'مزایای ماهانه (ریال)', columnViewType: DataColumnViewType.Label, columnSortable: false})
      .addActionColumn({
          columnName: 'view',
          columnCaption: 'مشاهده ریز اطلاعات',
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
  }

  addNewEmployee() {
    this.redirectTo('il/employee/' + this.listId + '/0');
  }
}

