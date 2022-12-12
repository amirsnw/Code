import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetFinanCost} from '../../../models/alo-request-det-finan-cost';

@Component({
  selector: 'app-new-finan-cost',
  templateUrl: './new-finan-cost.component.html',
  styleUrls: ['./new-finan-cost.component.css']
})
export class NewFinanCostComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetFinanCostId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetFinanCostId: [''],
      aloRequests: [''],
      companyAccountPeriod: [''],
      auditCost: ['', [Validators.required]],
      inspectionFee: ['', [Validators.required]],
      bankingFee: ['', [Validators.required]],
      nonBankFee: ['', [Validators.required]],
      brokerCost: ['', [Validators.required]],
      financialAdvice: ['', [Validators.required]],
      attorneyFee: ['', [Validators.required]],
      otherFinancialExpernses: ['', [Validators.required]],
      totalSumFinanCost: ['', [Validators.required]],
      edited: [''],
      endDate: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.FINAN_COST}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetFinanCostId = values.data.list[0].requestDetFinanCostId;
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
    const jsondata = new AloRequestDetFinanCost();
    jsondata.auditCost = values.auditCost;
    jsondata.inspectionFee = values.inspectionFee;
    jsondata.bankingFee = values.bankingFee;
    jsondata.nonBankFee = values.nonBankFee;
    jsondata.brokerCost = values.brokerCost;
    jsondata.financialAdvice = values.financialAdvice;
    jsondata.attorneyFee =  values.attorneyFee;
    jsondata.otherFinancialExpernses =  values.otherFinancialExpernses;
    jsondata.totalSumFinanCost =  values.totalSumFinanCost;
    jsondata.edited =  values.edited;
    jsondata.aloRequests = new (AloRequest);
    jsondata.aloRequests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.requestDetFinanCostId = this.requestDetFinanCostId ;
    }
    debugger;
    if (this.requestDetFinanCostId === undefined || this.requestDetFinanCostId === '') {
      this.restService.create(FacUrls.FINAN_COST_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/finanCost/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.FINAN_COST_EDIT, this.requestDetFinanCostId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/finanCost/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/finanCost/' +  this.requestId);
  }

}
