import {Component, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-inspection-objection-insured',
  templateUrl: './inspection-objection-insured.component.html',
  styleUrls: ['./inspection-objection-insured.component.css']
})
export class InspectionObjectionInsuredComponent extends TaminPageBaseComponent {
  @ViewChild('organizationDataGrid') organizationDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('jobDataGrid') jobDataGrid: TaminFieldAutoCompleteDataGridComponent;
  editForm: FormGroup;
  private inspectionNumber: string;
  private insuranceNumber: string;
  private overlay: any;

  protected initializePage(): void {
    this.createForm();

    this.initializeOrganizationAutoComplete();
    this.initializeJobsAutoComplete();
    // this.markFormGroupAsTouched(this.editForm);
  }

  protected loadPageData(): void {
    this.loadData();
  }

  private loadData() {
    this.securityService.getCurrentUser()
      .then(value => {
        this.editForm.patchValue(value);
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
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
    if (!this.editForm.valid) {
      return;
    }
    const values = this.editForm.getRawValue();



    // const values = this.editForm.getRawValue();


    const data = {
      brchCode: values.branchName,
      inspectionNumberOld: values.inspectionNumber,
      insuranceId: values.insuranceId,
      insuranceJob: values.insuranceJob,
      requestDescription: values.requestDescription,
      startDate: new Date(values.startDate).getTime(),
      endDate: new Date(values.endDate).getTime(),
      workshopAddress: values.workshopAddress,
      workshopManager: values.workshopManager,
      workshopName: values.workshopName,
      workshopNumber: values.workshopNumber,
      workshopTel: values.workshopTel
    };
    this.overlay = this.showOverlay();
    this.restService
      .create(Urls.InspectionObjectionPost, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        const msg = 'اطلاعات با شماره پیگیری ' + (<any>value).data.request.id + ' با موفقیت ذخیره شد.';
        this.showInfoMessageBox('توجه', msg, () => {
          this.redirectTo('/me');
        });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
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
      firstName: [''],
      lastName: [''],
      nationalCode: [''],
      mobile: [''],
      tel: [''],
      email: [''],
      workshopName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      workshopManager: ['',[ Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      branchName: ['', Validators.required],
      workshopNumber: [''],
      workshopTel: [''],
      insuranceJob: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      workshopAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      requestDescription: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      inspectionNumber: [''],
      insuranceId: ['']
    });
  }

  initializeOrganizationAutoComplete() {
    this.organizationDataGrid.valueField = 'code';
    this.organizationDataGrid.displayField = 'name';
    this.organizationDataGrid.searchPattern = '%{term}%';
    this.organizationDataGrid.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BranchesAll)
      .setShowPager(true)
      .setFirstLoad(false)
      .addVisibleColumn({columnName: 'code', columnCaption: 'کد', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'name', columnCaption: 'نام', columnViewType: DataColumnViewType.Label})
      .addVisibleColumn({columnName: 'branchAddress', columnCaption: 'آدرس', columnViewType: DataColumnViewType.Label})
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
