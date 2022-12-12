import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PasswordMeterComponent} from '../../../common/password-meter/password-meter.component';

@Component({
  selector: 'app-portal-registration-step-three',
  templateUrl: './portal-registration-step-three.component.html',
  styleUrls: ['./portal-registration-step-three.component.css']
})
export class PortalRegistrationStepThreeComponent extends TaminPageBaseComponent {

  @Input() questionsData = [];
  theForm: FormGroup;
  @Output() NextStep = new EventEmitter<any>();
  @Output() PrevStep = new EventEmitter<any>();
  @ViewChild('passwordMeter') passwordMeter: PasswordMeterComponent;


  private _overlay: any;
  hasError: boolean;
  errorMessages: any[];
  @Input() nationalCode: string;
  private _subscription = new Subscription();

  protected loadPageData(): void {
    document.body.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$].{7,}')]],
      passwordRepeated: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$].{7,}')]],
      answerOne: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      answerTwo: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      answerThree: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      questionOne: ['', [Validators.required]],
      questionTwo: ['', [Validators.required]],
      questionThree: ['', [Validators.required]],
      passwordComplexity: [''],
    });

    this._subscription.add(this.theForm.get('password').valueChanges.subscribe(value => {
      this.passwordMeter.checkPassword(value);
    }));

  }

  onNextStep() {
    this.validateData();
    if (!this.hasError) {
      this.NextStep.emit(this.theForm.value);
    }
  }

  onPrevStep() {
    this.PrevStep.emit();
  }

  validateData() {
    this.hasError = false;
    this.errorMessages = [];

    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.hasError = true;
      return;
    }

    const password = this.theForm.get('password').value;
    const passwordHasUppercase = /[A-Z]/.test(password);
    const passwordHasLowercase = /[a-z]/.test(password);
    const passwordHasNumbers = /\d/.test(password);
    const passwordHasNotNationalNumber = !password.includes(this.nationalCode);
    const passwordStartsWithLetter = /^[a-zA-Z]+[a-zA-Z0-9]*$/.test(password);
    if (!passwordHasUppercase || !passwordHasLowercase || !passwordHasNumbers || !passwordStartsWithLetter || !passwordHasNotNationalNumber) {
      this.hasError = true;
      this.errorMessages.push('شرایط گذرواژه رعایت نشده است');
      if (!passwordHasNotNationalNumber) {
        this.errorMessages.push('گذرواژه نمی تواند شامل کد ملی باشد');
      }
    }

    const questions = [
      this.theForm.get('questionOne').value,
      this.theForm.get('questionTwo').value,
      this.theForm.get('questionThree').value
    ];

    const sorted_questions = questions.slice().sort();
    const questions_results = [];
    for (let i = 0; i < sorted_questions.length - 1; i++) {
      if (sorted_questions[i + 1] === sorted_questions[i]) {
        questions_results.push(sorted_questions[i]);
      }
    }

    const answers = [
      this.theForm.get('answerOne').value,
      this.theForm.get('answerTwo').value,
      this.theForm.get('answerThree').value
    ];

    const sorted_answers = answers.slice().sort();
    const answers_results = [];
    for (let i = 0; i < sorted_answers.length - 1; i++) {
      if (sorted_answers[i + 1] === sorted_answers[i]) {
        answers_results.push(sorted_answers[i]);
      }
    }

    if (questions_results.length !== 0) {
      this.hasError = true;
      this.errorMessages.push('پرسش های امنیتی نمی توانند تکراری باشند.');
    }

    if (answers_results.length !== 0) {
      this.hasError = true;
      this.errorMessages.push('جواب پرسش های امنیتی نمی توانند تکراری باشند.');
    }

    if (this.theForm.get('password').value !== this.theForm.get('passwordRepeated').value) {
      this.hasError = true;
      this.errorMessages.push('گذرواژه و تکرار آن یکسان نمی باشد.');
    }
  }

  showPassword() {
    this.showInfoMessageBox('نمایش گذرواژه', this.theForm.get('password').value);
  }
}
