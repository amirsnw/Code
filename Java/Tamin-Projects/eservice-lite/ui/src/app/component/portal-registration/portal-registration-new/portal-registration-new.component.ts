import {Component, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {UserRegistration} from '../../../models/user-registration';
import {PortalRegistrationStepOneComponent} from '../steps/portal-registration-step-one/portal-registration-step-one.component';
import {PortalRegistrationStepTwoComponent} from '../steps/portal-registration-step-two/portal-registration-step-two.component';
import {PortalRegistrationStepThreeComponent} from '../steps/portal-registration-step-three/portal-registration-step-three.component';
import {PortalRegistrationStepFourComponent} from '../steps/portal-registration-step-four/portal-registration-step-four.component';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-portal-registration-new',
  templateUrl: './portal-registration-new.component.html',
  styleUrls: ['./portal-registration-new.component.css']
})
export class PortalRegistrationNewComponent extends TaminPageBaseComponent {

  @ViewChild('stepOne') stepOne: PortalRegistrationStepOneComponent;
  @ViewChild('stepTwo') stepTwo: PortalRegistrationStepTwoComponent;
  @ViewChild('stepThree') stepThree: PortalRegistrationStepThreeComponent;
  @ViewChild('stepFour') stepFour: PortalRegistrationStepFourComponent;
  currentStep: 'step1' | 'step2' | 'step3' | 'step4' = 'step1';
  questionsData: any;
  data = new UserRegistration();

  private _overlay: any;

  protected initializePage(): void {
    this.loadQuestions();
  }


  onEnterStepTwo(data) {
    this._overlay = this.showOverlay();
    this.isUserRegistered(data.nationalCode)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.currentStep = 'step2';
        if (data !== null) {
          this.data.nationalCode = data.nationalCode;
          this.data.mobile = data.mobile;
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error !== '') {
          this.showInfoMessageBox('پیام سیستم', reason.error);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  onEnterStepThree(data) {
    if (data !== null) {
      this.data.lastName = data.lastName;
      this.data.firstName = data.firstName;
      this.data.idNo = data.birthCertificateNumber;
      this.data.birthDate = data.birthDate;
      this.data.gender = data.gender;
    }
    this.currentStep = 'step3';
  }

  onEnterStepOne() {
    this.currentStep = 'step1';
    this.data.nationalCode = '';
    this.data.mobile = '';
  }

  onEnterStepFour(data) {
    this.currentStep = 'step4';
    if (data !== null) {
      this.data.question = data.questionOne;
      this.data.question2 = data.questionTwo;
      this.data.question3 = data.questionThree;
      this.data.answer = data.answerOne;
      this.data.answer2 = data.answerTwo;
      this.data.answer3 = data.answerThree;
      this.data.password = data.password;
      this.data.email = data.email;
    }
  }

  get nationalCode() {
    return this.data.nationalCode;
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
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('main');
        });
      });
  }


  submit() {
    this._overlay = this.showOverlay();
    this.data.confirmPassword = this.data.password;
    this.restService.create(Urls.Registration, this.data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم',
          'ثبت اطلاعات شما انجام شده و درخواست شما در حال بررسی و صحت سنجی می باشد. ممکن است روند مطابقت اطلاعات شما با پایگاههای اطلاعاتی مرجع زمانبر باشد. جهت آگاهی از روند بررسی درخواست ثبت نام می توانید از طریق دکمه پیگیری ثبت نام در صفحه اصلی سامانه اقدام نمایید. بدیهی است که نتیجه ثبت نام پس از تکمیل مراحل کاری از طریق پیامک به شما اطلاع داده خواهد شد .', () => {
            this.redirectTo('/');
          });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason && reason.error) {
          this.showErrorMessageBox('پیام سیستم', reason.error);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  isUserRegistered(nationalCode: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.restService
        .getAll(Urls.Registration + '/' + nationalCode)
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
