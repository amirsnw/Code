import {Component, Injector} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DataColumnViewType, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-specific-person-add',
  templateUrl: './sso-specific-person-add.component.html',
  styleUrls: ['./sso-specific-person-add.component.css']
})
export class SsoSpecificPersonAddComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  private _overlay: any;
  private router: ActivatedRoute;
  firstName: any;
  lastName: any;
  //
  // constructor(injector: Injector) {
  //   super(injector);
  //   this.router = injector.get(ActivatedRoute);
  // }
  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  initializePage() {
    this.createForm();
    // this.markFormGroupAsTouched(this.editForm);
  }

  private createForm() {
    this.theForm = this.formBuilder.group({
      lastName: [''],
      firstName: [''],
      startDate: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.maxLength(10), TaminValidators.nationalId]],
    });
  }

  saveData() {
    debugger;
    const values = this.theForm.getRawValue();
    if (!this.theForm.valid) {
      this.showErrorMessageBox('پیام سیستم', 'فیلد های الزامی را پر کنید');
      return;
    }
    const data = {
      nationalId: values.nationalId,
      startDate: values.startDate
    };
    this._overlay = this.showOverlay();
    this.restService
      .create(Urls.ExceptionPersonal, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با موفقیت ذخیره شد', () => {
          this.redirectTo('/sso/sso-specific-person');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason && reason.error && reason.error.data && reason.error.data.message !== '') {
          this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  search() {
    debugger;
    const values = this.theForm.getRawValue();
    const theUrl = Urls.ExceptionPersonal + '/' + values.nationalId;
    this._overlay = this.showOverlay();
    this.restService
      .getAll(theUrl)
      .then(value1 => {
        if (value1.data) {
          this.hideOverlay(this._overlay);
          const data1 = {
            firstName: value1.data.firstName,
            lastName: value1.data.lastName
          };
          this.theForm.patchValue(data1);
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason && reason.error && reason.error.data && reason.error.data.message !== '') {
          this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

}
