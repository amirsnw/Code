import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {CombinedListComponent} from '../../../../component/history/combined/combined-list/combined-list.component';
import {FormGroup, Validators} from '@angular/forms';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-marriage-history-calc',
  templateUrl: './marriage-history-calc.component.html',
  styleUrls: ['./marriage-history-calc.component.css']
})
export class MarriageHistoryCalcComponent extends TaminPageBaseComponent {
  staticDataForm: FormGroup;
  @ViewChild('combinedList') combinedList: CombinedListComponent;
  private _overlay: any;

  protected initializePage(): void {
    this.staticDataForm = this.formBuilder.group({
      weddingDateTimeStamp: ['', Validators.required]
    });
  }

  calculate() {
    if (this.staticDataForm.valid) {
      this._overlay = this.showOverlay();
      const theUrl = StpUrls.STP_Verify_Marriage + '/' + new Date(this.staticDataForm.get('weddingDateTimeStamp').value).getTime().toString();
      this.restService.getAll(theUrl)
        .then(value => {
          this.hideOverlay(this._overlay);
          let message = '';
          switch (value.data.toString()) {
            case '0' :
              message = 'با توجه به شرایط ماده 85 تامین اجتماعی، ظرف پنج سال قبل از تاریخ عقد فاقد 720 روز سابقه اجباری می باشید و پرداخت هدیه ازدواج میسر نمی باشد.';
              this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message));
              break;
            case '1' :
              message = 'شما حائز شرایط ماده 85 تامین اجتماعی می باشید و پرداخت هدیه ازدواج میسر می باشد.';
              this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message), () => {
                // this.redirectTo('stp_old/marriage');
              });
              break;
            case '2' :
              message = 'با توجه به شرایط ماده 85 تامین اجتماعی، در تاریخ وقوع عقد حق بیمه پرداخت نگردیده و تا زمان وصول حق بیمه، پرداخت هدیه ازدواج میسر نمی باشد.';
              this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message));
              break;
          }
          // this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message));
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          if (reason.error.data && reason.error.data.message) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }
        });
    }
  }

  protected loadPageData(): void {
  }
}
