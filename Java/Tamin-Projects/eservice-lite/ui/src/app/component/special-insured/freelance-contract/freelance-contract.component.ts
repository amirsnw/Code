import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { ActivatedRoute } from '@angular/router';
import { SpecialAgreementComponent } from '../special-agreement/special-agreement.component';
import { DetermineMonthlyPremiumComponent } from '../determine-monthly-premium/determine-monthly-premium.component';
import { FreelanceCheckIstrueContractComponent } from '../freelance-check-istrue-contract/freelance-check-istrue-contract.component';
import { FreelanceMakeAContractComponent } from '../freelance-make-a-contract/freelance-make-a-contract.component';
import { FreelanceAgreementComponent } from '../freelance-agreement/freelance-agreement.component';
import { FreelancePaymentPremiumComponent } from '../freelance-payment-premium/freelance-payment-premium.component';
import { IntroduceToExaminationComponent } from '../introduce-to-examination/introduce-to-examination.component';
import { FreelanceIntroduceToExaminationComponent } from '../freelance-introduce-to-examination/freelance-introduce-to-examination.component';
import { FreelanceLocationComponent } from '../freelance-location/freelance-location.component';

declare var alertify: any;

@Component({
  selector: 'app-freelance-contract',
  templateUrl: './freelance-contract.component.html',
  styleUrls: ['./freelance-contract.component.css']
})

