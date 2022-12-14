import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent, TaminRestService} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {StpUrls} from '../../../modules/stp/stp-urls';

@Component({
  selector: 'app-penalty-relief',
  templateUrl: './penalty-relief.component.html',
  styleUrls: ['./penalty-relief.component.css']
})
export class PenaltyReliefComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  private overlay: any;
  searchWorkshopParams: SearchParam[];
  filter: SearchParam[];
  currentObject: any;
  branchCode: any;
  isDisabled: any;
  readonly restService: TaminRestService;
  workshopSearchForm: FormGroup;
  items = [[]];

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
    this.isDisabled = true;
  }

  private _initializeFromGroupSearch() {
    this.workshopSearchForm = this.fb.group({
      workshopId: [''],
      peymanSequence: ['']
    });
  }


  private _initializeWorkshopGrid() {
    this.workshopsGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.workshopSpecialContract)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractRow', columnCaption: 'ردیف پیمان', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'activityDesc', columnCaption: 'نوع فعالیت', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchCode', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
      .setRowDeletable(false)
      .setRowEditable(false)
      // .addActionColumn({
      //   columnName: 'send',
      //   columnCaption: 'ثبت درخواست',
      //   columnViewType: 'Button',
      //   columnIconUrl: '',
      //   icon: '',
      //   columnActionName: 'send',
      //   isActionAuthorized: false,
      //   visible: true,
      //   enable: true
      // })
      // .setShowActionColumn(true)
      .setFirstLoad(true)
      .setShowFooter(true)
      .setViewType('GridView')
      .getData();
  }

  onAction() {
    this.showQuestionBox('پیام سیستم', this.workshopsDebitGrid.dataItems.length === 0 ? 'این کارگاه فاقد بدهی قطعی بوده است، آیا از ثبت درخواست اطمینان دارید؟' : 'آیا برای ثبت درخواست اطمینان دارید؟', () => {
      this.onSave(this.workshopsGrid.selectedDataItem);
    }, () => {
    });
  }

  onSave(param: any) {
    const data = {
      workshopId: param.workshopId,
      // workshopId: '0010001223',
      branchCode: param.branchCode,
      peymanSequence: param.contractRow
    };

    this.overlay = this.showOverlay();
    this.restService.create(Urls.SavePenaltyRelief, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        // const message = 'درخواست با شماره پیگیری ' + '<b>' + value.data.refId + '</b>' + ' با موفقیت ذخیره گردید.' + '<br/>' + '<br/>' +
        //   'کارفرمای محترم کارگاه ' + '<b>' + param.item.workshopId + '</b>' +
        //   ' خواهشمند است جهت تقسیط بدهی و ارائه تضامین لازم از تاریخ ' + '<b>' + '1400/02/10' + '</b>' + ' حداکثر ظرف مدت ' + '<b>' + '10 روز ' + '</b>' +
        //   'به شعبه مربوطه مراجعه نمایید.' + '<br/>' +
        //   'عدم مراجعه و اقدام در این خصوص طی مهلت تعیین شده به منزله انصراف از بهره مندی از تسهیلات بخشودگی جرائم می باشد.';
        const message = 'درخواست با شماره پیگیری ' + '<b>' + value.data.refId + '</b>' + ' با موفقیت ذخیره گردید.';
        this.showInfoMessageBox('پیام سیستم', message, () => {
          this.redirectTo('/app-request');
        });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  private _initializeDebitGrid() {
    this.workshopsDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitCreateDate', columnCaption: 'تاریخ ایجاد بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'bimehAmount', columnCaption: 'حق بیمه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'bikariAmount', columnCaption: 'بیمه بیکاری', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'jarimehAmount', columnCaption: 'جریمه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'sayerAmount', columnCaption: 'سایر', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'debitCreateReasonDesc', columnCaption: 'علت ایجاد بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: 'Label'})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  onSearchSubmit() {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = this.workshopSearchForm.get('workshopId').value;
    const peymanSequence = this.workshopSearchForm.get('peymanSequence').value;
    if (workshopId !== undefined && workshopId !== '' && workshopId !== null) {
      this.searchWorkshopParams.push({
        property: 'workshopId',
        value: workshopId,
        operator: SearchOperator.EQ

      });
    }
    if (peymanSequence !== undefined && peymanSequence !== '' && peymanSequence !== null) {
      this.searchWorkshopParams.push({
        property: 'contractRow',
        value: peymanSequence,
        operator: SearchOperator.EQ

      });
    }
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.refreshData();
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '';
    }
  }

  getWithCommaSeperator(item) {
    if (item != null && item !== '') {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال';
    } else {
      return '0' + ' ریال';
    }
  }

  clickWorkshopGridItem(param: any) {
    this.isDisabled = true;
    this.branchCode = param.branchCode;
    this.searchWorkshopParams = new Array<SearchParam>();
    // this.workshopsDebitGrid.serviceUrl = Urls.PenaltyReliefWorkshopsDebit + '/' + '0010001223' + '/' + param.branchCode;
    this.workshopsDebitGrid.serviceUrl = Urls.PenaltyReliefWorkshopsDebit + '/' + param.workshopId + '/' + param.branchCode;
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    if (param.contractRow !== undefined && param.contractRow !== '' && param.contractRow !== null) {
      this.searchWorkshopParams.push({
        property: 'peymanSequence',
        value: param.contractRow,
        operator: SearchOperator.EQ

      });
    }
    this.workshopsDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDebitGrid.refreshData().then(value => {
      this.isDisabled = false;
    }).catch(reason => {
    });
  }

  resetWorkshopForm() {
    this.searchWorkshopParams = new Array<SearchParam>();
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.refreshData();
    this.workshopSearchForm.reset();
  }

}
