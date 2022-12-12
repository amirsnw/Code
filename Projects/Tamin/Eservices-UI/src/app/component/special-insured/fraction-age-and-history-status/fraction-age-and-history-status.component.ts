import { Component, EventEmitter, Output } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { FormGroup } from '@angular/forms';
import { Urls } from '../../../settings/urls';

@Component({
  selector: 'app-fraction-age-and-history-status',
  templateUrl: './fraction-age-and-history-status.component.html',
  styleUrls: ['./fraction-age-and-history-status.component.css']
})

export class FractionAgeAndHistoryStatusComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @Output() ClearForm = new EventEmitter<any>();
  public overlay: any;
  public history = '0';
  public age = '...';
  public historyDaye = '...';
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
      var nationalCodeSelected = this.getSes('setNationalCode') != null ? '/' + this.getSes('setNationalCode') : '/3780709775';
      this.restService.getAll(Urls.fractionCheckAgeAndHistory )
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
                // if (data.data.history == "0")
              this.isError = true;
              setTimeout(() => {
                this.viewForm.get('unsatisfied').setValue(true);
                // else this.isErrortow = true;
                this.historyDaye = data.data.errorHistory
                this.age = data.data.newAge.toString().substr(0, 2) + ' سال و ' + data.data.newAge.toString().substr(2, 2) + ' ماه و ' +
                  data.data.newAge.toString().substr(4, 2) + ' روز';
              }, 1000);
            }
          } else {
            this.viewForm.get('unsatisfied').setValue(true);
          }
          // resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          // this.viewForm.reset();
          // reject(error);
        });
    // });
  }

  isEnabled() {
  }

  redirectToContractPage() {
    this.viewForm.reset();
    this.ClearForm.emit();
    this.redirectTo('/optional-insurance/fraction/rollbacke');
  }
  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}
