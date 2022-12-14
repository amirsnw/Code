import {Component, Injector, ViewChild} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ClaimUrls} from '../../../../claim-urls';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent extends TaminPageBaseComponent /*implements AfterContentChecked*/ {
  theForm: FormGroup;
  @ViewChild('jobDataGrid') JobAutoComplete: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('insuranceDataGrid') insuranceAutoComplete: TaminFieldAutoCompleteDataGridComponent;
  listData: {
    branchCode: '';
    workshopCode: '',
    workshopTitle: '',
    employerName: '',
    contractNumber: '',
    workshopAddress: '',
    listNumber: '',
    employeesCount: '',
    year: '',
    monthName: string,
    month: ''
  };
  searchParams: SearchParam[];
  private listId: any;
  private listItemId: any;
  private overlay: any;
  private jobDescription: any;
  private workshop: any;
  private listIndex: any;
  private nationality: any;
  private premiumBenefitFactor: any;

  percentsTwo = [
    {id: '0', name: 'ندارد'},
    {id: '7', name: 'دارد'},
  ];

  months = [
    {id: '01', name: 'فروردین'},
    {id: '02', name: 'اردیبهشت'},
    {id: '03', name: 'خرداد'},
    {id: '04', name: 'تیر'},
    {id: '05', name: 'مرداد'},
    {id: '06', name: 'شهریور'},
    {id: '07', name: 'مهر'},
    {id: '08', name: 'آبان'},
    {id: '09', name: 'آذر'},
    {id: '10', name: 'دی'},
    {id: '11', name: 'بهمن'},
    {id: '12', name: 'اسفند'}
  ];

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
    this.listId = this.activeRoute.snapshot.params['lid'];
    this.listItemId = this.activeRoute.snapshot.params['liid'];
    if (isNaN(this.listId) || isNaN(this.listItemId)) {
      this.showErrorMessageBox('خطا', 'اطلاعات ورودی نادرست است.', () => {
        this.redirectTo('il/desktop');
      });
    }
  }

  private patchDate(val: any) {
    if (typeof val === 'string') {
      return `${val.substr(0, 4)}/${val.substr(4, 2)}/${val.substr(6, 2)}`;
    } else {
      return this.getPersianDate(new Date(val));
    }
  }

  protected initializePage() {
    this.theForm = this.formBuilder.group({
      insuranceId: ['', Validators.required],
      insurance: [''],
      lastName: [''],
      firstName: [''],
      fatherName: [''],
      gender: [''],
      birthCertificateNo: [''],
      placeOfIssue: [''],
      birthDate: [''],
      dateOfIssue: [''],
      nationalID: [''],
      workDays: ['', Validators.required],
      dailyWage: ['', Validators.required],
      monthlyWage: [''],
      includedContinuousBonus: [0],
      includedDiscontinuousBonus: ['0', Validators.required],
      excludedBonus: ['0'],
      jobCode: ['', Validators.required],
      debutDate: [''],
      severanceDate: [''],
      sumOfMonthlyWageAndIncludedBonus: [''],
      sumOfMonthlyWageAndBonuses: [''],
      employeePremiumPercent: ['7', Validators.required],
      unEmployeePremiumPercent: [''],
      employeePremium: [''],
      unEmployeePremium: [''],
    });

    this.initializeInsuranceAutoComplete();
    this.initializeJobsAutoComplete();

    const setWorkersInformation = () => {
      this.nationality = this.workshop.insurance.nation.nationDesc;
      this.theForm.get('insuranceId').setValue(this.workshop.insurance.id);
      this.theForm.get('nationalID').setValue(this.workshop.insurance.nationalId);
      this.theForm.get('firstName').setValue(this.workshop.insurance.firstName);
      this.theForm.get('lastName').setValue(this.workshop.insurance.lastName);
      this.theForm.get('fatherName').setValue(this.workshop.insurance.fatherName);
      this.theForm.get('gender').setValue(this.workshop.insurance.gender !== null ? this.workshop.insurance.gender.genderDesc : '');
      this.theForm.get('birthCertificateNo').setValue(this.workshop.insurance.idCardNumber);
      this.theForm.get('placeOfIssue').setValue(this.workshop.insurance.cityOfIssue);
      this.theForm.get('birthDate').setValue(this.patchDate(this.workshop.insurance.dateOfBirth));
      this.theForm.get('workDays').setValue(this.theForm.get('workDays').value);
    };

    this.theForm.get('insurance').valueChanges.subscribe(value => {
      if (value.toString().length === 10) {
        if (this.insuranceAutoComplete.theGrid.dataItems !== undefined) {
          this.workshop = this.insuranceAutoComplete.theGrid.dataItems.find(c => c.insurance.id === value);
          setWorkersInformation();
        }
      }
    });
  }

  protected loadPageData() {

    const resolveData = (value: any) => {
      this.listData = value.data.listRecord;
      this.insuranceAutoComplete.filter = [];
      this.insuranceAutoComplete.filter.push({
        property: 'workshop.workshopId',
        value: this.listData.workshopCode,
        operator: 'EQ',
      });
      this.insuranceAutoComplete.filter.push({
        property: 'workshop.branchCode',
        value: this.listData.branchCode,
        operator: 'EQ',
      });
      this.insuranceAutoComplete.filter.push({
        property: 'specialStartDate',
        value: this.listData.year + this.listData.month + '30',
        operator: 'EQ',
      });
      this.premiumBenefitFactor = value.data.premiumBenefitFactor;
      this.listData.monthName = this.months.find(c => c.id === this.listData.month).name;
    };

    this.overlay = this.showOverlayWithMessage('اطلاعات درحال بارگذاری میباشد، لطفا شکیبا باشید...');
    this.restService
      .getAll(ClaimUrls.listRecord + '/' + this.listId)
      .then(value => {
        resolveData(value);
        if (this.listItemId !== '0') {
          this.loadDataToUpdate().then(value1 => {
            this.hideOverlay(this.overlay);
          }).catch(reason => {
            this.hideOverlay(this.overlay);
            this.showErrorMessageBox('خطا', 'اطلاعات ورودی نادرست است یا سیستم قادر به دریافت اطلاعات لیست نمی باشد.', () => {
              this.redirectTo('il/online-list-details/' + this.listId);
            });
          });
        }
        this.hideOverlay(this.overlay);
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('خطا', 'اطلاعات ورودی نادرست است یا سیستم قادر به دریافت اطلاعات لیست نمی باشد.', () => {
          this.redirectTo('il/online-list-details/' + this.listId);
        });
      });
  }

  loadDataToUpdate(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.restService
        .getAll(ClaimUrls.listItemRecord + '/' + this.listItemId)
        .then(value => {
          this.theForm.get('insuranceId').setValue(value.data.insuranceNumber);
          this.nationality = value.data.nationality === '01' ? 'ایرانی' : (value.data.nationality === 'ایرانی' ? 'ایرانی' : 'تبعه خارجی');
          this.theForm.get('nationalID').setValue(value.data.nationalCode);
          this.theForm.get('firstName').setValue(value.data.firstName);
          this.theForm.get('lastName').setValue(value.data.lastName);
          this.theForm.get('fatherName').setValue(value.data.fatherName);
          this.theForm.get('gender').setValue(value.data.gender);
          this.theForm.get('birthCertificateNo').setValue(value.data.identityNumber);
          this.theForm.get('placeOfIssue').setValue(value.data.identityIssuPlace);
          this.theForm.get('birthDate').setValue(this.patchDate(value.data.birthDate));
          this.listId = value.data.listId.id;
          this.theForm.get('dateOfIssue').setValue(value.data.identityIssuDate);
          this.theForm.get('unEmployeePremiumPercent').setValue(value.data.unemploymentPremiumPercent === 0 ? 'ندارد' : 'دارد');
          this.theForm.get('workDays').setValue(value.data.workingDays.toString());
          this.theForm.get('dailyWage').setValue(value.data.dailyWage.toString());
          this.theForm.get('monthlyWage').setValue(value.data.monthlyWage.toString());
          this.theForm.get('excludedBonus').setValue(value.data.excludedBonus.toString());
          this.theForm.get('includedDiscontinuousBonus').setValue(value.data.includedDiscontinuousBonus.toString());
          this.theForm.get('jobCode').setValue(value.data.jobCode);
          this.jobDescription = value.data.jobDescription;
          this.listIndex = value.data.listIndex;
          this.nationality = value.data.nationality;
          this.theForm.get('debutDate').setValue(value.data.workStartDate);
          this.theForm.get('severanceDate').setValue(value.data.workEndDate);
          this.theForm.get('sumOfMonthlyWageAndIncludedBonus').setValue(value.data.inclusiveWageAndBenefit.toString());
          this.theForm.get('sumOfMonthlyWageAndBonuses').setValue(value.data.wageAndBenefit.toString());
          this.theForm.get('employeePremium').setValue(value.data.employeePremium.toString());
          this.theForm.get('employeePremiumPercent').setValue(value.data.employeePremiumPercent.toString());
          this.changeDetectorRef.detectChanges();
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  saveData() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const toBeSaved = {
      listId: this.listId,
      branchCode: this.listData.branchCode,
      workshopCode: this.listData.workshopCode,
      insuranceNumber: this.theForm.get('insuranceId').value,
      workingDays: Number(this.theForm.get('workDays').value),
      dailyWage: Number(this.theForm.get('dailyWage').value),
      monthlyWage: Number(this.theForm.get('monthlyWage').value),
      includedContinuousBonus: Number(this.theForm.get('includedContinuousBonus').value),
      includedDiscontinuousBonus: Number(this.theForm.get('includedDiscontinuousBonus').value),
      excludedBonus: Number(this.theForm.get('excludedBonus').value),
      inclusiveBenefit: Number(this.theForm.get('includedContinuousBonus').value) + Number(this.theForm.get('includedDiscontinuousBonus').value),
      inclusiveWageAndBenefit: Number(this.theForm.get('sumOfMonthlyWageAndIncludedBonus').value),
      wageAndBenefit: Number(this.theForm.get('sumOfMonthlyWageAndBonuses').value),
      employeePremium: Number(this.theForm.get('employeePremium').value),
      unemploymentPremium: Number(this.theForm.get('unEmployeePremium').value),
      employeePremiumPercent: Number(this.theForm.get('employeePremiumPercent').value),
      unemploymentPremiumPercent: Number(this.theForm.get('unEmployeePremiumPercent').value === 'دارد' ? 3 : 0),
      workEndDate: this.theForm.get('severanceDate').value === '' ? null : this.theForm.get('severanceDate').value,
      workStartDate: this.theForm.get('debutDate').value === '' ? null : this.theForm.get('debutDate').value,
      jobCode: this.theForm.get('jobCode').value,
      jobDescription: this.JobAutoComplete.theGrid.dataItems.find(c => c.jobCode === this.theForm.get('jobCode').value).jobDescription,
      listIndex: this.listIndex !== undefined ? this.listIndex : this.listData.employeesCount + 1,
      listMonth: this.listData.month,
      listYear: this.listData.year
    };

    this.overlay = this.showOverlayWithMessage('اطلاعات درحال بارگذاری میباشد، لطفا شکیبا باشید...');
    if (this.listItemId === '0') {
      this.restService
        .create(ClaimUrls.listItemRecord, toBeSaved)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد.', () => {
            this.redirectTo('il/online-list-details/' + this.listId);
          });
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('خطا', reason.error.data.message);
        });
    } else {
      this.restService
        .update(ClaimUrls.listItemRecord, this.listItemId, toBeSaved)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت به روز شد.', () => {
            this.redirectTo('il/online-list-details/' + this.listId);
          });
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('خطا', reason.error.data.message);
        });
    }
  }

  private initializeInsuranceAutoComplete() {
    this.insuranceAutoComplete.valueField = 'insurance.id';
    this.insuranceAutoComplete.displayField = 'insurance.id';
    this.insuranceAutoComplete.searchPattern = '{term}';
    this.insuranceAutoComplete.searchOperator = SearchOperator.EQ;
    this.insuranceAutoComplete.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setId('insurance.id')
      .addUrl(ClaimUrls.workshopsMembers)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'insurance.id', columnCaption: 'شماره بیمه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insurance.firstName', columnCaption: 'نام', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insurance.lastName', columnCaption: 'نام خانوادگی', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  initializeJobsAutoComplete() {
    this.JobAutoComplete.valueField = 'jobCode';
    this.JobAutoComplete.displayField = 'jobDescription';
    this.JobAutoComplete.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setId('jobCode')
      .addUrl(Urls.Job)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'jobCode', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'jobDescription', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(5)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  goBack() {
    this.redirectTo('il/online-list-details/' + this.listId);
  }

  calculation() {

    let dailyWage = this.theForm.get('dailyWage').value;
    let workDays = this.theForm.get('workDays').value;
    dailyWage = isNaN(dailyWage) ? 0 : Number(dailyWage);
    workDays = isNaN(workDays) ? 0 : Number(workDays);
    this.theForm.get('monthlyWage').setValue((dailyWage * workDays).toString());

    if (this.workshop) {
      if (this.workshop.specialSubType === '0') {
        if (this.workshop.workshop.workshopUnemployedStat === '3') {
          this.theForm.get('includedContinuousBonus').setValue(Math.round(Number(this.premiumBenefitFactor) * workDays));
          this.theForm.get('unEmployeePremiumPercent').setValue('دارد');
        }
      } else if (this.workshop.specialSubType === '1') {
        this.theForm.get('includedContinuousBonus').setValue(Math.round(Number(this.premiumBenefitFactor) * workDays));
        this.theForm.get('unEmployeePremiumPercent').setValue('دارد');
      } else if (this.workshop.specialSubType === '2') {
        this.theForm.get('includedContinuousBonus').setValue(0);
        this.theForm.get('unEmployeePremiumPercent').setValue('ندارد');
      }
    } else {
      if (this.theForm.get('unEmployeePremiumPercent').value === 'دارد') {
        this.theForm.get('includedContinuousBonus').setValue(Math.round(Number(this.premiumBenefitFactor) * workDays));
      }
    }

    let monthlyWage = this.theForm.get('monthlyWage').value;
    let includedContinuousBonus = this.theForm.get('includedContinuousBonus').value;
    let includedDiscontinuousBonus = this.theForm.get('includedDiscontinuousBonus').value;
    monthlyWage = isNaN(monthlyWage) ? 0 : Number(monthlyWage);
    includedContinuousBonus = isNaN(includedContinuousBonus) ? 0 : Number(includedContinuousBonus);
    includedDiscontinuousBonus = isNaN(includedDiscontinuousBonus) ? 0 : Number(includedDiscontinuousBonus);
    this.theForm.get('sumOfMonthlyWageAndIncludedBonus').setValue((monthlyWage + includedContinuousBonus + includedDiscontinuousBonus).toString());

    let excludedBonus = this.theForm.get('excludedBonus').value;
    monthlyWage = isNaN(monthlyWage) ? 0 : Number(monthlyWage);
    includedContinuousBonus = isNaN(includedContinuousBonus) ? 0 : Number(includedContinuousBonus);
    includedDiscontinuousBonus = isNaN(includedDiscontinuousBonus) ? 0 : Number(includedDiscontinuousBonus);
    excludedBonus = isNaN(excludedBonus) ? 0 : Number(excludedBonus);
    this.theForm.get('sumOfMonthlyWageAndBonuses').setValue((monthlyWage + includedContinuousBonus + includedDiscontinuousBonus + excludedBonus).toString());

    let sumOfMonthlyWageAndIncludedBonus = this.theForm.get('sumOfMonthlyWageAndIncludedBonus').value;
    let employeePremiumPercent = this.theForm.get('employeePremiumPercent').value;
    sumOfMonthlyWageAndIncludedBonus = isNaN(sumOfMonthlyWageAndIncludedBonus) ? 0 : Number(sumOfMonthlyWageAndIncludedBonus);
    employeePremiumPercent = isNaN(employeePremiumPercent) ? 0 : Number(employeePremiumPercent);
    this.theForm.get('employeePremium').setValue((Math.round(sumOfMonthlyWageAndIncludedBonus * employeePremiumPercent / 100)).toString());

    let unEmployeePremiumPercent = this.theForm.get('unEmployeePremiumPercent').value === 'دارد' ? 3 : 0;
    sumOfMonthlyWageAndIncludedBonus = isNaN(sumOfMonthlyWageAndIncludedBonus) ? 0 : Number(sumOfMonthlyWageAndIncludedBonus);
    unEmployeePremiumPercent = isNaN(unEmployeePremiumPercent) ? 0 : Number(unEmployeePremiumPercent);
    this.theForm.get('unEmployeePremium').setValue((Math.round(sumOfMonthlyWageAndIncludedBonus * unEmployeePremiumPercent / 100)).toString());
  }
}
