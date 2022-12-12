import { Component, Injector, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { ActivatedRoute } from '@angular/router';
import { FractionAgreementComponent } from '../fraction-agreement/fraction-agreement.component';
import { FractionCheckIstrueContractComponent } from '../fraction-check-istrue-contract/fraction-check-istrue-contract.component';
import { FormGroup } from '@angular/forms';

declare var alertify: any;

@Component({
  selector: 'app-fraction-set-nationalcode',
  templateUrl: './fraction-set-nationalcode.component.html',
  styleUrls: ['./fraction-set-nationalcode.component.css']
})

export class FractionSetNationalcodeComponent extends TaminPageBaseComponent {

  @ViewChild('fractionAgreementComponent') fractionAgreementComponent: FractionAgreementComponent;
  @ViewChild('fractionCheckIstrueContractComponent') fractionCheckIstrueContractComponent: FractionCheckIstrueContractComponent;

  theForm: FormGroup;
  public overlay: any;
  public isAgreement = false;
  public isAprovee = false;
  public isSatisfied = false;
  public eligibilityStatus = 0;
  public premiumValidity = false;
  public examinationValidity = false;
  public exemptionValidity = false;
  public router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.theForm = this.formBuilder.group({
      month: ['']
    });
  }

  

  onCalcPremium() {
    var nationalCodeSelected= this.theForm.get('month').value;
    if(nationalCodeSelected==""||nationalCodeSelected==undefined||nationalCodeSelected==null||nationalCodeSelected==''){
      alertify.alert('کدملی را وارد کنید!');
      return;
    }
    this.setSession('setNationalCode',nationalCodeSelected);
    alertify.alert('کدملی وارد شد.');
  }

  
  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
