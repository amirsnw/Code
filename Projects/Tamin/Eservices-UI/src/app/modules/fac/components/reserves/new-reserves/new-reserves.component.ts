import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetReserves} from '../../../models/reserves';
import {CompanyAccountPeriod} from '../../../models/company-account-period';

@Component({
  selector: 'app-new-reserves',
  templateUrl: './new-reserves.component.html',
  styleUrls: ['./new-reserves.component.css']
})
export class NewReservesComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
 editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetReservesId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetReservesId: [''],
      saveSalary: ['', Validators.required],
      saveBenefitServiceTerminat: ['', Validators.required],
      companyAccountPeriod: [''],
      savePaidLeave: ['', Validators.required],
      saveAudit: ['', Validators.required],
      otherSave: ['', Validators.required],
      totalSumReserves: ['', Validators.required],
      requests: [''],
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
    const theUrl = `${FacUrls.RESERVES}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetReservesId = values.data.list[0].requestDetReservesId;
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
    const jsondata = new AloRequestDetReserves();
    jsondata.saveSalary = values.saveSalary;
    jsondata.saveBenefitServiceTerminat = values.saveBenefitServiceTerminat;
    jsondata.savePaidLeave = values.savePaidLeave;
    jsondata.saveAudit = values.saveAudit;
    jsondata.otherSave = values.otherSave;
    jsondata.totalSumReserves = values.totalSumReserves;
    jsondata.edited =  values.edited;
    jsondata.companyAccountPeriod = new (CompanyAccountPeriod);
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriod.companyAccountPeriodId;
    jsondata.requests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requests.requestId = this.requestId;
    } else {
      jsondata.requests.requestId =  this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetReservesId = this.requestDetReservesId ;
    }
    debugger;
    if (this.requestDetReservesId === undefined || this.requestDetReservesId === '') {
      this.restService.create(FacUrls.RESERVES_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/reserves/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.RESERVES_EDIT, this.requestDetReservesId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/reserves/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/reserves/' +  this.requestId);
  }

}
