import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { ActivatedRoute } from '@angular/router';
import { FractionAgreementComponent } from '../fraction-agreement/fraction-agreement.component';
import { FractionCheckIstrueContractComponent } from '../fraction-check-istrue-contract/fraction-check-istrue-contract.component';
import { FractionMakeAContractComponent } from '../fraction-make-a-contract/fraction-make-a-contract.component';
import { FractionUpdateContactComponent } from '../fraction-update-contact/fraction-update-contact.component';
import { FreelanceLocationComponent } from '../freelance-location/freelance-location.component';

declare var alertify: any;

@Component({
  selector: 'app-special-insured-contract',
  templateUrl: './fraction-ofthe-moon-contract.component.html',
  styleUrls: ['./fraction-ofthe-moon-contract.component.css']
})

export class FractionOftheMoonContractComponent extends TaminPageBaseComponent {

  @ViewChild('fractionAgreementComponent') fractionAgreementComponent: FractionAgreementComponent;
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: SpecialInsuredInfoComponent;
  @ViewChild('fractionMakeAContractComponent') fractionMakeAContractComponent: FractionMakeAContractComponent;
  @ViewChild('fractionCheckIstrueContractComponent') fractionCheckIstrueContractComponent: FractionCheckIstrueContractComponent;
  @ViewChild('fractionUpdateContact') fractionUpdateContact: FractionUpdateContactComponent;
  @ViewChild('freelanceLocationComponent') freelanceLocationComponent: FreelanceLocationComponent;

  public overlay: any;
  public isAgreement = false;
  public isAprovee = false;
  public savedContract = false;
  public isSatisfied = false;
  public isInsurance = false;
  public eligibilityStatus = 0;
  public premiumValidity = false;
  public examinationValidity = false;
  public exemptionValidity = false;
  public router: ActivatedRoute;
  public ageSelected: any;
  public contract: any;
  public checkFractionMonthStatus: any;
  public provinceback: any;
  public cityback: any;
  public branchback: any;
  public mobileSize = false;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.mobileSize = window.screen.width <= 767 ? true : false;
    this.loadData();
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
  }



  loadData() {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.fractionCheckAgeAndHistory)
        .then(data => {
          this.hideOverlay(this.overlay);
          if (data !== undefined && data != null && data.data !== undefined && data.data != null) {
            this.isInsurance = data.data.isInsurance;
            if (!this.isInsurance) {
              alertify.alert('کاربر محترم این خدمت صرفا برای بیمه شدگان اصلی می باشد.');
            }
            this.ageSelected = parseInt(data.data.newAge.substring(0, 2));
            if (this.ageSelected < 18) {
              alertify.alert('سن شما کمتر از 18 سال می باشد ، امکان ارائه خدمات غیر حضوری برای شما میسر نمی باشد.');
              return;
            }
            this.checkFractionMonthStatus = data.data.checkFractionMonthStatus;
            if (data.data.checkFractionMonthStatus != "1") {
              alertify.alert(data.data.checkFractionMonthStatus);
              return;
            }
            if ([1, 2, 3, 4, 5].includes(data.data.eligibilityStatus)) {
              this.eligibilityStatus = data.data.eligibilityStatus;
              this.isSatisfied = true;
            }
            this.isAprovee = false;
            this.isAgreement = false;
            this.provinceback = data.data.provinceCode;
            this.cityback = data.data.city;
            this.branchback = data.data.organizationId;
            if (data.data.contract != null) {
              this.isAprovee = true;
              this.isAgreement = true;
              this.contract = data.data.contract;
              setTimeout(() => {
                this.freelanceLocationComponent.alldisabled = true;
                this.freelanceLocationComponent.viewForm.controls.provincdis.setValue(data.data.provinceCode);
                this.freelanceLocationComponent.viewForm.controls.citydis.setValue(data.data.city);
                this.freelanceLocationComponent.viewForm.controls.branchCodedis.setValue(data.data.organizationId);
                this.fractionCheckIstrueContractComponent.theForm.get('commitment1').setValue(false);
                this.fractionCheckIstrueContractComponent.theForm.get('commitment2').setValue(true);
                this.fractionCheckIstrueContractComponent.commitment1 = false;
                this.fractionCheckIstrueContractComponent.commitment2 = true;
                this.fractionMakeAContractComponent.theForm.get('commitment1').setValue(true);
                this.fractionMakeAContractComponent.commitment1 = true;
                this.fractionMakeAContractComponent.savedContract = true;
                this.fractionMakeAContractComponent.startDate = this.getPersianDate(new Date(this.contract.contractDate));
                this.savedContract = true;
              }, 1000);
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
    this.redirectTo('/optional-insurance/fraction-age-and-history');
  }

  checkPremiumValidity(premiumValidity) {
    if (!this.checkIsTrue()) return;
    this.premiumValidity = premiumValidity;
  }

  checkExaminationValidity(examinationValidity) {
    if (!this.checkIsTrue()) return;
    this.examinationValidity = examinationValidity;
  }

  checkExemptionValidity(exemptionValidity) {
    if (!this.checkIsTrue()) return;
    this.exemptionValidity = exemptionValidity;
  }
  onShowAggrement() {
    if (!this.checkIsTrue()) return;
    this.fractionAgreementComponent.show();
  }
  onPrintContract(exemptionValidity) {
    if (!this.checkIsTrue()) return;
    this.exemptionValidity = exemptionValidity;
  }
  onAgree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = true;
    this.setSession('isAgreement', this.isAgreement)
  }
  onDisagree() {
    if (!this.checkIsTrue()) return;
    this.isAgreement = false;
    this.setSession('isAgreement', this.isAgreement)
  }
  onApprove() {
    if (!this.checkIsTrue()) return;
    this.isAprovee = true;
    this.setSession('isAprovee', this.isAprovee)
    setTimeout(() => {
      if (this.freelanceLocationComponent != undefined) {
        this.freelanceLocationComponent.alldisabled = true;
        this.freelanceLocationComponent.viewForm.controls.provincdis.setValue(this.provinceback);
        this.freelanceLocationComponent.viewForm.controls.citydis.setValue(this.cityback);
        this.freelanceLocationComponent.viewForm.controls.branchCodedis.setValue(this.branchback);
      }
    }, 100);
  }
  onDeApprove() {
    if (!this.checkIsTrue()) return;
    this.isAprovee = false;
    this.setSession('isAprovee', this.isAprovee)
    this.redirectTo('/optional-insurance/update-contact/01');
  }
  onreloadPage() { }
  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  onSaveContract() {
    if (!this.checkIsTrue()) return;
    this.savedContract = true;
  }
  provinceValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    // this.provinceValue = value;
    // this.cityValue = null;
    // this.branchValue = null;
  }
  cityValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    // this.cityValue = value;
    // this.branchValue = null;
  }
  branchValueRequest(value: any) {
    if (!this.checkIsTrue()) return;
    // this.branchValue = value;
  }

  checkIsTrue() {
    if (!this.isInsurance) {
      alertify.alert('کاربر محترم این خدمت صرفا برای بیمه شدگان اصلی می باشد.');
      return false;
    }
    if (this.ageSelected < 18) {
      alertify.alert('سن شما کمتر از 18 سال می باشد ، امکان ارائه خدمات غیر حضوری برای شما میسر نمی باشد.');
      return false;
    }
    if (this.checkFractionMonthStatus != "1") {
      alertify.alert(this.checkFractionMonthStatus);
      return false;
    }
    return true;
  }
  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }
  redirectToContracts() {
    this.redirectTo('/optional-insurance/display-contract-history/03');
  }
}
