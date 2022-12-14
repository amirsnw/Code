import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent , SearchParam , SearchOperator} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-occupation-view',
  templateUrl: './sso-occupation-view.component.html',
  styleUrls: ['./sso-occupation-view.component.css']
})
export class SsoOccupationViewComponent extends TaminPageBaseComponent {

  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  @ViewChild('panel') panel: ElementRef;
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
    return new Promise((resolve, reject) => {
      this._overlay = this.showOverlay(this.panel.nativeElement);
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
