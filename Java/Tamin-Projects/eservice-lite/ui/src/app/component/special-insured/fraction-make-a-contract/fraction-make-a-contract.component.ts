import { Component, Input, ViewChild, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { SearchOperator, SearchParam, TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { PersonalModel } from '../../../models/registration/personal.model';
import { Urls } from '../../../settings/urls';
import { StpUrls } from '../../../modules/stp/stp-urls';
import { DOCUMENT } from '@angular/common';

declare var alertify: any;

@Component({
  selector: 'app-fraction-make-a-contract',
  templateUrl: './fraction-make-a-contract.component.html',
  styleUrls: ['./fraction-make-a-contract.component.css']
})

export class FractionMakeAContractComponent extends TaminPageBaseComponent {
  @Input() personalInfo: PersonalModel;
  @Output() submit = new EventEmitter();
  public checkedPremium: number;
  public overlay: any;
  public theForm: FormGroup;
  public commitment1 = false;
  public commitment2 = false;
  public startDate = '...';
  public savedContract = false;
  public premium: any;
  @ViewChild('documentViewer') documentViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  
  constructor(injector: Injector, @Inject(DOCUMENT) private _document: Document) {
    super(injector);
  }

  initializePage() {
    this.theForm = this.formBuilder.group({
      commitment1: [''],
      commitment2: ['']
    });
    this.startDate = this.getPersianDate(new Date());
  }

  onCommitment1() {
    this.commitment1 = this.theForm.get('commitment1').value as boolean;
  }

  onCommitment2() {
    this.commitment2 = this.theForm.get('commitment2').value as boolean;
  }

  onSaveContract() {
    const jsonData = {
      premium: "this.premium"
    };
    // return new Promise((resolve, reject) => {
    this.overlay = this.showOverlay();
    this.restService.create(Urls.fractionMakeAContract, jsonData)
      .then(data => {
        this.hideOverlay(this.overlay);
        this.savedContract = true;
        alertify.alert(`قرارداد شما با شماره:${data.data.contractNumber} در تاریخ: ${this.startDate} ثبت گردید.`);
        setTimeout(() => {
          this._document.defaultView.location.reload();
        }, 2000);
        // resolve();
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        if (error.error.data.message == "در حال حاضر برای این کد ملی قرارداد فعال وجود دارد.") {
          this.savedContract = true;
          this.submit.emit();
        }
        alertify.alert(error.error.data.message);
        /*reject(error);*/
      });
    // });

  }

  onPrintContract() {
    const pdfUrl = `${Urls.fractionPrintContract}/${new Date().getTime()}`;
    this.overlay = this.showOverlay();
    this.restService.getBlob(pdfUrl)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.documentViewer.loadPdf(URL.createObjectURL(value));
        this.theModal.show();
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', 'در حال حاضر امکان مشاهده قرارداد وجود ندارد.');
      });
  }

  payInsurancePremium() {
    // alertify.alert('زمان صدور حق بیمه این دوره از ابتدای خردادماه لغایت مرداد ماه سال بعد می باشد.');
    this.redirectTo('/optional-insurance/fraction-pay-premium');
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
