import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OverlayService, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent, TaminPersianService, TaminValidators, SortDirection, SortParam, TaminImageGalleryManagedComponent, TaminFieldComboBoxComponent, DataColumnViewType} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Urls} from '../../../settings/urls';
import {PensionRequestModel} from '../../../models/pensioner/pensionRequest.model';
import {PensionAgreementComponent} from './pension-agreement/pension-agreement.component';
import {PensionSaveAgreementComponent} from './pension-save-agreement/pension-save-agreement.component';
import {DeservedTreatmentModel} from '../../../models/deserved-treatment/deservedTreatment.model';
import {PensionRequestCombinedHistoryComponent} from './pension-request-combined-history/pension-request-combined-history.component';

@Component({
  selector: 'app-pension-request',
  templateUrl: './pension-request.component.html',
  styleUrls: ['./pension-request.component.css']
})
export class PensionRequestComponent extends TaminPageBaseComponent {
  pensionRequestForm: FormGroup;
  genders = [{name: 'زن', value: 'f'}, {name: 'مرد', value: 'm'}];
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldComboBoxComponent;
  @ViewChild('branch') branch: TaminFieldComboBoxComponent;
  // @ViewChild('agreement') agreement: PensionAgreementComponent;
  @ViewChild('agreementSave') agreementSave: PensionSaveAgreementComponent;
  @ViewChild('history') history: PensionRequestCombinedHistoryComponent;
  private _subscription = new Subscription();
  private _overlay: any;
  private pensionRequestModel: PensionRequestModel;
  @Input() deservedModel: DeservedTreatmentModel;


  initializePage(): void {
    // this.agreement.show();
    this._initializeFormGroup();
  }

  protected loadPageData(): void {
    // this.agreement.show();
      this.loadData();
  }

