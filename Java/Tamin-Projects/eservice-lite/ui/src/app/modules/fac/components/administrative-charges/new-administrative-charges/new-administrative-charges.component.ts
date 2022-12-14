import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetContractAcc} from '../../../models/alo-request-det-contract-acc';
import {CompanyAccountPeriod} from '../../../models/company-account-period';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetOfficial} from '../../../models/alo-request-det-official';

@Component({
  selector: 'app-new-administrative-charges',
  templateUrl: './new-administrative-charges.component.html',
  styleUrls: ['./new-administrative-charges.component.css']
})
export class NewAdministrativeChargesComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('positionComboBox') positionComboBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('nationalityComboBox') nationalityComboBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private officialId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      endDate: [''],
      lunch: ['', [Validators.required]],
      rent: ['', [Validators.required]],
      installation: ['', [Validators.required]],
      officialId: [''],
      wntAndComming: ['', [Validators.required]],
      postAndTel: ['', [Validators.required]],
      requestId: [''],
      companyAccountPeriodId: [''],
      waterAndElectricity: ['', [Validators.required]],
      others: ['', [Validators.required]],
      totalSum: [''],
      repairs: ['', [Validators.required]],
    });
     this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    if ( this.editMode === '1') {
    const theUrl = `${FacUrls.OFFICIAL}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data ) {
          this.editForm.patchValue(values.data.list[0]);
          this.officialId = values.data.list[0].officialId;
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
    const jsondata = new AloRequestDetOfficial();
    jsondata.wntAndComming = values.wntAndComming;
    jsondata.lunch = values.lunch;
    jsondata.rent = values.rent;
    jsondata.postAndTel = values.postAndTel;
    jsondata.waterAndElectricity = values.waterAndElectricity;
    jsondata.others = values.others;
    jsondata.totalSum = values.totalSum;
    jsondata.installation = values.installation;
    jsondata.repairs = values.repairs;
    jsondata.edited = values.edited;
    jsondata.companyAccountPeriod = new CompanyAccountPeriod();
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriodId;
    jsondata.requestId = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requestId.requestId = this.requestId;
    } else {
      jsondata.requestId.requestId =  this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.officialId = this.officialId ;
    }
    debugger;
    if (this.officialId === undefined || this.officialId === '') {
      this.restService.create(FacUrls.OFFICIAL_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/administrativeCharges/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.OFFICIAL_EDIT, this.officialId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/administrativeCharges/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/administrativeCharges/' +  this.requestId);
  }

}
