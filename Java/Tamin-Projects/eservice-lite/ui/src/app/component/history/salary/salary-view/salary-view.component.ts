import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.css']
})
export class SalaryViewComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private _overlay = null;

  initializePage() {
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
      serial2: ['']
    });
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this._overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequest)
        .then(data => {
          this.hideOverlay(this._overlay);
          this.viewForm.patchValue(data.data);
          resolve(data);
        })
        .catch(error => {
          this.hideOverlay(this._overlay);
          reject(error);
        });
    });
  }
}