export class FreelanceContractComponent extends TaminPageBaseComponent {
  @ViewChild('freelanceAgreementComponent') freelanceAgreementComponent: FreelanceAgreementComponent;
  @ViewChild('freelanceLocationComponent') freelanceLocationComponent: FreelanceLocationComponent;
  @ViewChild('freelanceMakeAContractComponent') freelanceMakeAContractComponent: FreelanceMakeAContractComponent;
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: SpecialInsuredInfoComponent;
  @ViewChild('freelancePaymentPremiumComponent') freelancePaymentPremiumComponent: FreelancePaymentPremiumComponent;
  @ViewChild('freelanceCheckIstrueContractComponent') freelanceCheckIstrueContractComponent: FreelanceCheckIstrueContractComponent;
  @ViewChild('freelanceIntroduceToExaminationComponent') freelanceIntroduceToExaminationComponent: FreelanceIntroduceToExaminationComponent;
  @ViewChild('freelancePaymentPremiumComponent') searchElement: ElementRef;
  public overlay: any;
  public isSatisfied = false;
  public eligibilityStatus = 0;
  public premiumValidity = false;
  public examinationValidity = false;
  public isAprovee = false;
  public savedContract = false;
  public isAgreement = false;
  public exemptionValidity = false;
  public insuranceIdState = false;
  public chkRelolap = "";
  public chkRelolapMessage = "";
  public alldisabled = false;
  public previousPayment = true;
  public contract: any;
  public percent: any;
  public cntDram: any;
  public otherContract: any;
  public ageSelected: any;
  public checkContractStatus: any;
  public provinceValue: any;
  public cityValue: any;
  public branchValue: any;
  public router: ActivatedRoute;
  public mobileSize = false;
  public provinceback: any;
  public cityback: any;
  public branchback: any;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.mobileSize = window.screen.width <= 767 ? true : false;
    this.setSes("commitment1freelance", null);
    this.setSes("commitment2freelance", null);
    this.setSes("commitment3freelance", null);
    this.setSes("commitment3", null);
    if (this.router.snapshot.params['status'] === 'invalid') {
      alertify.alert(this.getSes('payPremiumError'));
    }
    if (this.router.snapshot.params['status'] === 'rollbacke') {
      if (this.getSes('isAprovee') != null && this.getSes('isAprovee') == true) {
        this.isAprovee = this.getSes('isAprovee');
        setTimeout(() => {
          if (this.getSes("commitment1freelance") != null && this.getSes("commitment1freelance") == true) {
            this.freelancePaymentPremiumComponent.iscomitemnt1 = true;
            this.freelancePaymentPremiumComponent.viewForm.controls.commitment1.setValue(true);
            this.freelancePaymentPremiumComponent.viewForm.controls.commitment2.setValue(false);
            this.freelancePaymentPremiumComponent.viewForm.controls.commitment3.setValue(true);
            this.setSes("commitment3", true);
          }
          if (this.getSes("commitment2freelance") != null && this.getSes("commitment2freelance") == true) {
            this.freelancePaymentPremiumComponent.viewForm.controls.commitment1.setValue(false);
            this.freelancePaymentPremiumComponent.viewForm.controls.commitment2.setValue(true);
            this.setSes("commitment3", false);
            this.freelancePaymentPremiumComponent.iscomitemnt1 = false;
          }
          if (this.getSes("spcPremiumRateOrginal") != null) {
            this.freelancePaymentPremiumComponent.viewForm.controls.spcPremiumRate.setValue(this.getSes("spcPremiumRateOrginal"));
          }
          if (this.getSes("insuranceJobTitle") != null) {
            this.freelancePaymentPremiumComponent.viewForm.controls.insuranceJob.setValue(this.getSes("insuranceJobTitle"));
          }
          if (this.getSes("imageGUIDFreelance") != null) {
            this.freelancePaymentPremiumComponent.imageGallery.downloadImage(this.getSes("imageGUIDFreelance"), this.getSes("imageGUIDFreelanceName"), '0', '0');
          }
        }, 500);
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
      this.restService.getAll(Urls.fractionFreelanceCheckAgeAndHistory)
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

            this.otherContract = data.data.otherContract;
            if (this.otherContract != null) {
              alertify.alert('برای شما قرارداد بیمه اختیاری ثبت شده و مجاز به انعقاد قرارداد مشاغل آزاد نیستید.')
              return;
            }

            if ([1, 2, 3, 4, 5].includes(data.data.eligibilityStatus)) {
              this.eligibilityStatus = data.data.eligibilityStatus;
              this.isSatisfied = true;
            }
            this.previousPayment = data.data.previousPayment;
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
              this.isAgreement = true;
              this.examinationValidity = true;
              this.savedContract = true;
              this.exemptionValidity = false;
              this.chkRelolap = "1";
              this.premiumValidity = true;
              this.isAprovee = true;
              setTimeout(() => {
                this.freelanceLocationComponent.alldisabled=true;
              },0);
              setTimeout(() => {
                this.freelanceMakeAContractComponent.salary = data.data.contract.salary;
                this.freelancePaymentPremiumComponent.viewForm.get('salary').setValue(data.data.contract.salary);
                this.freelanceCheckIstrueContractComponent.theForm.get('commitment1').setValue(false);
                this.freelanceCheckIstrueContractComponent.theForm.get('commitment2').setValue(true);
                this.freelanceCheckIstrueContractComponent.commitment1 = false;
                this.freelanceCheckIstrueContractComponent.commitment2 = true;
                this.freelanceMakeAContractComponent.theForm.get('commitment1').setValue(true);
                this.freelanceMakeAContractComponent.theForm.get('commitment2').setValue(true);
                this.freelanceMakeAContractComponent.isMake = false;
                this.freelanceMakeAContractComponent.commitment1 = true;
                this.freelanceMakeAContractComponent.commitment2 = true;
                this.freelanceMakeAContractComponent.savedContract = true;
                this.freelanceMakeAContractComponent.alldisabled = false;
                // this.freelanceMakeAContractComponent.buttonsavecontract.title = 'ppp';
                this.examinationValidity = true;
                this.savedContract = true;
                this.exemptionValidity = false;
                this.premiumValidity = true;
                this.isAprovee = true;
                if (this.contract.cntDrmn == "1") {
                  this.freelancePaymentPremiumComponent.iscomitemnt1 = true;
                  this.freelancePaymentPremiumComponent.commitment1 = true;
                  this.freelancePaymentPremiumComponent.viewForm.controls.commitment1.setValue(true);
                  this.freelancePaymentPremiumComponent.commitment2 = false;
                  this.freelancePaymentPremiumComponent.viewForm.controls.commitment2.setValue(false);
                  this.freelancePaymentPremiumComponent.commitment3 = true;
                  this.freelancePaymentPremiumComponent.viewForm.controls.commitment3.setValue(true);
                  this.setSes("commitment1freelance", true);
                  this.setSes("commitment2freelance", false);
                  this.setSes("commitment3freelance", true);
                  this.setSes("commitment3", true);
                  this.freelanceMakeAContractComponent.cntDrmn = "با حمایت درمان ";
                } else {
                  this.freelancePaymentPremiumComponent.commitment1 = false;
                  this.freelancePaymentPremiumComponent.viewForm.controls.commitment1.setValue(false);
                  this.freelancePaymentPremiumComponent.commitment2 = true;
                  this.freelancePaymentPremiumComponent.viewForm.controls.commitment2.setValue(true);
                  this.freelancePaymentPremiumComponent.iscomitemnt1 = false;
                  this.setSes("commitment1freelance", false);
                  this.setSes("commitment2freelance", true);
                  this.setSes("commitment3freelance", false);
                  this.setSes("commitment3", false);
                  this.freelanceMakeAContractComponent.cntDrmn = "بدون حمایت درمان ";
                }
                if (this.contract.premiumRateCode != null) {
                  this.freelancePaymentPremiumComponent.viewForm.controls.spcPremiumRate.setValue(this.contract.premiumRateCode);
                  this.setSes("spcPremiumRateOrginal", this.contract.premiumRateCode);
                  switch (this.contract.premiumRateCode) {
                    case "01":
                      this.freelanceMakeAContractComponent.percent = "12";
                      this.freelancePaymentPremiumComponent.spcPremiumTitle = "12";
                      break;
                    case "02":
                      this.freelanceMakeAContractComponent.percent = "14";
                      this.freelancePaymentPremiumComponent.spcPremiumTitle = "14";
                      break;
                    case "03":
                      this.freelanceMakeAContractComponent.percent = "18";
                      this.freelancePaymentPremiumComponent.spcPremiumTitle = "18";
                      break;
                    default:
                      break;
                  }
                  this.checkExemptionValidity(true);
                  this.freelancePaymentPremiumComponent.spcPremiumRateOrginal = this.contract.premiumRateCode;
                  this.freelancePaymentPremiumComponent.checkMedicalExemption();
                } else {
                  this.setSes("spcPremiumRateOrginal", null);
                }
                this.freelanceLocationComponent.viewForm.controls.provincdis.setValue(data.data.provinceCode);
                this.freelanceLocationComponent.viewForm.controls.citydis.setValue(data.data.city);
                this.freelanceLocationComponent.viewForm.controls.branchCodedis.setValue(data.data.organizationId);
                //   this.freelanceLocationComponent.viewForm.get('province').disable();
                // this.freelanceLocationComponent.viewForm.get('city').disable();


                if (this.contract.cntFreeJobCode != null) {
                  this.freelancePaymentPremiumComponent.viewForm.controls.insuranceJob.setValue(this.contract.cntFreeJobCode);
                  this.setSes("insuranceJobTitle", this.contract.cntFreeJobCode);
                } else {
                  this.setSes("insuranceJobTitle", null);
                }
                if (this.contract.guid != '"00"' && this.contract.guid != "00" && this.contract.guid != null) {
                  this.setSes("imageGUIDFreelance", this.contract.guid);
                  this.setSes("imageGUIDFreelanceName", this.contract.guidName);
                  this.freelancePaymentPremiumComponent.imageGallery.downloadImage(this.contract.guid, this.contract.guidName, '0', '0', true);
                  this.freelancePaymentPremiumComponent.buttonDesabled = true;

                } else {
                  this.setSes("imageGUIDFreelance", null);
                  this.setSes("imageGUIDFreelanceName", null);
                }
                // this.alldisabled = true;
                if (data.data.contract.contractDate != null && data.data.contract.contractDate != undefined)
                  this.freelanceMakeAContractComponent.startDate = this.getPersianDate(new Date(data.data.contract.contractDate));
                if (this.previousPayment) {
                  this.freelancePaymentPremiumComponent.alldisabled = true;
                  this.freelancePaymentPremiumComponent.isPayment = true;

                  this.freelanceCheckIstrueContractComponent.alldisabled = true;
                  this.freelanceMakeAContractComponent.alldisabled = true;
                  this.freelanceAgreementComponent.alldisabled = true;
                  this.alldisabled = true;

                }
                this.freelanceIntroduceToExaminationComponent.theForm.controls.commitment.setValue(data.data.contract.medicalExemptionStatus == "0" ? true : false);
                this.freelanceIntroduceToExaminationComponent.alldisabled = true;
                this.provinceValue = this.provinceValue;
                this.cityValue = this.cityValue;
                this.branchValue = this.branchValue;
              }, 1500);
              setTimeout(() => {
                this.chkRelolap = data.data.chkRelolap;
                this.chkRelolapMessage = data.data.chkRelolapMessage;
                if (this.chkRelolap != "1") {
                  this.methodQuesion(this.chkRelolap, this.chkRelolapMessage);
                  // alertify.alert(this.chkRelolapMessage);
                }
              }, 2000);
            } else {
              this.provinceback = data.data.provinceCode;
              this.cityback = data.data.city;
              this.branchback = data.data.organizationId;
              setTimeout(() => {
                if (this.isSatisfied && this.contract == null && this.freelanceLocationComponent && this.branchback != null && this.cityback != null && this.provinceback != null) {
                  this.freelanceLocationComponent.viewForm.controls.province.setValue(this.provinceback);
                  this.freelanceLocationComponent.viewForm.get('province').disable();
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
              this.chkRelolap = data.data.chkRelolap;
              this.chkRelolapMessage = data.data.chkRelolapMessage;
              if (this.chkRelolap != "1") {
                this.methodQuesion(this.chkRelolap, this.chkRelolapMessage);
                // alertify.alert(this.chkRelolapMessage);
              }
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
    this.redirectTo('/optional-freelance/free-age-and-history');
  }

  checkPremiumValidity(premiumValidity) {
    if (!this.checkIsTrue()) return;
    this.premiumValidity = premiumValidity;
    if (premiumValidity) {
      setTimeout(() => {
        if (this.freelanceMakeAContractComponent != undefined) {
          this.freelanceMakeAContractComponent.salary = this.getSes('salary');
          this.freelanceMakeAContractComponent.provinceValue = this.provinceValue;
          this.freelanceMakeAContractComponent.cityValue = this.cityValue;
          this.freelanceMakeAContractComponent.branchValue = this.branchValue;
        }
      }, 500);
    }

  }
  checkPremiumValidityy(premiumValidityValue) {
    if (!this.checkIsTrue()) return;
    if (this.contract == null)
      setTimeout(() => {
        switch (premiumValidityValue) {
          case "01":
            this.percent = "12";
            break;
          case "02":
            this.percent = "14";
            break;
          case "03":
            this.percent = "18";
            break;

          default:
            break;
        }
        if (this.freelanceMakeAContractComponent != undefined) {
          this.freelanceMakeAContractComponent.percent = this.percent;
          this.freelanceMakeAContractComponent.provinceValue = this.provinceValue;
          this.freelanceMakeAContractComponent.cityValue = this.cityValue;
          this.freelanceMakeAContractComponent.branchValue = this.branchValue;
        }

      }, 500);
    else {
      switch (premiumValidityValue) {
        case "01":
          this.percent = "12";
          break;
        case "02":
          this.percent = "14";
          break;
        case "03":
          this.percent = "18";
          break;

        default:
          break;
      }
      if (this.freelanceMakeAContractComponent != undefined) {
        this.freelanceMakeAContractComponent.percent = this.percent;
        this.freelanceMakeAContractComponent.provinceValue = this.provinceValue;
        this.freelanceMakeAContractComponent.cityValue = this.cityValue;
        this.freelanceMakeAContractComponent.branchValue = this.branchValue;
      }
    }
  }
  chageCntDram(chageCntDram) {
    if (!this.checkIsTrue()) return;
    setTimeout(() => {
      if (chageCntDram) this.cntDram = "با حمایت درمان ";
      else this.cntDram = "بدون حمایت درمان ";
      if (this.freelanceMakeAContractComponent != undefined) {
        this.freelanceMakeAContractComponent.cntDrmn = this.cntDram;
        this.freelanceMakeAContractComponent.provinceValue = this.provinceValue;
        this.freelanceMakeAContractComponent.cityValue = this.cityValue;
        this.freelanceMakeAContractComponent.branchValue = this.branchValue;
      }
    }, 500);
  }

  checkExaminationValidity(examinationValidity) {
    if (!this.checkIsTrue()) return;
    if (this.contract == null)
      this.examinationValidity = examinationValidity;
    setTimeout(() => {
      if (this.freelanceMakeAContractComponent != undefined) {
        this.freelanceMakeAContractComponent.percent = this.percent;
        this.freelanceMakeAContractComponent.cntDrmn = this.cntDram;
        this.freelanceMakeAContractComponent.provinceValue = this.provinceValue;
        this.freelanceMakeAContractComponent.cityValue = this.cityValue;
        this.freelanceMakeAContractComponent.branchValue = this.branchValue;
      }
    }, 500);
    setTimeout(() => { window.scrollBy(1700, 1700); }, 0);
  }

  checkExemptionValidity(exemptionValidity) {
    if (!this.checkIsTrue()) return;
    this.exemptionValidity = exemptionValidity;
    setTimeout(() => { window.scrollBy(1500, 1500); }, 0);
  }

  onShowAggrement() {
    if (!this.checkIsTrue()) return;
    this.freelanceAgreementComponent.show(this.specialInsuredInfoComponent.getPersonalInfo());
  }

  onAgree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = true;
    this.setSes('isAgreement', this.isAgreement);
  }

  onDisagree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = false;
    this.premiumValidity = false;
    this.isAprovee = false;
    this.savedContract = false;

    this.setSes('isAgreement', this.isAgreement);
  }
  onApprove() {
    if (!this.checkIsTrue()) return;
    this.setSes("commitment1freelance", false);
    this.setSes("commitment2freelance", true);
    this.setSes("commitment3freelance", false);
    this.setSes("commitment3", false);
    this.setSes("spcPremiumRateOrginal", null);
    this.setSes("insuranceJobTitle", null);
    this.setSes("imageGUIDFreelance", null);
    this.setSes("imageGUIDFreelanceName", null);
    this.setSes("premium", null);
    this.setSes("checkedPremium", null);
    this.setSes("salary", null);
    this.isAprovee = true;
    this.setSes('isAprovee', this.isAprovee);
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
    setTimeout(() => { window.scrollBy(580, 580); }, 0);
  }

  onDeApprove() {
    if (!this.checkIsTrue()) return;
    this.isAprovee = false;
    this.setSes('isAprovee', this.isAprovee);
    this.redirectTo('/optional-insurance/update-contact/03');
  }

  methodQuesion(chkRelolap: any, chkRelolapMessage: any) {
    if (chkRelolap == "2")
      this.showQuestionBox('آیا ادامه میدهید؟', chkRelolapMessage, () => {
        this.chkRelolap = "1";
      }, () => {
        this.chkRelolap = "0";
        this.chkRelolapMessage = chkRelolapMessage;
      });
    else {
      alertify.alert(this.chkRelolapMessage);
    }
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
    if (this.chkRelolap == "0") {
      alertify.alert(this.chkRelolapMessage);
      return false;
    }
    if (this.otherContract != null) {
      alertify.alert('برای شما قرارداد بیمه اختیاری ثبت شده و مجاز به انعقاد قرارداد مشاغل آزاد نیستید.')
      return false;
    }
    return true;
  }
  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }
  redirectToContracts() {
    this.redirectTo('/optional-insurance/display-contract-history/02');
  }
}
