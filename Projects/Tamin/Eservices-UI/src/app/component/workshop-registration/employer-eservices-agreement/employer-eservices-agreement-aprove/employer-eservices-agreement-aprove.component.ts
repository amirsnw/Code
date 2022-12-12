import { Component, Injector, ViewChild, HostListener } from '@angular/core';
import { TaminPageBaseComponent, SearchParam, SearchOperator, TaminDataGridComponent, TaminDataGridConfigurationFactory, DataColumnViewType } from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { EmployerEservicesAgreementInsuredInfoComponent } from '../employer-eservices-agreement-insured-info/employer-eservices-agreement-insured-info.component';
import { Urls } from 'src/app/settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-employer-eservices-agreement-aprove',
  templateUrl: './employer-eservices-agreement-aprove.component.html',
  styleUrls: ['./employer-eservices-agreement-aprove.component.css']
})

export class EmployerEservicesAgreementAproveComponent extends TaminPageBaseComponent {

  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: EmployerEservicesAgreementInsuredInfoComponent;

  private overlay: any;
  public isApprove = false;
  public isAgreement = false;
  public savedContract = true;
  public isSatisfied = false;
  private eligibilityStatus = 0;
  private premiumValidity = false;
  private examinationValidity = false;
  private exemptionValidity = false;
  public mobileSize = false;
  public router: ActivatedRoute;
  private isinsurance = true;
  searchParams: SearchParam[];
  contractSearchForm: FormGroup;
  contractSearchFormTiket: FormGroup;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this._initializeFromGroupSearch();
    this.mobileSize = window.screen.width <= 767 ? true : false;
    this.contractSearchForm.get('tiket').valueChanges.subscribe(value => { this.textChange(); });
    // if (this.getSes("employerTiket") != null) this.isApprove = true;

  }


  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }

  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }


  oSendtiket() {
    this.searchParams = new Array<SearchParam>();
    const mobile = this.contractSearchForm.get('mobile').value;
    const email = this.contractSearchForm.get('email').value;
    if (mobile == undefined && mobile == '' && mobile == null) {
      alertify.alert('وارد نمودن تلفن همراه الزامیست!');
      return;
    }
    if (email == undefined && email == '' && email == null) {
      alertify.alert('وارد نمودن پست الکترونیک الزامیست!');
      return;
    }
    this.searchParams.push({
      property: 'mobileNumber',
      value: mobile,
      operator: SearchOperator.EQ

    });
    this.searchParams.push({
      property: 'serviceName',
      value: "employerEservicesAgreement",
      operator: SearchOperator.EQ

    });
    var url = Urls.employerEservicesAgreementRequestTicket;
    this.overlay = this.showOverlay();
    this.restService.getAll(url, this.searchParams)
      // this.restService.getAll(Urls.fractionCheckIsActive+nationalCodeSelected)
      .then(data => {
        this.hideOverlay(this.overlay);
        alertify.alert('بلیط امنیتی برای شماره همراه وارد شده ارسال گردید. در صورت عدم دریافت بلیط امنیتی در مدت زمان بیش از 2 دقیقه، نسبت به زدن مجدد دکمه ارسال پیامک اعتبار سنجی اقدام نمائید.')
      })
      .catch(error => {
        this.hideOverlay(this.overlay);
        alertify.alert(error.error.data.message);
      });
  }

  rollback() {

  }

  private _initializeFromGroupSearch() {
    this.contractSearchForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      tiket: ['']
    });
  }
  onAprove() {
    const mobile = this.contractSearchForm.get('mobile').value;
    const email = this.contractSearchForm.get('email').value;
    const tiket = this.contractSearchForm.get('tiket').value;
    if (mobile == undefined || mobile == '' || mobile == null) {
      alertify.alert('وارد نمودن تلفن همراه الزامیست!');
      return;
    }
    if (email == undefined || email == '' || email == null) {
      alertify.alert('وارد نمودن پست الکترونیک الزامیست!');
      return;
    }
    if (tiket == undefined || tiket == '' || tiket == null) {
      alertify.alert('کد امنیتی پیامک شده را وارد نمائید!');
      return;
    }
    this.setSession("employerEmail", email);
    this.setSession("employerMobile", mobile);
    this.setSession("employerTiket", tiket);
    var urll = `/workshop-registration/employer-eservices-agreement-aprove-display/${tiket}/${mobile}`
    this.redirectTo(urll);

  }
  onRollback() {
    var urll = `/workshop-registration/employer-eservices-agreement`
    this.redirectTo(urll);
  }
  textChange(){
    var tiket=this.contractSearchForm.get('tiket').value;
    if(tiket==null ||tiket==undefined||tiket =='' ||tiket =="")   this.isApprove=false;
    else this.isApprove=true;
  }
}
