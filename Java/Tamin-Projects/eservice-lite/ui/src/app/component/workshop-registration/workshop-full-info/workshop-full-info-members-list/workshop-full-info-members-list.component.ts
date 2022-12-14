import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, SearchParam, SearchOperator, TaminPageBaseComponent, PersianNumberPipe } from 'tamin-framework';
import { Urls } from '../../../../settings/urls';

@Component({
  selector: 'app-workshop-full-info-members-list',
  templateUrl: './workshop-full-info-members-list.component.html',
  styleUrls: ['./workshop-full-info-members-list.component.css']
})
export class WorkshopFullInfoMembersListComponent extends TaminPageBaseComponent {
  @ViewChild('membersListGrid') membersListGrid: TaminDataGridComponent;
  searchForm: FormGroup;
  @Output() submitt = new EventEmitter<any>();

  searchParams: SearchParam[];

  contractSearchForm: FormGroup;


  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      insuranceId: [''],
      nationalId: ['']
    });
  }

  initializePage() {
    this._initializeDataGrid();
  }

  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  getContractType(item) {
    if (item === '1' || item == null) {
      return 'غیرمحرمانه';
    } else if (item === '2') {
      return 'محرمانه';
    }
  }

  getWithCommaSeperator(item) {
    const persianNumber = new PersianNumberPipe();
    if (item != null) {
      return persianNumber.transform(item.toString(), 'cs');
    } else {
      return this.getPersianNumber('0');
    }
  }

  resetForm() {
    this.contractSearchForm.reset();
  }

  private _initializeDataGrid() {
    this.membersListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({ columnName: 'insurance.id', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.firstName', columnCaption: 'نام', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.lastName', columnCaption: 'نام خانوادگی', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.nationalId', columnCaption: 'شماره ملی', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.idCardNumber', columnCaption: 'شماره شناسنامه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.fatherName', columnCaption: 'نام پدر', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'insurance.nation.nationDesc', columnCaption: 'ملیت', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'relationType.relationTypeDescription', columnCaption: 'نوع مشمول', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'leavingWorkStatus', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'leavingWorkDate', columnCaption: 'تاریخ ترک کار', columnViewType: DataColumnViewType.Label })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  loadData(item) {
    this.searchParams = [];
    if (item != undefined) {
      if (item.workshopId !== undefined && item.workshopId !== ''&& item.workshopId !== null) {
        this.searchParams.push({
          property: 'workshop.workshopId',
          value: item.workshopId,
          operator: SearchOperator.EQ

        });
      }
      if (item.branchCode !== undefined && item.branchCode !== ''&& item.branchCode !== null) {
        this.searchParams.push({
          property: 'workshop.branchCode',
          value: item.branchCode,
          operator: SearchOperator.EQ
        });
      }
      if (item.insuranceId !== undefined && item.insuranceId !== ''&& item.insuranceId !== null) {
        this.searchParams.push({
          property: 'insurance.id',
          value: item.insuranceId,
          operator: SearchOperator.EQ

        });
      }
      if (item.nationalId !== undefined && item.nationalId !== '' && item.nationalId !== null) {
        this.searchParams.push({
          property: 'insurance.nationalId',
          value: item.nationalId,
          operator: SearchOperator.EQ
        });
      }
    }
    this.membersListGrid.pagerCurrentPage = 1;
    this.membersListGrid.serviceUrl = `${Urls.workshopsMembers}`;
    this.membersListGrid.searchParams = this.searchParams;
    this.membersListGrid.refreshData();
  }
  resetMemberForm() {
    this.searchForm.reset();
  }

  searchFormSubmit(values, valid) {
    this.submitt.emit(this.searchForm.getRawValue());
  }

}
