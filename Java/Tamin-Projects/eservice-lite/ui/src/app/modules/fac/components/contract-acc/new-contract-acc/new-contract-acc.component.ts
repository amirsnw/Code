import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetContractAcc} from '../../../models/alo-request-det-contract-acc';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-contract-acc',
  templateUrl: './new-contract-acc.component.html',
  styleUrls: ['./new-contract-acc.component.css']
})
export class NewContractAccComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetContractAccId: any;
  private companyId: any;
  private endDate: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetContractAccId: [''],
      edited: [''],
      contractRelatedPremium: ['', [Validators.required]],
      totalDepositsDeductions: ['', [Validators.required]],
      requestId: [''],
      companyAccountPeriodId: [''],
      contractRevenue: ['', [Validators.required]],
      finishedGoodsPrice: ['', [Validators.required]],
      grossProfitsLosses: ['', [Validators.required]],
      endDate: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.endDate = this.route.snapshot.params['endDate'];
    this.companyId = this.route.snapshot.params['companyId'];
    this.requestDetContractAccId = this.route.snapshot.params['contractAccId'];

    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    if (this.editMode === '1') {
    const theUrl = `${FacUrls.CONTRACT_ACC_BY_ID}/` + this.requestDetContractAccId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetContractAccId = values.data.list[0].requestDetContractAccId;
          this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetContractAcc();
    jsondata.contractRevenue = values.contractRevenue;
    jsondata.finishedGoodsPrice = values.finishedGoodsPrice;
    jsondata.grossProfitsLosses = values.grossProfitsLosses;
    jsondata.totalDepositsDeductions = values.totalDepositsDeductions;
    jsondata.contractRelatedPremium = values.contractRelatedPremium;
    jsondata.edited = values.edited;
    jsondata.companyAccountPeriod = new CompanyAccountPeriod();
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriodId;
    jsondata.requestId = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requestId.requestId = this.requestId;
    } else {
      jsondata.requestId.requestId = this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetContractAccId = this.requestDetContractAccId ;
    }
    debugger;
    if (this.requestDetContractAccId === undefined || this.requestDetContractAccId === '') {
      this.restService.create(FacUrls.CONTRACT_ACC_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/contractAcc/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.CONTRACT_ACC_EDIT, this.requestDetContractAccId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/contractAcc/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/contractAcc/' +  this.requestId);
  }

}
