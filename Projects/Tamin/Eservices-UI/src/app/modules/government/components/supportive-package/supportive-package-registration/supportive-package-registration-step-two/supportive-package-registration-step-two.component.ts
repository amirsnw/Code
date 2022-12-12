import {Component} from '@angular/core';
import {SupportivePackageModel} from '../../models/supportive-package-model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-supportive-package-registration-step-two',
  templateUrl: './supportive-package-registration-step-two.component.html',
  styleUrls: ['./supportive-package-registration-step-two.component.css']
})

export class SupportivePackageRegistrationStepTwoComponent extends TaminPageBaseComponent {
  public entity: SupportivePackageModel;
  theForm: FormGroup;
  banks = [];

  initializePage() {
  }

  initialize(model: SupportivePackageModel) {
    this.entity = model;
    this.theForm = this.formBuilder.group({
      nationalId: [''],
      mobile: [''],
      bank: [null],
      accountNumber: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      birthCertificateNumber: [''],
      birthDate: [''],
    });

    this.banks = [
      {name: 'بانک ملی ایران', value: '02'},
      {name: 'بانک صادرات', value: '05'},
      {name: 'بانک رفاه', value: '01'},
      {name: 'بانک ملت', value: '03'}
    ];
    this.theForm.patchValue(this.entity);
  }

  isValidToGoStepThree() {
    this.entity.mobile = this.theForm.get('mobile').value;
    this.entity.bank = this.theForm.get('bank').value;
    this.entity.accountNumber = this.theForm.get('accountNumber').value;
    this.entity.firstName = this.theForm.get('firstName').value;
    this.entity.lastName = this.theForm.get('lastName').value;
    this.entity.birthCertificateNumber = this.theForm.get('birthCertificateNumber').value;
    this.entity.birthDate = new Date(this.theForm.get('birthDate').value);
    return this.theForm.valid;
  }
}
