import { Component, ViewChild, Injector } from '@angular/core';
import { TaminDataGridComponent, OverlayService, TaminDocumentViewerComponent, TaminPageBaseComponent, SearchParam, TaminDataGridConfigurationFactory, DataColumnViewType, SearchOperator, TaminDocumentViewerModalComponent, TaminModalComponent, TaminFieldComboBoxStaticComponent } from 'tamin-framework';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-contract-history',
  templateUrl: './display-contract-history.component.html',
  styleUrls: ['./display-contract-history.component.css']
})
export class DisplayContractHistoryComponent extends TaminPageBaseComponent {

  @ViewChild('contractGrid') contractGrid: TaminDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('premiumtypeid') premiumtypeid: TaminFieldComboBoxStaticComponent;
  @ViewChild('typeCombo') typeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('showCertificateDetailModal') showCertificateDetailModal: TaminModalComponent;
  public searchParams: SearchParam[];
  public contractSearchForm: FormGroup;
  public showCertificateDetailFrom: FormGroup;
  public currentObject: any;
  public isStats: any;
  public premiumTypeValue: any;
  public premiumTypetype = [];
  public router: ActivatedRoute;
  private _subscription = new Subscription();
  public _overlay: any;
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  initializePage() {
    this.contractSearchForm = this.formBuilder.group({
      contractNumber: [''],
      premiumTypeValueeee: [''],
      contractRow: ['']
    });
    this._initializeContractGrid();
    this.onSearchSubmit();
    this.premiumTypetype.push({ name: 'حرف و مشاغل آزاد', value: '01' });
    this.premiumTypetype.push({ name: 'اختياري', value: '02' });
    this.premiumTypetype.push({ name: 'تکميل سوابق کسري از ماه', value: '38' });
    this._subscription.add(this.contractSearchForm.get('premiumTypeValueeee').valueChanges.subscribe(vaaaaaaaaa => {
      if (vaaaaaaaaa) {
        this.premiumTypeValue = vaaaaaaaaa;
      }
    }));
  }

  private _initializeContractGrid() {
    this.contractGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.specialInsuranceContracts)
      .setShowPager(true)
      .addVisibleColumn({ columnName: 'contractNumber', columnCaption: 'شماره قرارداد', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'createDate', columnCaption: 'تاریخ قرارداد', columnViewType: DataColumnViewType.PersianDate })
      .addVisibleColumn({ columnName: 'createDate', columnCaption: 'نوع حق بیمه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.convertPremiumType })
      .addVisibleColumn({ columnName: 'createDate', columnCaption: 'نرخ حق بیمه', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.convertPremiumRate })
      .addVisibleColumn({ columnName: 'salary', columnCaption: 'دستمزد ماهانه', columnViewType: DataColumnViewType.Label })
      .addVisibleColumn({ columnName: 'contractStatus', columnCaption: 'حمایت درمان', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.convertcntDrmn })
      .addVisibleColumn({ columnName: 'freeJob.discrioption', columnCaption: 'شغل', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.convertJob })
      .addVisibleColumn({ columnName: 'contractStatus', columnCaption: 'وضعیت قرارداد', columnViewType: DataColumnViewType.CustomRow, columnTranslator: this.convertState })
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
  convertState(item) {
    if (item.contractStatusObject != null) return item.contractStatusObject.selfIsuContStatDesc;
    else return item.contractStatus;
  }
  convertJob(item) {
    if (item.freeJob != null) return item.freeJob.discrioption;
    else return item.cntFreeJobCode;
  }
  convertPremiumRate(item) {
    if (item.premiumRate != null) return item.premiumRate.spcrateDescription;
    else return item.premiumRateCode;
  }
  convertPremiumType(item) {
    if (item.premiumType != null) return item.premiumType.insuranceDescription;
    else return item.premiumTypeCode;
  }
  convertcntDrmn(item) {
    switch (item.cntDrmn) {
      case "1":
        return "حمایت درمان دارد";
      case "2":
        return "حمایت درمان ندارد";
      default:
        return item.cntDrmn;
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
  onSearchSubmit() {
    this.searchParams = new Array<SearchParam>();
    const contractNumber = this.contractSearchForm.get('contractNumber').value;
    const wwwwww = this.contractSearchForm.get('premiumTypeValueeee').value;
    // const premiumType = this.premiumTypeValue;
    if (contractNumber != undefined && contractNumber !== '' && contractNumber !== null) {
      this.searchParams.push({
        property: 'contractNumber',
        value: contractNumber,
        operator: SearchOperator.EQ

      });
    }
    if (wwwwww != undefined && wwwwww !== '' && wwwwww !== null) {
      this.searchParams.push({
        property: 'premiumTypeCode',
        value: wwwwww,
        operator: SearchOperator.EQ

      });
    }
    this.contractGrid.pagerCurrentPage = 1;
    this.contractGrid.searchParams = this.searchParams;
    this.contractGrid.refreshData();
  }

  onRollback() {
    switch (this.router.snapshot.params['type']) {
      case "01":
        this.redirectTo('/optional-insurance/contract');
        break;
      case "02":
        this.redirectTo('/optional-freelance/contract');
        break;
      case "03":
        this.redirectTo('/optional-insurance/fraction');
        break;
      default:
        this.redirectTo('/optional-insurance/contract');
        break;
    }
  }

}
