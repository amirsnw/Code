import {ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent, TaminRestService} from 'tamin-framework';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-debit-installment',
  templateUrl: './debit-installment.component.html',
  styleUrls: ['./debit-installment.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebitInstallmentComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('workshopsTempDebitGrid') workshopsTempDebitGrid: TaminDataGridComponent;
  private overlay: any;
  searchWorkshopParams: SearchParam[];
  searchDebitParams: SearchParam[];
  filter: SearchParam[];
  currentObject: any;
  branchCode: any;
  readonly restService: TaminRestService;
  public debitSum = 0;
  workshopSearchForm: FormGroup;
  installmentForm: FormGroup;
  installmentShow: boolean;
  preInstallments = [];
  preInstallmentsValue = [];
  items = [[]];

  constructor(injector: Injector, private fb: FormBuilder, private overlayService: OverlayService) {
    super(injector);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this._initializeWorkshopGrid();
    this._initializeDebitGrid();
    this._initializeTempDebitGrid();
    this._initializeInstallmentForm();
  }

  private _initializeFromGroupSearch() {
    this.workshopSearchForm = this.fb.group({
      workshopId: [''],
      peymanSequence: ['']
    });
  }

  private _initializeInstallmentForm() {
    this.installmentForm = this.fb.group({
      installmentAmount: [''],
      preInstallment: ['', [Validators.required]],
      installmentNumber: [''],
      firstInstallment: [''],
      eachInstallment: [''],
      dateFirstInstallment: [''],
    });
    this.installmentShow = false;
    this.preInstallments = [
      {name: '50%', value: '0'},
      {name: '40%', value: '1'},
      {name: '30%', value: '2'},
      {name: '20%', value: '3'},
      {name: '10%', value: '4'}
    ];
    this.preInstallmentsValue = [50, 40, 30, 20, 10];
    this.items = [
      [12, 18, 24, 36],
      [10, 15, 20, 30],
      [8, 12, 16, 24],
      [6, 9, 12, 18],
      [1, 6, 8, 12]
    ];
    this.installmentForm.get('preInstallment').valueChanges.subscribe(value => {
      if (value) {
        if (value === '4' && this.installmentForm.get('installmentAmount').value < 100000001) {
          this.showInfoMessageBox('پیام سیستم', 'این میزان پیش قسط برای این مبلغ قابل قبول نمی باشد.');
          this.installmentForm.get('preInstallment').setValue('');
          return;
        }
        this.setInstallmentForm(value);
      }
    });
    // this.installmentForm.get('dateFirstInstallment').valueChanges.subscribe(value => {
    //   if (value) {
    //     const oneDay = 24 * 60 * 60 * 1000;
    //     const values = this.installmentForm.getRawValue();
    //     const today = new Date();
    //     const dateFirstInstallment = new Date(values.dateFirstInstallment);
    //     if (dateFirstInstallment < today) {
    //       this.showInfoMessageBox('پیام سیستم', 'مهلت پرداخت پیش قسط نمی تواند کمتر از تاریخ روز باشد.');
    //       this.installmentForm.get('dateFirstInstallment').setValue('');
    //       return;
    //     }
    //     // @ts-ignore
    //     const diffDays = Math.round(Math.abs((today - dateFirstInstallment) / oneDay));
    //     if (diffDays > 7) {
    //       this.showInfoMessageBox('پیام سیستم', 'مهلت پرداخت پیش قسط بیشتر از 7 روز از تاریخ روز نمی تواند باشد.');
    //       this.installmentForm.get('dateFirstInstallment').setValue('');
    //       return;
    //     }
    //   }
    // });
  }

  /* Calculate Installment */
  setInstallmentForm(value) {
    const installmentAmount = this.installmentForm.get('installmentAmount').value;
    switch (true) {
      case installmentAmount <= 100000000:
        this.installmentForm.get('installmentNumber').setValue(this.items[value][0]);
        break;
      case installmentAmount <= 500000000:
        this.installmentForm.get('installmentNumber').setValue(this.items[value][1]);
        break;
      case installmentAmount <= 1000000000:
        this.installmentForm.get('installmentNumber').setValue(this.items[value][2]);
        break;
      case installmentAmount > 1000000000:
        this.installmentForm.get('installmentNumber').setValue(this.items[value][3]);
        break;
      default:
        break;
    }
    const firstInstallment = Math.round(installmentAmount * this.preInstallmentsValue[value] / 100);
    this.installmentForm.get('eachInstallment').setValue(Math.round((installmentAmount - firstInstallment) / (this.installmentForm.get('installmentNumber').value - 1)));
    this.installmentForm.get('firstInstallment').setValue(installmentAmount - this.installmentForm.get('eachInstallment').value * (this.installmentForm.get('installmentNumber').value - 1));

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
      .addVisibleColumn({columnName: 'docDateEblaghEjra', columnCaption: 'تاریخ ابلاغ اجراییه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
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

  private _initializeTempDebitGrid() {
    this.workshopsTempDebitGrid.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setShowPager(false)
      .addVisibleColumn({columnName: 'debitNumber', columnCaption: 'شماره بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'docDateEblaghEjra', columnCaption: 'تاریخ ابلاغ اجراییه', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getPersianDateFormat})
      .addVisibleColumn({columnName: 'debitAmount', columnCaption: 'مبلغ بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitRemain', columnCaption: 'مبلغ مانده بدهی', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'discount', columnCaption: 'مبلغ تخفیف', columnViewType: DataColumnViewType.Custom, columnTranslator: this.getWithCommaSeperator})
      .addVisibleColumn({columnName: 'debitCreateReasonDesc', columnCaption: 'علت ایجاد بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStepDesc', columnCaption: 'مرحله بدهی', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'debitStatDesc', columnCaption: 'وضعیت بدهی', columnViewType: 'Label'})
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
      .setShowActionColumn(true)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setFirstLoad(false)
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
    this.workshopsTempDebitGrid.dataItems = [];
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
    this.branchCode = param.branchCode;
    this.searchWorkshopParams = new Array<SearchParam>();
    this.workshopsDebitGrid.serviceUrl = Urls.InstallmentWorkshopsDebit + '/' + param.wokshopId + '/' + param.branchCode;
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
    this.debitSum = 0;
    this.installmentShow = false;
  }

  clickWorkshopDebitGridItem(param: any) {
    if (param.stepCat === '3' && param.debitStatCode !== '03') {
      this.showInfoMessageBox('پیام سیستم', 'بدهی اجراییه ابلاغ نشده امکان انتخاب نیست');
      return;
    }
    if (param.stepCat === '3' && (param.docDateEblaghEjra === undefined || param.docDateEblaghEjra === '' || param.docDateEblaghEjra === null)) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ ابلاغ مشخص نیست');
      return;
    }
    if (param.debitStepCode === '20' && (param.debitNumberInstallment !== undefined && param.debitNumberInstallment !== '' && param.debitNumberInstallment !== null)) {
      this.showInfoMessageBox('پیام سیستم', 'انجام تقسیط برای بدهی اجراییه تبدیل به حال شده ' + param.debitNumberInstallment + ' فقط یکبار مجاز می باشد');
      return;
    }
    if (this.workshopsTempDebitGrid.dataItems.find(x => (x.stepCat === '3' && param.stepCat !== '3') || (x.stepCat !== '3' && param.stepCat === '3'))) {
      this.showInfoMessageBox('پیام سیستم', 'بدهی ها همسان نمی باشد.');
      return;
    }
    this.overlay = this.showOverlay();
    this.restService.getById(Urls.InstallmentGetDiscount, this.workshopsGrid.selectedDataItem.branchCode + '/' + param.debitNumber + '/' + param.mande)
      .then(value => {
        this.hideOverlay(this.overlay);
        var a = JSON.stringify(param);
        var b = JSON.parse(a);
        b.discount = value.data;
        b.debitRemain = b.debitRemain - value.data;
        if (!this.workshopsTempDebitGrid.dataItems.find(x => x.debitNumber === param.debitNumber)) {
          this.workshopsTempDebitGrid.dataItems.push(b);
          this.debitSum = this.debitSum + b.debitRemain;
          this.installmentShow = false;
        }

      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });

  }

  onGridAction(param: any) {
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'delete':
        this.workshopsTempDebitGrid.dataItems.splice(this.workshopsTempDebitGrid.dataItems.findIndex(x => x.debitNumber === param.item.debitNumber), 1);
        this.debitSum = this.debitSum - param.item.debitRemain;
        this.installmentShow = false;
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

  installmentFormShow() {
    if (this.workshopsTempDebitGrid.dataItems.length === 0) {
      this.showInfoMessageBox('پیام سیستم', 'بدهی انتخاب نشده است.');
      return;
    }
    if (this.debitSum < 10000000) {
      this.showInfoMessageBox('پیام سیستم', 'مجموع بدهی های انتخابی زیر 10/000/000 ریال قابل تقسیط نمی باشد.');
      return;
    }
    var someDate = new Date();
    const numberOfDaysToAdd = 7;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    this.installmentForm.reset();
    this.installmentForm.get('installmentAmount').setValue(this.debitSum);
    this.installmentForm.get('dateFirstInstallment').setValue(someDate);

    this.installmentShow = true;
  }

  onSaveInstallment() {
    if (!this.installmentForm.valid) {
      this.markFormGroupAsTouched(this.installmentForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }
    const values = this.installmentForm.getRawValue();
    if (values.firstInstallment > 500000000 || values.eachInstallment > 500000000) {
      this.showInfoMessageBox('پیام سیستم', 'کارفرمایان گرامی با توجه به محدودیت های اعلامی از سوی بانک مرکزی ایران در انجام تراکنش های بانکی ، پرداخت برخط و غیرحضوری بدهی ها حداکثر تا مبلغ 500 میلیون ریال میسر می باشد.');
      return;
    }
    const selectedDebit = this.workshopsTempDebitGrid.dataItems;
    const data = {
      debitInstallmentDetail: [],
      firstInstallmentPer: this.preInstallmentsValue[values.preInstallment],
      // dateFirstInstallment: this.getPersianDate(values.dateFirstInstallment).replace('/', '').replace('/', ''),
      // installmentNumber: values.installmentNumber,
      workshopId: this.workshopsGrid.selectedDataItem.wokshopId,
      branchCode: this.workshopsGrid.selectedDataItem.branchCode,
      peymanSequence: this.workshopsGrid.selectedDataItem.contractRow
    };
    selectedDebit.forEach(value => {
      data.debitInstallmentDetail.push(
        {
          debitNumber: value.debitNumber,
        }
      );
    });

    this.overlay = this.showOverlay();
    this.restService.create(Urls.InstallmentSave, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست شما با شماره پیگیری ' + '<b>' + value.data.refId + '</b>' + ' با موفقیت ثبت گردید.', () => {
          this.redirectTo('/debit-installment-follow');
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

}
