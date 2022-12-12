import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminPageBaseComponent, SearchParam, SearchOperator} from 'tamin-framework';
import {Urls} from '../../../../../../settings/urls';

@Component({
  selector: 'app-sso-combined-view',
  templateUrl: './sso-combined-view.component.html',
  styleUrls: ['./sso-combined-view.component.css']
})
export class SsoCombinedViewComponent extends TaminPageBaseComponent {

  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay: any;
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
      this.overlay = this.showOverlay(this.theForm.nativeElement);
      this.restService.getAll(Urls.InsuranceRequestAdmin, this.searchParams)
        .then(data => {
          this.hideOverlay(this.overlay);
          this.viewForm.patchValue(data.data);
          resolve(data);
        })
        .catch(error => {
          this.hideOverlay(this.overlay);
          reject(error);
        });
    });
  }
}
