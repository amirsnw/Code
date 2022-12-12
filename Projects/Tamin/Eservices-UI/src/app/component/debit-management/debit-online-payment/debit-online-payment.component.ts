import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {StpUrls} from '../../../modules/stp/stp-urls';

@Component({
  selector: 'app-debit-online-payment',
  templateUrl: './debit-online-payment.component.html',
  styleUrls: ['./debit-online-payment.component.css']
})
export class DebitOnlinePaymentComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('workshopsTempDebitGrid') workshopsTempDebitGrid: TaminDataGridComponent;
  workshopSearchForm: FormGroup;
  searchWorkshopParams: SearchParam[];
  private overlay: any;
  branchCode: any;

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
    this._initializeTempDebitGrid();
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
      .addUrl(Urls.employerEservicesAgreementWorkshopsInfo)
      .setShowPager(true)
      .addVisibleColumn({columnName: 'wokshopId', columnCaption: 'کد کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopName', columnCaption: 'کارگاه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'contractRow', columnCaption: 'ردیف پیمان ', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchCode', columnCaption: 'کد شعبه', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'organization.organizationName', columnCaption: 'نام شعبه', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setFirstLoad(true)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeDebitGrid() {
    this.workshopsDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitCreateReasonDesc', columnCaption: 'علت ایجاد بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تا تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'penaltyList', columnCaption: 'جریمه لیست', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'penaltyPay', columnCaption: 'جریمه پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'sum', columnCaption: 'جمع جرائم', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'nimOshr', columnCaption: 'حق الاجرا', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitCreateDate', columnCaption: 'تاریخ ایجاد بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }

  private _initializeTempDebitGrid() {
    this.workshopsTempDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitCreateReasonDesc', columnCaption: 'علت ایجاد بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStartDate', columnCaption: 'از تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitEndDate', columnCaption: 'تا تاریخ', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'discount', columnCaption: 'مبلغ تخفیف', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'penaltyList', columnCaption: 'جریمه لیست', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'penaltyPay', columnCaption: 'جریمه پرداخت', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'sum', columnCaption: 'جمع جرائم', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      // .addVisibleColumn({columnName: 'nimOshr', columnCaption: 'حق الاجرا', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitCreateDate', columnCaption: 'تاریخ ایجاد بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      // .addVisibleColumn({columnName: 'seporde', columnCaption: 'انتخاب سپرده', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getSeporde})
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .addActionColumn({
        columnName: 'pay',
        columnCaption: 'پرداخت',
        columnViewType: 'Button',
        columnIconUrl: '',
        icon: '',
        columnActionName: 'pay',
        isActionAuthorized: false,
        visible: true,
        enable: true
      })
      .setShowActionColumn(true)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.workshopsTempDebitGrid.dataItems = [];
  }

  clickWorkshopGridItem(param: any) {
    this.branchCode = param.branchCode;
    this.searchWorkshopParams = new Array<SearchParam>();
    this.workshopsDebitGrid.serviceUrl = Urls.OnlinePaymentWorkshopsDebit + '/' + param.wokshopId + '/' + param.branchCode;
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    if (param.contractRow !== undefined && param.contractRow !== '' && param.contractRow !== null) {
      this.searchWorkshopParams.push({
        property: 'peymanSequence',
        value: param.contractRow,
        operator: SearchOperator.EQ

      });
    }
    this.workshopsDebitGrid.searchParams = this.searchWorkshopParams;
    this.workshopsDebitGrid.refreshData();
    this.workshopsTempDebitGrid.dataItems = [];
  }

  clickWorkshopDebitGridItem(param: any) {
    if (!this.workshopsTempDebitGrid.dataItems.find(x => x.debitNumber === param.debitNumber)) {
      if (this.workshopsTempDebitGrid.dataItems.length > 0) {
        this.showInfoMessageBox('پیام سیستم', 'فقط یک بدهی قابل انتخاب می باشد.');
        return;
      }

      this.overlay = this.showOverlay();
      const url = Urls.OnlinePaymentDebitSelectPreCheck + '/' + param.debitNumber + '/' + this.workshopsGrid.selectedDataItem.branchCode + '/' + (param.docDate ? param.docDate : '1');
      this.restService.getAll(url)
        .then(value => {
          this.hideOverlay(this.overlay);
          var a = JSON.stringify(param);
          var b = JSON.parse(a);
          b.seporde = '0';
          // b.discount = 0;
          // if (param.stepCat === '3' && value.data.days < 31) {
          //   b.debitRemain = b.debitRemain - Math.round(b.nimOshr / 2);
          //   b.discount = Math.round(b.nimOshr / 2);
          // }
          if (param.stepCat === '1' && param.debitStatCode === '03' && value.data.functionResult === '1') {
            this.showInfoMessageBox('پیام سیستم', 'بدهی مزبور حائز شرایط صدور اخطاریه می باشد، لذا امکان صدور برگ پرداخت میسر نمی باشد.');
            return;
          }
          if (value.data.queryResult > 0) {
            this.showInfoMessageBox('پیام سیستم', 'بابت بدهی مربوطه قبلا برگه پرداخت در شعبه صادر شده است که ضروری است ابتدا نسبت به تعیین تکلیف آن اقدام گردد.');
            return;
          }
          this.workshopsTempDebitGrid.dataItems.push(b);
          // if (param.stepCat === '1') {
          //   if (param.debitStatCode === '04' || param.debitStatCode === '44') {
          //     this.showQuestionBox('پیام سیستم', 'بدهی در وضعیت اعتراض و ارسال پرونده به هیات است و فقط مجاز به صدور برگه از نوع سپرده و پرداخت آن می باشید، آیا سپرده برای این بدهی انتخاب گردد؟', () => {
          //       b.seporde = '1';
          //       this.workshopsTempDebitGrid.dataItems.push(b);
          //     }, () => {
          //       return;
          //     });
          //   } else {
          //     this.showQuestionBox('پیام سیستم', 'آیا سپرده برای این بدهی انتخاب گردد؟', () => {
          //       b.seporde = '1';
          //       this.workshopsTempDebitGrid.dataItems.push(b);
          //     }, () => {
          //       this.workshopsTempDebitGrid.dataItems.push(b);
          //     });
          //   }
          //
          // } else {
          //   this.workshopsTempDebitGrid.dataItems.push(b);
          // }

        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        });
    }

  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'delete':
        this.workshopsTempDebitGrid.dataItems.splice(this.workshopsTempDebitGrid.dataItems.findIndex(x => x.debitNumber === param.item.debitNumber), 1);
        break;
      case 'pay':
        if (param.item.debitCreateReasonCode === '60' && (param.item.debitStepCode === '05' || param.item.debitStepCode === '19')) {
          this.redirectTo('/debit-online-payment-installment/' + param.item.debitNumber.toString() + '/' + this.workshopsGrid.selectedDataItem.branchCode);
        } else {
          const data = {
            debitNumber: param.item.debitNumber,
            workshopId: this.workshopsGrid.selectedDataItem.wokshopId,
            branchCode: this.workshopsGrid.selectedDataItem.branchCode,
            peymanSequence: (this.workshopsGrid.selectedDataItem.contractRow !== undefined && this.workshopsGrid.selectedDataItem.contractRow !== '' && this.workshopsGrid.selectedDataItem.contractRow !== null) ? this.workshopsGrid.selectedDataItem.contractRow : '',
            seporde: param.item.seporde
          };
          this.overlay = this.showOverlay();
          this.restService.create(Urls.DebitOnlinePaymentPaySave, data)
            .then(value => {
              if (value.data.succeed === true) {
                location.href = value.data.paymentURL;
              } else {
                this.hideOverlay(this.overlay);
                this.showInfoMessageBox('توجه', value.data.responseMessage);
              }
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

        break;
    }
  }

  resetWorkshopForm() {
    this.searchWorkshopParams = new Array<SearchParam>();
    this.workshopsGrid.pagerCurrentPage = 1;
    this.workshopsGrid.searchParams = this.searchWorkshopParams;
    this.workshopsGrid.refreshData();
    this.workshopSearchForm.reset();
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '';
    }
  }

  getSeporde(item) {
    if (item === '1') {
      return '<i class="icon-ok"></i>';
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

  onSearchSubmit() {
    this.searchWorkshopParams = new Array<SearchParam>();
    const workshopId = this.workshopSearchForm.get('workshopId').value;
    const peymanSequence = this.workshopSearchForm.get('peymanSequence').value;
    if (workshopId !== undefined && workshopId !== '' && workshopId !== null) {
      this.searchWorkshopParams.push({
        property: 'wokshopId',
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
}
