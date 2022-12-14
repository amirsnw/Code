import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { ActivatedRoute } from '@angular/router';
import { SpecialAgreementComponent } from '../special-agreement/special-agreement.component';
import { MakeAContractComponent } from '../make-a-contract/make-a-contract.component';
import { FractionCheckIstrueContractComponent } from '../fraction-check-istrue-contract/fraction-check-istrue-contract.component';
import { DetermineMonthlyPremiumComponent } from '../determine-monthly-premium/determine-monthly-premium.component';
import { IntroduceToExaminationComponent } from '../introduce-to-examination/introduce-to-examination.component';
import { FreelanceLocationComponent } from '../freelance-location/freelance-location.component';

declare var alertify: any;

@Component({
  selector: 'app-special-insured-contract',
  templateUrl: './special-insured-contract.component.html',
  styleUrls: ['./special-insured-contract.component.css']
})

export class SpecialInsuredContractComponent extends TaminPageBaseComponent {
  @ViewChild('specialAgreementComponent') specialAgreementComponent: SpecialAgreementComponent;
  @ViewChild('makeAContractComponent') makeAContractComponent: MakeAContractComponent;
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: SpecialInsuredInfoComponent;
  @ViewChild('determineMonthlyPremiumComponent') determineMonthlyPremiumComponent: DetermineMonthlyPremiumComponent;
  @ViewChild('fractionCheckIstrueContractComponent') fractionCheckIstrueContractComponent: FractionCheckIstrueContractComponent;
  @ViewChild('freelanceLocationComponent') freelanceLocationComponent: FreelanceLocationComponent;
  @ViewChild('introduceToExaminationComponent') introduceToExaminationComponent: IntroduceToExaminationComponent;
  public overlay: any;
  public isSatisfied = false;
  public eligibilityStatus = 0;
  public premiumValidity = false;
  public examinationValidity = false;
  public isAprovee = false;
  public savedContract = false;
  public isAgreement = false;
  public exemptionValidity = true;
  public insuranceIdState = false;
  public chkRelolap = "";
  public alldisabled = false;
  public previousPayment = true;
  public otherContract: any;
  public ageSelected: any;
  public contract: any;
  public checkContractStatus: any;
  public router: ActivatedRoute;
  public mobileSize = false;
  public provinceValue: any;
  public cityValue: any;
  public branchValue: any;
  public provinceback: any;
  public cityback: any;
  public branchback: any;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.mobileSize = window.screen.width <= 767 ? true : false;
    if (this.router.snapshot.params['status'] === 'invalid') {
      alertify.alert(this.getSes('payPremiumError'));
    }
    if (this.router.snapshot.params['status'] === 'rollbacke') {
      if (this.getSes('isAprovee') != null) {
        this.isAprovee = this.getSes('isAprovee');
      }
      if (this.getSes('isAgreement') != null) {
        this.isAgreement = this.getSes('isAgreement');
      }
    }
    this.loadData();
  }
  loadData() {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.checkAgeAndHistory)
        .then(data => {
          this.hideOverlay(this.overlay);
          if (data !== undefined && data != null && data.data !== undefined && data.data != null) {
            if ([1, 2, 3, 4, 5].includes(data.data.eligibilityStatus)) {
              this.eligibilityStatus = data.data.eligibilityStatus;
              this.isSatisfied = true;
            }
            this.chkRelolap = data.data.chkRelolap;
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
            this.otherContract = data.data.otherContract;
            if (this.otherContract != null) {
              alertify.alert('برای شما قرارداد بیمه مشاغل آزاد ثبت شده و مجاز به انعقاد قرارداد بیمه اختیاری نیستید.')
              return;
            }

            this.previousPayment = data.data.previousPayment;

            if (this.chkRelolap != "1") {
              alertify.alert(this.chkRelolap);
            }
            this.checkContractStatus = data.data.checkContractStatus;
            if (this.checkContractStatus == 3) {
              alertify.alert("ابطال قرارداد بدليل سپري شدن بيش از 30روز از تاريخ  انعقاد قرارداد")
              return;
            }
            if (this.checkContractStatus == 4) {
              alertify.alert("ابطال قرارداد به دليل   سپري شدن بيش از سه ماه از آخرين پرداخت")
              return;
            }
            this.contract = data.data.contract;
            if (this.contract != null) {
              this.isAgreement = true;
              this.examinationValidity = true;
              this.savedContract = true;
              //  this.exemptionValidity = false;
              this.premiumValidity = true;
              this.isAprovee = true;
              setTimeout(() => {
                this.freelanceLocationComponent.alldisabled = true;
              }, 0);
              setTimeout(() => {
                this.determineMonthlyPremiumComponent.viewForm.get('monthlyPremium').setValue(Math.round((data.data.contract.salary * 27) / 100));
                this.determineMonthlyPremiumComponent.viewForm.get('salary').setValue(data.data.contract.salary);
                this.fractionCheckIstrueContractComponent.theForm.get('commitment1').setValue(false);
                this.fractionCheckIstrueContractComponent.theForm.get('commitment2').setValue(true);
                this.fractionCheckIstrueContractComponent.commitment1 = false;
                this.fractionCheckIstrueContractComponent.commitment2 = true;
                this.makeAContractComponent.theForm.get('commitment1').setValue(true);
                this.makeAContractComponent.theForm.get('commitment2').setValue(true);
                this.makeAContractComponent.isMake = false;
                this.makeAContractComponent.commitment1 = true;
                this.makeAContractComponent.commitment2 = true;
                this.makeAContractComponent.savedContract = true;
                // this.makeAContractComponent.buttonsavecontract.title = 'ppp';
                this.examinationValidity = true;
                this.savedContract = true;
                // this.exemptionValidity = false;
                this.premiumValidity = true;
                this.isAprovee = true;
                this.alldisabled = true;
                if (data.data.contract.contractDate != null && data.data.contract.contractDate != undefined)
                  this.makeAContractComponent.startDate = this.getPersianDate(new Date(data.data.contract.contractDate));
                if (this.previousPayment) {
                  this.determineMonthlyPremiumComponent.alldisabled = true;
                  this.determineMonthlyPremiumComponent.isPayment = true;
                  this.fractionCheckIstrueContractComponent.alldisabled = true;
                  this.makeAContractComponent.alldisabled = true;
                  this.specialAgreementComponent.alldisabled = true;
                  this.alldisabled = true;
                }
                // this.checkExemptionValidity(true);
                this.determineMonthlyPremiumComponent.checkMedicalExemption();
                if (this.introduceToExaminationComponent != undefined)
                  this.introduceToExaminationComponent.theForm.controls.commitment.setValue(data.data.contract.medicalExemptionStatus == "0" ? true : false);
                this.freelanceLocationComponent.viewForm.controls.provincdis.setValue(data.data.provinceCode);
                this.freelanceLocationComponent.viewForm.controls.citydis.setValue(data.data.city);
                this.freelanceLocationComponent.viewForm.controls.branchCodedis.setValue(data.data.organizationId);
              }, 700);
            } else {
              this.provinceback = data.data.provinceCode;
              this.cityback = data.data.city;
              this.branchback = data.data.organizationId;
              setTimeout(() => {
                if (this.isAprovee && this.isSatisfied && this.contract == null && this.freelanceLocationComponent && this.branchback != null && this.cityback != null && this.provinceback != null) {
                  this.freelanceLocationComponent.viewForm.controls.province.setValue(this.provinceback);
                  setTimeout(() => {
                    this.freelanceLocationComponent.viewForm.controls.city.setValue(this.cityback);
                    setTimeout(() => {
                      this.freelanceLocationComponent.viewForm.controls.branchCode.setValue(this.branchback);
                      setTimeout(() => {
                        this.provinceValue = this.provinceback;
                        this.cityValue = this.cityback;
                        this.branchValue = this.branchback;
                      }, 2000);
                    }, 500);
                  }, 500);
                }
              }, 500);
            }
          }
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
  onShowDetails() {
    if (!this.checkIsTrue()) return;
    this.redirectTo('/optional-insurance/age-and-history');
  }
  checkPremiumValidity(premiumValidity) {
    if (!this.checkIsTrue()) return;
    this.premiumValidity = premiumValidity;
    if (premiumValidity)
      this.makeAContractComponent.salary = this.getSes('salary');
  }
  checkExemptionValidity(exemptionValidity) {
    if (!this.checkIsTrue()) return;
    this.exemptionValidity = exemptionValidity;
    if (this.contract == null) setTimeout(() => { window.scrollBy(900, 900); }, 0);
    else setTimeout(() => {
      if (this.introduceToExaminationComponent != undefined) {
        this.introduceToExaminationComponent.theForm.controls.commitment.setValue(true);
        this.introduceToExaminationComponent.alldisabled = true;
      }
    }, 0)
  }
  checkExaminationValidity(examinationValidity) {
    if (!this.checkIsTrue()) return;
    this.examinationValidity = examinationValidity;
    if (this.contract == null) setTimeout(() => { window.scrollBy(1000, 1000); }, 0);
  }
  onShowAggrement() {
    if (!this.checkIsTrue()) return;
    this.specialAgreementComponent.show(this.specialInsuredInfoComponent.getPersonalInfo());
  }
  onAgree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = true;
    this.setSession('isAgreement', this.isAgreement);
  }
  onDisagree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = false;
    this.premiumValidity = false;
    this.isAprovee = false;
    this.savedContract = false;
    this.setSession('isAgreement', this.isAgreement);
  }
  onApprove() {
    if (!this.checkIsTrue()) return;
    this.isAprovee = true;
    this.setSession('isAprovee', this.isAprovee);
    setTimeout(() => {
      if (this.isSatisfied && this.contract == null && this.freelanceLocationComponent && this.branchback != null && this.cityback != null && this.provinceback != null) {
        this.freelanceLocationComponent.viewForm.controls.province.setValue(this.provinceback);
        setTimeout(() => {
          this.freelanceLocationComponent.viewForm.controls.city.setValue(this.cityback);
          setTimeout(() => {
            this.freelanceLocationComponent.viewForm.controls.branchCode.setValue(this.branchback);
          }, 500);
        }, 500);
        this.provinceValue = this.provinceback;
        this.cityValue = this.cityback;
        this.branchValue = this.branchback;
      }
    }, 500);
  }
  onchangeScroll() {
    // setTimeout(() => { window.scrollBy(580, 580); }, 100);
  }
  onDeApprove() {
    if (!this.checkIsTrue()) return;
    this.isAprovee = false;
    this.setSession('isAprovee', this.isAprovee);
    this.redirectTo('/optional-insurance/update-contact/02');
  }
  provinceValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    this.provinceValue = value;
    this.cityValue = null;
    this.branchValue = null;
  }
  cityValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    this.cityValue = value;
    this.branchValue = null;
  }
  branchValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    this.branchValue = value;
  }
  checkIsTrue() {
    if (!this.insuranceIdState) {
      alertify.alert('کاربر محترم این خدمت صرفا برای بیمه شدگان اصلی می باشد.');
      return false;
    }
    if (this.ageSelected < 18) {
      alertify.alert('سن شما کمتر از 18 سال می باشد ، امکان ارائه خدمات غیر حضوری برای شما میسر نمی باشد.');
      return false;
    }
    if (this.chkRelolap != "1") {
      alertify.alert(this.chkRelolap);
      return false;
    }
    if (this.otherContract != null) {
      alertify.alert('برای شما قرارداد بیمه مشاغل آزاد ثبت شده و مجاز به انعقاد قرارداد بیمه اختیاری نیستید.')
      return false;
    }
    return true;
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }
  redirectToContracts() {
    this.redirectTo('/optional-insurance/display-contract-history/01');
  }
}
