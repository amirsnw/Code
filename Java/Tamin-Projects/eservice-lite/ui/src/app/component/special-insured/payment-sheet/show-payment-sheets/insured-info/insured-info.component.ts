import {Component} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';
import {reject, resolve} from 'q';

declare var alertify: any;

@Component({
  selector: 'app-insured-info',
  templateUrl: './insured-info.component.html',
  styleUrls: ['./insured-info.component.css']
})
export class InsuredInfoComponent extends TaminPageBaseComponent {

  showInfoForm: FormGroup;
  private _overlay: any;

  protected initializePage(): void {
    this.showInfoForm = this.formBuilder.group({
      nationalCode: [''],
      insuranceNumber: [''],
      firstName: [''],
      lastName: ['']
    });
    this.loadInsuredInfo();
  }

  loadInsuredInfo() {
    const me = this;
    this.restService.getAll(Urls.getPersonalInfo)
      .then(value => {
        this.hideOverlay(this._overlay);
        if (value === undefined || value === null || value.data === undefined || value.data === null) {
          me.showInfoForm.get('nationalCode').setValue(null);
          me.showInfoForm.get('insuranceNumber').setValue(null);
          me.showInfoForm.get('firstName').setValue(null);
          me.showInfoForm.get('lastName').setValue(null);
          alertify.alert('پیام سیستم', 'کاربر گرامی، بیمه شده ای با کد ملی فوق ثبت نشده است.');
          reject(false);
        } else {
          resolve(true);
          me.showInfoForm.get('nationalCode').setValue(value.data.personal.nationalId);
          me.showInfoForm.get('insuranceNumber').setValue(value.data.insuranceId);
          me.showInfoForm.get('firstName').setValue(value.data.personal.firstName);
          me.showInfoForm.get('lastName').setValue(value.data.personal.lastName);
        }
      }).catch(error => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', error.error.data.message);
    });
  }

}
