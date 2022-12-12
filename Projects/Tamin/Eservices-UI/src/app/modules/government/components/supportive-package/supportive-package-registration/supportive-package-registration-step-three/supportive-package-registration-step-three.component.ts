import {Component} from '@angular/core';
import {SupportivePackageModel} from '../../models/supportive-package-model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-supportive-package-registration-step-three',
  templateUrl: './supportive-package-registration-step-three.component.html',
  styleUrls: ['./supportive-package-registration-step-three.component.css']
})
export class SupportivePackageRegistrationStepThreeComponent extends TaminPageBaseComponent {

  public entity: SupportivePackageModel;
  theForm: FormGroup;

  banks = [
    {name: 'بانک ملی ایران', value: '02'},
    {name: 'بانک صادرات', value: '05'},
    {name: 'بانک رفاه', value: '01'},
    {name: 'بانک ملت', value: '03'}
  ];

  initializePage() {

  }

  public initialize(model: SupportivePackageModel) {
    this.entity = model;
    this.theForm = this.formBuilder.group({
      nationalId: [''],
      mobile: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthCertificateNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
    this.theForm.patchValue(this.entity);
    this.theForm.get('bank').setValue(this.banks.find(c => c.value === this.entity.bank).name);
  }
}
