import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchOperator, SearchParam, SortDirection, SortParam, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent, TaminValidators, WizardNavigationData} from 'tamin-framework';
import {Urls} from '../../settings/urls';
import {Subscription} from 'rxjs';
import {UserRegistration} from '../../models/user-registration';
import {PasswordMeterComponent} from '../common/password-meter/password-meter.component';

@Component({
  selector: 'app-portal-registration',
  templateUrl: './portal-registration.component.html',
  styleUrls: ['./portal-registration.component.css']
})
export class PortalRegistrationComponent extends TaminPageBaseComponent {
  @ViewChild('provincesDataGrid') provincesDataGrid: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('passwordMeter') passwordMeter: PasswordMeterComponent;
  currentState: 'step1' | 'step2' | 'step3' | 'step4' = 'step1';
  genders = [{name: 'زن', value: 'f'}, {name: 'مرد', value: 'm'}];
  nationalities = [{name: 'ایرانی', value: '0'}, {name: 'غیر ایرانی', value: '1'}];
  countries = [];
  provinces = [];
  preview = {
    nationalCode: '',
    mobile: '',
    lastName: '',
    firstName: '',
    birthCertificateNumber: '',
    birthDate: '',
    gender: '',
    country: '',
    provinceCity: '',
    email: '',
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    answerFour: '',
  };

  questionsData = [];

  formStepOne: FormGroup;
  formStepTwo: FormGroup;

  stepOneHasError = false;
  stepTwoHasError = false;
  stepThreeHasError = false;

  stepOneErrorMessages = [];
  stepTwoErrorMessages = [];
  stepThreeErrorMessages = [];

  private _overlay;
  private subscription = new Subscription();

  protected initializePage(): void {
    this.initialFormStepOne();
    this.initialFormStepTwo();
    this.initializeCountriesDataGrid();
    // this.initializeProvincesDataGrid();
    this.loadQuestions();
    this.fetchCountries();

  }

