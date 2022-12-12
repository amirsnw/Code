import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-portal-registration-step-one',
  templateUrl: './portal-registration-step-one.component.html',
  styleUrls: ['./portal-registration-step-one.component.css']
})
export class PortalRegistrationStepOneComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  @Output() NextStep = new EventEmitter<any>();

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, TaminValidators.nationalId]],
      mobile: ['', [Validators.required, Validators.minLength(11)]]
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

  downloadPdf() {
    const a = document.createElement('a');
    const url = 'assets/pdfs/helpRegistration.pdf';
    a.href = url;
    a.download = 'راهنمای ثبت نام.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

}
