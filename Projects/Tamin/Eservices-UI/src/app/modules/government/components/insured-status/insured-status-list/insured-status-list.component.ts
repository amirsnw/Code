import {Component, ElementRef, EventEmitter, Input, Output, ViewChild , OnInit} from '@angular/core';
import {DataColumnViewType, SearchOperator , SearchParam , GenericRestService , TaminFieldAutoCompleteDataGridComponent , TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder} from '@angular/forms';
import {FormGroup , Validators} from '@angular/forms';
import { Urls } from 'src/app/settings/urls';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-insured-status-list',
  templateUrl: './insured-status-list.component.html',
  styleUrls: ['./insured-status-list.component.css']
})
export class InsuredStatusListComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  private _overlay: any;
  loadCompleted = false;


  public theForm: FormGroup;
  searchParams: SearchParam[];
  private _subscription = new Subscription();
  showRecipient: boolean;
  showBranchName: boolean;


  private _initializeFormGroup() {
  }

  private createForm() {
    this.theForm = this.formBuilder.group({
      nationalId: ['', []]
    });
  }

  // initializePage() {
  //   this.initializeGrid();
  //   this.createForm();
  //   this._initializeFormGroup();
  // }

  initializePage() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'organization.organizationName', columnCaption: 'نام واحد سازمانی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'relationWithTamin.relationDescription', columnCaption: 'ارتباط با تامین', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceNameTranslator})
      .addVisibleColumn({columnName: 'insuranceId', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'startDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'parentId', columnCaption: 'شماره بیمه شده اصلی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'شماره کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
      .setShowActionColumn(false)
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
     }

  gridCellServiceNameTranslator(item) {
    if ( item === null || item === '' ) {
      return 'ارتباط بیمه پردازی، فعال نمی باشد.';
    } else {
      return  item;
    }
  }
  onSearch() {
    debugger;
    this.dataGrid.refreshData();
  }

  gridCellRequestTypeStyle(item) {
    if (item !== '-') {
      return {'background-color': 'green'};
    }
  }


  loadData(param: any) {
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: param.nationalCode,
      operator: SearchOperator.EQ
    });
    return new Promise((resolve, reject) => {
      this.loadCompleted = false;
      this._overlay = this.showOverlay(this.panel.nativeElement);
      this.dataGrid.serviceUrl = Urls.relationAllByNatcode;
      this.dataGrid.searchParams = this.searchParams;
      this.dataGrid
        .refreshData()
        .then(value => {
          this.hideOverlay(this._overlay);
         if (!this.dataGrid.dataItems) {
            this.showErrorMessageBox('پیام سیستم', 'کاربری با این کد ملی ثبت نام نشده است.');
         }
          this.loadCompleted = true;
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          reject(reason);
        });
    });
  }
}

