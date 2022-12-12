import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, SearchParam, SearchOperator, TaminPageBaseComponent, PersianNumberPipe} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-workshop-payment-sheet-list',
  templateUrl: './workshop-payment-sheet-list.component.html',
  styleUrls: ['./workshop-payment-sheet-list.component.css']
})
export class WorkshopPaymentSheetListComponent extends TaminPageBaseComponent {
  @ViewChild('paymentSheetsListGrid') paymentSheetsListGrid: TaminDataGridComponent;
  searchForm: FormGroup;
  @Output() filterParams = new EventEmitter<any>();

  searchParams: SearchParam[];

  contractSearchForm: FormGroup;

  initializePage() {
    this._initializeDataGrid();
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
    this.paymentSheetsListGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'mastCustomerCode', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'mastCustomerName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'rcntrow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitNo', columnCaption: 'شماره بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'docDate', columnCaption: 'تاریخ صدور', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'paySeqAmount', columnCaption: 'مبلغ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'orpStatusDesc', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'cardDate', columnCaption: 'تاریخ وصولی', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'debitCreateReasonDesc', columnCaption: 'علت ایجاد بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'ouragGno', columnCaption: 'شماره اوراق', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'ouragSdate', columnCaption: 'تاریخ سررسید', columnViewType: DataColumnViewType.PersianDate})
      .addVisibleColumn({columnName: 'payKindDesc', columnCaption: 'نوع پرداخت', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }


  loadData(item) {
    this.searchParams = [];
    if (item !== undefined && item != null) {
      if (item.branchCode !== undefined && item.branchCode !== '' && item.branchCode !== null) {
        this.searchParams.push({
          property: 'branchCode',
          value: item.branchCode,
          operator: SearchOperator.EQ

        });
      }
      if (item.workshopId !== undefined && item.workshopId !== '' && item.workshopId !== null) {
        this.searchParams.push({
          property: 'workshopId',
          value: item.workshopId,
          operator: SearchOperator.EQ

        });
      }
      if (item.paymentIdFrom !== undefined && item.paymentIdFrom !== '' && item.paymentIdFrom !== null) {
        this.searchParams.push({
          property: 'payIdFrom',
          value: item.paymentIdFrom,
          operator: SearchOperator.EQ

        });
      }
      if (item.paymentIdTo !== undefined && item.paymentIdTo !== '' && item.paymentIdTo !== null) {
        this.searchParams.push({
          property: 'payIdTo',
          value: item.paymentIdTo,
          operator: SearchOperator.EQ
        });
      }
      if (item.docDateFrom !== undefined && item.docDateFrom !== '' && item.docDateFrom !== null) {
        this.searchParams.push({
          property: 'docDateFrom',
          value: (new Date(item.docDateFrom)).getTime().toString(),
          operator: SearchOperator.EQ
        });
      }
      if (item.docDateTo !== undefined && item.docDateTo !== '' && item.docDateTo !== null) {
        this.searchParams.push({
          property: 'docDateTo',
          value: (new Date(item.docDateTo)).getTime().toString(),
          operator: SearchOperator.EQ
        });
      }
      if (item.debitReason !== undefined && item.debitReason !== '' && item.debitReason !== null) {
        this.searchParams.push({
          property: 'debitReason',
          value: item.debitReason,
          operator: SearchOperator.EQ

        });
      }
      if (item.paymentSheetStatus !== undefined && item.paymentSheetStatus !== '' && item.paymentSheetStatus !== null) {
        this.searchParams.push({
          property: 'paymentSheetStatus',
          value: item.paymentSheetStatus,
          operator: SearchOperator.EQ
        });
      }
    }
    this.paymentSheetsListGrid.pagerCurrentPage = 1;
    this.paymentSheetsListGrid.serviceUrl = `${Urls.getPaymentSheets}`;
    this.paymentSheetsListGrid.searchParams = this.searchParams;
    this.paymentSheetsListGrid.refreshData();
  }

  searchFormSubmit(values, valid) {
    this.filterParams.emit(this.searchForm.getRawValue());
  }

}
