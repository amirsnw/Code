import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, SearchOperator,
  SearchParam, SortDirection, SortParam,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup} from "@angular/forms";
import {Urls} from "../../../../../settings/urls";
import {WorkshopFullInfoMembersListComponent} from "../../../../workshop-registration/workshop-full-info/workshop-full-info-members-list/workshop-full-info-members-list.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends TaminPageBaseComponent {

  @ViewChild('employeeDataGrid') employeeDataGrid: TaminDataGridComponent;
  searchForm: FormGroup;
  searchParams: SearchParam[];
  workshopId: string;
  organizationId: string;
  private _overlay: any;
  status = [
    {
      requestCode: '0000',
      requestDesc: 'در انتظار تایید'
    },
    {
      requestCode: '0004',
      requestDesc: 'ثبت درخواست'
    },
    {
      requestCode: '0006',
      requestDesc: 'درخواست نامعتبر'
    },
    {
      requestCode: '0017',
      requestDesc: 'درحال بررسی-نیاز به رسیدگی شعبه'
    },
    {
      requestCode: '0005',
      requestDesc: 'درحال بررسی'
    },
    {
      requestCode: '0018',
      requestDesc: 'مختومه-تایید نهایی'
    },
    {
      requestCode: '0019',
      requestDesc: 'مختومه-عدم تایید'
    },
  ]

  initializePage() {
    this._initializeFromGroup();
    this._initializeDataGrid();
  }

  private _initializeDataGrid() {
    const sortParam = new SortParam();
    sortParam.property = 'personal.request.refCode';
    sortParam.direction = SortDirection.DESC;

    this.employeeDataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addSortParam(sortParam)
      //.addVisibleColumn({columnName: 'request.refCode', columnCaption: 'کد پیگیری', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'personal.nationalId', columnCaption: 'کدملی', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'personal.dateOfBirth',
        columnCaption: 'تاریخ تولد',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({columnName: 'personal.firstName', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'personal.lastName', columnCaption: 'نام خانوادگی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceId', columnCaption: 'شماره بیمه', columnViewType: 'Label'})
      .addVisibleColumn({
        columnName: 'personal.request.creationTime',
        columnCaption: 'تاریخ ثبت',
        columnViewType: DataColumnViewType.PersianDate
      })
      .addVisibleColumn({
        columnName: 'personal.request.status.requestDesc',
        columnCaption: 'وضعیت نامنویسی',
        columnViewType: 'Label'
      })
      .setShowActionColumn(true)
      .addActionColumn({
        columnName: 'confirm',
        columnCaption: 'تایید',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'confirm',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'نمایش و اصلاح',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'showrequest',
        columnCaption: 'پیگیری',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'showrequest',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })

      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.employeeDataGrid.actionRender = (item, actionCells) => {
      const result = [];

      if (item.personal.request.status === null) {
        result.push(actionCells.find(c => c.columnActionName === 'confirm'));
        result.push(actionCells.find(c => c.columnActionName === 'edit'));
        result.push(actionCells.find(c => c.columnActionName === 'delete'));
      } else {

        result.push(actionCells.find(c => c.columnActionName === 'showrequest'));
      }
      return result;
    }

    this.employeeDataGrid.cellRenderer = (item, column) => {
      if (column.columnName === 'personal.request.status.requestDesc' && !item.personal.request.status) {
        return {handled: true, data: '<span>در انتظار تایید</span>'};
      }
      return {handled: false, data: ''};
    };

    this.employeeDataGrid.cellStyler = (item, column) => {
      if (!item.personal.request.status) {
        return {
          'background-color': 'orange',
          'color': 'white'
        }
      }
    };
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      status: [''],
      nationalId: ['']

    });
  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;

    switch (actionName) {
      case 'edit':
        if (param.item.personal.request.status !== null && param.item.personal.request.status.requestCode !== null) {
          this.showErrorMessageBox('خطا', 'اطلاعات این درخواست قابل حذف یا اصلاح نمی باشد.');
          return;
        }
        this.redirectTo('/employer-registration/personal/' + param.item.personal.request.id.toString());

        break;
      case 'delete':
        if (param.item.personal.request.status !== null && param.item.personal.request.status.requestCode !== null) {
          this.showErrorMessageBox('خطا', 'اطلاعات این درخواست قابل حذف یا اصلاح نمی باشد.');
          return;
        }
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.delete(Urls.PersonalPost, param.item.personal.id.toString()).then(value => {
            this.hideOverlay(this._overlay);
            this.loadData(null);
          }).catch(error => {
            this.hideOverlay(this._overlay);
          });
        }, () => {
        });
        break;
      case 'confirm':
        if (param.item.personal.request.status !== null && param.item.personal.request.status.requestCode !== null) {
          this.showErrorMessageBox('خطا', 'اطلاعات این درخواست قابل حذف یا اصلاح نمی باشد.');
          return;
        }
        this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
          this._overlay = this.showOverlay();
          this.restService.update(Urls.RegRequestPut, param.item.personal.request.id.toString(), {})
            .then(result => {
              this.hideOverlay(this._overlay);
              const massage = 'درخواست شما با کد  ' + param.item.personal.request.refCode + ' در صف بررسی مرکز قرار گرفته است.';
              this.showInfoMessageBox('پیام سیستم', massage, () => {
                /*const model ={workshopId:this.workshopId,
                organizationId:this.organizationId};*/
                this.loadData(null);
              });
            })
            .catch(error => {
              this.hideOverlay(this._overlay);
              console.log(error);
              this.showErrorMessageBox('خطا', error.error.data.message);
            });
        }, () => {
        });

        break;
      case 'view':
        this.redirectTo('employer-registration/summary/' + param.item.personal.request.id);
        break;
      case 'showrequest':
        this.redirectTo('me/' + param.item.personal.request.id);
        break;
    }
  }

  loadData(item) {
    debugger;
    this.searchParams = new Array<SearchParam>();

    if (item !== null) {
      this.workshopId = item.workshopId;
      this.organizationId = item.branchCode;
      const searchParam1 = new SearchParam();
      searchParam1.property = 'workshopId';
      searchParam1.value = this.workshopId;
      searchParam1.operator = SearchOperator.EQUAL;
      this.searchParams.push(searchParam1);
      const searchParam2 = new SearchParam();
      searchParam2.property = 'organizationId';
      searchParam2.value = this.organizationId;
      searchParam2.operator = SearchOperator.EQUAL;
      this.searchParams.push(searchParam2);
    }

    //this.employeeDataGrid.serviceUrl = Urls.EmployeeRegistration + '/' + this.workshopId;

    this.employeeDataGrid.pagerCurrentPage = 1;
    //this.dataGrid.serviceUrl = `${Urls.WorkshopsStackholders}`;
    this.employeeDataGrid.searchParams = this.searchParams;
    this.employeeDataGrid.serviceUrl = Urls.EmployeeRegistration;
    this.employeeDataGrid.refreshData();

  }

  loadData2(item) {
    debugger;
    this.searchParams = new Array<SearchParam>();

    const searchParam1 = new SearchParam();
    searchParam1.property = 'workshopId';
    searchParam1.value = this.workshopId;
    searchParam1.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam1);
    const searchParam2 = new SearchParam();
    searchParam2.property = 'organizationId';
    searchParam2.value = this.organizationId;
    searchParam2.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam2);

    if (item !== null && item.status !== null && item.status !== '') {
      const searchParam3 = new SearchParam();
      searchParam3.property = 'personal.request.status.requestCode';
      searchParam3.value = item.status;
      searchParam3.operator = SearchOperator.EQUAL;
      this.searchParams.push(searchParam3);
    }
    if (item !== null && item.nationalId !== null && item.nationalId !== '') {
      const searchParam4 = new SearchParam();
      searchParam4.property = 'personal.nationalId';
      searchParam4.value = item.nationalId;
      searchParam4.operator = SearchOperator.EQ;
      this.searchParams.push(searchParam4);

    }
    this.employeeDataGrid.pagerCurrentPage = 1;
    //this.dataGrid.serviceUrl = `${Urls.WorkshopsStackholders}`;
    this.employeeDataGrid.searchParams = this.searchParams;

    this.employeeDataGrid.serviceUrl = Urls.EmployeeRegistration;
    this.employeeDataGrid.refreshData();


  }

  AddClick() {
    if (this.workshopId === null || this.workshopId === '' || this.workshopId === undefined) {
      this.showErrorMessageBox('خطا', 'لطفا کارگاه مورد نظر خود را انتخاب نمایید.');
      return;
    }
    this.redirectTo('/employer-registration/personal/' + this.workshopId + '/' + this.organizationId);
  }

  onSearch(params: any) {
    this.loadData2(params);
  }

  resetForm() {
    this.searchForm.reset();
    this.loadData2(null);
  }
}
