import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent, OverlayService } from 'tamin-framework';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sso-app-workshop-insurance-procrastination-new',
  templateUrl: './sso-workshop-insurance-procrastination-new.component.html',
  styleUrls: ['./sso-workshop-insurance-procrastination-new.component.css']
})
export class SsoWorkshopInsuranceProcrastinationNewComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() submitt = new EventEmitter<any>();
  private _subscription = new Subscription();
  private _overlay: any;
  private overlayService: OverlayService;
  isSavehide: boolean;
  isEdithide: boolean;
  isApprovhide: boolean;
  showText: boolean;
  approveDateTime: String;

  newForm: FormGroup;
  private overlay: any;

  initializePage() {
    this.newForm = this.formBuilder.group({
      selected1: [''],
      selected2: [''],
      selected3: [''],
      bikari1: [''],
      bikari2: [''],
      bikari3: [''],
      haghbime1: [''],
      haghbime2: [''],
      haghbime3: [''],
      yeramon1: [''],
      yeramon2: [''],
      yeramon3: ['']
    });
  }

  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }

  hide() {
    this.theModal.hide();
  }

  show(dataItem: any, isAdd: boolean) {
    this.setSes("oragObject", dataItem);
    this.newForm.reset();
    this.newForm.get('selected1').valueChanges.subscribe(value => { this.chateData1(); });
    this.newForm.get('selected2').valueChanges.subscribe(value => { this.chateData2(); });
    this.newForm.get('selected3').valueChanges.subscribe(value => { this.chateData3(); });
    this.newForm.get('yeramon1').valueChanges.subscribe(value => { this.changeNumber1(); });
    this.newForm.get('yeramon2').valueChanges.subscribe(value => { this.changeNumber2(); });
    this.newForm.get('yeramon3').valueChanges.subscribe(value => { this.changeNumber3(); });
    var columns = this.newForm.controls;
    columns.bikari1.setValue(true); columns.bikari1.disable();
    columns.bikari2.setValue(true); columns.bikari2.disable();
    columns.bikari3.setValue(true); columns.bikari3.disable();
    columns.haghbime1.setValue(true); columns.haghbime1.disable();
    columns.haghbime2.setValue(true); columns.haghbime2.disable();
    columns.haghbime3.setValue(true); columns.haghbime3.disable();
    columns.yeramon1.disable();
    columns.yeramon2.disable();
    columns.yeramon3.disable();
    this.hideOverlay(this.overlay);
    this.restService
      .getById(`${Urls.SSO_getInsuranceProcrestination}`, `${dataItem.workshopId}/${dataItem.branchCode}`)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.theModal.show();
        if (value.data.length > 0 && value.data[0].mastcustcrisisId != null) {
          if (value.data[0].approveDateTime != null && value.data[0].approveDateTime != "") {
            this.showText = true;
            this.approveDateTime = this.getPersianDate(value.data[0].approveDateTime);
          } else this.showText = false;
          this.setSes("mastcustcrisisId", value.data[0].mastcustcrisisId);
          this.isSavehide = false;
          // if (value.data[0].status == "1") {
          //   this.isEdithide = false;
          //   this.isApprovhide = false;
          // } else {
          this.isEdithide = true;
          this.isApprovhide = false;
          // }
          if (value.data[0].selected1 == 1) {
            columns.selected1.setValue(true);
            this.newForm.get('yeramon1').setValue(value.data[0].yeramon1);
          }
          if (value.data[0].selected2 == 1) {
            columns.selected2.setValue(true);
            this.newForm.get('yeramon2').setValue(value.data[0].yeramon2);
          }
          if (value.data[0].selected3 == 1) {
            columns.selected3.setValue(true);
            this.newForm.get('yeramon3').setValue(value.data[0].yeramon3);
          }
          if (value.data[0].registerLicenseFrom == "2") {
            this.newForm.controls.selected1.disable();
            this.newForm.controls.yeramon1.disable();
          }
          if (value.data[0].registerLicenseFrom == "3") {
            this.newForm.controls.selected2.disable();
            this.newForm.controls.yeramon2.disable();
          }
          if (value.data[0].registerLicenseFrom == "4") {
            this.newForm.controls.selected3.disable();
            this.newForm.controls.yeramon3.disable();
          }
        } else {
          this.isSavehide = true;
          this.isEdithide = false;
          this.isApprovhide = false;
        }
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد');
        }
      });
    this.theModal.width = '70%';
  }
  private chateData1() {
    if (this.newForm.get('selected1').value) this.newForm.controls.yeramon1.enable();
    else {
      this.newForm.controls.yeramon1.disable();
      this.newForm.controls.yeramon1.setValue(null);
    }
  }
  private chateData2() {
    if (this.newForm.get('selected2').value) this.newForm.controls.yeramon2.enable();
    else {
      this.newForm.controls.yeramon2.disable();
      this.newForm.controls.yeramon2.setValue(null);
    }
  }
  private chateData3() {
    if (this.newForm.get('selected3').value) this.newForm.controls.yeramon3.enable();
    else {
      this.newForm.controls.yeramon3.disable();
      this.newForm.controls.yeramon3.setValue(null);
    }
  }

  saveForm(values) {
    if (!this.newForm.valid) {
      return;
    }
    var dataValue = this.getSes("oragObject");
    var workshop = {
      workshopId: dataValue.workshopId,
      branchCode: dataValue.branchCode
    }
    var jsonValue = {
      workshop: workshop,
      selected1: values.selected1 ? "1" : "0",
      selected2: values.selected2 ? "1" : "0",
      selected3: values.selected3 ? "1" : "0",
    };
    if (values.selected1) {
      if (values.yeramon1 != null && values.yeramon1 != "" && values.yeramon1 != undefined)
        values.yeramon1 = parseInt(values.yeramon1);
      if (values.yeramon1 == undefined || values.yeramon1 == null || values.yeramon1 === "" || values.yeramon1 < 0 || values.yeramon1 > 20) {
        const msg = 'لطفا درصد اسفند سال 1398 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
      }
      jsonValue["yeramon1"] = values.yeramon1;
    }
    if (values.selected2) {
      if (values.yeramon2 != null && values.yeramon2 != "" && values.yeramon2 != undefined)
        values.yeramon2 = parseInt(values.yeramon2);
      if (values.yeramon2 == undefined || values.yeramon2 == null || values.yeramon2 === "" || values.yeramon2 < 0 || values.yeramon2 > 20) {
        const msg = 'لطفا درصد فروردین سال 1399 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
      }
      jsonValue["yeramon2"] = values.yeramon2;
    }
    if (values.selected3) {
      if (values.yeramon3 != null && values.yeramon3 != "" && values.yeramon3 != undefined)
        values.yeramon3 = parseInt(values.yeramon3);
      if (values.yeramon3 == undefined || values.yeramon3 == null || values.yeramon3 === "" || values.yeramon3 < 0 || values.yeramon3 > 20) {
        const msg = 'لطفا درصد اردیبهشت سال 1399 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
      }
      jsonValue["yeramon3"] = values.yeramon3;
    }



    let message = '';
    message = '';
    message += '<div>';
    message += '<p>ماه های انتخاب شده جهت امهال حق بیمه به شرح ذیل میباشد:</p>';
    message += '<ul>';
    if (values.selected1)
      message += `<li>اسفند ماه  سال 1398 -  درصد حق بیمه سهم کارفرما: ${values.yeramon1} درصد </li>`;
    if (values.selected2)
      message += `<li>فروردین ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${values.yeramon2} درصد </li>`;
    if (values.selected3)
      message += `<li>اردیبهشت ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${values.yeramon3} درصد </li>`;
    message += '</ul>';
    message += '<p>آیا از ثبت درخواست اطمینان دارید؟</p>';
    message += '</div>';
    debugger;
    this.showQuestionBox('پیام سیستم', message, () => {
      this.overlay = this.showOverlay();
      this.restService
        .create(`${Urls.SSO_insuranceProcrestination}`, jsonValue)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.submitt.emit();
          this.hide();
          const msg = 'اطلاعات با موفقیت ثبت گردید. جهت ارسال درخواست به شعبه نسبت به تایید ثبت نام اقدام نمائید.';
          this.showInfoMessageBox('توجه', msg);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          if (reason.error.status == 404) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 500) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 200) {
            this.showErrorMessageBox('پیام سیستم', 'اطلاعات با موفقیت ویرایش شد');
          }

        });


    }, () => {
      return;
    });

  }
  EditForm(values) {
    if (!this.newForm.valid) {
      return;
    }
    var dataValue = this.getSes("oragObject");
    var mastcustcrisisId = this.getSes("mastcustcrisisId");
    var workshop = {
      workshopId: dataValue.workshopId,
      branchCode: dataValue.branchCode
    }
    var jsonValue = {
      mastcustcrisisId: mastcustcrisisId,
      workshop: workshop,
      selected1: values.selected1 ? "1" : "0",
      selected2: values.selected2 ? "1" : "0",
      selected3: values.selected3 ? "1" : "0",
    };
    if (values.selected1) {
      if (values.yeramon1 != null && values.yeramon1 != "" && values.yeramon1 != undefined)
        values.yeramon1 = parseInt(values.yeramon1);
      if (values.yeramon1 == undefined || values.yeramon1 == null || values.yeramon1 === "" || values.yeramon1 < 0 || values.yeramon1 > 20) {
        const msg = 'لطفا درصد اسفند سال 1398 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
        return;
      }
      jsonValue["yeramon1"] = values.yeramon1;
    }
    if (values.selected2) {
      if (values.yeramon2 != null && values.yeramon2 != "" && values.yeramon2 != undefined)
        values.yeramon2 = parseInt(values.yeramon2);
      if (values.yeramon2 == undefined || values.yeramon2 == null || values.yeramon2 === "" || values.yeramon2 < 0 || values.yeramon2 > 20) {
        const msg = 'لطفا درصد فروردین سال 1399 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
        return;
      }
      jsonValue["yeramon2"] = values.yeramon2;
    }
    if (values.selected3) {
      if (values.yeramon3 != null && values.yeramon3 != "" && values.yeramon3 != undefined)
        values.yeramon3 = parseInt(values.yeramon3);
      if (values.yeramon3 == undefined || values.yeramon3 == null || values.yeramon3 === "" || values.yeramon3 < 0 || values.yeramon3 > 20) {
        const msg = 'لطفا درصد اردیبهشت سال 1399 را صحیح واردکنید!';
        this.showErrorMessageBox('توجه', msg);
        return;
      }
      jsonValue["yeramon3"] = values.yeramon3;
    }
    let message = '';
    message = '';
    message += '<div>';
    message += '<p>ماه های انتخاب شده جهت امهال حق بیمه به شرح ذیل میباشد:</p>';
    message += '<ul>';
    if (values.selected1)
      message += `<li>اسفند ماه  سال 1398 -  درصد حق بیمه سهم کارفرما: ${values.yeramon1} درصد </li>`;
    if (values.selected2)
      message += `<li>فروردین ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${values.yeramon2} درصد </li>`;
    if (values.selected3)
      message += `<li>اردیبهشت ماه  سال 1399 -  درصد حق بیمه سهم کارفرما: ${values.yeramon3} درصد </li>`;
    message += '</ul>';
    message += '<p>آیا از ثبت درخواست اطمینان دارید؟</p>';
    message += '</div>';
    this.showQuestionBox('پیام سیستم', message, () => {
      this.overlay = this.showOverlay();
      this.restService
        .update(`${Urls.SSO_udpateInsuranceProcrestination}`, mastcustcrisisId.toString(), jsonValue)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.submitt.emit();
          this.hide();
          const msg = 'اطلاعات با موفقیت ثبت گردید. جهت ارسال درخواست به شعبه نسبت به تایید ثبت نام اقدام نمائید.';
          this.showInfoMessageBox('توجه', msg);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          if (reason.error.status == 404) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 500) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          }
          if (reason.error.status == 200) {
            this.showErrorMessageBox('پیام سیستم', 'اطلاعات با موفقیت ویرایش شد');
          }

        });

    }, () => {
      return;
    });
  }
  isApprovehide(values) {
    var dataValue = this.getSes("oragObject");
    var mastcustcrisisId = this.getSes("mastcustcrisisId");
    var workshop = {
      workshopId: dataValue.workshopId,
      branchCode: dataValue.branchCode
    }
    var jsonValue = {
      mastcustcrisisId: mastcustcrisisId,
      workshop: workshop,
    };
    this.overlay = this.showOverlay();
    this.restService
      .update(`${Urls.SSO_approveInsuranceProcrestination}`, mastcustcrisisId.toString(), jsonValue)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.submitt.emit();
        this.hide();
        const msg = 'وضعیت با موفقیت تایید شد.';
        this.showInfoMessageBox('توجه', msg);
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          this.showErrorMessageBox('پیام سیستم', 'وضعیت با موفقیت تایید شد');
        }

      });
  }
  private changeNumber1() {
    var yeramon1 = this.newForm.get('yeramon1').value;
    if (yeramon1 != null) {
      var yeramon1Length = yeramon1.length, lastValueyeramon1 = "";
      lastValueyeramon1 = yeramon1;
      var splityeramon1 = lastValueyeramon1.split(/\D/i);
      if (splityeramon1.length > 1) {
        for (let index = 0; index < yeramon1Length; index++) {
          lastValueyeramon1 = lastValueyeramon1.replace(/\D/i, "");
        }
        this.newForm.get('yeramon1').setValue(lastValueyeramon1);
      }
    }
  }
  private changeNumber2() {
    var yeramon2 = this.newForm.get('yeramon2').value;
    if (yeramon2 != null) {
      var yeramon2Length = yeramon2.length, lastValueyeramon2 = "";
      lastValueyeramon2 = yeramon2;
      var splityeramon2 = lastValueyeramon2.split(/\D/i);
      if (splityeramon2.length > 1) {
        for (let index = 0; index < yeramon2Length; index++) {
          lastValueyeramon2 = lastValueyeramon2.replace(/\D/i, "");
        }
        this.newForm.get('yeramon2').setValue(lastValueyeramon2);
      }
    }
  }
  private changeNumber3() {
    var yeramon3 = this.newForm.get('yeramon3').value;
    if (yeramon3 != null) {
      var yeramon3Length = yeramon3.length, lastValueyeramon3 = "";
      lastValueyeramon3 = yeramon3;
      var splityeramon3 = lastValueyeramon3.split(/\D/i);
      if (splityeramon3.length > 1) {
        for (let index = 0; index < yeramon3Length; index++) {
          lastValueyeramon3 = lastValueyeramon3.replace(/\D/i, "");
        }
        this.newForm.get('yeramon3').setValue(lastValueyeramon3);
      }
    }
  }
  workshopfileChange(event) {
    let reader1 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader1.readAsDataURL(file);
      setTimeout(() => {
        this.newForm.controls.workshopfile.setValue(reader1.result);
      }, 1000);
    }
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
}