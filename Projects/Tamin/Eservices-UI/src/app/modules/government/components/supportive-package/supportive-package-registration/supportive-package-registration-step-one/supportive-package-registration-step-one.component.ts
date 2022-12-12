import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-supportive-package-registration-step-one',
  templateUrl: './supportive-package-registration-step-one.component.html',
  styleUrls: ['./supportive-package-registration-step-one.component.css']
})

export class SupportivePackageRegistrationStepOneComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  captcha: any;
  hasError: boolean;
  loading: boolean;
  @ViewChild('captchaImage') captchaImage: ElementRef;
  private overlay: any;
  private _captchaId: any;


  get nationalId(): string {
    return this.theForm.get('nationalId').value;
  }

  get captchaCode(): string {
    return this.theForm.get('captchaCode').value;
  }

  get captchaId(): string {
    return this._captchaId;
  }

  initializePage() {
    this.hasError = false;
    this.loading = false;
    this.theForm = this.formBuilder.group({
      nationalId: ['', [Validators.required, TaminValidators.nationalId]],
      captchaCode: ['', Validators.required],
    });
  }

  loadPageData() {
    this.getCaptcha();
  }

  isValidToGoStepTwo() {
    (<any>Object).values(this.theForm.controls).forEach(control => control.markAsTouched());
    return this.theForm.valid;
  }


  getCaptcha() {
    if (this.loading) {
      return;
    }
    this.captcha = null;
    this._captchaId = '';
    this.loading = true;
    this.overlay = this.showOverlay(this.captchaImage.nativeElement);
    this.restService.getAll(Urls.Goverment_Supportive_Package_Registration_Captcha)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.loading = false;
        value.data.image = 'data:image/png;base64,' + value.data.image;
        this._captchaId = value.data.id;
        this.captcha = value.data;
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.loading = false;
        this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.getCaptcha();
        }, () => {
          this.redirectTo('/');
        });
      });
  }
}
