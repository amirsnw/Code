import { Component, ElementRef, Input, ViewChild, Inject, Injector } from '@angular/core';
import { SearchOperator, SearchParam, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { PersonalModel } from '../../../models/registration/personal.model';
import { Urls } from '../../../settings/urls';
import { StpUrls } from '../../../modules/stp/stp-urls';
import { DOCUMENT } from '@angular/common';

declare var alertify: any;

@Component({
  selector: 'app-make-a-contract',
  templateUrl: './make-a-contract.component.html',
  styleUrls: ['./make-a-contract.component.css']
})

export class MakeAContractComponent extends TaminPageBaseComponent {
  @Input() personalInfo: PersonalModel;
  @Input() contractSelected: any;
  @Input() provinceValue: any;
  @Input() cityValue: any;
  @Input() branchValue: any;
  public checkedPremium: number;
  public overlay: any;
  public theForm: FormGroup;
  public commitment1 = false;
  public commitment2 = false;
  public isMake = true;
  public alldisabled = false;
  public startDate = '...';
  public savedContract = false;
  public salary: any;
  public premium: any;

  constructor(injector: Injector, @Inject(DOCUMENT) private _document: Document) {
    super(injector);
  }

  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @ViewChild('buttonsavecontract') buttonsavecontract: ElementRef;

  initializePage() {
    this.theForm = this.formBuilder.group({
      commitment1: [''],
      commitment2: ['']
    });
    this.startDate = this.getPersianDate(new Date());
    this.salary = this.getSes('salary');
  }

  onCommitment1() {
    this.commitment1 = this.theForm.get('commitment1').value as boolean;
  }

  onCommitment2() {
    this.commitment2 = this.theForm.get('commitment2').value as boolean;
  }

  onSaveContract() {
    this.premium = this.getSes('premium');
    this.checkedPremium = this.getSes('checkedPremium');
    if (this.premium == null) {
      alertify.alert('ابتدا باید مبلغ حق بیمه را وارد کنید.');
      return;
    }
    if (this.premium !== this.checkedPremium) {
      alertify.alert('پس از تغییر مبلغ حق بیمه باید کلید محاسبه را بزنید.');
      return;
    }
    if (this.provinceValue == "" || this.provinceValue == '' || this.provinceValue == null || this.provinceValue == undefined) {
      alertify.alert('استان محل زندگی را انتخاب کنید.');
      return;
    }
    if (this.cityValue == "" || this.cityValue == '' || this.cityValue == null || this.cityValue == undefined) {
      alertify.alert('شهر محل زندگی را انتخاب کنید.');
      return;
    }
    if (this.branchValue == "" || this.branchValue == '' || this.branchValue == null || this.branchValue == undefined) {
      alertify.alert('شعبه محل زندگی را انتخاب کنید.');
      return;
    }
    const jsonData = {
      provinceCode: this.provinceValue,
      cityCode: this.cityValue,
      brchCodeNew: this.branchValue
    };
    this.overlay = this.showOverlay();
    this.restService.create(Urls.makeAContract + '/' + this.premium, jsonData)
      .then(data => {
        this.hideOverlay(this.overlay);
        this.savedContract = true;
        data.data.contractDate = this.getPersianDate(data.data.contractDate);
        if (data.data !== undefined && data.data !== null) {
          if (data.data.comment != null)
            alertify.alert(`قرارداد شما با شماره:${data.data.contractNumber} در تاریخ: ${data.data.contractDate} ثبت گردید ${data.data.comment}مهلت اولین پرداخت حق بیمه  20 روز از تاریخ ثبت قرارداد می باشد. درصورت عدم پرداخت در مهلت مقرر ، قرارداد منعقده ملغی میگردد.`);
          else
            alertify.alert(`قرارداد شما با شماره:${data.data.contractNumber} در تاریخ: ${data.data.contractDate} ثبت گردید.مهلت اولین پرداخت حق بیمه  20 روز از تاریخ ثبت قرارداد می باشد. درصورت عدم پرداخت در مهلت مقرر ، قرارداد منعقده ملغی میگردد.`);
          setTimeout(() => {
            this._document.defaultView.location.reload();
          }, 2000);
        }
        // setTimeout(() => {
        //   this.redirectTo('/optional-insurance/contract');
        // }, 2000);
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        alertify.alert(error.error.data.message);
      });
  }

  onUpdateContract() {
    this.premium = this.getSes('premium');
    this.checkedPremium = this.getSes('checkedPremium');
    // if (this.provinceValue == "" || this.provinceValue == '' || this.provinceValue == null || this.provinceValue == undefined) {
    //   alertify.alert('استان محل زندگی را انتخاب کنید.');
    //   return;
    // }
    // if (this.cityValue == "" || this.cityValue == '' || this.cityValue == null || this.cityValue == undefined) {
    //   alertify.alert('شهر محل زندگی را انتخاب کنید.');
    //   return;
    // }
    // if (this.branchValue == "" || this.branchValue == '' || this.branchValue == null || this.branchValue == undefined) {
    //   alertify.alert('شعبه محل زندگی را انتخاب کنید.');
    //   return;
    // }

    if (this.premium == null) {
      alertify.alert('ابتدا باید مبلغ حق بیمه را وارد کنید.');
      return;
    }
    if (this.premium !== this.checkedPremium) {
      alertify.alert('پس از تغییر مبلغ حق بیمه باید کلید محاسبه را بزنید.');
      return;
    }
    const jsonData = {
      //premium:this.premium
       provinceCode: "",
      // cityCode: this.cityValue,
      // brchCodeNew: this.branchValue
    };
    this.overlay = this.showOverlay();
    this.restService.update(Urls.updateContract, this.premium.toString(), jsonData)
      .then(data => {
        this.hideOverlay(this.overlay);
        if (data.data !== undefined && data.data !== null) {
          alertify.alert("ویرایش با موفقیت انجام شد.");
        }
        this.savedContract = true;
        // setTimeout(() => {
        //   this.redirectTo('/optional-insurance/contract');
        // }, 2000);
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        alertify.alert(error.error.data.message);
      });
  }

  onDeleteContract() {
    this.redirectTo('/optional-freelance/self-contract-state/01');
    // this.showQuestionBox('پیام سیستم', 'آیا از غیر فعال کردن قرارداد خود اطمینان دارید؟', () => {
    //   this.overlay = this.showOverlay();
    //   this.restService.delete(Urls.deleteContract, this.contractSelected.contractNumber.toString())
    //     .then(data => {
    //       this.hideOverlay(this.overlay);
    //       if (data.data !== undefined && data.data !== null && data.data == "1") {
    //         alertify.alert("قرارداد غیر فعال شد.");
    //         setTimeout(() => {
    //           this._document.defaultView.location.reload();
    //         }, 1500);
    //       } else {
    //         alertify.alert("قرارداد قابل غیر فعال شدن نیست.");
    //       }
    //     })
    //     .catch(error => {
    //       this.hideOverlay(this.overlay);
    //       alertify.alert(error.error.data.message);
    //     });
    // }, () => {
    //   return;
    // });
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  onPrintContract() {
    const pdfUrl = `${Urls.printContract}/${new Date().getTime()}`;
    this.restService.getBlob(pdfUrl)
      .then(value => {
        this.documentViewer.loadPdf(URL.createObjectURL(value));
        this.theModal.show();
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', 'در حال حاضر امکان مشاهده قرارداد وجود ندارد.');
      });
  }

  payInsurancePremium() {
    this.redirectTo('/optional-insurance/pay-premium');
  }
}
