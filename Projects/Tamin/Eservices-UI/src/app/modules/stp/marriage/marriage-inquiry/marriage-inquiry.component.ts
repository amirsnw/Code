import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-marriage-inquiry',
  templateUrl: './marriage-inquiry.component.html',
  styleUrls: ['./marriage-inquiry.component.css']
})
export class MarriageInquiryComponent extends TaminPageBaseComponent{

   theForm: FormGroup;
  private _overlay: any;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      marriageDate: ['', Validators.required],
           marriageSum: [''],
                marriageAmount: [''],
    });
  }

  calculate() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const marriageDate = new Date(this.theForm.get('marriageDate').value).getTime();

    const theUrl = `${StpUrls.STP_NEW_MARRIAGE_INQUIRY}/${marriageDate}`;
    this._overlay = this.showOverlay();
    this.restService
      .getAll(theUrl)
      .then(value => {
        this.hideOverlay(this._overlay);
     if(value.data[1]== null || value.data[1]== ""){
        this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(value.data[0]));
     }
     else
     {
    const persianNumberPipe = new PersianNumberPipe();
    this.theForm.get('marriageSum').setValue(persianNumberPipe.transform(value.data[0], 'cs'));
     this.theForm.get('marriageAmount').setValue(persianNumberPipe.transform(value.data[1], 'cs'));
     }

      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });

  }

}
