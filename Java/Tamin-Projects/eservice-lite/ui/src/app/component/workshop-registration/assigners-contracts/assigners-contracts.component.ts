import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { TaminPageBaseComponent, TaminDataGridComponent, SearchParam, OverlayService, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminModalComponent } from 'tamin-framework';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';

@Component({
  selector: 'app-assigners-contracts',
  templateUrl: './assigners-contracts.component.html',
  styleUrls: ['./assigners-contracts.component.css']
})
export class AssignersContractsComponent extends TaminPageBaseComponent {

  @ViewChild('assignersContractsGrid') assignersContractsGrid: TaminDataGridComponent;
  @ViewChild('showDebitDetailModal') showDebitDetailModal: TaminModalComponent;

  searchParams: SearchParam[];
  employerSearchForm: FormGroup;
  currentObject: any;
  showContractDetailFrom: FormGroup;
  workshopDebitSearchForm: FormGroup;

  private _overlay: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }
  initializePage() {
    this._initializeFromGroup();
    this._initializeFromGroupSearch();
    this._initializeDataGrid();
  }

  private _initializeFromGroupSearch() {
    this.workshopDebitSearchForm = this.fb.group({
      workshopId: [''],
      branchCode: [''],
      contractRow: ['']
    });
  }
  private _initializeFromGroup() {
    this.title = 'جزئیات پیمان';
    this.showContractDetailFrom = this.fb.group({
      contractorWorkshopId: [''],
      contractorWorkshopName: [''],
      contractorNationalId: [''],
      contractorBranch: [''],
      contractorAddress: [''],
      assignerWorkshopId: [''],
      assignerWorkshopName: [''],
      assignerNationalId: [''],
      assignerBranch: [''],
      assignerAddress: [''],
      contractRow: [''],
      contractNumber: [''],
      contractDate: [''],
      contractSubject: ['']
    });
  }
  private _initializeDataGrid() {
    this.assignersContractsGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.assignersContract)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'employer.workshopName', columnCaption: 'نام پیمانکار', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'employer.workshopId', columnCaption: 'کد کارگاه پیمانکار', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'employer.branch.organizationName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractRow', columnCaption: 'ردیف پیمان ', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractDate', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setFirstLoad(true)
      .addActionColumn({
        columnName: 'showContractDetail',
        columnCaption: 'مشاهده جزئیات پیمان',
        columnViewType: 'Button',
        columnActionName: 'showContractDetail',
        // isActionAuthorized: true,
        icon: 'icon-edit',
        visible: true,
        enable: true
      })
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }
  onGridAction(param: any) {
    const me = this;
    debugger;
    const actionColumn = param.actionColumn.columnActionName;
    const dataItem = param.item;
    const data = this.showContractDetailFrom.value;
    data.contractRow = dataItem.contractRow;
    data.contractNumber = dataItem.contractNumber;
    data.contractDate = dataItem.contractDate;
    data.contractSubject = dataItem.contractSubject;
    data.assignerWorkshopId = dataItem.assigner.workshopId;
    data.assignerWorkshopName = dataItem.assigner.workshopName;
    data.assignerNationalId = dataItem.assigner.nationalId;
    data.assignerBranch = dataItem.assigner.branch.organizationName;
    data.assignerAddress = dataItem.assigner.address;
    data.contractorWorkshopId = dataItem.employer.workshopId;
    data.contractorWorkshopName = dataItem.employer.workshopName;
    data.contractorNationalId = dataItem.employer.nationalId;
    data.contractorBranch = dataItem.employer.branch.organizationName;
    data.contractorAddress = dataItem.employer.address;
    this.showDebitDetailModal.width = '70%';
    this.showDebitDetailModal.show();
    this.showContractDetailFrom.patchValue(data);
  }
  exitconflictEditForm() {
    this.showDebitDetailModal.hide();
  }
  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.workshopDebitSearchForm.get('workshopId').value;
    const branchCode = this.workshopDebitSearchForm.get('branchCode').value;
    const contractRow = this.workshopDebitSearchForm.get('contractRow').value;
    if (workshopId != undefined && workshopId !== '' && workshopId !== null) {
      this.searchParams.push({
        property: 'workshop.workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (contractRow != undefined && contractRow !== '' && contractRow !== null) {
      this.searchParams.push({
        property: 'contractRow',
        value: contractRow,
        operator: SearchOperator.EQ

      });
    }
    if (branchCode != undefined && branchCode !== '' && branchCode !== null) {
      this.searchParams.push({
        property: 'workshop.branchCode',
        value: branchCode,
        operator: SearchOperator.EQ

      });
    }
    this.assignersContractsGrid.pagerCurrentPage = 1;
    this.assignersContractsGrid.searchParams = this.searchParams;
    this.assignersContractsGrid.refreshData();
  }

  getWithCommaSeperator(item) {
    if (item != null) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }
  getPersianDateFormat(item) {
    return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
  }
  resetForm() {
    this.searchParams = new Array<SearchParam>();
    this.assignersContractsGrid.pagerCurrentPage = 1;
    this.assignersContractsGrid.searchParams = this.searchParams;
    this.assignersContractsGrid.refreshData();
    this.workshopDebitSearchForm.reset();
  }

}
