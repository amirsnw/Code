import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-portal-registration-step-two',
  templateUrl: './portal-registration-step-two.component.html',
  styleUrls: ['./portal-registration-step-two.component.css']
})
export class PortalRegistrationStepTwoComponent extends TaminPageBaseComponent{

  theForm: FormGroup;
  @Output() NextStep = new EventEmitter<any>();
  @Output() PrevStep = new EventEmitter<any>();
  genders = [{name: 'زن', value: 'f'}, {name: 'مرد', value: 'm'}];

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      birthCertificateNumber: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  protected loadPageData(): void {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  onNextStep() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }
    this.NextStep.emit(this.theForm.value);
  }

  onPrevStep() {
    this.theForm.reset();
    this.PrevStep.emit();
  }
}
