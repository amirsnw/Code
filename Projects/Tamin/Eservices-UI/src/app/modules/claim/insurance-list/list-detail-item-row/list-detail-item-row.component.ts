import {Component, EventEmitter, Injector, Output, OnInit, ViewChild} from '@angular/core';
import {Urls} from 'src/app/settings/urls';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  DataColumnViewType,
  SearchOperator,
  SearchParam,
  TaminDataColumn,
  TaminDataGridComponent,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent,
  PersianNumberPipe
} from 'tamin-framework';
import {ListDetailItemRowModel} from 'src/app/models/insurance-list/listDetailItemRow.model';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {ListDetailModel} from 'src/app/models/insurance-list/listDetail.model';
import {ListDetailItemRowModalComponent} from './list-detail-item-row-modal/list-detail-item-row-modal.component';
import {ClaimUrls} from '../../claim-urls';

@Component({
  selector: 'app-list-detail-item-row',
  templateUrl: './list-detail-item-row.component.html',
  styleUrls: ['./list-detail-item-row.component.css']
})
export class ListDetailItemRowComponent extends TaminPageBaseComponent {

  @ViewChild('listDetailItemRowModalComponent') listDetailItemRowModalComponent: ListDetailItemRowModalComponent;
  @ViewChild('jobDataGrid') jobDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('taminDataGrid') taminDataGrid: TaminDataGridComponent;
  sortParams: any[] = [];

  @Output() afterSubmit = new EventEmitter<any>();
  public router: ActivatedRoute;


  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  private overlay: any;
  detailForm: FormGroup;
  public lDIRModel: ListDetailItemRowModel;


  searchParams: SearchParam[];

  initializePage() {
    this.title = 'تهیه لیست بیمه';
    this.detailForm = this.formBuilder.group({
      nationalCode: [''],
      jobCode: ['', Validators.required],
      dailyWage: ['', Validators.required],
      workingDays: ['', Validators.required],
      includedContinuousBonus: [''],
      includedDiscontinuousBonus: [''],
      excludedBonus: ['', Validators.required],
      workStartDate: [''],
      workEndDate: [''],
      salaryPlusIncludedBonusDisplay: [''],
      salaryPlusIncludedAndExcludedBonusDisplay: [''],
      employeePortionOfPremium1Display: [''],
      monthlyWageDiplay: [''],
    });
    if (this.router.snapshot.params['listifnoid'] !== undefined) {
      this.searchFormSubmitInfo(this.router.snapshot.params['listifnoid']);
    } else {
      this.listidInfo(this.router.snapshot.params['listid']);
    }
    this.initializeJobsAutoComplete();

    this.detailForm.get('dailyWage').valueChanges.subscribe(value => {
      this.onFillMonthlyWage();
    });
    this.detailForm.get('workingDays').valueChanges.subscribe(value => {
      this.onFillMonthlyWage();
    });
    this.detailForm.get('includedContinuousBonus').valueChanges.subscribe(value => {
      this.onFillDataCo();
    });
    this.detailForm.get('includedDiscontinuousBonus').valueChanges.subscribe(value => {
      this.onFillDataCo();
    });
    this.detailForm.get('excludedBonus').valueChanges.subscribe(value => {
      this.onFillDataAll();
    });
  }

  listidInfo(listId) {
    if (listId === undefined) {
      return;
    }
    this.lDIRModel = this.lDIRModel !== undefined ? this.lDIRModel : new ListDetailItemRowModel;
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'id';
    searchParam.value = listId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.restService.getAll(ClaimUrls.listRecord, this.searchParams, [])
      .then(data => {
        this.lDIRModel.listId = data.data.list[0] as ListDetailModel;
        this.searchParams = new Array<SearchParam>();
        const searchParam1 = new SearchParam();
        searchParam1.property = 'id';
        searchParam1.value = this.lDIRModel.listId.workshopId;
        searchParam1.operator = SearchOperator.EQ;
        this.searchParams.push(searchParam1);
        this.restService.getAll(ClaimUrls.Workshop, this.searchParams, [])
          .then(data1 => {
            if (data1.data.list.length > 0) {
              this.lDIRModel.listId.brchCode = data1.data.list[0].organizationId;
            }
            this.lDIRModel.listId.workshopCode = data1.data.list[0].code;
          }).catch(error => {
        });
      }).catch(error => {
    });
  }

