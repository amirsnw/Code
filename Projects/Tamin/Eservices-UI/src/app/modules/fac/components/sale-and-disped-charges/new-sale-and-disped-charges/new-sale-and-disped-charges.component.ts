import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetDisSalCos} from '../../../models/alo-request-det-dis-sal-cos';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-sale-and-disped-charges',
  templateUrl: './new-sale-and-disped-charges.component.html',
  styleUrls: ['./new-sale-and-disped-charges.component.css']
})
export class NewSaleAndDispedChargesComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetDisSalCosId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetDisSalCosId: [''],
      advertisingCost: ['', Validators.required],
      marketingCommission: ['', Validators.required],
      inventory: ['', Validators.required],
      packing: ['', Validators.required],
      advancePayment: ['', Validators.required],
      leaseWarehouse: ['', Validators.required],
      requests: [''],
      keepingGoods: ['', Validators.required],
      carriageFares: ['', Validators.required],
      totalSumDisSalCost: ['', Validators.required],
      companyAccountPeriod: [''],
      endDate: [''],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
   debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.DIS_SAL_COST}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetDisSalCosId = values.data.list[0].requestDetDisSalCosId;
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
    const jsondata = new AloRequestDetDisSalCos();
    jsondata.advertisingCost = values.advertisingCost;
    jsondata.marketingCommission = values.marketingCommission;
    jsondata.inventory = values.inventory;
    jsondata.packing = values.packing;
    jsondata.advancePayment = values.advancePayment;
    jsondata.leaseWarehouse = values.leaseWarehouse;
    jsondata.keepingGoods =  values.keepingGoods;
    jsondata.carriageFares =  values.carriageFares;
    jsondata.totalSumDisSalCost =  values.totalSumDisSalCost;
    jsondata.companyAccountPeriod = new (CompanyAccountPeriod);
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriod.companyAccountPeriodId;
    jsondata.requests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requests.requestId = this.requestId;
    } else {
      jsondata.requests.requestId =  this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetDisSalCosId = this.requestDetDisSalCosId ;
    }
    debugger;
    if (this.requestDetDisSalCosId === undefined || this.requestDetDisSalCosId === '') {
      this.restService.create(FacUrls.DIS_SAL_COST_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/saleAndDispedCharges/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.DIS_SAL_COST_EDIT, this.requestDetDisSalCosId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/saleAndDispedCharges/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/saleAndDispedCharges/' +  this.requestId);
  }

}
