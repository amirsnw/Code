import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';

import * as momentNs from 'jalali-moment';

const moment = momentNs;

@Component({
  selector: 'app-announcement-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('toDateCombobBox') toDateCombobBox: TaminFieldComboBoxStaticComponent;
  @Output() dataChanged: EventEmitter<void> = new EventEmitter();
  removeable = false;
  private _overlay: any;

  enquiryForm: FormGroup;

  protected initializePage(): void {
    this.enquiryForm = this.formBuilder.group({
      id: [''],
      toDate: ['', [Validators.required]],
    });

    this.toDateCombobBox.dataItems = [
      {
        name: 'یک روز',
        value: '0'
      },
      {
        name: 'یک هفته',
        value: '1'
      },
      {
        name: 'یک ماه',
        value: '2'
      },
      {
        name: 'یک سال',
        value: '3'
      }
    ];
  }


  show(id, toDate) {
    this.enquiryForm.reset();
    this.enquiryForm.get('id').setValue(id);
    this.theModal.show();
  }

  onSave() {
    if (!this.enquiryForm.valid) {
      this.markFormGroupAsTouched(this.enquiryForm);
      return;
    }

    // const today = new Date();
    // let toDate = new Date();
    // const tmp = moment.from(today.toLocaleDateString(), 'en');
    // switch (this.enquiryForm.get('toDate').value) {
    //   case '0':
    //     toDate = tmp.locale('fa').add(1, 'days').toDate();
    //     break;
    //   case '1':
    //     toDate = tmp.locale('fa').add(1, 'weeks').toDate();
    //     break;
    //   case '2':
    //     toDate = tmp.locale('fa').add(1, 'months').toDate();
    //     break;
    //   case '3':
    //     toDate = tmp.locale('fa').add(12, 'months').toDate();
    //     break;
    // }

    // const dt = new Date(toDate);
    // dt.setHours(11, 59, 59, 0);
    this._overlay = this.showOverlay();
    this.restService.update(Urls.Announcement, this.enquiryForm.get('id').value.toString(), {
      operation: 'ok',
      permission: {
        // dateTo: dt.getTime()
        operation: this.enquiryForm.get('toDate').value
      }
    })
      .then(value => {
        this.hideOverlay(this._overlay);
        this.theModal.hide();
        this.changeDetectorRef.detectChanges();
        this.showInfoMessageBox('پیام سیستم', 'صدور مجوز استعلام با موفقیت انجام شد.<br/>کد رمز جهت استعلام: ' + this.getPersianNumber(value.data.permission.password), () => {
          this.dataChanged.emit();
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      });
  }
}
