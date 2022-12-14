import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetConContra} from '../../../models/alo-request-det-con-contra';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetIncomeCont} from '../../../models/alo-request-det-income-cont';

@Component({
  selector: 'app-new-income-cont',
  templateUrl: './new-income-cont.component.html',
  styleUrls: ['./new-income-cont.component.css']
})
export class NewIncomeContComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('dataGrid') dataGrid: TaminDataGridComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetIncomeContId: any;
  private branches = [];


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetFinanCostId: [''],
      aloRequests: [''],
      companyAccountPeriod: [''],
      branch: ['', [Validators.required]],
      workshopId: ['', [Validators.required]],
      treatyRow: ['', [Validators.required]],
      contractNumber: ['', [Validators.required]],
      contractDate: ['', [Validators.required]],
      contractor: ['', [Validators.required]],
      contractSubject: ['', [Validators.required]],
      contractStartDate: ['', [Validators.required]],
      contractEndDate: ['', [Validators.required]],
      initialAmountContract: ['', [Validators.required]],
      amountFunction: ['', [Validators.required]],
      totalApprovedFunction: ['', [Validators.required]],
      insuranceDeposit: ['', [Validators.required]],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.requestDetIncomeContId = this.route.snapshot.params['conContraId'];
    debugger;
    this.loadData();
    }

  loadData() {
    debugger;
    if (this.editMode === '1') {
      const theUrl = `${FacUrls.INCOME_CONT}/` + this.requestId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          if (values.data ) {
            this.editForm.patchValue(values.data.list[0]);
            this.requestDetIncomeContId = values.data.list[0].requestDetIncomeContId;
            this.editForm.get('branch').setValue(values.data.list[0].branches.brhCode);
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
    const jsondata = new AloRequestDetIncomeCont();
    jsondata.differencesFieldsDesc = values.differencesFieldsDesc;
    jsondata.contractNumber = values.contractNumber;
    jsondata.contractDate = values.contractDate;
    jsondata.contractSubject =  values.contractSubject;
    jsondata.initialAmountContract =  values.initialAmountContract;
    jsondata.isOk =  values.isOk;
    jsondata.contractStartDate = values.contractStartDate;
    jsondata.contractEndDate = values.contractEndDate;
    jsondata.amountFunction = values.amountFunction;
    jsondata.refinedNumber = values.refinedNumber;
    jsondata.refinedDate =  values.refinedDate;
    jsondata.refinedFunction =  values.refinedFunction;
    jsondata.refinedSeries =  values.refinedSeries;
    jsondata.confirm =  values.confirm;
    jsondata.differencesFieldsDesc =  values.differencesFieldsDesc;
    jsondata.aloRequests = new (AloRequest);
    jsondata.aloRequests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.requestDetIncomeContId = this.requestDetIncomeContId ;
    }
    debugger;
    if (this.requestDetIncomeContId === undefined || this.requestDetIncomeContId === '') {
      this.restService.create(FacUrls.INCOME_CONT_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/incomeCont/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.INCOME_CONT_EDIT, this.requestDetIncomeContId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/incomeCont/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }
   back() {
    this.redirectTo('/fac/conContra/' +  this.requestId);
  }

}
