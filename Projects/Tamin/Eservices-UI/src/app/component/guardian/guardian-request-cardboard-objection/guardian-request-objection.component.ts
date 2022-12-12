import {Component, Injector} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-guardian-request-objection',
  templateUrl: './guardian-request-objection.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianRequestObjectionComponent extends TaminPageBaseComponent {

  private _overlay: any;

  model: any;
  theForm: FormGroup;

  requestId: any;
  message: string;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
    /*
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.requestId = params['id'];
      } else {
        this.showErrorMessageBox('پیام سیستم', 'شماره درخواست کفالت شناسایی نشد.', () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      }
    });
    */
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      objectionMessage: ['', [Validators.required/*, /!*Validators.pattern('*{1,10}$'*!/)*/]],
    });
  }

  loadPageData() {
    if (this.activeRoute.snapshot.data.id === undefined) {
      this.showErrorMessageBox('پیام سیستم', 'شماره درخواست کفالت شناسایی نشد.', () => {
        this.redirectTo('app-request');
        setTimeout(function () {
          location.reload();
        }, 500);
      });
      return;
    }
    this.requestId = this.activeRoute.snapshot.data.id.toString();
    const lastModificationTime = this.activeRoute.snapshot.data.lastModificationTime;
    this._overlay = this.showOverlay();
    this.restService.getAll(`${Urls.GUARDIAN_REQUEST}/${this.requestId}`, )
      .then(value => {
        this.hideOverlay(this._overlay);
        this.model = value.data.list[0];
        this.message = this.model.inspectorNote;
        const reqDate = new Date(lastModificationTime);
        const expDate = new Date(reqDate.setDate(reqDate.getDate() + 90)).getTime();
        if (new Date().getTime() > expDate) {
          this.showInfoMessageBox('پیام سیستم', 'ثبت اعتراض برای این درخواست مقدور نیست. (مدت ثبت اعتراض تا سه ماه پس از ثبت نظریه بازرسی می باشد)', () => {
            this.redirectTo('/');
            setTimeout(function () {
              location.reload();
            }, 500);
          });
          return;
        }
      }).catch(error => {
      this.hideOverlay(this._overlay);
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    });
  }

  saveData() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.hideOverlay(this._overlay);
      return;
    }

    this._overlay = this.showOverlay();
    const data = this.model;

    data.status = '8';
    data.objectionMessage = this.theForm.get('objectionMessage').value;

    this.restService.update(Urls.GUARDIAN_REQUEST, this.requestId, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'اعتراض با موفقیت ثبت و ارسال شد.', () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  return() {
    this.redirectTo('/');
  }

  onBack() {
    this.redirectTo('app-request');
  }
}
