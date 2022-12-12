import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetPrepayDepo} from '../../../models/alo-request-det-prepay-depo';

@Component({
  selector: 'app-new-prepay-and-deposit',
  templateUrl: './new-prepay-and-deposit.component.html',
  styleUrls: ['./new-prepay-and-deposit.component.css']
})
export class NewPrepayAndDepositComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('positionComboBox') positionComboBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('nationalityComboBox') nationalityComboBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetPrepayDepoId: any;
  private companyId: any;
  private endDate: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    // debugger;
    this.editForm = this.formBuilder.group({
      requestDetPrepayDepoId: [''],
      prepaidInsurance: ['', [Validators.required]],
      prepaidTaxes: ['', [Validators.required]],
      prepaidServices: ['', [Validators.required]],
      prepaidContracts: ['', [Validators.required]],
      depositsGoodPerformance: ['', [Validators.required]],
     leaseDeposit: ['', [Validators.required]],
    insuranceDeposit: ['', [Validators.required]],
    otherDeposits: ['', [Validators.required]],
      aloRequests: [''],
      endDate: [''],
    prepaymentBuyingGoods: ['', [Validators.required]],
     });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.endDate = this.route.snapshot.params['endDate'];
    this.companyId = this.route.snapshot.params['companyId'];
    // debugger;
    this.loadData();
  }

  loadData() {
    // debugger;
    const theUrl = `${FacUrls.PREPAY_DEPO}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        // debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetPrepayDepoId = values.data.list[0].requestDetPrepayDepoId;
          this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
    onSave(values) {
    // debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetPrepayDepo();
    jsondata.prepaidTaxes = values.prepaidTaxes;
    jsondata.prepaidInsurance = values.prepaidInsurance;
    jsondata.prepaidInsurance = values.prepaidInsurance;
    jsondata.prepaymentBuyingGoods = values.prepaymentBuyingGoods;
    jsondata.prepaidServices = values.prepaidServices;
    jsondata.prepaidContracts = values.prepaidContracts;
    jsondata.depositsGoodPerformance =  values.depositsGoodPerformance;
    jsondata.insuranceDeposit =  values.insuranceDeposit;
    jsondata.leaseDeposit =  values.leaseDeposit;
    jsondata.otherDeposits =  values.otherDeposits;
      jsondata.edited =  values.edited;
    jsondata.aloRequests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.aloRequests.requestId = this.requestId;
    } else {
      jsondata.aloRequests.requestId = this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetPrepayDepoId = this.requestDetPrepayDepoId ;
    }
    // debugger;
    if (this.requestDetPrepayDepoId === undefined || this.requestDetPrepayDepoId === '') {
      this.restService.create(FacUrls.PREPAY_DEPO_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            // debugger;
            this.close.emit();
            this.redirectTo('/fac/prepayAndDeposit/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.PREPAY_DEPO_EDIT, this.requestDetPrepayDepoId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            // debugger;
            this.close.emit();
            this.redirectTo('/fac/prepayAndDeposit/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/prepayAndDeposit/' +  this.requestId);
  }

}
