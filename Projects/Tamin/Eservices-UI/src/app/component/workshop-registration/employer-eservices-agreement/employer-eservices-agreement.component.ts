import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent, SearchParam, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, DataColumnViewType } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

declare var alertify: any;

@Component({
  selector: 'app-employer-eservices-agreement',
  templateUrl: './employer-eservices-agreement.component.html',
  styleUrls: ['./employer-eservices-agreement.component.css']
})

export class EmployerEservicesAgreementComponent extends TaminPageBaseComponent {

  @ViewChild('contractGrid') contractGrid: TaminDataGridComponent;

  public overlay: any;
  public isAgreement = false;
  public isAprovee = false;
  public savedContract = false;
  public isSatisfied = false;
  public eligibilityStatus = 0;
  public premiumValidity = false;
  public examinationValidity = false;
  public exemptionValidity = false;
  public router: ActivatedRoute;
  private isinsurance = true;
  searchParams: SearchParam[];
  contractSearchForm: FormGroup;
  contractSearchFormTiket: FormGroup;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this._initializeContractGrid();
    this._initializeFromGroupSearch();
    this._initializeFromGroupTiket();
  }
  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.contractSearchForm.get('workshopId').value;
    const branchCode = this.contractSearchForm.get('branchCode').value;
    const pymseq = this.contractSearchForm.get('pymseq').value;
    if (workshopId != undefined && workshopId !== '' && workshopId !== null) {
      this.searchParams.push({
        property: 'workshop.workshopId',
        value: workshopId,
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
    if (pymseq != undefined && pymseq !== '') {
      this.searchParams.push({
        property: 'pymseq',
        value: pymseq,
        operator: SearchOperator.EQ

      });
    }
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
  }
  oSendtiket() {
    this.searchParams = new Array<SearchParam>();
    const workshopId = this.contractSearchForm.get('workshopId').value;
    const branchCode = this.contractSearchForm.get('branchCode').value;
    const pymseq = this.contractSearchForm.get('pymseq').value;
    if (workshopId != undefined && workshopId !== '' && workshopId !== null) {
      this.searchParams.push({
        property: 'workshop.workshopId',
        value: workshopId,
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
    if (pymseq != undefined && pymseq !== '') {
      this.searchParams.push({
        property: 'pymseq',
        value: pymseq,
        operator: SearchOperator.EQ

      });
    }
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
  }
  private _initializeContractGrid() {
    this.contractGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.employerEservicesAgreement)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'workshop.workshopId', columnCaption: 'کد کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'workshop.workshopName', columnCaption: 'نام کارگاه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'pymseq', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'workshop.branch.organizationName', columnCaption: 'شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'emailaddr', columnCaption: 'پست الکترونیک', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'mobileno', columnCaption: 'تلفن همراه',columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({ columnName: 'workshop.lastAddress', columnCaption: 'محل اقامت', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setViewType('GridView')
      .getData();
  }
  getWithCommaSeperator(item) {
    if (item !== null && item !== '') {
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
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
    this.contractSearchForm.reset();
  }
  private _initializeFromGroupSearch() {
    this.contractSearchForm = this.formBuilder.group({
      workshopId: [''],
      branchCode: [''],
      pymseq: ['']
    });
  }
    private _initializeFromGroupTiket() {
      this.contractSearchFormTiket = this.formBuilder.group({
        workshopId: [''],
        branchCode: [''],
        pymseq: ['']
      });
  }
  newrecord(){
    this.redirectTo('/workshop-registration/employer-eservices-agreement-aprove');
  }
}
