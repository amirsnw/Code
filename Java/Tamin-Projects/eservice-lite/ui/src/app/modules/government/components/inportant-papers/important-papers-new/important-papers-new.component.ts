import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent } from 'tamin-framework';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-important-papers-new',
  templateUrl: './important-papers-new.component.html',
  styleUrls: ['./important-papers-new.component.css']
})
export class ImportantPapersNewComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() submitt = new EventEmitter<any>();
  private _subscription = new Subscription();
  private firstRequest: boolean;

  newForm: FormGroup;
  private overlay: any;

  initializePage() {
    this.newForm = this.formBuilder.group({
      workshopid: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      workshopName: [''],
      contractNumber: [''],
      contractDate: [''],
      branchCode: [''],
      contractStartDate: [''],
      contractEndDate: [''],
      contractSubject: [''],
      contractrow: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      // ourag_count1: ['', [Validators.required]],
      ourag_price1: ['', [Validators.required]],
      // ourag_count2: [''],
      ourag_id1: [''],
      // ourag_aprice1: [''],
      ourag_datee: [''],
      ourag_HavDate: [''],
      ourag_SDate: [''],
      ourag_ApriceClc: [''],
      // // ourag_aprice2: [''],
      ourag_gno: [''],
      ourag_gnoo: [''],
      // total_ourag1: [''],
      total_ourag2: [''],
      ourag_price2: [''],
      ourag_date: [''],
      totalPrice: [''],
    });
  }

  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }

  show() {
    this.newForm.reset();
    this.firstRequest = true;
    this.newForm.get('workshopid').valueChanges.subscribe(value => { this.ongetData(); });
    this.newForm.get('contractrow').valueChanges.subscribe(value => { this.ongetData(); });
    this.newForm.get('ourag_gno').valueChanges.subscribe(value => { this.onCalculatOurag3(); });
    this.newForm.get('ourag_date').valueChanges.subscribe(value => { this.onCalculatOurag3(); });
    // // this.newForm.get('ourag_count1').valueChanges.subscribe(value => { this.onCalculatOurag1(); });
    this.newForm.get('ourag_price1').valueChanges.subscribe(value => { this.onCalculatOurag1(); });
    // // this.newForm.get('ourag_count2').valueChanges.subscribe(value => { this.onCalculatOurag2(); });
    this.newForm.get('ourag_price2').valueChanges.subscribe(value => { this.onCalculatOurag2(); });
    // // this.newForm.get('ourag_aprice2').valueChanges.subscribe(value => { this.onCalculatOurag2(); });
    this.newForm.get('ourag_HavDate').valueChanges.subscribe(value => { this.onCalculatApriceCls(); });
    // // this.newForm.controls.ourag_count2.disable();
    this.newForm.controls.ourag_price2.disable();
    // // this.newForm.controls.ourag_aprice2.disable();
    var oragObject = this.getSes("oragObject");
    if (oragObject != null) {
      // this.newForm.get('ourag_aprice1').setValue(oragObject.ourag_aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      this.newForm.get('ourag_datee').setValue(oragObject.ourag_date.substring(0, 4) + "/" + oragObject.ourag_date.substring(4, 6) + "/" + oragObject.ourag_date.substring(6, 8));
      this.newForm.get('ourag_gnoo').setValue(oragObject.ourag_gno);
    }
    if (oragObject.ourag_sdate != null && oragObject.ourag_sdate != "")
      this.newForm.get('ourag_SDate').setValue(oragObject.ourag_sdate.substring(0, 4) + "/" + oragObject.ourag_sdate.substring(4, 6) + "/" + oragObject.ourag_sdate.substring(6, 8));
    this.theModal.width = '60%';
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

  saveForm(values) {
    if (!this.newForm.valid) {
      this.showErrorMessageBox('پیام سیستم', 'فیلد های مورد نظر را وارد کنید!');
      return;
    }
    values.id = null;
    var oragObject = this.getSes("oragObject");
    var ourag_id2 = {};
    if (values.ourag_gno == "" || values.ourag_date == "" || values.ourag_gno == null || values.ourag_date == null) {
      ourag_id2 = null;
    } else {
      ourag_id2 = {
        ourag_gno: values.ourag_gno,
        ourag_date: this.getPersianDate(values.ourag_date).replace("/", "").replace("/", "")
      }
    }

    var object = {
      workshopid: values.workshopid,
      contractrow: values.contractrow,
      ourag_id1: { ourag_id: oragObject.ourag_id },
      // ourag_count1: values.ourag_count1 != "" ? values.ourag_count1 : 0,

      ourag_price1: values.ourag_price1 != "" ? values.ourag_price1 : 0,
      ourag_id2: ourag_id2,
    };
    if (values.ourag_gno != null && values.ourag_gno != "" && values.ourag_date != null && values.ourag_date != "") {
      if (values.ourag_HavDate == null || values.ourag_HavDate == "") {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ صودور حواله باید مقدار داشته باشد!');
        return;
      } else object['ourag_havdate'] = this.getPersianDate(values.ourag_HavDate.getTime()).toString().replace("/", "").replace("/", "");
      // // if (values.ourag_count2 == null || values.ourag_count2 == "") {
      // //   this.showErrorMessageBox('پیام سیستم', 'تعداد اسناد بابت حفظ قدرت خرید باید مقدار داشته باشد!');
      // //   return;
      // // } else object['ourag_count2'] = values.ourag_count2;
      if (values.ourag_price2 == null || values.ourag_price2 == "") {
        this.showErrorMessageBox('پیام سیستم', 'مبلغ بابت حفظ قدرت خرید باید مقدار داشته باشد!');
        return;
      } else object['ourag_price2'] = values.ourag_price2;
      // // if (values.ourag_aprice2 == null || values.ourag_aprice2 == "") {
      // //   this.showErrorMessageBox('پیام سیستم', 'ارزش اسمی هر ورقه باید مقدار داشته باشد!');
      // //   return;
      // // } else object['ourag_aprice2'] = values.ourag_aprice2;
    }
    var BetweenTowDate, calculateIng, calculated;
    if (values.ourag_HavDate != null && values.ourag_HavDate != "")
      if (oragObject.sDate > values.ourag_HavDate) {
        BetweenTowDate = Math.round((oragObject.sDate - values.ourag_HavDate.getTime()) / (1000 * 60 * 60 * 24));
        // // calculateIng = (oragObject.ourag_aprice * values.ourag_count1) * (BetweenTowDate / 365) * 15 / 100;
        calculateIng = (values.ourag_price1) * (BetweenTowDate / 365) * 15 / 100;
        // // values.ourag_count2 = values.ourag_count2 != "" ? parseInt(values.ourag_count2) : 0;
        values.ourag_price2 = values.ourag_price2 != "" ? parseInt(values.ourag_price2) : 0;
        // // values.ourag_aprice2 = values.ourag_aprice2 != "" ? parseInt(values.ourag_aprice2) : 0;
        // // calculated = (values.ourag_aprice2 * values.ourag_count2) - Math.round(calculateIng);
        calculated = (values.ourag_price2) - Math.round(calculateIng);
      } else {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ صدور حواله نمی تواند از تاریخ سررسید بزرگتر باشد');
        return;
      }

    if (calculated > 1 || calculated < -1) {
      let message = '';
      message = '';
      message += '<div>';
      message += '<p>مبلغ محاسبه شده با مبلغ وارد شده بابت حفظ قدرت خرید همخوانی ندارد</p>';
      message += '<p>آیا از تایید اطلاعات اطمینان دارید</p>';
      message += '</div>';
      this.showQuestionBox('پیام سیستم', message, () => {
        this.overlay = this.showOverlay();
        this.restService
          .create(`${Urls.importantPapers}-items`, object)
          .then(value => {
            this.hideOverlay(this.overlay);
            this.submitt.emit(value.data.ourag_id1.ourag_id);
            this.hide();
            const msg = 'اطلاعات با موفقیت ذخیره شد.';
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
              this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
            }

          });
      }, () => {
        return;
      });
    } else {
      this.overlay = this.showOverlay();
      this.restService
        .create(`${Urls.importantPapers}-items`, object)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.submitt.emit(value.data.ourag_id1.ourag_id);
          this.hide();
          const msg = 'اطلاعات با موفقیت ذخیره شد.';
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
            this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
          }

        });
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
  private ongetData() {
    const workshopid = this.newForm.get('workshopid').value;
    if (workshopid != null) {
      var workshopidLength = workshopid.length, lastValueworkshopid = "";
      lastValueworkshopid = workshopid;
      var splitworkshopid = lastValueworkshopid.split(/\D/i);
      if (splitworkshopid.length > 1) {
        for (let index = 0; index < workshopidLength; index++) {
          lastValueworkshopid = lastValueworkshopid.replace(/\D/i, "");
        }
        this.newForm.get('workshopid').setValue(lastValueworkshopid);
        return;
      }
    }
    const contractrow = this.newForm.get('contractrow').value;
    if (contractrow != null) {
      var contractrowLength = contractrow.length, lastValuecontractrow = "";
      lastValuecontractrow = contractrow;
      var splitcontractrow = lastValuecontractrow.split(/\D/i);
      if (splitcontractrow.length > 1) {
        for (let index = 0; index < contractrowLength; index++) {
          lastValuecontractrow = lastValuecontractrow.replace(/\D/i, "");
        }
        this.newForm.get('contractrow').setValue(lastValuecontractrow);
        return;
      }
    }
    if (workshopid != "" && workshopid != null && workshopid.length == 10 && contractrow != "" && contractrow != null && contractrow.length == 8) {
      if (this.firstRequest) this.firstRequest = false;
      else { this.firstRequest = true; return; }
      this.overlay = this.showOverlay();
      this.restService.getById(`${Urls.contractInfo}`, `${workshopid}/${contractrow}`)
        .then(value => {
          this.hideOverlay(this.overlay);
          if (value.data != null) {
            if (value.data.workshop != null) {
              this.newForm.get('workshopName').setValue(value.data.workshop.workshopName);
              this.newForm.get('branchCode').setValue(value.data.branch.organizationName);
            }
            this.newForm.get('contractNumber').setValue(value.data.contractNumber);
            if (value.data.contractDate != null && value.data.contractDate != "")
              this.newForm.get('contractDate').setValue(value.data.contractDate.substring(0, 4) + "/" + value.data.contractDate.substring(4, 6) + "/" + value.data.contractDate.substring(6, 8));
            if (value.data.contractStartDate != null && value.data.contractStartDate != "")
              this.newForm.get('contractStartDate').setValue(value.data.contractStartDate.substring(0, 4) + "/" + value.data.contractStartDate.substring(4, 6) + "/" + value.data.contractStartDate.substring(6, 8));
            if (value.data.contractEndDate != null && value.data.contractEndDate != "")
              this.newForm.get('contractEndDate').setValue(value.data.contractEndDate.substring(0, 4) + "/" + value.data.contractEndDate.substring(4, 6) + "/" + value.data.contractEndDate.substring(6, 8));
            this.newForm.get('contractSubject').setValue(value.data.contractSubject);

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
            this.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
          }
        });
    }
  }
  // // private onCalculatOurag1() {
  // //   var ourag_count1 = this.newForm.get('ourag_count1').value;
  // //   var ourag_count1Length = ourag_count1 != null && ourag_count1 != "" ? ourag_count1.length : 0;
  // //   var lastValueourag_count1 = "";
  // //   lastValueourag_count1 = ourag_count1;
  // //   if (ourag_count1 != null && ourag_count1 != "") {
  // //     var splitourag_count1 = lastValueourag_count1.split(/\D/i);
  // //     if (splitourag_count1.length > 1) {
  // //       for (let index = 0; index < ourag_count1Length; index++) {
  // //         lastValueourag_count1 = lastValueourag_count1.replace(/\D/i, "");
  // //       }
  // //       this.newForm.get('ourag_count1').setValue(lastValueourag_count1);
  // //       return;
  // //     }
  // //   }
  // //   var ourag_aprice1 = this.newForm.get('ourag_aprice1').value;
  // //   if (ourag_count1 == null || ourag_count1 == "") ourag_count1 = 0;
  // //   if (ourag_aprice1 == null || ourag_aprice1 == "") ourag_aprice1 = 0;
  // //   var oragObject = this.getSes("oragObject");
  // //   if (oragObject != null) {
  // //     this.newForm.get('total_ourag1').setValue((oragObject.ourag_aprice * ourag_count1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  // //   }
  // //   var ourag_HavDate = this.newForm.get('ourag_HavDate').value;
  // //   if (ourag_HavDate != null && ourag_HavDate != "") {
  // //     var oragObject = this.getSes("oragObject");
  // //     var BetweenTowDate;
  // //     if (oragObject.sDate > ourag_HavDate) {
  // //       BetweenTowDate = Math.round((oragObject.sDate - ourag_HavDate.getTime()) / (1000 * 60 * 60 * 24));
  // //       var calculateIng = (oragObject.ourag_aprice * ourag_count1) * (BetweenTowDate / 365) * 15 / 100;
  // //       this.newForm.get('ourag_ApriceClc').setValue(Math.round(calculateIng).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  // //     } else {
  // //       this.showErrorMessageBox('پیام سیستم', 'تاریخ صدور حواله نمی تواند از تاریخ سررسید بزرگتر باشد');
  // //       return;
  // //     }
  // //   }
  // // }
  private onCalculatOurag1() {
    var ourag_price1 = this.newForm.get('ourag_price1').value;
    // var ourag_price1Length = ourag_price1 != null && ourag_price1 != "" ? ourag_price1.length : 0;
    // var lastValueourag_price1 = "";
    // lastValueourag_price1 = ourag_price1;
    // if (ourag_price1 != null && ourag_price1 != "") {
    //   var splitourag_price1 = lastValueourag_price1.split(/\D/i);
    //   if (splitourag_price1.length > 1) {
    //     for (let index = 0; index < ourag_price1Length; index++) {
    //       lastValueourag_price1 = lastValueourag_price1.replace(/\D/i, "");
    //     }
    //     this.newForm.get('ourag_price1').setValue(lastValueourag_price1);
    //     return;
    //   }
    // }
    if (ourag_price1 == null || ourag_price1 == "") ourag_price1 = 0;
   
    var ourag_HavDate = this.newForm.get('ourag_HavDate').value;
    if (ourag_HavDate != null && ourag_HavDate != "") {
      var oragObject = this.getSes("oragObject");
      if (oragObject.sDate > ourag_HavDate) {
        this.newForm.get('ourag_ApriceClc').setValue(Math.round(ourag_price1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      } else {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ صدور حواله نمی تواند از تاریخ سررسید بزرگتر باشد');
        return;
      }
    }
  }
  private onCalculatOurag2() {
    var ourag_price2 = this.newForm.get('ourag_price2').value, lastValueourag_price2 = "", lastValueourag_aprice2 = "";
    // if (ourag_price2 != null) {
    //   lastValueourag_price2 = ourag_price2;
    //   var spliourag_price2t = lastValueourag_price2.split(/\D/i);
    //   if (spliourag_price2t.length > 1) {
    //     for (let index = 0; index < ourag_price2.length; index++) {
    //       lastValueourag_price2 = lastValueourag_price2.replace(/\D/i, "");
    //     }
    //     this.newForm.get('ourag_price2').setValue(lastValueourag_price2);
    //     return;
    //   }
    // }
    // // var ourag_aprice2 = this.newForm.get('ourag_aprice2').value;
    // // if (ourag_aprice2 != null) {
    // //   lastValueourag_aprice2 = ourag_aprice2;
    // //   var splitourag_aprice2 = lastValueourag_aprice2.split(/\D/i);
    // //   if (splitourag_aprice2.length > 1) {
    // //     for (let index = 0; index < ourag_aprice2.length; index++) {
    // //       lastValueourag_aprice2 = lastValueourag_aprice2.replace(/\D/i, "");
    // //     }
    // //     this.newForm.get('ourag_aprice2').setValue(lastValueourag_aprice2);
    // //     return;
    // //   }
    // // }
    // // if (lastValueourag_count2 == null || lastValueourag_count2 == "") lastValueourag_count2 = "0";
    // // if (lastValueourag_aprice2 == null || lastValueourag_aprice2 == "") lastValueourag_aprice2 = "0";
    // // this.newForm.get('total_ourag2').setValue((parseInt(ourag_aprice2) * parseInt(lastValueourag_count2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    // this.newForm.get('ourag_price2').setValue(parseInt(ourag_price2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  }
  private onCalculatApriceCls() {
    var ourag_HavDate = this.newForm.get('ourag_HavDate').value;
    // // var ourag_count1 = this.newForm.get('ourag_count1').value;
    var ourag_price1 = this.newForm.get('ourag_price1').value;
    // // if (ourag_count1 != null && ourag_count1 != "" && ourag_HavDate != "" && ourag_HavDate != null) {
    if (ourag_price1 != null && ourag_price1 != "" && ourag_HavDate != "" && ourag_HavDate != null) {
      var oragObject = this.getSes("oragObject");
      var BetweenTowDate;
      if (oragObject.sDate > ourag_HavDate) {
        BetweenTowDate = Math.round((oragObject.sDate - ourag_HavDate.getTime()) / (1000 * 60 * 60 * 24));
        // // var calculateIng = (oragObject.ourag_aprice * ourag_count1) * (BetweenTowDate / 365) * 15 / 100;
        var calculateIng = (ourag_price1) * (BetweenTowDate / 365) * 15 / 100;
        this.newForm.get('ourag_ApriceClc').setValue(Math.round(calculateIng).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      } else {
        this.showErrorMessageBox('پیام سیستم', 'تاریخ صدور حواله نمی تواند از تاریخ سررسید بزرگتر باشد');
        return;
      }
    }
  }
  private onCalculatOurag3() {
    var ourag_gno = this.newForm.get('ourag_gno').value;
    var ourag_date = this.newForm.get('ourag_date').value;
    var lastValueOurag_gno = "";
    if (ourag_gno != null && ourag_gno != "") {
      var ourag_gnoLength = ourag_gno.length;
      lastValueOurag_gno = ourag_gno;
      var splitOurag_gno = lastValueOurag_gno.split(/\D/i);
      if (splitOurag_gno.length > 1) {
        for (let index = 0; index < ourag_gnoLength; index++) {
          lastValueOurag_gno = lastValueOurag_gno.replace(/\D/i, "");
        }
        this.newForm.get('ourag_gno').setValue(lastValueOurag_gno);
        return;
      }
    }
    if (lastValueOurag_gno != null && lastValueOurag_gno != "" && ourag_date != null && ourag_date != "") {
      // // this.newForm.controls.ourag_count2.enable();
      this.newForm.controls.ourag_price2.enable();
      // // this.newForm.controls.ourag_aprice2.enable();
    } else {
      // // this.newForm.get('ourag_count2').setValue(null);
      this.newForm.get('ourag_price2').setValue(null);
      // // this.newForm.get('ourag_aprice2').setValue(null);
      // // this.newForm.controls.ourag_count2.disable();
      this.newForm.controls.ourag_price2.disable();
      // // this.newForm.controls.ourag_aprice2.disable();

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