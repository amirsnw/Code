import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../../../settings/urls';
import {TaminPageBaseComponent  , SearchParam , SearchOperator} from 'tamin-framework';

@Component({
  selector: 'app-sso-complete-view',
  templateUrl: './sso-complete-view.component.html',
  styleUrls: ['./sso-complete-view.component.css']
})

export class SsoCompleteViewComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay = null;
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
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequestAdmin , this.searchParams)
        .then(data => {
          this.hideOverlay(this.overlay);
          this.viewForm.patchValue(data.data);
          resolve();
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
}
