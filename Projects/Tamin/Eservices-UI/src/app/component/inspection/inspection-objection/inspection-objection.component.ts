import {Component, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DataColumnViewType, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inspection-objection',
  templateUrl: './inspection-objection.component.html',
  styleUrls: ['./inspection-objection.component.css']
})
export class InspectionObjectionComponent extends TaminPageBaseComponent {
  @ViewChild('jobDataGrid') jobDataGrid: TaminFieldAutoCompleteDataGridComponent;
  editForm: FormGroup;
  private inspectionNumber: string;
  private insuranceNumber: string;
  private _overlay: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  initializePage() {
    this.createForm();
    this.inspectionNumber = this.route.snapshot.params['id1'];
    this.insuranceNumber = this.route.snapshot.params['id2'];
    this.initializeJobsAutoComplete();
    // this.markFormGroupAsTouched(this.editForm);
  }

  protected loadPageData(): void {
    this.loadData();
  }

  private loadData() {
    this._overlay =  this.showOverlay();
    const theUrl = `${Urls.InspectionObjectionGet}/${this.insuranceNumber}/${this.inspectionNumber}`;
    this.restService.getAll(theUrl).then(value => {
      const data = {
        lastName: value.data.list.insuranceFamily,
        firstName: value.data.list.insuranceName,
        nationalCode: value.data.list.nationalCode,
        mobile: value.data.list.mobile,
        tel: '',
        brchCode: value.data.list.brchCode,
        email: value.data.list.email,
        workshopNumber: value.data.list.workshopNumber,
        workshopName: value.data.list.workshopName,
        workshopManager: value.data.list.workshopManager,
        branchName: value.data.currentOrganization.organizationName,
        workshopTel: value.data.list.workshopTel,
        insuranceJob: value.data.list.jobcode,
        startDate: value.data.list.workStartDate,
        endDate: '',
        workshopAddress: value.data.list.workshopAddress,
        requestDescription: ''
      };
      this.editForm.patchValue(data);
    }).catch(reason => {
    });
    this.hideOverlay(this._overlay);
  }

  onImageGuidUploaded(uploadedGuid: string) {
    this.editForm.controls['imageGuid'].setValue(uploadedGuid);
  }

  onImageGuidDeleted(deletedGuid: string) {
    this.editForm.controls['imageGuid'].setValue('');
  }

  backToListClick() {
    this.redirectTo('/me');
  }

  saveForm() {
    const values = this.editForm.getRawValue();
    if (!this.editForm.valid) {
      return;
    }
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);

    if (startDate > endDate) {
      this.showErrorMessageBox('پیام سیستم', 'تاریخ شروع از تاریخ پایان بزرگتر می باشد.');
      return;
    }
    const data = {
      brchCode: values.brchCode,
      inspectionNumberOld: this.inspectionNumber,
      insuranceId: this.insuranceNumber,
      insuranceJob: values.insuranceJob,
      requestDescription: values.requestDescription,
      startDate: values.startDate,
      endDate: values.endDate,
      workshopAddress: values.workshopAddress,
      workshopManager: values.workshopManager,
      workshopName: values.workshopName,
      workshopNumber: values.workshopNumber,
      workshopTel: values.workshopTel
    };
    this._overlay = this.showOverlay();
    this.restService
      .create(Urls.InspectionObjectionPost, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد', () => {
          this.redirectTo('/me');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason && reason.error && reason.error.data && reason.error.data.message !== '') {
          this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      brchCode: [''],
      inspectionNumber: [''],
      insuranceId: [''],
      lastName: [''],
      firstName: [''],
      nationalCode: [''],
      mobile: [''],
      tel: [''],
      email: [''],
      workshopNumber: [''],
      workshopName: [''],
      workshopManager: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      branchName: [''],
      workshopTel: [''],
      insuranceJob: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      workshopAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      requestDescription: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]]
    });
  }

  initializeJobsAutoComplete() {
    this.jobDataGrid.valueField = 'jobCode';
    this.jobDataGrid.displayField = 'jobDescription';
    this.jobDataGrid.searchPattern = '*{term}*';
    this.jobDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.Job)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'jobCode', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'jobDescription', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
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

  onRedirect() {
    this.redirectTo('/me');
  }
}
