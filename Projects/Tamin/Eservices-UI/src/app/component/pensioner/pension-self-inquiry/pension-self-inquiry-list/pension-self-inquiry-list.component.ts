import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam,
  GenericRestService,
  TaminFieldAutoCompleteDataGridComponent,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminPageBaseComponent,
  TaminFieldComboBoxStaticComponent,
  TaminValidators, TaminPersianService, OverlayService
} from 'tamin-framework';
import {FormBuilder} from '@angular/forms';
import {FormGroup , Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import { Urls } from 'src/app/settings/urls';
import {Subscription} from 'rxjs';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-pension-self-inquiry-list',
  templateUrl: './pension-self-inquiry-list.component.html',
  styleUrls: ['./pension-self-inquiry-list.component.css']
})
export class PensionSelfInquiryListComponent extends TaminPageBaseComponent {
  newForm: FormGroup;
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('orgTypes') orgTypes: TaminFieldAutoCompleteDataGridComponent;
  private _overlay: any;
  loadCompleted = false;
  public theForm: FormGroup;
  searchParams: SearchParam[];
  private nationalCode: string;
  // orgTypes = [];
  private taminStaticDataService: TaminStaticDataService;

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
  }

  initializePage() {
    this.initializeGrid();
    this._initializeFormGroup();
    this._initializeOrgTypes();
    // this.orgTypes = this.taminStaticDataService.getOrganizationType();
  }

  private _initializeFormGroup() {
    this.newForm = this.formBuilder.group({
      orgType: ['', [Validators.required]],
    });
  }

  private _initializeOrgTypes() {
    this.orgTypes.valueField = 'bankName';
    this.orgTypes.displayField = 'bankName';
    this.orgTypes.searchPattern = '*{term}*';
    this.orgTypes.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BENEFICIARY)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('bankCode')

      .addVisibleColumn({columnName: 'bankName', columnCaption: 'نام نهاد', columnViewType: DataColumnViewType.Label})

      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(true)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  initializeGrid() {
    this.dataGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.GOVERNMENT_PENSION_INQUIRY)
      .setShowPager(true)
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'نام واحد سازمانی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'fullName', columnCaption: 'نام و نام خانوادگی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerId', columnCaption: 'شماره مستمری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'insuranceNumber', columnCaption: 'شماره بیمه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerRisuid', columnCaption: 'شماره بیمه فرد اصلی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerType', columnCaption: 'نوع حکم',  columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellPensionTypeTranslator})
      .addVisibleColumn({columnName: 'paymentDate', columnCaption: 'تاریخ پرداخت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'pensionerBaseBate', columnCaption: 'تاریخ برقراری مستمری', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'statusDesc', columnCaption: 'وضعیت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellStatusTranslator})
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

  gridCellStatusTranslator(item) {
    if ( item === null || item === '00' ) {
      return 'شما مستمری بگیر سازمان تامین اجتماعی نمی باشید';
    } else if (item === null || item === '01') {
      return 'شما مستمری بگیر فعال سازمان تامین اجتماعی می باشید';
    } else if (item === null || item === '02') {
      return 'شما در حال حاضر مستمری بگیر فعال سازمان تامین اجتماعی نمی باشید';
    }
  }

  gridCellPensionTypeTranslator(item) {
    // return '101';
    if ( item === null && item.toString().substring(0, 1) === '1' ) {
      return 'بازنشستگی';
    } else if (item === null && item.toString().substring(0, 1) === '2') {
      return 'از کارافتادگی';
    } else if (item === null && item.toString().substring(0, 1) === '3') {
      return 'فوتی';
    }
  }
  // onSearch() {
  //   this.dataGrid.refreshData();
  // }

  gridCellRequestTypeStyle(item) {
    if (item !== '-') {
      return {'background-color': 'green'};
    }
  }


  // loadData(param: any) {
  //   debugger;
  //   this.searchParams = [];
  //   this.nationalCode = param.nationalCode;
  //   this.searchParams.push({
  //     property: 'nationalCode',
  //     value: param.nationalCode,
  //     operator: SearchOperator.EQ
  //   });
  //
  //   return new Promise((resolve, reject) => {
  //     this._overlay = this.showOverlay();
  //     this.loadCompleted = false;
  //     this.dataGrid.searchParams = this.searchParams;
  //     this.dataGrid
  //       .refreshData()
  //       .then(value => {
  //         this.hideOverlay(this._overlay);
  //         this.loadCompleted = true;
  //         resolve(value);
  //       })
  //       .catch(reason => {
  //         this.hideOverlay(this._overlay);
  //         reject(reason);
  //       });
  //   });
  // }

  sendToAnnouncement() {
    const orgType = new SearchParam();
    orgType.property = 'target';
    orgType.operator = SearchOperator.EQUAL;
    orgType.value = this.newForm.get('orgType').value;
    const searchParams: Array<SearchParam> = [];
    searchParams.push(orgType);
    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.GOVERNMENT_PENSION_INQUIRY + '/announcement/', searchParams)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال فرم استعلام با موفقیت انجام شد');
      })
      .catch(reason => {

        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}
