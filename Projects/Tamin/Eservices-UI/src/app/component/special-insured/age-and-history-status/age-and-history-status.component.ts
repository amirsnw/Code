import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { Urls } from '../../../settings/urls';
import { SpecialInsuredInfoComponent } from '../special-insured-info/special-insured-info.component';
import { RequestResultNewComponent } from 'src/app/modules/sso/components/sso-request/sso-request-details/request-result-new/request-result-new.component';

@Component({
  selector: 'app-age-and-history-status',
  templateUrl: './age-and-history-status.component.html',
  styleUrls: ['./age-and-history-status.component.css']
})

export class AgeAndHistoryStatusComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('specialInsuredInfoComponent') specialInsuredInfoComponent: SpecialInsuredInfoComponent;
  @Output() ClearForm = new EventEmitter<any>();
  public overlay: any;
  public history = '...';
  public age = '...';
  public historyDaye = '...';
  public isErrorAge = false;
  public isErrorHistoryMan = false;
  public isErrorHistoryWoman = false;
  public isError = false;
  public isErrortow = false;
  public militaryDuration = '...';

  initializePage() {
    this.viewForm = this.formBuilder.group({
      tenYearsHistory: [''],
      thirtyDaysHistory: [''],
      extraAgeHistory: [''],
      optionalContract: [''],
      militaryService: [''],
      unsatisfied: ['']
    });
    this.loadData();
  }

  loadData() {
    // return new Promise((resolve, reject) => {
    this.overlay = this.showOverlay();
    this.restService.getAll(Urls.checkAgeAndHistory)
      .then(data => {
        this.hideOverlay(this.overlay);
        if (data !== undefined && data != null && data.data !== undefined && data.data != null) {
          switch (data.data.eligibilityStatus) {
            case 1:
              this.viewForm.get('tenYearsHistory').setValue(true);
              break;
            case 2:
              this.viewForm.get('thirtyDaysHistory').setValue(true);
              break;
            case 3:
              this.viewForm.get('extraAgeHistory').setValue(true);
              this.history = data.data.history;
              this.age = data.data.newAge.toString().substr(0, 2) + ' سال و ' + data.data.newAge.toString().substr(2, 2) + ' ماه و ' +
                data.data.newAge.toString().substr(4, 2) + ' روز';
              break;
            case 4:
              this.viewForm.get('optionalContract').setValue(true);
              break;
            case 5:
              this.viewForm.get('militaryService').setValue(true);
              this.militaryDuration = data.data.militaryServiceDuration;
              break;
            default:
              this.history = data.data.history;
              if (Number(data.data.newAge) > 500000) {
                this.isErrorAge = true;
              } else {
                if (this.history == "..." || Number(this.history) < 30) {
                  setTimeout(() => {
                    var personalInfo = this.specialInsuredInfoComponent.personalModel;
                    if (personalInfo != null && personalInfo.gender != null && personalInfo.gender.genderCode != "01")
                      this.isErrorHistoryWoman = true;
                    else this.isErrorHistoryMan = true;
                  }, 1000);
                } else {
                  this.isErrorAge = true;
                }
              }
              setTimeout(() => {
                this.viewForm.get('unsatisfied').setValue(true);
                this.historyDaye = data.data.errorHistory;
                this.age = data.data.newAge.toString().substr(0, 2) + ' سال و ' + data.data.newAge.toString().substr(2, 2) + ' ماه و ' +
                  data.data.newAge.toString().substr(4, 2) + ' روز';
              }, 1000);
            // if (parseInt(data.data.newAge) > 500000) {
            //   this.isErrorAge = true;
            // } else if (parseInt(data.data.newAge) <= 500000) {
            //   if (parseInt(this.history) < 30) {
            //     var personalInfo = this.specialInsuredInfoComponent.personalModel;
            //     if (personalInfo != null && personalInfo.gender != null && personalInfo.gender.genderCode != "01")
            //       this.isErrorHistoryWoman = true;
            //     else this.isErrorHistoryMan = true;
            //   }
            // } else if (data.data.history != "0") this.isError = true;
            // else this.isErrortow = true;
          }
        } else {
          this.viewForm.get('unsatisfied').setValue(true);
        }
        // resolve();
      })
      .catch(error => {
        // this.viewForm.reset();
        this.hideOverlay(this.overlay);
        // reject(error);
        // });
      });
  }

  isEnabled() {
  }

  redirectToContractPage() {
    this.viewForm.reset();
    this.ClearForm.emit();
    this.redirectTo('/optional-insurance/contract/rollbacke');
  }
}
