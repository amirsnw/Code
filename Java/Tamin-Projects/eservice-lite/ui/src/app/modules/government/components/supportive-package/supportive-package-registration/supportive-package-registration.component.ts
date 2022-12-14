import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {SupportivePackageRegistrationStepOneComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration/supportive-package-registration-step-one/supportive-package-registration-step-one.component';
import {SupportivePackageRegistrationStepTwoComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration/supportive-package-registration-step-two/supportive-package-registration-step-two.component';
import {SupportivePackageRegistrationStepThreeComponent} from 'src/app/modules/government/components/supportive-package/supportive-package-registration/supportive-package-registration-step-three/supportive-package-registration-step-three.component';
import {SupportivePackageModel} from '../models/supportive-package-model';
import {TaminPageBaseComponent, TaminProcessIndicatorComponent} from 'tamin-framework';
import {Urls} from '../../../../../settings/urls';

declare var alertify: any;

@Component({
  selector: 'app-supportive-package-registration',
  templateUrl: './supportive-package-registration.component.html',
  styleUrls: ['./supportive-package-registration.component.css']
})
export class SupportivePackageRegistrationComponent extends TaminPageBaseComponent {
  @ViewChild('processIndicator') processIndicator: TaminProcessIndicatorComponent;
  @ViewChild('stepsContainer', {read: ViewContainerRef}) container;
  @ViewChild('agreement') agreement: ElementRef;
  private _currentStep: ComponentRef<any>;
  currentHeader: string;
  currentStepNumber: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  nextStepButtonTitle: string;
  prevStepButtonTitle: string;
  entity: SupportivePackageModel;
  private overlay: any;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
    this.entity = new SupportivePackageModel();
  }

  initializePage() {
    this.title = 'سبد حمایتی دولت';
    this.processIndicator.steps = ['ثبت  کد ملی', 'ثبت اطلاعات هویتی', 'بازبینی و تایید اطلاعات'];
    this.createStep(0, 'forward');
  }

  createStep(step: number, direction: 'forward' | 'backward') {
    switch (step) {
      case 0:

        this.entity.nationalId = '';
        this.entity.captchaCode = '';
        this.entity.captchaId = '';
        this.entity.mobile = '';
        this.entity.bank = '';
        this.entity.accountNumber = '';
        this.entity.firstName = '';
        this.entity.lastName = '';
        this.entity.birthCertificateNumber = '';
        this.entity.birthDate = null;


        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory0 = this.componentFactoryResolver.resolveComponentFactory(SupportivePackageRegistrationStepOneComponent);
        const componentRef0 = this.container.createComponent(componentFactory0);
        this._currentStep = componentRef0;
        this.hasNextStep = true;
        this.hasPrevStep = false;
        this.nextStepButtonTitle = this.processIndicator.steps[1];
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 1:
        if (direction === 'forward') {
          if (!this._currentStep.instance.isValidToGoStepTwo()) {
            return;
          }
          this.entity.nationalId = (<SupportivePackageRegistrationStepOneComponent> this._currentStep.instance).nationalId;
          this.entity.captchaCode = (<SupportivePackageRegistrationStepOneComponent> this._currentStep.instance).captchaCode;
          this.entity.captchaId = (<SupportivePackageRegistrationStepOneComponent> this._currentStep.instance).captchaId;
          this.applyStepOne(this.entity.nationalId, this.entity.captchaCode, this.entity.captchaId)
            .then((value: any) => {
              this.entity.firstName = value.data.firstName;
              this.entity.lastName = value.data.lastName;
              this.container.clear();
              if (this._currentStep) {
                this._currentStep.destroy();
              }
              const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(SupportivePackageRegistrationStepTwoComponent);
              const componentRef1 = this.container.createComponent(componentFactory1);
              this._currentStep = componentRef1;
              componentRef1.instance.initialize(this.entity);
              this.hasNextStep = true;
              this.hasPrevStep = true;
              this.nextStepButtonTitle = this.processIndicator.steps[2];
              this.prevStepButtonTitle = this.processIndicator.steps[1];
              this.currentStepNumber = step;
              this.processIndicator.currentStep = step;
              this.currentHeader = this.processIndicator.steps[step];
            }).catch(reason => {
            if (reason && reason.error && reason.error.data && reason.error.data.message) {
              this.showErrorMessageBox('پیام سیستم', this.getPersianNumber(reason.error.data.message));
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            }
          });
        } else {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
          const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(SupportivePackageRegistrationStepTwoComponent);
          const componentRef1 = this.container.createComponent(componentFactory1);
          this._currentStep = componentRef1;
          componentRef1.instance.initialize(this.entity);
          this.hasNextStep = true;
          this.hasPrevStep = true;
          this.nextStepButtonTitle = this.processIndicator.steps[2];
          this.prevStepButtonTitle = this.processIndicator.steps[1];
          this.currentStepNumber = step;
          this.processIndicator.currentStep = step;
          this.currentHeader = this.processIndicator.steps[step];

        }
        break;
      case 2:
        if (!this._currentStep.instance.isValidToGoStepThree()) {
          break;
        }
        this.entity = (<SupportivePackageRegistrationStepTwoComponent> this._currentStep.instance).entity;
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(SupportivePackageRegistrationStepThreeComponent);
        const componentRef2 = this.container.createComponent(componentFactory2);
        this._currentStep = componentRef2;
        componentRef2.instance.initialize(this.entity);
        this.hasNextStep = true;
        this.hasPrevStep = true;
        this.nextStepButtonTitle = 'ذخیره اطلاعات';
        this.prevStepButtonTitle = 'تغییر اطلاعات هویتی';
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;

      case 3:
        this.entity = (<SupportivePackageRegistrationStepTwoComponent> this._currentStep.instance).entity;
        const toBeSaved = {
          nationalId: this.entity.nationalId,
          captchaId: this.entity.captchaId,
          bankCode: this.entity.bank,
          accountNumber: this.entity.accountNumber,
          firstName: this.entity.firstName,
          lastName: this.entity.lastName,
          idNumber: this.entity.birthCertificateNumber,
          birthDate: this.entity.birthDate
        };
        this.showAgreement(toBeSaved);
        break;
    }
  }


  private showAgreement(data) {
    const tmp = this.agreement.nativeElement.cloneNode(true);
    tmp.style.display = 'block';
    tmp.style = 'padding: 20px';
    alertify.confirm('توجه', tmp, () => {
      this.finalSave(data);
    }, () => {
    }).set({labels: {ok: 'موافقم', cancel: 'موافق نیستم'}, padding: false});
  }


  private finalSave(data) {
    const theUrl = Urls.Goverment_Supportive_Package_Registration_Final;
    this.overlay = this.showOverlay();
    this.restService.update<any>(theUrl, this.entity.captchaId.toString(), data)
      .then(value => {
        this.overlay = this.hideOverlay(this.overlay);
        this.showInfoMessageBox('توجه', 'اطلاعات با کد پیگیری ' + this.getPersianNumber(value.data) + ' ذخیره شد.', () => {
          this.createStep(0, 'forward');
        });

      }).catch(reason => {
      this.overlay = this.hideOverlay(this.overlay);
      if (reason && reason.error && reason.error.data && reason.error.data.message) {
        this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
      } else {
        this.showRetryBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.finalSave(data);
        }, () => {
        });
      }
    });
  }

  private applyStepOne(nationalId, captchaCode, captchaId) {
    return new Promise((resolve, reject) => {
      this.overlay = this.showOverlay();
      const theUrl = Urls.Goverment_Supportive_Package_Registration_Step_One + '/' + nationalId;
      const toBeSend = {
        capchaValue: captchaCode,
        id: captchaId,
        image: null
      };
      this.restService.create(theUrl, toBeSend)
        .then(value => {
          this.hideOverlay(this.overlay);
          resolve(value);
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          reject(reason);
        });
    });
  }
}
