import { Component, EventEmitter, Output, Injector } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { ActivatedRoute } from '@angular/router';
import { Urls } from 'src/app/settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-employer-eservices-agreement-insured-info',
  templateUrl: './employer-eservices-agreement-insured-info.component.html',
  styleUrls: ['./employer-eservices-agreement-insured-info.component.css']
})

export class EmployerEservicesAgreementInsuredInfoComponent extends TaminPageBaseComponent {
  @Output() personalInfo = new EventEmitter<any>();
  private overlay: any;
  public email = '';
  public persianNumber = '';
  public idCardNumber = '';
  public lastName = '';
  public mobile = '';
  public nationalCode = '';
  public fatherName = '';
  public firstName = '';
  public newEmail = '';
  public newMobile = '';
  public router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  initializePage() {
    var tiket = this.router.snapshot.params['tiket']
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.employerEservicesAgreementEmpInfo + `/${tiket}`)
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
            this.newMobile =this.getSes('employerMobile');
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
  

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