  loadData() {
    this._overlay = this.showOverlay();
     this.restService.getAll(Urls.PENSION_REQUEST + '/personal').then(value => {
          // this.deservedModel = value.data;
          const data =  value.data;
          this.hideOverlay(this._overlay);
          this.pensionRequestForm.get('branch').setValue( data.branch);
          this.pensionRequestForm.get('birthDate').setValue(data.personal.dateOfBirth);
          this.pensionRequestForm.get('fatherName').setValue(data.personal.fatherName);
          this.pensionRequestForm.get('firstName').setValue(data.personal.firstName);
          this.pensionRequestForm.get('gender').setValue(data.personal.gender.genderDesc);
          this.pensionRequestForm.get('idNumber').setValue(data.personal.idCardNumber);
          this.pensionRequestForm.get('insuranceNumber').setValue(data.insuranceId);
          this.pensionRequestForm.get('fullName').setValue(data.personal.lastName);
          this.pensionRequestForm.get('nationalId').setValue(data.personal.nationalId);
          this.pensionRequestForm.get('issueplaceName').setValue(value.data.personal.cityOfIssue.description);
          this.pensionRequestForm.get('mobileNumber').setValue(value.data.mobileNumber);
          this.pensionRequestForm.get('age').setValue(data.age);
          this.pensionRequestForm.get('workshopName').setValue(data.work.workshopName);
          this.pensionRequestForm.get('workshopNumber').setValue(data.work.workshopId);
          this.pensionRequestForm.get('province').setValue(data.provinceName);
          this.pensionRequestForm.get('branchName').setValue(data.branchName);
         this.getAge(data.personal.dateOfBirth);
        this.pensionRequestForm.patchValue(this.pensionRequestModel);
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }

  private _initializeFormGroup() {
    this.pensionRequestForm = this.formBuilder.group({
      nationalId: ['', [Validators.required, TaminValidators.nationalId]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]],
      tel: ['', [Validators.required]],
      issueplaceName: ['', [Validators.required]],
      insuranceNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      workshopName: [''],
      workshopNumber: [''],
      workshopManager: [''],
      activityName: [''],
      workshopAddress: [''],
      province: [''],
      city: [''],
      branch: [''],
      gender: ['', [Validators.required]],
       age: [''],
      branchName: ['']
    });
  }
  private getAge(date) {
    const theUrl = `${Urls.PENSION_REQUEST}/age?birthDate=${date}`;
    this.restService.getAll(theUrl)
      .then(data => {
        if (data.data !== null) {
          const birthDate = data.data.birthDate;
          const age = data.data.age;
          const yearAge = age.toString().replace(',', ' سال و ');
          if (yearAge.substring(0, 2) < 42) {
            this.showErrorMessageBox('پیام سیستم', 'با توجه به شرایط سنی شما،ثبت درخواست بازنشستگی در حال حاضر امکان پذیر نیست.' , () => {
              this.redirectTo('/me');
            } );
          }
          const monAge = yearAge.toString().replace(',', ' ماه و ');
          const dayAge = monAge + ' روز';
          this.pensionRequestForm.get('age').setValue(dayAge);
          this.pensionRequestForm.get('birthDate').setValue(birthDate);
        }
      })
      .catch(error => {
      });
  }

  onAgreeSave() {
    this.saveAgreedForm();
  }

  onDisagree() {
    this.redirectTo('/me');
  }

  saveForm() {
    this.showQuestionBox('پیام سیستم', 'سابقه ام را مشاهده و اعتراضی به آن ندارم و یا قبلا اعتراضم را ثبت کرده ام و مایل به ادامه عملیات می باشم', () => {
      this.agreementSave.show();
    }, () => {
      return;
    });
  }

  saveAgreedForm() {
    // if (!this.history.historyObserved) {
    //   this.showErrorMessageBox('پیام سیستم', 'لطفا ابتدا نسبت به مشاهده سوابق خود اقدام نمایید.'  );
    //   return;
    // }
    const values = this.pensionRequestForm.getRawValue();
    if (!this.pensionRequestForm.valid) {
      return;
    }
    if (values.insuranceNumber.substring(0 , 2) !== '00') {
      this.showErrorMessageBox('پیام سیستم', 'امکان ثبت درخواست مستمری برای افراد تبعی وجود ندارد'  );
      return;
    }
    const data = {
      nationalCode: values.nationalId,
      mobileNumber: values.mobileNumber,
      phoneNumber: values.tel,
      issuePlace: values.issueplaceName,
      insuranceNumber: values.insuranceNumber,
      firstName: values.firstName,
      lastName: values.fullName,
      birthDate: values.birthDate,
      fatherName: values.fatherName,
      address: values.address,
      workshopName: values.workshopName,
      workshopCode: values.workshopNumber,
      managerName: values.workshopManager,
      activityType: values.activityName,
      workshopAddress: values.workshopAddress,
      branchCode: values.branch,
      status: '0',
      idNumber: values.idNumber,
      gender : values.gender === 'زن' ? '02' : '01',
      age : values.age,
    };
    // this.showQuestionBox('پیام سیستم', 'آیا از صحت اطلاعات ثبت شده اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService
        .create(Urls.PENSION_REQUEST, data)
        .then(value => {
          this.hideOverlay(this._overlay);
          // if (value.data.officeClosed) {
            this.showInfoMessageBox('توجه', 'درخواست شما با موفقیت دریافت شد و در اولین زمان اداری در شعبه مربوطه، ثبت و بررسی خواهد شد.', () => {
              this.redirectTo('/app-request');
            });
          // } else {
          //   this.showInfoMessageBox('توجه', 'درخواست با موفقیت ثبت شد', () => {
          //     this.redirectTo('/app-request');
          //   });
          // }
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          if (reason && reason.error && reason.error.data && reason.error.data.message !== '') {
            if (reason.error.data.message === 'pension.request.current.request.open') {
              this.showErrorMessageBox('پیام سیستم', 'شما دارای درخواست در حال بررسی می باشید و امکان ثبت درخواست جدید وجود ندارد');
            } else if (reason.error.data.message === 'pension.request.request.confirmed') {
              this.showErrorMessageBox('پیام سیستم', 'درخواست شما قبلا تایید شده و نیازی به ثبت درخواست جدید نمی باشد.');
            } else if (reason.error.data.message === 'pension.request.request.rejected') {
              this.showErrorMessageBox('پیام سیستم', 'درخواست شما بدلیل ذکر شده در بخش تامین اجتماعی من، توسط شعبه برگشت داده شده است، لطفا پس از یک ماه نسبت به ثبت مجدد درخواست، اقدام نمایید.');
            } else {
              this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
            }
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }
        });
    // }, () => {
    //   return;
    // });
  }

  backToListClick() {
    this.redirectTo('/me');
  }

  // viewHistory() {
  //   this.redirectTo('/pension-history-view');
  // }

  historyObjection() {
    this.redirectTo('/objection-noexist');
  }
}
