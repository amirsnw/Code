import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {HistoryNotexistModel} from '../../../../models/history/historyNotexist.model';
import {TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';

import * as momentNs from 'jalali-moment';

const moment = momentNs;


@Component({
  selector: 'app-objection-notexist-new-edit',
  templateUrl: './objection-notexist-new-edit.component.html',
  styleUrls: ['./objection-notexist-new-edit.component.css']
})
export class ObjectionNotexistNewEditComponent extends TaminPageBaseComponent {
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  @ViewChild('theNewModal') theNewModal: TaminModalComponent;
  @ViewChild('branchNewDataGrid') branchNewDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('organizationId') organizationId: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('cityNewDataGrid') cityNewDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('provinceNewDataGrid') provinceNewDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('insuranceTypeNewDataGrid') insuranceTypeNewDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  notexistNewForm: FormGroup;
  @Output() submitt = new EventEmitter<any>();
  private _overlay: any;
  @Output() close = new EventEmitter<any>();
  private state: 'New' | 'Edit';
  private data: any;

  initializePage() {
    this._initializeFromGroup();
    this._initializeBranchNewDataGrid();
    this._initializeCityNewDataGrid();
    this._initializeProvinceNewDataGrid();
    this._initializeInsuranceTypeNewDataGrid();
  }

  private _initializeFromGroup() {
    this.notexistNewForm = this.formBuilder.group({
      provinceCode: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      cityCode: ['', [Validators.required]],
      insuranceType: ['', [Validators.required]],
      rwshid: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      rwshname: ['', [Validators.required]],
      rwshAddress: ['', [Validators.required]],
      workDays: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      rwshManager: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      userDesc: ['']
    });

    this.notexistNewForm.get('provinceCode').valueChanges.subscribe((value) => {
      this.notexistNewForm.get('cityCode').setValue('');
      this.notexistNewForm.get('branchCode').setValue('');
      if (!value || value === '') {
        return;
      }

      this.notexistNewForm.get('cityCode').setValue('');
      this.notexistNewForm.get('branchCode').setValue('');

      this.cityNewDataGrid.filter = [
        {
          property: 'provincecode',
          value: value,
          operator: 'EQUAL'
        }];
    });
    this.notexistNewForm.get('cityCode').valueChanges.subscribe((value) => {
      if (!value || value === '') {
        return;
      }
      this.branchNewDataGrid.filter = [
        {
          property: 'cityCode',
          value: value,
          operator: 'EQUAL'
        },
        {
          property: 'type',
          value: '1',
          operator: 'EQUAL'
        },
        {
          property: 'status',
          value: '1',
          operator: 'EQUAL'
        }
      ];
    });
  }

  private _initializeProvinceNewDataGrid() {
    this.provinceNewDataGrid.valueField = 'provinceCode';
    this.provinceNewDataGrid.displayField = 'provinceName';
    // this.provinceNewDataGrid.searchPattern = '{term}%';
    this.provinceNewDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('provinceCode')
      .addVisibleColumn({columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeCityNewDataGrid() {
    this.cityNewDataGrid.valueField = 'cityCode';
    this.cityNewDataGrid.displayField = 'cityName';
    this.cityNewDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.cities)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('cityCode')
      .addVisibleColumn({columnName: 'cityCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'cityName', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeBranchNewDataGrid() {
    this.branchNewDataGrid.valueField = 'code';
    this.branchNewDataGrid.displayField = 'name';
    this.branchNewDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Branches)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('code')
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: 'Label'})
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

  private _initializeInsuranceTypeNewDataGrid() {
    this.insuranceTypeNewDataGrid.valueField = 'insuranceTypeCode';
    this.insuranceTypeNewDataGrid.displayField = 'insuranceTypeDesc';
    this.insuranceTypeNewDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.InsuranceTypes)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('insuranceTypeCode')
      .addVisibleColumn({columnName: 'insuranceTypeCode', columnCaption: 'کد', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'insuranceTypeDesc', columnCaption: 'نام', columnViewType: 'Label'})
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

  notexistNewFormSubmit() {
    this.submitt.emit(this.notexistNewForm.getRawValue());
  }

  backToPanelClick() {
    this.redirectTo('/');
  }


  validateDates(): string {
    const start = new Date(this.notexistNewForm.get('startDate').value);
    const end = new Date(this.notexistNewForm.get('endDate').value);
    const today = new Date();
    const minDate = new Date(1949, 2, 21, 0, 0, 0, 0);

    if (start < minDate || end < minDate) {
      return 'تاریخ شروع و پایان می بایست بعد از یکم فروردین ماه سال ۱۳۲۸ باشد';
    }

    if (start > today || end > today) {
      return 'تاریخ شروع و پایان می بایست حداقل با فاصله یک روز از تاریخ امروز باشد';
    }

    if (start > today || end > today) {
      return 'تاریخ شروع و پایان می بایست حداقل با فاصله یک روز از تاریخ امروز باشد';
    }


    if (start >= end) {
      return 'تاریخ پایان می بایست حداقل با فاصله یک روز از تاریخ شروع باشد';
    }

    const tmp = moment.from(today.toLocaleDateString(), 'en');
    const twoMonthBack = tmp.locale('fa').subtract(2, 'months').toDate();

    if (end > twoMonthBack) {
      return 'تاریخ پایان می بایست حداقل دو ماه از تاریخ امروز کوچکتر باشد';
    }

    return '';
  }

  validateWorkDays(): string {
    let error = '';
    const start = new Date(this.notexistNewForm.get('startDate').value);
    const end = new Date(this.notexistNewForm.get('endDate').value);
    const workDays = this.notexistNewForm.get('workDays').value;

    if (start >= end) {
      error = 'تاریخ پایان می بایست بعد از تاریخ شروع باشد';
    }


    const diff = Math.ceil((end.valueOf() - start.valueOf()) / (1000 * 3600 * 24)) + 1;

    if (workDays > diff) {
      error = 'روزهای کارکرد می بایست کوچکتر یا مساوی تفاوت بین تاریخ های شروع و پایان باشد';
    }
    return error;
  }

  notexitNewFormSubmit() {
    if (!this.notexistNewForm.valid) {
      this.markFormGroupAsTouched(this.notexistNewForm);
      return;
    }

    const error1 = this.validateDates();
    if (error1 !== '') {
      this.showErrorMessageBox('پیام سیستم', error1);
      return;
    }

    const error2 = this.validateWorkDays();
    if (error2 !== '') {
      this.showErrorMessageBox('پیام سیستم', error2);
      return;
    }

    const formData = this.notexistNewForm.getRawValue();
    const data = new HistoryNotexistModel();
    data.branchCode = formData.branchCode;
    data.branchName = '';
    data.provinceCode = formData.provinceCode;
    data.provinceName = '';
    data.cityCode = formData.cityCode;
    data.cityName = '';
    data.insuranceType = formData.insuranceType;
    data.insuranceTypeDesc = '';
    data.startDate = (new Date(formData.startDate)).getTime().toString();
    data.endDate = (new Date(formData.endDate)).getTime().toString();
    data.workDays = formData.workDays;
    data.rwshid = formData.rwshid;
    data.rwshname = formData.rwshname;
    data.rwshManager = formData.rwshManager;
    data.rwshAddress = formData.rwshAddress;
    this.theModal.showOverlay();
    if (this.state === 'New') {
      this.restService.create(Urls.NotexistObjectionSave, data)
        .then(value => {
          this.theModal.hideOverlay();
          this.hide();
          this.close.emit();
        })
        .catch((reason) => {
          this.theModal.hideOverlay();
          if (reason.error.data !== null) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data);
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }

        });
    } else {
      data.reqno = this.data.reqno;
      data.reqtype = this.data.reqtype;
      data.rowi = this.data.rowi;

      this.restService.create(Urls.NotexistObjectionSave, data)
        .then(value => {
          this.theModal.hideOverlay();
          this.hide();
          this.close.emit();
        })
        .catch((reason) => {
          this.theModal.hideOverlay();
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }

  resetForm() {
    this.notexistNewForm.reset();
  }

  show(record = null) {
    this.data = null;
    this.notexistNewForm.reset();
    this.state = record ? 'Edit' : 'New';
    if (record !== null) {
      this.data = record;
      this.notexistNewForm.patchValue(record);
    }
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }
}
