import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent , SearchParam , SearchOperator} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-salary-view',
  templateUrl: './sso-salary-view.component.html',
  styleUrls: ['./sso-salary-view.component.css']
})
export class SsoSalaryViewComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private _overlay = null;
  searchParams: SearchParam[];

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

  loadData(param: any) {
    return new Promise((resolve, reject) => {
      this.searchParams = [];
      this.searchParams.push({
        property: 'nationalCode',
        value: param.nationalCode,
        operator: SearchOperator.EQ
      });
        // this.searchParams.push({
    //   property: 'ticketCode',
    //   value: param.nationalCode,
    //   operator: SearchOperator.EQ

    // });

      this._overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequestAdmin , this.searchParams)
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
