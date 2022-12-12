import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { TaminPageBaseComponent, TaminFieldComboBoxStaticComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { ActivatedRoute } from '@angular/router';
import { FreelanceCheckIstrueContractComponent } from '../freelance-check-istrue-contract/freelance-check-istrue-contract.component';
import { FreelanceMakeAContractComponent } from '../freelance-make-a-contract/freelance-make-a-contract.component';
import { FreelanceAgreementComponent } from '../freelance-agreement/freelance-agreement.component';
import { FreelancePaymentPremiumComponent } from '../freelance-payment-premium/freelance-payment-premium.component';
import { FreelanceIntroduceToExaminationComponent } from '../freelance-introduce-to-examination/freelance-introduce-to-examination.component';
import { FreelanceLocationComponent } from '../freelance-location/freelance-location.component';
import { FormGroup, Validators } from '@angular/forms';

declare var alertify: any;

@Component({
  selector: 'app-self-contract-state',
  templateUrl: './self-contract-state.component.html',
  styleUrls: ['./self-contract-state.component.css']
})

export class SelfContractStateComponent extends TaminPageBaseComponent {
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: SpecialInsuredInfoComponent;
  @ViewChild('selfconstate') selfconstate: TaminFieldComboBoxStaticComponent;

  public overlay: any;
  public theForm: FormGroup;
  public selfconstateValue = [];
  public premiumValidity = false;
  public alldisabled = false;
  public previousPayment = true;
  public contract: any;
  public insuranceIdState = false;
  public ageSelected: any;
  public contractNumber: any;
  public primeriType: any;
  public primeriRate: any;
  public checkContractStatus: any;
  public router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.getCities();
    var url = this.router.snapshot.params['type'] === '01' ? Urls.checkAgeAndHistory : Urls.fractionFreelanceCheckAgeAndHistory
    this.loadData(url);
    this.theForm = this.formBuilder.group({
      contractSelfState: ['', [Validators.required]],
      contractDate: { value: new Date(), disabled: true },
      canceldesc: ['']
    });
  }


  loadData(url: string) {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(url)
        .then(data => {
          this.hideOverlay(this.overlay);
          if (data !== undefined && data != null && data.data !== undefined && data.data != null) {
            this.insuranceIdState = data.data.insuranceIdState;
            if (!this.insuranceIdState) {
              alertify.alert('کاربر محترم این خدمت صرفا برای بیمه شدگان اصلی می باشد.');
              return;
            }
            this.ageSelected = parseInt(data.data.newAge.substring(0, 2));
            if (this.ageSelected < 18) {
              alertify.alert('سن شما کمتر از 18 سال می باشد ، امکان ارائه خدمات غیر حضوری برای شما میسر نمی باشد.');
              return;
            }
            this.checkContractStatus = data.data.checkContractStatus;
            if (this.checkContractStatus == 2) {
              alertify.alert("ابطال قرارداد بدليل سپري شدن بيش از 20 روز از تاريخ  انعقاد قرارداد")
              return;
            }
            if (this.checkContractStatus == 4) {
              alertify.alert("ابطال قرارداد به دليل   سپري شدن بيش از سه ماه از آخرين پرداخت")
              return;
            }
            this.contract = data.data.contract;
            if (this.contract != null) {
              this.contractNumber = this.contract.contractNumber;
              this.primeriType = this.contract.premiumType != null ? this.contract.premiumType.insuranceDescription : this.contract.premiumTypeCode;
              this.primeriRate = this.contract.premiumRate != null ? this.contract.premiumRate.spcrateDescription : this.contract.premiumRateCode;
            } else {
              this.alldisabled = true;
              var stateSelected = this.router.snapshot.params['type'] === '01' ? "بیمه اختیاری" : "حرف و مشاغل آزاد"
              alertify.alert(`قرارداد فعالی از نوع ${stateSelected} برای شما وجود ندارد.`)
            }
            // this.previousPayment = data.data.previousPayment;
            // if (this.previousPayment) {
            //   this.alldisabled = true;
            //   alertify.alert("برای این قرارداد پرداخت انجام شده است شما قادر به غیر فعال کردن این قرارداد نیستید.")
            // }
          }
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
  onDisplayCalcDetail() {
    var contractStatus = this.theForm.controls.contractSelfState.value;
    var canceldesc = this.theForm.controls.canceldesc.value;
    contractStatus = contractStatus.toString().length < 2 ? `0${contractStatus}` : contractStatus
    if (contractStatus == null || contractStatus == "" || contractStatus == undefined) {
      alertify.alert("وضعیت مورد نظر را انتخاب نمایید.");
      return;
    }
    if (this.contract == null || this.contract == "" || this.contract == undefined) {
      alertify.alert("قرارداد فعالی برای شما یافت نشد.");
      return;
    }
    var url = this.router.snapshot.params['type'] === '01' ? Urls.updateSelfContractState : Urls.freelanceUpdateSelfContractState
    const jsonData = {
      contractStatus: contractStatus,
      canceldesc: canceldesc
    };
    this.showQuestionBox('پیام سیستم', 'آیا از غیر فعال کردن قرارداد خود اطمینان دارید؟', () => {
      this.overlay = this.showOverlay();
      this.restService.update(url, this.contract.contractNumber.toString(), jsonData)
        .then(data => {
          this.hideOverlay(this.overlay);
          if (data.data !== undefined && data.data !== null) {
            alertify.alert("قرارداد با موفقیت غیر فعال شد.");
            setTimeout(() => {
              switch (this.router.snapshot.params['type']) {
                case "01":
                  this.redirectTo('/optional-insurance/contract');
                  break;
                case "02":
                  this.redirectTo('/optional-freelance/contract');
                  break;
                case "03":
                  this.redirectTo('/optional-insurance/fraction');
                  break;
                default:
                  this.redirectTo('/optional-insurance/contract');
                  break;
              }
            }, 1500);
          } else {
            alertify.alert("قرارداد قابل غیر فعال شدن نیست.");
          }
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          alertify.alert(error.error.data.message);
        });
    }, () => {
      return;
    });
  }
  redirectToContracts() {
    switch (this.router.snapshot.params['type']) {
      case "01":
        this.redirectTo('/optional-insurance/contract');
        break;
      case "02":
        this.redirectTo('/optional-freelance/contract');
        break;
      case "03":
        this.redirectTo('/optional-insurance/fraction');
        break;
      default:
        this.redirectTo('/optional-insurance/contract');
        break;
    }
  }
  public getCities() {
    this.restService.getPage(Urls.listSelfContractState, 1, 100, [])
      .then(dataa => {
        const data = [];
        (dataa.data.list as Array<any>).forEach(item => {
          if (item.selfIsuContStatDode.toString().length != 1 || item.selfIsuContStatDode != "01")
            data.push({
              name: item.selfIsuContStatDesc,
              value: item.selfIsuContStatDode
            });
        });
        this.selfconstateValue = data;
      })
      .catch(error => {
      });
  }
}
