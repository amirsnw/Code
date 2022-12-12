import {Component, EventEmitter, Output} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-age-and-history-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})

export class PaymentStatusComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @Output() ClearForm = new EventEmitter<any>();
  private overlay: any;
  public history = '...';
  public age = '...';
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
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      this.restService.getAll(Urls.checkAgeAndHistory )
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
                this.age = data.data.age.toString().substr(0, 2) + ' سال و ' + data.data.age.toString().substr(2, 2) + ' ماه و ' +
                  data.data.age.toString().substr(4, 2) + ' روز';
                break;
              case 4:
                this.viewForm.get('optionalContract').setValue(true);
                break;
              case 5:
                this.viewForm.get('militaryService').setValue(true);
                this.militaryDuration = data.data.militaryServiceDuration;
                break;
              default:
                this.viewForm.get('unsatisfied').setValue(true);
            }
          } else {
            this.viewForm.get('unsatisfied').setValue(true);
          }
          resolve();
        })
        .catch(error => {
          this.viewForm.getRawValue().reset();
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }

  isEnabled() {
  }

  redirectToContractPage() {
    this.viewForm.reset();
    this.ClearForm.emit();
    this.redirectTo('/optional-insurance/contract');
  }
}