  searchFormSubmitInfo(listDetailId) {
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'id';
    searchParam.value = listDetailId;
    searchParam.operator = SearchOperator.EQ;
    this.searchParams.push(searchParam);

    this.restService.getAll(ClaimUrls.listItemRecord, this.searchParams, [])
      .then(data => {
        this.lDIRModel = data.data.list[0] as ListDetailItemRowModel;
        this.listidInfo(this.router.snapshot.params['listid']);
        if (this.lDIRModel.birthDate != null) {
          this.lDIRModel.birthDateDisplay = this.getPersianDate(this.lDIRModel.birthDate);
        }
        this.detailForm.patchValue(data.data.list[0]);
      }).catch(error => {
    });
  }

  initializeJobsAutoComplete() {
    this.jobDataGrid.valueField = 'jobCode';
    this.jobDataGrid.displayField = 'jobDesc';
    this.jobDataGrid.searchPattern = '*{term}*';
    this.jobDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(ClaimUrls.InspectionJobs)
      .setShowPager(true)
      .setId('jobCode')
      .setFirstLoad(true)
      .addVisibleColumn({columnName: 'jobCode', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'jobDesc', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  public backToPanelClick() {
    this.redirectTo(`/il/list-details/${this.router.snapshot.params['listid']}`);
  }

  private onFillDataCo() {
    let valueFirst = this.detailForm.get('includedContinuousBonus').value;
    let valueSecond = this.detailForm.get('includedDiscontinuousBonus').value;
    const monthlyWage = this.lDIRModel.monthlyWage != null ? this.lDIRModel.monthlyWage : 0;

    valueFirst = valueFirst !== null && valueFirst !== '' ? Number(valueFirst) : 0;
    valueSecond = valueSecond !== null && valueSecond !== '' ? Number(valueSecond) : 0;
    const valueSum = valueFirst + valueSecond + monthlyWage;
    const valuePremium = (valueSum * 7) / 100;

    const persianNumberPipe = new PersianNumberPipe();
    this.lDIRModel.salaryPlusIncludedBonus = valueSum;
    this.detailForm.get('salaryPlusIncludedBonusDisplay').setValue(`${persianNumberPipe.transform(valueSum.toString(), 'cs')} ريال`);

    this.lDIRModel.employeePortionOfPremium1 = valuePremium;
    this.detailForm.get('employeePortionOfPremium1Display').setValue(`${persianNumberPipe.transform(valuePremium.toString(), 'cs')} ريال`);
    this.onFillDataAll();
  }

  private onFillMonthlyWage() {
    const dailyWage = this.detailForm.get('dailyWage').value;
    const workingDays = this.detailForm.get('workingDays').value;
    if (Number(workingDays) > 31) {
      this.detailForm.get('workingDays').setValue(null);
      this.showInfoMessageBox('توجه', 'تعداد روزهای کاری را درست وارد کنید');
      return;
    }
    const result = Math.ceil((dailyWage * workingDays));
    const persianNumberPipe = new PersianNumberPipe();
    this.lDIRModel.monthlyWage = result;
    this.detailForm.get('monthlyWageDiplay').setValue(`${persianNumberPipe.transform(result.toString(), 'cs')} ريال`);
    this.onFillDataCo();
  }

  private onFillDataAll() {
    const valueFirst = this.lDIRModel.salaryPlusIncludedBonus != null ? this.lDIRModel.salaryPlusIncludedBonus : 0;
    let valueSecond = this.detailForm.get('excludedBonus').value;
    if (valueSecond !== null && valueSecond !== '') {
      valueSecond = Number(valueSecond);
    } else {
      valueSecond = 0;
    }

    const valueSum = valueFirst + valueSecond;
    this.lDIRModel.salaryPlusIncludedAndExcludedBonus = valueSum;

    const persianNumberPipe = new PersianNumberPipe();
    this.detailForm.get('salaryPlusIncludedAndExcludedBonusDisplay').setValue(`${persianNumberPipe.transform(valueSum.toString(), 'cs')} ريال`);
  }

  newCustomer(values) {
    if (!this.detailForm.valid) {
      return;
    }
    if (values.nationalCode === undefined || values.nationalCode === '') {
      this.showInfoMessageBox('توجه', 'لطفا کد ملی را وارد کنید! ');
      return;
    }
    if (values.includedContinuousBonus === undefined || values.includedContinuousBonus === '') {
      this.showInfoMessageBox('توجه', 'لطفا مزایای ماهانه (مستمری) وارد کنید. ');
      return;
    }
    if (values.includedDiscontinuousBonus === undefined || values.includedDiscontinuousBonus === '') {
      this.showInfoMessageBox('توجه', 'لطفا مزایای ماهانه (غیر مستمری) وارد کنید ');
      return;
    }
    // this.getPersianDate;
    const dataModel = new ListDetailItemRowModel;
    const month = {
      code: this.lDIRModel.listId.month.code,
      monthDescription: this.lDIRModel.listId.month.monthDescription
    };
    dataModel.listId = new ListDetailModel;
    dataModel.listId.id = this.lDIRModel.listId.id;
    dataModel.listId.year = this.lDIRModel.listId.year;
    dataModel.listId.listNumber = this.lDIRModel.listId.listNumber;
    dataModel.listId.workshopId = this.lDIRModel.listId.workshopId;
    dataModel.listId.month = month;
    dataModel.birthDate = this.lDIRModel.birthDate;
    dataModel.nationalCode = values.nationalCode;
    dataModel.nationality = this.lDIRModel.nationality;
    dataModel.insuranceNumber = this.lDIRModel.insuranceNumber;
    dataModel.lastName = this.lDIRModel.lastName;
    dataModel.jobCode = values.jobCode;
    dataModel.dailyWage = values.dailyWage;
    dataModel.workingDays = values.workingDays;
    dataModel.gender = this.lDIRModel.gender;
    dataModel.identityNumber = this.lDIRModel.identityNumber;
    dataModel.firstName = this.lDIRModel.firstName;
    dataModel.fatherName = this.lDIRModel.fatherName;
    dataModel.monthlyWage = this.lDIRModel.monthlyWage;
    dataModel.identityIssuPlace = this.lDIRModel.identityIssuPlace;
    dataModel.wageAndBenefit = this.lDIRModel.salaryPlusIncludedAndExcludedBonus;
    dataModel.employeePremium = this.lDIRModel.employeePortionOfPremium1;
    dataModel.inclusiveWageAndBenefit = this.lDIRModel.salaryPlusIncludedBonus;
    dataModel.excludedBonus = values.excludedBonus;
    dataModel.workEndDate = values.workEndDate !== undefined ? values.workEndDate : '';
    dataModel.idCardNumber = values.idCardNumber;
    dataModel.workStartDate = values.workStartDate !== undefined ? values.workStartDate : '';
    dataModel.includedDiscontinuousBonus = values.includedDiscontinuousBonus;
    dataModel.includedContinuousBonus = values.includedContinuousBonus;
    dataModel.inclusiveBenefit = Number(values.includedContinuousBonus) + Number(values.includedDiscontinuousBonus);
    this.overlay = this.showOverlay();
    if (this.lDIRModel.id !== undefined) {
      this.restService.update(ClaimUrls.listItemRecord, this.router.snapshot.params['listifnoid'], dataModel)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ویرایش شد ');
          this.redirectTo(`/il/list-details/${this.router.snapshot.params['listid']}`);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('پیام سیستم', reason);
        });
    } else {
      this.restService.create(ClaimUrls.listItemRecord, dataModel)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت اضافه شد ');
          this.redirectTo(`/il/list-details/${this.router.snapshot.params['listid']}`);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          this.showErrorMessageBox('پیام سیستم', reason);
        });
    }
  }

  selectNotionalCode() {
    this.listDetailItemRowModalComponent.show(this.lDIRModel);
    // this.taminDataGrid.refreshData();
  }

  show() {
    this.listDetailItemRowModalComponent.show(this.lDIRModel);
  }

  selectedNotionalCode() {
    const personage = this.listDetailItemRowModalComponent.insuranceModel;
    this.detailForm.get('nationalCode').setValue(personage.nationalId);
    this.lDIRModel.firstName = personage.firstName;
    this.lDIRModel.birthDate = personage.dateOfBirth;
    this.lDIRModel.birthDateDisplay = this.getPersianDate(personage.dateOfBirth);
    this.lDIRModel.lastName = personage.lastName;
    this.lDIRModel.gender = personage.gender.genderCode;
    this.lDIRModel.identityNumber = personage.idCardNumber;
    this.lDIRModel.insuranceNumber = personage.id;
    this.lDIRModel.identityIssuPlace = personage.expCityCode.cityCode;
    this.lDIRModel.nationality = personage.nation.nationCode;
    this.lDIRModel.fatherName = personage.fatherName;
    this.listDetailItemRowModalComponent.hide();
  }
}
