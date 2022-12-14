import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetStock} from '../../../models/alo-request-det-stock';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css']
})
export class NewStockComponent extends TaminPageBaseComponent {

@Output() close = new EventEmitter<any>();
editForm: FormGroup;
private requestId: any;
private editMode: any;
private requestDetStockId: any;
private companyId: any;
private endDate: any;



  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

protected initializePage(): void {
    debugger;
  this.editForm = this.formBuilder.group({
    endDate: [''],
    shippingCharges: ['', [Validators.required]],
    inventorySupplies: ['', [Validators.required]],
    inventoryRawMaterials: ['', [Validators.required]],
    inventoryBeginningPeriod: ['', [Validators.required]],
    inventoryGoodsMade: ['', [Validators.required]],
    inventorySpareParts: ['', [Validators.required]],
    inventoryGoodsUnderCostruct: ['', [Validators.required]],
    totalSumStock: ['', [Validators.required]],
    manufacturingOrders: ['', [Validators.required]],
  });
   this.requestId = this.route.snapshot.params['requestId'];
  this.editMode = this.route.snapshot.params['editMode'];
  this.endDate = this.route.snapshot.params['endDate'];
  this.companyId = this.route.snapshot.params['companyId'];
  this.requestDetStockId = this.route.snapshot.params['stockId'];
  debugger;
  this.loadData();
}

  loadData() {
    debugger;
    if (this.editMode === '1') {
    const theUrl = `${FacUrls.STOCK_BY_ID}/` + this.requestDetStockId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetStockId = values.data.list[0].requestDetStockId;
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
    const jsondata = new AloRequestDetStock();
    jsondata.inventoryBeginningPeriod = values.inventoryBeginningPeriod;
    jsondata.inventoryGoodsMade = values.inventoryGoodsMade;
    jsondata.inventoryGoodsUnderCostruct = values.inventoryGoodsUnderCostruct;
    jsondata.inventoryRawMaterials = values.inventoryRawMaterials;
    jsondata.inventorySpareParts = values.inventorySpareParts;
    jsondata.inventorySupplies = values.inventorySupplies;
    jsondata.manufacturingOrders =  values.manufacturingOrders;
    jsondata.shippingCharges = values.shippingCharges;
   jsondata.aloRequests = new (AloRequest);
   if (this.editMode === '0' ) {
     jsondata.aloRequests.requestId = this.requestId;
   } else {
     jsondata.aloRequests.requestId =  this.requestId;
   }
   jsondata.edited = '2';
    jsondata.totalSumStock = values.totalSumStock;
    if ( this.editMode === '1') {
      jsondata.requestDetStockId = this.requestDetStockId ;
    }
    debugger;
    if (this.requestDetStockId === undefined || this.requestDetStockId === '') {
      this.restService.create(FacUrls.STOCK_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/stock/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.STOCK_EDIT, this.requestDetStockId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/stock/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/stock/' +  this.requestId);
  }

}
