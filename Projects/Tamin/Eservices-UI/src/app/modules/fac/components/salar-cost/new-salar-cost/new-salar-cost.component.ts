import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetSalarCost} from '../../../models/alo-request-det-salar-cost';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-salar-cost',
  templateUrl: './new-salar-cost.component.html',
  styleUrls: ['./new-salar-cost.component.css']
})
export class NewSalarCostComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
 editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetSalarCostId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetSalarCostId: [''],
      yearsOld: [''],
      salaryOtherFunds: ['', Validators.required],
      endDate: [''],
      salaryBenefitOfficeStaff: ['', Validators.required],
      salaryBenefitFactoryStaff: ['', Validators.required],
      dueEmployerShare: ['', Validators.required],
      dueMission: ['', Validators.required],
      requestId: [''],
      reward: [''],
      totalSumSalarCost: ['', Validators.required],
      bonuses: ['', Validators.required],
      edited: [''],
      companyAccountPeriod: [''],
       aloRequests: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.SALAR_COST}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetSalarCostId = values.data.list[0].requestDetSalarCostId;
          this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetSalarCost();
    jsondata.requestDetSalarCostId = values.nationality;
    jsondata.salaryBenefitOfficeStaff = values.salaryBenefitOfficeStaff;
    jsondata.salaryBenefitFactoryStaff = values.salaryBenefitFactoryStaff;
    jsondata.dueEmployerShare = values.dueEmployerShare;
    jsondata.salaryOtherFunds = values.salaryOtherFunds;
    jsondata.dueMission = values.dueMission;
    jsondata.reward =  values.reward;
    jsondata.bonuses =  values.bonuses;
    jsondata.totalSumSalarCost =  values.totalSumSalarCost;
    jsondata.edited =  values.edited;
    jsondata.companyAccountPeriod =  new (CompanyAccountPeriod);
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriod.companyAccountPeriodId;
    jsondata.aloRequests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.aloRequests.requestId = this.requestId;
    } else {
      jsondata.aloRequests.requestId = this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetSalarCostId = this.requestDetSalarCostId ;
    }
    debugger;
    if (this.requestDetSalarCostId === undefined || this.requestDetSalarCostId === '') {
      this.restService.create(FacUrls.SALAR_COST_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/salarCost/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.SALAR_COST_EDIT, this.requestDetSalarCostId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/salarCost/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/salarCost/' +  this.requestId);
  }

}
