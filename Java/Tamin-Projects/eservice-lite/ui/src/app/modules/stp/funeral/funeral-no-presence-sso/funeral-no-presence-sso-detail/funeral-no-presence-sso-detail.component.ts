import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {StpUrls} from '../../../stp-urls';

@Component({
  selector: 'app-funeral-no-presence-sso-detail',
  templateUrl: './funeral-no-presence-sso-detail.component.html',
  styleUrls: ['./funeral-no-presence-sso-detail.component.css']
})
export class FuneralNoPresenceSsoDetailComponent extends TaminPageBaseComponent {
  @Output() submitt = new EventEmitter<any>();
  @Output() buttonClicked = new EventEmitter<any>();
  theForm: FormGroup;
  private _overlay: any;
  private data: any;
  spouses = [];
  deadEdit = false;
  deadNew = true;
  isDisabled = true;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      deadName: [''],
      deadNationalId: ['', Validators.required],
      deadRelation: [''],
      partnerNationalId: [''],
      weddingDateTimeStamp: ['']
    });

  }

  // protected loadPageData(): void {
  //   this._overlay = this.showOverlay();
  //   this.header
  //     .loadData()
  //     .then(value1 => {
  //       debugger;
  //       this.hideOverlay(this._overlay);
  //       this.deadEdit = this.header.getData().flag;
  //       this.deadNew = !this.header.getData().flag;
  //       if (this.header.getData().flag) {
  //         debugger;
  //         this.theForm.get('partnerNationalId').setValue(this.header.getData().partnerNationalId);
  //         this.theForm.get('weddingDateTimeStamp').setValue(this.header.getData().weddingTimestamp);
  //       }
  //     })
  //     .catch(reason => {
  //       this.hideOverlay(this._overlay);
  //       if (reason.error && reason.error.data) {
  //         this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
  //       } else {
  //         this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
  //       }
  //
  //     });
  // }
  onValidateDead() {
    const values = this.theForm.value;
    this.buttonClicked.emit(values);
  }

  onValidateDeadMain(tmp: any, params: any) {
    this._overlay = this.showOverlay();
    return new Promise<any>((resolve, reject) => {
      var theUrl = StpUrls.STP_VALIDATE_FUNERAL_NOPRESENCE_SSO + '/' + params.deadNationalId + '/' + tmp.nationalCode;
      this.restService.getAll(theUrl).then(value => {
        this.hideOverlay(this._overlay);
        this.theForm.patchValue(value.data);
        this.data = value.data;
        // (<Array<any>>value.data.branchWorkshop).forEach(value1 => {
        //   this.branchWorkshop.push({+
        //     name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
        //     value: value1.branchCode
        //   });
        // });
        // this.dataLoaded.emit(value.data);
        if (value.data[6] == '0') {//voras(tabaieye daraye sharayet yaft nashod)
          this.isDisabled = false;
          this.theForm.get('deadRelation').setValue(value.data[5]);
          this.theForm.get('deadName').setValue(value.data[4]);
        } else if (value.data[6] == '1') {//daraye sharayet
          this.isDisabled = true;
          this.theForm.get('deadRelation').setValue(value.data[5]);
          this.theForm.get('deadName').setValue(value.data[4]);
        } else if (value.data[6] == '3') {//adame ehraze sharayet(shakhse digari daraye sharayet mibashad)
          this.showInfoMessageBox('پیام سیستم', value.data[7]);// 'شما دارای  شرایط دریافت کمک هزینه مراسم ترحیم نمی باشید'
          return;
        }
        else {//adame ehraze sharayet(shakhse digari daraye sharayet mibashad)
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'شما دارای  شرایط دریافت کمک هزینه مراسم ترحیم نمی باشید');
          return;
        }

        resolve();
      }).catch(reason => {
        // reject(reason);
        this.hideOverlay(this._overlay);
        this.isDisabled = true;
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
    });

  }

  onSendRequest() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }
    debugger;
    const values = this.theForm.value;
    this.submitt.emit(values);
  }

  onReConfirmRequest() {
    const tmp = this.theForm.value;
    debugger;
    this._overlay = this.showOverlay();
    var theUrl = StpUrls.STP_FUNERAL_NOPRESENCE_CONFIRM + '/' + tmp.request.id;
    this.restService.create(theUrl, null)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data.message != undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        else if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
}
