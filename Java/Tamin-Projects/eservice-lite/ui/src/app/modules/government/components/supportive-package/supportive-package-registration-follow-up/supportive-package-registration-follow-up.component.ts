import {Component, ElementRef, ViewChild} from '@angular/core';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-supportive-package-registration-follow-up',
  templateUrl: './supportive-package-registration-follow-up.component.html',
  styleUrls: ['./supportive-package-registration-follow-up.component.css']
})
export class SupportivePackageRegistrationFollowUpComponent extends TaminPageBaseComponent {
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

  get referenceId(): string {
    return this.theForm.get('referenceId').value;
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
      referenceId: ['', Validators.required],
    });
  }

  loadPageData() {
    this.getCaptcha();
  }

  send() {
    (<any>Object).values(this.theForm.controls).forEach(control => control.markAsTouched());
    if (!this.theForm.valid) {
      return;
    }

    this.overlay = this.showOverlay();
    const theUrl = `${Urls.Goverment_Supportive_Package_Registration_FollowUp}/${this.referenceId}/${this.nationalId}/${this.captchaCode}/${this.captchaId}`;
    this.restService.getAll(theUrl)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', value.data.replace('\n', '<br>'), () => {
          this.theForm.reset();
          this.getCaptcha();
        });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });


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
          // this.redirectTo('/');
        });
      });
  }

}
