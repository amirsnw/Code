import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldComboBoxComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FacUrls} from '../../fac-urls';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {FormsComponent} from '../forms/forms.component';


@Component({
  selector: 'app-portal-inspection',
  templateUrl: './portal-inspection.component.html',
  styleUrls: ['./portal-inspection.component.css']
})
export class PortalInspectionComponent  extends TaminPageBaseComponent {

  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('mapModal') mapModal: TaminModalComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('onForms') onForms: FormsComponent;
  @ViewChild('branchCodeComboBox') branchCodeComboBox: TaminFieldComboBoxComponent;
  @ViewChild('statusTypeComboBox') statusTypeComboBox: TaminFieldComboBoxComponent;
  form: FormGroup;
  id: any;
  map: any;
  branchCodes = [];
  statusTypes = [];
  private _overlay: any;
  loadCompleted = false;
  searchParams: SearchParam[];
  item: any;
  setHiddenBranch: any;




  protected initializePage(): void {
    this.form = this.formBuilder.group({
      requestId: [''],
      workshopId: [''],
      branchCode: [''],
      status: ['']
    });
   this._initializeDataGrid();
    this.fillReciveBranchComboBox();
    this.fillStatusTypeComboBox();
    this.setHiddenBranch = false;
    this.securityService.getCurrentUser()
      .then(value => {
        debugger;
        if (value.roles.length > 0) {
          for ( let i = 0; i <= value.roles.length ; i++ ) {
              if ( value.roles[i].roleName ===  'EMPLOYER') {
                this.setHiddenBranch = true;
                return;
                   }
          }
        }
        // resolve(true);
      })
      .catch(reason => {
      });
   }
   // ERROR DARE    vaghti load mishe samte server koli record bar migardone
  fillReciveBranchComboBox() {
   const theUrl = `${FacUrls.BRANCH}`;
    this.restService.getAll(theUrl)
      .then(data => {
        (data.data.list as Array<any>).forEach((item) => {
          this.branchCodes.push({
            name:  item.brhCode + ' - ' + item.brhName,
            value: item.brhCode
          });
        });
      })
      .catch(reason => {
      });
  }
  fillStatusTypeComboBox() {
    debugger;
    const theUrl = `${FacUrls.STATUS_TYPE}`;
    this.restService.getAll(theUrl)
      .then(data => {
        debugger;
         (data.data.list as Array<any>).forEach((item) => {
          this.statusTypes.push({
            name: item.title,
            value: item.code
          });
        });
      })
      .catch(reason => {
      });

  }
  private _initializeDataGrid() {
    debugger;
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(FacUrls.SYSTEM_REQUEST)
      .addVisibleColumn({columnName: 'requestId', columnCaption: 'شماره درخواست ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'شمار ه کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'reasonTypeTitle', columnCaption: 'علت درخواست', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'creationTime', columnCaption: 'تاريخ درخواست ',  columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'startFiscalYear', columnCaption: 'دوره مالي از ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'endFiscalYear', columnCaption: 'دوره مالي لغايت ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'declarationDateAutoForm1', columnCaption: 'تاريخ ابلاغ  فرم 1 ', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'workshopAddressMobile', columnCaption: 'تلفن همراه ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopAddressDesc', columnCaption: 'آدرس ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'characterDesc', columnCaption: 'شخصيت کارگاه ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'stauseTypeTitle', columnCaption: 'وضعيت درخواست ', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'onForms',
        columnCaption: 'تکمیل اطلاعات اولیه',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'onForms',
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
      result.push(actionCells.find(c => c.columnActionName === 'onForms'));
      return result;
    };
     this.dataGrid.cellRenderer = (item, column) => {
     return {handled: false, data: ''};
    };
  }
  onView(data) {
    debugger;
    switch (data.actionColumn.columnName) {
      case 'onForms' :
        this.redirectTo('/fac/portal-forms/' +  data.item.requestId);
        break;

    }
  }

  loadData() {
    debugger;
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this.dataGrid.serviceUrl = FacUrls.SYSTEM_REQUEST;
      this.dataGrid
        .refreshData()
        .then(value => {
          this.hideOverlay(this._overlay);
          this.loadCompleted = true;
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject(reason);
        });
    });
  }
  private hasValue(data) {
    debugger;
    return data !== '' && data !== null  ;
  }
  onSearch() {
    const filter = [];
    debugger;
    if (this.hasValue(this.form.controls.requestId.value)) {
      filter.push({
        property: 'requestId',
        value: this.form.get('requestId').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.workshopId.value)) {
      filter.push({
        property: 'workshopId',
        value:  this.form.get('workshopId').value,
        operator: SearchOperator.EQ
      });
    }

    if (this.hasValue(this.form.controls.branchCode.value)) {
      filter.push({
        property: 'branchCode',
        value: this.form.get('branchCode').value.toString(),
        operator: SearchOperator.LIKE
      });
    }
    if (this.hasValue(this.form.controls.status.value)) {
      filter.push({
        property: 'stauseTypeCode',
        value: this.form.get('status').value.toString(),
        operator: SearchOperator.EQ
      });
    }
   this.dataGrid.searchParams = [];
    this.dataGrid.searchParams = filter;
    this.dataGrid.pagerCurrentPage = 1;
    debugger;
    this.dataGrid.serviceUrl = `${FacUrls.SYSTEM_REQUEST}`;
    this.dataGrid.refreshData();
  }

  resetSearch() {
    this.form.reset();
    this.dataGrid.searchParams = [];
    this.dataGrid.pagerCurrentPage = 1;
    this.dataGrid.refreshData();
  }

}
