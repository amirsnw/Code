import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Urls} from '../../../../settings/urls';
import {TaminPageBaseComponent} from 'tamin-framework';

@Component({
  selector: 'app-edict-payment-view',
  templateUrl: './edict-payment-view.component.html',
  styleUrls: ['./edict-payment-view.component.css']
})
export class EdictPaymentViewComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  private overlay = null;

  initializePage() {
    this.viewForm = this.formBuilder.group({
          id: [''],
          firstName: [''],
          lastName: [''],
          fatherName: [''],
          nationalId: [''],
          idCardNumber: ['']
        });
  }


  protected loadPageData(): void {
    this.restService.getAll(Urls.personal).then(value => {
      this.viewForm.patchValue(value.data);
    }).catch(reason => {});
  }

   // setData(data) {
   //   this.viewForm.patchValue(data);
   // }


  // loadData() {
  //   return new Promise((resolve, reject) => {
  //     this.overlay = this.showOverlay(this.theForm.nativeElement);
  //     this.restService.getById(Urls.PensionerInsuranceRequest, this.currentUser.nationalCode)
  //       .then(data => {
  //         this.hideOverlay(this.overlay);
  //         const tempModel = {
  //                       nationalId: data.data.insuranceSpec.nationalId,
  //                       pensionerId: data.data.pensionerId,
  //                       firstName: data.data.insuranceSpec.firstName,
  //                       lastName: data.data.insuranceSpec.lastName,
  //                       idCardNumber : data.data.insuranceSpec.idCardNumber,
  //                       insuranceNumber: data.data.insuranceSpec.id
  //                     };
  //         this.viewForm.patchValue(tempModel);
  //         resolve();
  //       })
  //       .catch(error => {
  //         this.hideOverlay(this.overlay);
  //         reject();
  //       });
  //   });
  // }

  // resetForm() {
  //   this.viewForm.reset();
  // }

  // searchFormSubmit(value, valid) {
  //
  // }

  getInsuranceNumber() {
    return this.viewForm.value['insuranceNumber'];
  }
}
