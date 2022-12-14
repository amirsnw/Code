import {Component, ViewChild} from '@angular/core';
import {TaminModalComponent, TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-portal-registration-pursue',
  templateUrl: './portal-registration-pursue.component.html',
  styleUrls: ['./portal-registration-pursue.component.css']
})
export class PortalRegistrationPursueComponent extends TaminPageBaseComponent {

  @ViewChild('theModal') theModal: TaminModalComponent;
  theForm: FormGroup;
  status: number;
  private _overlay: any;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, TaminValidators.nationalId]],
      mobile: ['', [Validators.required, Validators.minLength(11)]]
    });
  }

  onPursue() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }
    this._overlay = this.showOverlay();
    this.restService
      .getAll(Urls.RegistrationPursue + '/' + this.theForm.get('nationalCode').value + '/' + this.theForm.get('mobile').value)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.status = Number(value.data);
        this.theModal.show();
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });


  }
}
