import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, PersianNumberPipe, SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent, TaminFieldComboBoxStaticComponent, TaminFieldValidatorComponent,
  TaminPageBaseComponent, TaminPersianService
} from 'tamin-framework';
import {AbstractControl, FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {AccountModel} from '../../../../models/registration/account.model';
import {PersonalModel} from '../../../../models/registration/personal.model';
import {WageAssignmentModel} from '../../../../models/pensioner/wageAssignment.model';
import {RequestModel} from '../../../../models/dynamic-request/request.model';
import {SubdominantInfoComponent} from '../subdominant-info/subdominant-info.component';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {ValidationMessageModel} from 'tamin-framework/lib/models/validation-message-model';
import {WageAssignmentAgreementComponent} from '../wage-assignment-agreement/wage-assignment-agreement.component';

@Component({
  selector: 'app-wage-assignment-edit',
  templateUrl: './wage-assignment-edit.component.html',
  styleUrls: ['./wage-assignment-edit.component.css']
})
export class WageAssignmentEditComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('pensioner') pensioner: TaminFieldComboBoxStaticComponent;
  private _overlay: any;
  private searchParams: SearchParam[];
  private wageAssignmentModel: WageAssignmentModel;
  private pnp = new PersianNumberPipe();
  pensionerList = [];
  @ViewChild('subdominantComponent') subdominantComponent: SubdominantInfoComponent;
  @ViewChild('agreement') agreement: WageAssignmentAgreementComponent;
  isWrite = true;

  protected initializePage(): void {
    this._initializePensioner();
    this.createForm();
    this._initializeBank();

  }


  private createForm() {
    this.viewForm = this.formBuilder.group({
      bank: ['', [Validators.required]],
      bankBranch: ['', [Validators.required, Validators.maxLength(50)]],
      installmentAmount: ['', [Validators.required, Validators.max(60000000), Validators.min(500000)]],
      installmentCount: ['', [Validators.required, Validators.max(240), Validators.min(12)]],
      loanAmount: [''],
      guaranteeAmount: ['', [Validators.required]],
      pensionerId: ['', [Validators.required]],
      garanteeType: [''],
    });
    this.validateGuaranteeAmount();
    this.viewForm.get('installmentAmount').valueChanges.subscribe(val => {
      this.viewForm.get('loanAmount').setValue(this.pnp.transform(val * this.viewForm.get('installmentCount').value, 'cs'));
      this.viewForm.get('guaranteeAmount').setValue(val * this.viewForm.get('installmentCount').value * 1.2);
    });
    this.viewForm.get('installmentCount').valueChanges.subscribe(val => {
      this.viewForm.get('loanAmount').setValue(this.pnp.transform(val * this.viewForm.get('installmentAmount').value, 'cs'));
      this.viewForm.get('guaranteeAmount').setValue(val * this.viewForm.get('installmentAmount').value * 1.2);
    });
  }

  private _initializeBank() {
    this.bank.valueField = 'bankCode';
    this.bank.displayField = 'bankName';
    this.bank.searchPattern = '*{term}*';
    this.bank.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.BENEFICIARY)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('bankCode')

      .addVisibleColumn({columnName: 'bankName', columnCaption: 'نام بانک', columnViewType: DataColumnViewType.Label})

      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(true)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .getData();
  }

  private _initializePensioner() {
    this.restService.getAll(Urls.PENSIONER_NO).then(result => {

      (<Array<any>>result.data.list).forEach(value => {

        this.pensionerList.push({
          name: this.getPersianNumber(value.pensionerId),
          value: value.pensionerId

        });
      });
      if (this.pensionerList.length > 0) {
        this.viewForm.get('pensionerId').setValue(this.pensionerList[0].value);
        this.isWrite = false;
      }


    })
      .catch(reason => {

      });

  }

  protected loadPageData(): void {


  }

  confirmClick(values) {
    if (!this.viewForm.valid) {
      this.markFormGroupAsTouched(this.viewForm);
      return;
    }
    const bankitem = this.bank.theGrid.dataItems.find(c => c.bankCode === values.bank);
    this._overlay = this.showOverlay();
    let name = '';
    let nationalId = '';
    let garanteeType = '0';
    this.securityService
      .getCurrentUser()
      .then(value => {
        this.hideOverlay(this._overlay);
        nationalId = value.name;
        name = value.firstName + ' ' + value.lastName;
        if (values.garanteeType) {
          const values2 = this.subdominantComponent.subForm.getRawValue();
          garanteeType = 'ضمانت ' + ' آقا/خانم ' + values2.firstName + ' ' + values2.lastName;

        } else {
          garanteeType = 'به نام خودم به عنوان وام گیرنده';
        }
        const jsonObject = {
          bank: bankitem.bankName,
          nationalId: nationalId,
          pensionerId: values.pensionerId,
          name: name,
          garanteeType: garanteeType
        };
        this.showQuestionBox('پیام سیستم', 'آیا نسبت به صحت اطلاعات وام اطمینان دارید؟', () => {
          this.agreement.show(jsonObject);

        }, () => {

        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('', this.constants.getNetworkErrorMessage());
      });


  }

  validateGuaranteeAmount() {
    const loanAmount = this.viewForm.get('loanAmount');
    const installmentCount = this.viewForm.get('installmentCount');
    const installmentAmount = this.viewForm.get('installmentAmount');
    const guaranteeAmount = this.viewForm.get('guaranteeAmount');
    this.viewForm.get('loanAmount').valueChanges
      .subscribe(amount => {
        const val = installmentCount.value * installmentAmount.value;
        guaranteeAmount.setValidators([Validators.required, Validators.min(val)]);
        guaranteeAmount.updateValueAndValidity();

      });
  }

  onAgree() {
    const values = this.viewForm.getRawValue();
    const values2 = this.subdominantComponent.subForm.getRawValue();
    const jsondata = new WageAssignmentModel();
    jsondata.bank = {bankCode: values.bank};
    jsondata.bankBranch = values.bankBranch;
    jsondata.guaranteeAmount = values.guaranteeAmount;
    jsondata.installmentCount = values.installmentCount;
    jsondata.installmentAmount = values.installmentAmount;
    jsondata.loanAmount = values.installmentAmount * values.installmentCount;
    jsondata.pensionerId = values.pensionerId;
    if (values.garanteeType) {
      jsondata.garanteeType = '1';
      jsondata.nationalId = values2.nationalId;
      jsondata.birthDate = values2.birthDate;
      jsondata.firstName = values2.firstName;
      jsondata.lastName = values2.lastName;
    } else {
      jsondata.garanteeType = '0';
    }
    this._overlay = this.showOverlay();
    this.restService.create(Urls.WAGE_ASSIGNMENT, jsondata)
      .then(resulttt => {
        this.hideOverlay(this._overlay);
        this.wageAssignmentModel = resulttt.data as WageAssignmentModel;
        if (this.wageAssignmentModel.request.status.requestCode === '0026') {
          const massage = 'گواهی کسر اقساط با شماره پیگیری ' + this.wageAssignmentModel.request.refCode + ' صادر شد. پس از دریافت پیامک حاوی کد رمز به شعبه بانک مورد نظر مراجعه نمایید.';
          this.showInfoMessageBox('پیام سیستم', massage, () => {
            this.restService
              .getBlob(Urls.WAGE_ASSIGNMENT + '/report/' + this.wageAssignmentModel.id.toString(), null)
              .then(result => {
                this.hideOverlay(this._overlay);
                const a = document.createElement('a'),
                  url = URL.createObjectURL(result);
                a.href = url;
                a.download = 'wage_assignment_' + this.getPersianDate(new Date()) + '.pdf';
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }, 0);
                this.redirectTo('/me');
              })
              .catch(reason => {
                this.hideOverlay(this._overlay);
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              });
          });
        } else {
          const massage = 'درخواست شما با کد  ' + this.wageAssignmentModel.request.refCode + ' تایید نشد. برای مشاهده جزئیات خطا از فرم در خواستهای من اقدام نمایید.';
          this.showInfoMessageBox('پیام سیستم', massage, () => {
            this.redirectTo('/me');
          });
        }
      })
      .catch(result => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', result.error.data.message);
      });

  }

  wirteClick() {
    this.isWrite = true;
  }

  selectClick() {
    this.isWrite = false;
  }
}


