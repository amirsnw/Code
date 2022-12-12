import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetResponsible} from '../../../models/alo-request-det-responsible';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetTaxLocation} from '../../../models/alo-request-det-tax-location';

@Component({
  selector: 'app-new-det-tax-location',
  templateUrl: './new-det-tax-location.component.html',
  styleUrls: ['./new-det-tax-location.component.css']
})
export class NewDetTaxLocationComponent  extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  @ViewChild('nationalityCombobBox') nationalityCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('positionCombobBox') positionCombobBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private salaryMode: any;
  private detTaxLocationId: any;
  private _subscription = new Subscription();
  provinces = [];
  cities = [];
  private provinceId: String;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      taxLocNo: [''],
      province: [''],
      city: [''],
      endDate: [''],
     });
     this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.salaryMode = this.route.snapshot.params['salaryMode'];
    this.detTaxLocationId =  this.route.snapshot.params['taxLocationId'];
    this.loadData();
    this.fillProvinceComboBox();
    this._subscription.add(this.editForm.get('province').valueChanges.subscribe(value => {
      debugger;
      if (value) {
        this.fillCityComboBox();
      } else {
        this.cities = [];
      }
    }));
    }

  loadData() {
    debugger;
    if (this.editMode === '1' ) {
      const theUrl = `${FacUrls.TAX_LOCATIONS_BY_ID}/` + this.detTaxLocationId;
      this.restService.getAll(theUrl)
        .then(values => {
          debugger;
          if (values.data && this.editMode === '1') {
            this.editForm.patchValue(values.data.list[0]);
          }
        })
        .catch(error => {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }
  }
  fillProvinceComboBox() {
    const theUrl = `${FacUrls.PROVINCE_PAGING}`;
    this.restService.getAll(theUrl)
      .then(data => {
        (data.data.list as Array<any>).forEach((item) => {
          this.provinces.push({
            name:  item.provinceName,
            value: item.provinceCode
          });
        });
      })
      .catch(reason => {
      });
  }
  fillCityComboBox() {
    debugger;
    if (this.editForm.controls.province !== null && this.editForm.get('province').value !== null) {
      this.provinceId =  this.editForm.get('province').value.toString();
      const theUrl = `${FacUrls.CITY}/` +  this.provinceId;
      this.restService.getAll(theUrl)
        .then(data => {
          (data.data.list as Array<any>).forEach((item) => {
            this.cities.push({
              name:  item.cityName ,
              value: item.cityCode
            });
          });
        })
        .catch(reason => {
        });
    }
    }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetTaxLocation();
    // jsondata.nationality = '1';
    jsondata.endDate = values.endDate;
    jsondata.taxLocCity = values.taxLocCity;
    jsondata.taxLocNo = values.taxLocNo;
    jsondata.taxLocProvince = values.taxLocProvince;
    if (this.salaryMode === '1') {
      jsondata.taxType =  '1';
    } else {
      jsondata.taxType =  '2';
    }
    jsondata.requests = new (AloRequest);
    jsondata.requests.requestId = this.requestId;
    if ( this.editMode === '1') {
      jsondata.detTaxLocationId = this.detTaxLocationId ;
    } else {
      jsondata.detTaxLocationId = undefined;
    }
    debugger;
    if (jsondata.detTaxLocationId === undefined ) {
      this.restService.create(FacUrls.TAX_LOCATIONS_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/detTaxLocation/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.RESPONSIBLE_EDIT, this.detTaxLocationId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/detTaxLocation/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/detTaxLocation/' +  this.requestId);
  }
}
