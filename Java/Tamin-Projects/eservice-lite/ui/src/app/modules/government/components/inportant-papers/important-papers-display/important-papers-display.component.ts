import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TaminModalComponent } from 'tamin-framework';
import { EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent, } from 'tamin-framework';
import { Urls } from 'src/app/settings/urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-important-papers-display',
  templateUrl: './important-papers-display.component.html',
  styleUrls: ['./important-papers-display.component.css']
})
export class ImportantPapersDisplayComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() submitt = new EventEmitter<any>();
  private _subscription = new Subscription();

  newFormm: FormGroup;
  private overlay: any;

  initializePage() {
    this.newFormm = this.formBuilder.group({
      contractNumber: [''],
      serialNumber: [''],
      ApprovDate: [''],
      sentDate: [''],
      id1: [''],
      date1: [''],
      workshopid: [''],
      contractrow: [''],
      workshopName: [''],
      // contractNumber: [''],
      contractDate: [''],
      branchCode: [''],
      contractStartDate: [''],
      contractEndDate: [''],
      contractSubject: [''],
      ourag_price1: [''],
      ourag_HavDate: [''],
      ourag_SDate: [''],
      ourag_ApriceClc: [''],
      ourag_gno: [''],
      ourag_date: [''],
      ourag_price2: [''],
    });
  }

  protected destroyPage(): void {
    this._subscription.unsubscribe();
  }

  show(dataItem: any) {
    var me = this;
    this.newFormm.get('contractNumber').setValue(dataItem.contract.contractNumber);
    this.newFormm.get('serialNumber').setValue(dataItem.letter_serial);
    this.newFormm.get('id1').setValue(dataItem.ourag_id1.ourag_gno);
    this.newFormm.get('ourag_price2').setValue(dataItem.ourag_price2);
    this.newFormm.get('ourag_HavDate').setValue(dataItem.ourag_havdate);
    this.newFormm.get('ourag_price1').setValue(dataItem.ourag_price1);
    this.newFormm.get('workshopid').setValue(dataItem.workshopid);
    this.newFormm.get('contractrow').setValue(dataItem.contractrow);
    if(dataItem.ourag_id1!=null){
      this.newFormm.get('ourag_SDate').setValue(dataItem.ourag_id1.ourag_sdate);
    }
    if(dataItem.ourag_id2!=null){
      this.newFormm.get('ourag_date').setValue(dataItem.ourag_id2.ourag_date);
      this.newFormm.get('ourag_gno').setValue(dataItem.ourag_id2.ourag_gno);
    }
    var ourag_date=dataItem.ourag_id1.ourag_date;
    this.newFormm.get('date1').setValue(`${ourag_date.substring(0,4)}/${ourag_date.substring(4,6)}/${ourag_date.substring(6,8)}`);
    if (dataItem.confirm_date_time != null && dataItem.confirm_date_time != "")
      this.newFormm.get('ApprovDate').setValue(this.getPersianDate(dataItem.confirm_date_time));
    if (dataItem.branchSendDateTime != null && dataItem.branchSendDateTime != "")
      this.newFormm.get('sentDate').setValue(this.getPersianDate(dataItem.branchSendDateTime));
    this.restService.getById(`${Urls.contractInfo}`, `${dataItem.workshopid}/${dataItem.contractrow}`)
      .then(value => {
        me.hideOverlay(this.overlay);
        if (value.data != null) {
          if (value.data.workshop != null) {
            var ppj=me.newFormm.get('workshopName');
            me.newFormm.get('workshopName').setValue(value.data.workshop.workshopName);
            me.newFormm.get('branchCode').setValue(value.data.branch.organizationName);
          }
          me.newFormm.get('contractNumber').setValue(value.data.contractNumber);
          if (value.data.contractDate != null && value.data.contractDate != "")
          me.newFormm.get('contractDate').setValue(value.data.contractDate.substring(0, 4) + "/" + value.data.contractDate.substring(4, 6) + "/" + value.data.contractDate.substring(6, 8));
          if (value.data.contractStartDate != null && value.data.contractStartDate != "")
          me.newFormm.get('contractStartDate').setValue(value.data.contractStartDate.substring(0, 4) + "/" + value.data.contractStartDate.substring(4, 6) + "/" + value.data.contractStartDate.substring(6, 8));
          if (value.data.contractEndDate != null && value.data.contractEndDate != "")
          me.newFormm.get('contractEndDate').setValue(value.data.contractEndDate.substring(0, 4) + "/" + value.data.contractEndDate.substring(4, 6) + "/" + value.data.contractEndDate.substring(6, 8));
          me.newFormm.get('contractSubject').setValue(value.data.contractSubject);

        }
      })
      .catch(reason => {
        me.hideOverlay(this.overlay);
        if (reason.error.status == 404) {
          me.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 500) {
          me.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        }
        if (reason.error.status == 200) {
          me.showErrorMessageBox('پیام سیستم', 'فایل با موفقیت بارگذاری شد');
        }
      });
    this.theModal.width = '60%';
    this.theModal.show();
  }

  hide() {
    this.theModal.hide();
  }

  saveForm(values) {
    if (!this.newFormm.valid) {
      return;
    }
    values.id = null;
    var oragObject = this.getSes("oragObject");
    var ourag_id2 = {};
    if (values.ourag_gno == "" || values.ourag_gn == "" || values.ourag_gno == null || values.ourag_gn == null) {
      ourag_id2 = null;
    } else {
      ourag_id2 = {
        ourag_gno: values.ourag_gno,
        ourag_date: values.ourag_date
      }
    }
    var object = {
      workshopid: values.workshopid,
      contractrow: values.contractrow,
      ourag_id1: { ourag_id: oragObject.ourag_id },
      ourag_count1: values.ourag_count1,
      ourag_id2: ourag_id2,
      ourag_count2: values.ourag_count2 != "" ? values.ouourag_count2rag_gno : null,
      ourag_aprice2: values.ourag_aprice2 != "" ? values.ourag_aprice2 : null
    };
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
  // workshopfileChange(event) {
  //   let reader1 = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader1.readAsDataURL(file);
  //     setTimeout(() => {
  //       this.newFormm.controls.workshopfile.setValue(reader1.result);
  //     }, 1000);
  //   }
  // }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
}