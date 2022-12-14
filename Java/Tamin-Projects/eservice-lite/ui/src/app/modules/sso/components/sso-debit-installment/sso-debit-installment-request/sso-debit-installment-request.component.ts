import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, OverlayService, SearchOperator, SearchParam, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sso-debit-installment-request',
  templateUrl: './sso-debit-installment-request.component.html',
  styleUrls: ['./sso-debit-installment-request.component.css']
})
export class SsoDebitInstallmentRequestComponent extends TaminPageBaseComponent {

  @ViewChild('workshopsGrid') workshopsGrid: TaminDataGridComponent;
  @ViewChild('workshopsDebitGrid') workshopsDebitGrid: TaminDataGridComponent;
  @ViewChild('workshopsTempDebitGrid') workshopsTempDebitGrid: TaminDataGridComponent;
  searchParams: SearchParam[];
  workshopDebitSearchForm: FormGroup;
  private overlay: any;
  installmentForm: FormGroup;
  installmentShow: boolean;
  preInstallments = [];
  preInstallmentsValue = [];
  items = [[]];
  public debitSum = 0;
  searchWorkshopParams: SearchParam[];
  branchCode: any;

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
    this.workshopDebitSearchForm = this.fb.group({
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ticketCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  sendUserTicket() {
    const values = this.workshopDebitSearchForm.value;
    if (values.nationalCode === null || values.nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    }
    if (values.nationalCode.length === 0 || values.nationalCode.length !== 10) {
      alert('مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    this.searchParams = [];
    this.searchParams.push({
      property: 'nationalCode',
      value: values.nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'debitInstallment',
      operator: SearchOperator.EQ

    });

    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.TicketAdminSso, this.searchParams)
      .then(result => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام مسیستم', 'ارسال کد اعتباری با موفقیت انجام شد');
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }

  onSearchSubmit() {
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    if (ticketCode === null || ticketCode === '') {
      alert('وارد نمودن کد اعتباری کارفرما الزامیست');
      return;
    } else if (nationalCode === null || nationalCode === '') {
      alert('وارد نمودن کد ملی کارفرما الزامیست');
      return;
    } else {
      this.searchParams = [];
      this.searchParams.push({
        property: 'nationalCode',
        value: nationalCode,
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'serviceName',
        value: 'debitInstallment',
        operator: SearchOperator.EQ
      });
      this.searchParams.push({
        property: 'ticketCode',
        value: ticketCode,
        operator: SearchOperator.EQ
      });
      this.workshopsGrid.pagerCurrentPage = 1;
      this.workshopsGrid.serviceUrl = Urls.SSO_employerEservicesAgreementWorkshopsInfo;
      this.workshopsGrid.searchParams = this.searchParams;
      this.workshopsGrid.dataItems = [];
      this.workshopsGrid.refreshData().then(value => {
      }).catch(reason => {
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
    }
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
      .setShowFooter(false)
      .setViewType('GridView')
      .getData();
  }


  clickWorkshopGridItem(param: any) {
    this.searchParams = new Array<SearchParam>();
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    this.branchCode = param.branchCode;
    this.workshopsDebitGrid.serviceUrl = Urls.SSO_InstallmentWorkshopsDebit + '/' + param.wokshopId + '/' + param.branchCode;
    this.workshopsDebitGrid.pagerCurrentPage = 1;
    if (param.contractRow !== undefined && param.contractRow !== '' && param.contractRow !== null) {
      this.searchParams.push({
        property: 'peymanSequence',
        value: param.contractRow,
        operator: SearchOperator.EQ
      });
    }
    this.searchParams.push({
      property: 'nationalCode',
      value: nationalCode,
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'serviceName',
      value: 'debitInstallment',
      operator: SearchOperator.EQ
    });
    this.searchParams.push({
      property: 'ticketCode',
      value: ticketCode,
      operator: SearchOperator.EQ
    });
    this.workshopsDebitGrid.searchParams = this.searchParams;
    this.workshopsDebitGrid.refreshData();
    this.workshopsTempDebitGrid.dataItems = [];
    this.debitSum = 0;
    this.installmentShow = false;
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
    const nationalCode = this.workshopDebitSearchForm.get('nationalCode').value;
    const ticketCode = this.workshopDebitSearchForm.get('ticketCode').value;
    this.overlay = this.showOverlay();
    this.restService.create(Urls.SSO_InstallmentSave + '/' + ticketCode + '/' + nationalCode, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست شما با شماره پیگیری ' + '<b>' + value.data.refId + '</b>' + ' با موفقیت ثبت گردید.', () => {
          this.redirectTo('sso/thirty-seventy');
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
