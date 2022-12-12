import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {Router} from '@angular/router';
import {GuardianInitializeService} from '../guardian-initialize.service';

@Component({
  selector: 'app-guardian-ins-info',
  templateUrl: './guardian-ins-info.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianInsInfoComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay = null;
  branchWorkshop = [];
  ssoNationalCode: string;
  ssoTicket: string;
  isSSO: boolean;

  constructor(injector: Injector, private router: Router, private guardianInitService: GuardianInitializeService) {
    super(injector);
  }

  initializePage() {
    // this.loadBranchData();
    this.viewForm = this.formBuilder.group({
      insuranceNumber: [''],
      nationalID: [''],
      birthDate: [''],
      firstName: [''],
      lastName: [''],
      fatherName: [''],
      identityNumber: [''],
      issueplaceName: [''],
      serial1: [''],
      serial2: [''],
      branchCode: ['', Validators.required]
    });
  }

  loadData() {
    this.overlay = this.showOverlay(this.theForm.nativeElement);
    if (this.isSSO) {
      this.restService.getAll(this.isSSO ? `${Urls.InsuranceRequest_SSO}/${this.ssoNationalCode}/${this.ssoTicket}`
        : Urls.InsuranceRequest).then(data => {
        this.hideOverlay(this.overlay);
        this.viewForm.patchValue(data.data);
      }).catch(error => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('sso/guardian');
        });
      });
    } else {
      this.guardianInitService.infoResult.then(data => {
        this.hideOverlay(this.overlay);
        this.viewForm.patchValue(data.data);
      }).catch(error => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      });
    }
  }
}
