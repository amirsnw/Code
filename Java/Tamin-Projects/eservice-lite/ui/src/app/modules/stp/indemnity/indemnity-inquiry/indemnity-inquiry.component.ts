import {Component} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-indemnity-inquiry',
  templateUrl: './indemnity-inquiry.component.html',
  styleUrls: ['./indemnity-inquiry.component.css']
})
export class IndemnityInquiryComponent extends TaminPageBaseComponent {

  private _overlay: any;
  marriageStatus = [
    {name: 'متاهل', value: '2'},
    {name: 'مجرد', value: '1'}
  ];
  theForm: FormGroup;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      marriageStatus: ['', Validators.required],
      indemnitySum: [''],
      indemnityAmount: [''],
    });
  }

  calculate() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const startDate = new Date(this.theForm.get('startDate').value).getTime();
    const endDate = new Date(this.theForm.get('endDate').value).getTime();
    const marriageStatus = this.theForm.get('marriageStatus').value;

    if (startDate > endDate) {
      this.showErrorMessageBox('پیام سیستم', 'تاریخ پایان استراحت می بایست بزرگتر از تاریخ شروع استراحت باشد.');
      return;
    }

    const theUrl = `${StpUrls.STP_NEW_INDEMNITY_INQUIRY}/${startDate}/${endDate}/${marriageStatus}`;
    this._overlay = this.showOverlay();
    this.restService
      .getAll(theUrl)
      .then(value => {
        this.hideOverlay(this._overlay);
        if (value.data[1] == null || value.data[1] == '') {
          this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(value.data[0]));
        } else {
          const persianNumberPipe = new PersianNumberPipe();
          this.theForm.get('indemnitySum').setValue(persianNumberPipe.transform(value.data[0], 'cs'));
          this.theForm.get('indemnityAmount').setValue(persianNumberPipe.transform(value.data[1], 'cs'));
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });

  }
}
