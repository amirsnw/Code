import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {PersianNumberPipe, TaminPageBaseComponent} from 'tamin-framework';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-pregnancy-inquiry',
  templateUrl: './pregnancy-inquiry.component.html',
  styleUrls: ['./pregnancy-inquiry.component.css']
})
export class PregnancyInquiryComponent extends TaminPageBaseComponent {
   theForm: FormGroup;
  private _overlay: any;

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
         pregnancySum: [''],
                pregnancyAmount: [''],
    });
  }

  protected loadPageData(): void {
    this.checkGender();
  }

  calculate() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const startDate = new Date(this.theForm.get('startDate').value).getTime();
    const endDate = new Date(this.theForm.get('endDate').value).getTime();

    if (startDate > endDate) {
      this.showErrorMessageBox('پیام سیستم', 'تاریخ پایان استراحت می بایست بزرگتر از تاریخ شروع استراحت باشد.');
      return;
    }

    const theUrl = `${StpUrls.STP_NEW_PREGNANCY_INQUIRY}/${startDate}/${endDate}`;

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
    this.theForm.get('pregnancySum').setValue(persianNumberPipe.transform(value.data[0], 'cs'));
     this.theForm.get('pregnancyAmount').setValue(persianNumberPipe.transform(value.data[1], 'cs'));
     }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  checkGender() {
    this.securityService.getCurrentUser()
      .then(value => {
        if (value.gender === 'm') {
          this.showErrorMessageBox('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید', () => {
            this.redirectTo('stp');
          });
        }
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('stp');
        });
      });
  }


}
