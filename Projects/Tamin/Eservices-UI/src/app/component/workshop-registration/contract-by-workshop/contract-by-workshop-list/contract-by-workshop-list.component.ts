import {Component, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-contract-by-workshop-list',
  templateUrl: './contract-by-workshop-list.component.html',
  styleUrls: ['./contract-by-workshop-list.component.css']
})
export class ContractByWorkshopListComponent extends TaminPageBaseComponent {

  @ViewChild('contractByWorkshopGrid') contractByWorkshopGrid: TaminDataGridComponent;

  searchParams: SearchParam[];

  contractSearchForm: FormGroup;

  protected initializePage(): void {
    this._initializeDataGrid();
  }

  protected loadPageData(): void {
    this.loadData({});
  }


  getPersianDateFormat(item) {
    debugger;
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }

  getContractType(item) {
    if (item === '1' || item === null) {
      return 'غیرمحرمانه';
    } else if (item === '2') {
      return 'محرمانه';
    }
  }

  getWithCommaSeperator(item) {
    if (item != null) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '0';
    }
  }

  resetForm() {
    this.contractSearchForm.reset();
  }

  private _initializeDataGrid() {
    this.contractByWorkshopGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'workshop.workshopId', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractDate', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'contractStartDate', columnCaption: 'شروع قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'contractEndDate', columnCaption: 'پایان قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'workshopPremiumRate.rateDesc', columnCaption: 'نرخ حق بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractStatus.contractStatusDescription', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'model.nationalCode', columnCaption: 'شناسه واگذارنده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'model.name', columnCaption: 'نام واگذارنده', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractAmount', columnCaption: 'مبلغ اولیه قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'branch.organizationName', columnCaption: 'شعبه', columnViewType: 'Label'})
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
    if (item.workshopId !== undefined && item.workshopId !== '' && item.workshopId !== null) {
      this.searchParams.push({
        property: 'workshop.workshopId',
        value: item.workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (item.branchCode !== undefined && item.branchCode !== '' && item.branchCode !== null) {
      this.searchParams.push({
        property: 'workshop.branchCode',
        value: item.branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.contractByWorkshopGrid.pagerCurrentPage = 1;
    this.contractByWorkshopGrid.serviceUrl = `${Urls.contractByWorkshop}`;
    this.contractByWorkshopGrid.searchParams = this.searchParams;
    this.contractByWorkshopGrid.refreshData();
  }

}