  loadQuestions() {
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.RegistrationQuestions)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.questionsData = value.data.list;
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
      });
  }

  onSumitStepOne() {
    this._markFormOneGroupTouched();
    if (!this.formStepOne.valid) {
      return;
    }

    const data = new UserRegistration();
    data.nationalCode = this.formStepOne.get('NationalCode').value;
    data.mobile = this.formStepOne.get('mobile').value;

    this._overlay = this.showOverlay();

    this.restService.create(Urls.RegistrationStepOne, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.stepOneHasError = false;
        this.stepOneErrorMessages = [];
        this.formStepTwo.patchValue((<any>value).data);
        this.currentState = 'step2';
      })
      .catch((reason) => {
        this.hideOverlay(this._overlay);
        if (reason && reason.error) {
          this.showErrorMessageBox('پیام سیستم', reason.error, () => {
            this.formStepOne.reset();
          });
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });

    // this.currentState = 'step2';
    // this.changeDetectorRef.detectChanges();
    // window.scrollTo(0, 0);
    // this.formStepTwo.patchValue({
    //   nationalCode: data.nationalCode,
    //   mobile: data.mobile
    // });
  }

  private initialFormStepOne() {
    this.formStepOne = this.formBuilder.group({
      NationalCode: ['', [Validators.required, TaminValidators.nationalId]],
      mobile: ['', [Validators.required, Validators.minLength(11)]]
    });
  }

  private initialFormStepTwo() {
    this.formStepTwo = this.formBuilder.group({
      id: [''],
      lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      nationalCode: ['', [TaminValidators.nationalId]],
      birthCertificateNumber: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: [''],
      provinceCity: [''],
      nationality: ['', [Validators.required]],
      email: ['', [Validators.email]],
      mobile: [''],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$].{7,}')]],
      passwordRepeated: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$].{7,}')]],
      answerOne: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      answerTwo: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      answerThree: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      questionOne: ['', [Validators.required]],
      questionTwo: ['', [Validators.required]],
      questionThree: ['', [Validators.required]],
      passwordComplexity: [''],
    });

    this.subscription.add(this.formStepTwo.get('password').valueChanges.subscribe(value => {
      this.passwordMeter.checkPassword(value);
    }));

    this.subscription.add(this.formStepTwo.get('country').valueChanges.subscribe(value => {
      this.formStepTwo.get('provinceCity').setValue('');
      this.fetchProvinces(value);
    }));

    this.subscription.add(this.formStepTwo.get('nationality').valueChanges.subscribe(value => {
      this.formStepTwo.get('country').setValue('');
    }));
  }

  private stepOneChanging() {
    this._markFormOneGroupTouched();
    if (!this.formStepOne.valid) {
      return;
    }

    const data = new UserRegistration();
    data.nationalCode = this.formStepOne.get('NationalCode').value;
    data.mobile = this.formStepOne.get('mobile').value;

    this._overlay = this.showOverlay();
    this.restService.create(Urls.RegistrationStepOne, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.stepOneHasError = false;
        this.stepOneErrorMessages = [];
        this.formStepTwo.patchValue((<any>value).data);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.stepOneHasError = true;
        if (reason && reason.error) {
          this.showErrorMessageBox('پیام سیستم', reason.error);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  private stepTwoChanging() {
    this._markFormOneGroupTouched();
    if (!this.formStepTwo.valid) {
      return;
    }

    const data = new UserRegistration();

    data.id = this.formStepTwo.get('id').value;
    data.firstName = this.formStepTwo.get('firstName').value;
    data.lastName = this.formStepTwo.get('lastName').value;
    data.email = this.formStepTwo.get('email').value;
    data.password = this.formStepTwo.get('password').value;
    data.confirmPassword = this.formStepTwo.get('passwordRepeated').value;
    data.gender = this.formStepTwo.get('gender').value;
    data.nationalCode = this.formStepTwo.get('nationalCode').value;
    data.mobile = this.formStepTwo.get('mobile').value;
    data.birthDate = new Date(this.formStepTwo.get('birthDate').value).getTime();
    data.idNo = this.formStepTwo.get('birthCertificateNumber').value;
    data.city = this.formStepTwo.get('provinceCity').value;
    data.country = this.formStepTwo.get('country').value.code;
    data.question = '';
    data.answer = '';
    data.question2 = '';
    data.answer2 = '';
    data.question3 = '';
    data.answer3 = '';
  }

  onStepChanging(wizardNavigationData: WizardNavigationData) {

    switch (wizardNavigationData.currentStep) {
      case 0:
        this.stepOneChanging();
        break;
      case 1:
        if (wizardNavigationData.direction === 'backward') {
          // this.theWizard.setPrev();
          // this.theWizard.refresh();
        } else {
          this.stepTwoChanging();
          // this.theWizard.setNext();
          // this.theWizard.refresh();
        }
        break;
    }
  }

  private _markFormOneGroupTouched() {
    (<any>Object).values(this.formStepOne.controls).forEach(control => control.markAsTouched());
  }

  private _markFormTwoGroupTouched() {
    (<any>Object).values(this.formStepTwo.controls).forEach(control => control.markAsTouched());
  }

  private initializeCountriesDataGrid() {
  }

  onCancelStepTwo() {
    this.currentState = 'step1';
    this.formStepOne.reset();
    this.formStepOne.clearValidators();
    this.formStepTwo.reset();
    this.formStepTwo.clearValidators();
  }

  onCancelStepThree() {
    this.currentState = 'step2';
  }

  onShowPreview() {
    this.stepTwoHasError = false;
    this.stepTwoErrorMessages = [];
    this._markFormTwoGroupTouched();
    const questions = [
      this.formStepTwo.get('questionOne').value,
      this.formStepTwo.get('questionTwo').value,
      this.formStepTwo.get('questionThree').value];
    const sorted_questions = questions.slice().sort();
    const questions_results = [];
    for (let i = 0; i < sorted_questions.length - 1; i++) {
      if (sorted_questions[i + 1] === sorted_questions[i]) {
        questions_results.push(sorted_questions[i]);
      }
    }

    const answers = [
      this.formStepTwo.get('answerOne').value,
      this.formStepTwo.get('answerTwo').value,
      this.formStepTwo.get('answerThree').value];
    const sorted_answers = answers.slice().sort();
    const answers_results = [];
    for (let i = 0; i < sorted_answers.length - 1; i++) {
      if (sorted_answers[i + 1] === sorted_answers[i]) {
        answers_results.push(sorted_answers[i]);
      }
    }

    if (questions_results.length !== 0) {
      this.stepTwoHasError = true;
      this.stepTwoErrorMessages.push('پرسش های امنیتی نمی تونند تکراری باشند');
    }

    if (answers_results.length !== 0) {
      this.stepTwoHasError = true;
      this.stepTwoErrorMessages.push('جواب پرسش های امنیتی نمی تونند تکراری باشند');
    }

    if (this.formStepTwo.get('password').value !== this.formStepTwo.get('passwordRepeated').value) {
      this.stepTwoHasError = true;
      this.stepTwoErrorMessages.push('گذرواژه و تکرار آن یکسان نمی باشد');
    }

    const passwordHasUppercase = /[A-Z]/.test(this.formStepTwo.get('password').value);
    const passwordHasLowercase = /[a-z]/.test(this.formStepTwo.get('password').value);
    const passwordHasNumbers = /\d/.test(this.formStepTwo.get('password').value);
    const passwordHasNotNationalNumber = !this.formStepTwo.get('password').value.includes(this.formStepOne.get('NationalCode').value);
    const passwordStartsWithLetter = /^[a-zA-Z]+[a-zA-Z0-9]*$/.test(this.formStepTwo.get('password').value);
    if (!passwordHasUppercase || !passwordHasLowercase || !passwordHasNumbers || !passwordStartsWithLetter || !passwordHasNotNationalNumber) {
      this.stepTwoHasError = true;
      this.stepTwoErrorMessages.push('شرایط گذرواژه رعایت نشده است');
      if (!passwordHasNotNationalNumber) {
        this.stepTwoErrorMessages.push('گذرواژه نمی تواند شامل کد ملی باشد');
      }
    }

    if (this.stepTwoHasError || !this.formStepTwo.valid) {
      this.markFormGroupAsTouched(this.formStepTwo);
      const elmnt = document.querySelector('#stepTwoError');
      return;
    }

    this.preview.nationalCode = this.formStepOne.get('NationalCode').value;
    this.preview.mobile = this.formStepOne.get('mobile').value;
    this.preview.lastName = this.formStepTwo.get('lastName').value;
    this.preview.firstName = this.formStepTwo.get('firstName').value;
    this.preview.birthCertificateNumber = this.formStepTwo.get('birthCertificateNumber').value;
    this.preview.birthDate = this.getPersianDate(new Date(this.formStepTwo.get('birthDate').value));
    this.preview.gender = this.formStepTwo.get('gender').value === 'f' ? 'زن' : 'مرد';
    if (this.formStepTwo.get('country').value === '') {
      this.preview.country = 'ایران';
    } else {
      this.preview.country = this.countries.find(c => c.value === this.formStepTwo.get('country').value).name;
    }
    // this.preview.provinceCity = this.formStepTwo.get('provinceCity').value;
    this.preview.email = this.formStepTwo.get('email').value;
    this.preview.answerOne = this.formStepTwo.get('answerOne').value;
    this.preview.answerTwo = this.formStepTwo.get('answerTwo').value;
    this.preview.answerThree = this.formStepTwo.get('answerThree').value;
    this.currentState = 'step3';
  }

  protected destroyPage(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const data = new UserRegistration();
    data.id = this.formStepTwo.get('id').value;
    data.firstName = this.formStepTwo.get('firstName').value;
    data.lastName = this.formStepTwo.get('lastName').value;
    data.email = this.formStepTwo.get('email').value;
    if (data.email === undefined || data.email === null || data.email === '') {
      data.email = 'test@test.test';
    }
    data.gender = this.formStepTwo.get('gender').value;
    data.nationalCode = this.formStepTwo.get('nationalCode').value;
    data.mobile = this.formStepTwo.get('mobile').value;
    data.birthDate = new Date(this.formStepTwo.get('birthDate').value).getTime();
    data.question = this.formStepTwo.get('questionOne').value;
    data.question2 = this.formStepTwo.get('questionTwo').value;
    data.question3 = this.formStepTwo.get('questionThree').value;
    data.answer = this.formStepTwo.get('answerOne').value;
    data.answer2 = this.formStepTwo.get('answerTwo').value;
    data.answer3 = this.formStepTwo.get('answerThree').value;
    data.idNo = this.formStepTwo.get('birthCertificateNumber').value;
    data.city = this.formStepTwo.get('provinceCity').value;
    data.country = this.formStepTwo.get('country').value;
    data.password = this.formStepTwo.get('password').value;
    data.confirmPassword = this.formStepTwo.get('passwordRepeated').value;

    this._overlay = this.showOverlay();
    this.restService.update<UserRegistration>(Urls.RegistrationStepOne, data.id.toString(), data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.stepOneHasError = false;
        this.stepOneErrorMessages = [];
        this.formStepTwo.patchValue((<any>value).data);
        this.currentState = 'step4';
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.stepThreeHasError = true;
        if (reason && reason.error) {
          this.stepThreeErrorMessages = [reason.error];
        } else {
          this.stepThreeErrorMessages = ['سیستم قادر به برقراری ارتباط با سرویس دهنده مرکزی نمی باشد'];
        }
      });
  }

  private fetchCountries() {
    const sortParam = new SortParam();
    sortParam.direction = SortDirection.ASC;
    sortParam.property = 'title';
    this.restService.getAll(Urls.RegistrationCountries, null, [sortParam])
      .then(value => {
        (<Array<any>>value.data.list).forEach(value1 => {
          if (value1.code !== '0001') {
            this.countries.push({name: value1.title, value: value1.code});
          }
        });
      })
      .catch(reason => {
      });
  }

  private fetchProvinces(parentCode: string) {
    this.provinces = [];

    const sortParam = new SortParam();
    sortParam.direction = SortDirection.ASC;
    sortParam.property = 'title';

    const searchParam1 = new SearchParam();
    searchParam1.property = 'type.code';
    searchParam1.operator = SearchOperator.EQUAL;
    searchParam1.value = '03';

    const searchParam2 = new SearchParam();
    searchParam2.property = 'parent.code';
    searchParam2.operator = SearchOperator.EQUAL;
    searchParam2.value = parentCode;


    this.restService.getAll(Urls.RegistrationProvinces, [searchParam1, searchParam2], [sortParam])
      .then(value => {
        (<Array<any>>value.data.list).forEach(value1 => {
          if (value1.code !== '0001') {
            this.provinces.push({name: value1.title, value: value1.code});
          }
        });
      })
      .catch(reason => {
      });
  }

  getQuestionText(id) {
    const tmp = this.questionsData.find(c => c.questionId === id);
    if (tmp) {
      return tmp.questionDesc;
    }
  }
}
