import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent, TaminValidators, SearchParam, SearchOperator } from 'tamin-framework';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../../settings/urls';
import {StpUrls} from '../stp-urls';


@Component({
  selector: 'app-introduction-to-work',
  templateUrl: './introduction-to-work.component.html',
  styleUrls: ['./introduction-to-work.component.css']
})
export class IntroductionToWorkComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  letterno = '';
  barSdate = '';
  barEdate = '';
  workshopId = '';
  flag='';

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }


  protected initializePage(): void {

    this.theForm = this.formBuilder.group({
      intRdate: ['', Validators.required],
      intEmpdat: ['', Validators.required],
      intFromDate: ['', Validators.required],
      intToDate: ['', Validators.required],
      brhName: [''],
      risuname: [''],
      reqSerial: [''],
      rwshname: [''],
      intlno: [''],
      intDate: [''],
      risuid: [''],
      nationalid: [''],
      intCmt: [''],
      flag: ['']
    });

  }
  protected loadPageData(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['letterno']) {
        this.letterno = params['letterno'];
        this._overlay = this.showOverlay();
        this.loadData()
          .then(value1 => {
            this.hideOverlay(this._overlay);
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      } else {
        this.redirectTo('/');
      }
    });

  }
  private loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.property = 'intLno';
      searchParam.operator = SearchOperator.EQUAL;
      searchParam.value = this.letterno;
      this.restService.getAll(StpUrls.STP_Introduction_To_work, [searchParam])
        .then(value => {
          this.theForm.get('risuid').setValue(value.data.list[0].risuId);
          this.theForm.get('risuname').setValue(value.data.list[0].risuname);
          this.theForm.get('nationalid').setValue(value.data.list[0].nationalid);
          this.theForm.get('reqSerial').setValue(value.data.list[0].reqSerial);
          this.theForm.get('rwshname').setValue(value.data.list[0].rwshname);
          this.theForm.get('brhName').setValue(value.data.list[0].brhName);
          this.theForm.get('intlno').setValue(value.data.list[0].intLno);
          this.theForm.get('intDate').setValue(value.data.list[0].intDate);
          this.barSdate = value.data.list[0].barSdate;
          this.barEdate = value.data.list[0].barEdate;
          this.workshopId = value.data.list[0].rwshid;
          debugger;
                this.flag = value.data.list[0].flag;

          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          if (reason.error && reason.error.data) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
              this.redirectTo('/');
            });
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }
          // reject(reason);
        });
    });
  }
  onSaveIntro() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }
    const data = {
      intRdateTimeStamp: new Date(this.theForm.get('intRdate').value).getTime(),
      intEmpdatTimeStamp: new Date(this.theForm.get('intEmpdat').value).getTime(),
      inquAzdat1TimeStamp: new Date(this.theForm.get('intFromDate').value).getTime(),
      inquTadat1TimeStamp: new Date(this.theForm.get('intToDate').value).getTime(),
      intCmt: this.theForm.get('intCmt').value,
      reqSerial: this.theForm.get('reqSerial').value,
      intLno: this.theForm.get('intlno').value,
      risuId: this.theForm.get('risuid').value,
      barEdate: this.barEdate.replace('/', '').replace('/', ''),
      barSdate: this.barSdate.replace('/', '').replace('/', ''),
      rwshid: this.workshopId,
       flag:this.flag,
    };
    this._overlay = this.showOverlay();
    this.validateData()
      .then(value => {
        if (value) {
          this.restService.create(StpUrls.STP_Introduction_To_work_Save, data)
            .then(value => {
              this.hideOverlay(this._overlay);
              if (value.data != "" && value.data != null) {
                this.showErrorMessageBox('پیام سیستم', value.data);
              } else {
                this.showInfoMessageBox('پیام سیستم', 'پاسخ معرفی نامه با موفقیت ارسال شد.', () => {
                  this.redirectTo('/stp/introduction-list');
                });
              }
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              if (reason.error && reason.error.data) {
                this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
              } else {
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              }

            });
        } else {
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  private validateData(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.hideOverlay(this._overlay);
      const today = Date.now();
      const empDateTimestamp = new Date(this.theForm.get('intEmpdat').value).getTime();
      const fromDateTimestamp = new Date(this.theForm.get('intFromDate').value).getTime();
      const toDateTimestamp = new Date(this.theForm.get('intToDate').value).getTime();
      const rDateTimestamp = new Date(this.theForm.get('intRdate').value).getTime();
      if (fromDateTimestamp > today) {
        this.showErrorMessageBox('پیام سیستم', 'تاريخ شروع عدم اشتغال نمیتوانند از تاریخ روز بزرگتر باشند');
        resolve(false);
        return;
      } else if (empDateTimestamp > today) {
        this.showErrorMessageBox('پیام سیستم', ' تاریخ آخرین روز اشتغال نمیتواند از تاریخ روز بزرگتر باشند');
        resolve(false);
        return;
      }
      else if (rDateTimestamp > today) {
        this.showErrorMessageBox('پیام سیستم', ' تاریخ پاسخ کارفرما نمیتواند از تاریخ روز بزرگتر باشند');
        resolve(false);
        return;
      }
      else if (empDateTimestamp > fromDateTimestamp) {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ آخرین روز اشتغال  نمیتواند از تاریخ شروع عدم اشتغال بزرگتر باشد ');
        resolve(false);
        return;
      } else if (toDateTimestamp < fromDateTimestamp) {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ خاتمه عدم اشتغال نمیتواند از تاریخ شروع عدم اشتغال کوچکتر باشد ');
        resolve(false);
        return;
      } else if (toDateTimestamp < empDateTimestamp) {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ خاتمه عدم اشتغال نمیتواند از تاریخ آخرین روز اشتغال کوچکتر باشد ');
        resolve(false);
        return;
      }
      resolve(true);

    });
  }

}

