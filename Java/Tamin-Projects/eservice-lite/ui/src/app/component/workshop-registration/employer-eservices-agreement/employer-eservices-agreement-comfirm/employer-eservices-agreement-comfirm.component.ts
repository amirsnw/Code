import { Component, EventEmitter, OnInit, Output, ViewChild, Injector } from '@angular/core';
import { TaminModalComponent, TaminPageBaseComponent } from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Urls } from 'src/app/settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-employer-eservices-agreement-comfirm',
  templateUrl: './employer-eservices-agreement-comfirm.component.html',
  styleUrls: ['./employer-eservices-agreement-comfirm.component.css']
})
export class EmployerEservicesAgreementComfirmComponent extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() agree = new EventEmitter();
  @Output() disagree = new EventEmitter();
  private overlay: any;
  public email = '';
  public persianNumber = '';
  public commitment1 = false;
  theForm: FormGroup;
  public idCardNumber = '';
  public lastName = '';
  public mobile = '';
  public nationalCode = '';
  public fatherName = '';
  public firstName = '';
  public newEmail = '';
  public newMobile = '';
  public router: ActivatedRoute;
  public mobileSize = false;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    this.mobileSize = window.screen.width <= 767 ? true : false;
    this.theForm = this.formBuilder.group({
      commitment1: ['']
    });
    var tiket = this.router.snapshot.params['tiket']
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.employerEservicesAgreementEmpInfo +`/${tiket}`)
        .then(data => {
          this.hideOverlay(this.overlay);
          if (data.data != null && data.data != undefined) {
            this.email = data.data.email;
            this.lastName = data.data.lastName;
            this.mobile = data.data.mobile;
            this.nationalCode = data.data.nationalCode;
            this.fatherName = data.data.fatherName;
            this.firstName = data.data.firstName;
            this.newEmail = this.getSes('employerEmail');
            this.newMobile = this.getSes('employerMobile');
          }
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          alertify.alert(error.error.data.message);
          setTimeout(() => {
            this.redirectTo('/workshop-registration/employer-eservices-agreement-aprove');
          }, 1500);
          reject(error);
        });
    });

  }
  onResize(event) {
    this.mobileSize = window.screen.width <= 767 ? true : false;
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  onAgree() {
    if (!this.commitment1) {
      alertify.alert('جهت تائید، ابتدا می بایست شرایط مذکور را قبول نمائید. ');
      return;
    }
    var email = this.getSes("employerEmail");
    if (email == null) {
      alertify.alert('پست الکترونیک وجود ندارد');
      return;
    }
    var tiket = this.router.snapshot.params['tiket']
    var mobile = this.router.snapshot.params['phoneNumber']
    const jsonData = {
      ticketCode: tiket,
      mobileNo: mobile,
      email: email
    };
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.create(Urls.employerEservicesAgreementRegister, jsonData)
        .then(data => {
          this.hideOverlay(this.overlay);
          alertify.alert('ثبت با موفقیت انجام شد.');
          setTimeout(() => {
            var urll = `/workshop-registration/employer-eservices-agreement`
            this.redirectTo(urll);
          }, 1500);
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          alertify.alert(error.error.data.message);
          reject(error);
        });
    });

  }
  onDisagree() {
    setTimeout(() => {
      var urll = `/workshop-registration/employer-eservices-agreement`
      this.redirectTo(urll);
    }, 1500);
  }
  onRollback() {
    var tiket = this.router.snapshot.params['tiket']
    var mobile = this.router.snapshot.params['phoneNumber']
    var urll = `/workshop-registration/employer-eservices-agreement-aprove-display/${tiket}/${mobile}`
    this.redirectTo(urll);
  }
  onCommitment1() {
    this.commitment1 = this.theForm.get('commitment1').value as boolean;
  }
}
