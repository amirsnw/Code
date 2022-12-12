import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetReserves} from '../../../models/reserves';
import {CompanyAccountPeriod} from '../../../models/company-account-period';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetFixAsset} from '../../../models/alo-request-det-fix-asset';

@Component({
  selector: 'app-new-fixed-assets',
  templateUrl: './new-fixed-assets.component.html',
  styleUrls: ['./new-fixed-assets.component.css']
})
export class NewFixedAssetsComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetFixAssetId: any;
  // @ViewChild('assetTypesComboBox') assetTypesComboBox: TaminFieldComboBoxStaticComponent;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      requestDetFixAssetId: [''],
      ground: ['', Validators.required],
      building: ['', Validators.required],
      facility: ['', Validators.required],
      machinery: ['', Validators.required],
      tempates: ['', Validators.required],
      totalSumReserves: ['', Validators.required],
      companyAccountPeriod: [''],
      requests: [''],
      edited: [''],
      endDate: [''],
      vehicles: ['', Validators.required],
      upholstery: ['', Validators.required],
      assetInFlow: ['', Validators.required],
      mashinAlat: ['', Validators.required],
      assetTypesId: ['', Validators.required],
    });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    // this.assetTypesComboBox.dataItems = [
    //   {
    //     name: 'اول دوره',
    //     value: '1'
    //   },
    //   {
    //     name:  'افزایش یا کاهش',
    //     value: '2'
    //   },
    //   {
    //     name: 'پایان دوره',
    //     value: '3'
    //   },
    //  ];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.FIX_ASSERT}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.requestDetFixAssetId = values.data.list[0].requestDetFixAssetId;
          this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
          this.editForm.get('assetTypesId').setValue(values.data.list[0].assetTypeTitle);

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
    const jsondata = new AloRequestDetFixAsset();
    jsondata.ground = values.ground;
    jsondata.building = values.building;
    jsondata.facility = values.saveAudit;
    jsondata.machinery = values.machinery;
    jsondata.tempates = values.tempates;
    jsondata.vehicles = values.vehicles;
    jsondata.upholstery = values.upholstery;
    jsondata.assetInFlow = values.assetInFlow;
    jsondata.mashinAlat = values.mashinAlat;
    jsondata.companyAccountPeriod =  new (CompanyAccountPeriod);
    jsondata.companyAccountPeriod.companyAccountPeriodId = values.companyAccountPeriod.companyAccountPeriodId;
    jsondata.requests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requests.requestId = this.requestId;
    } else {
      jsondata.requests.requestId =  this.requestId;
    }
    if ( this.editMode === '1') {
      jsondata.requestDetFixAssetId = this.requestDetFixAssetId ;
    }
    debugger;
    if (this.requestDetFixAssetId === undefined || this.requestDetFixAssetId === '') {
      this.restService.create(FacUrls.FIX_ASSERT_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/fixedAssets/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.FIX_ASSERT_EDIT, this.requestDetFixAssetId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/fixedAssets/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/fixedAssets/' +  this.requestId);
  }

}
