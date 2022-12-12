import {Component, ComponentFactoryResolver, ComponentRef, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {PersonalComponent} from '../personal/personal.component';
import {TaminPageBaseComponent, TaminProcessIndicatorComponent} from 'tamin-framework';
import {RequestRelationTaminComponent} from '../request-relation-tamin/request-relation-tamin.component';
import {DocumentComponent} from '../document/document.component';
import {SubdomainListComponent} from '../subdomain/subdomain-list/subdomain-list.component';
import {PersonalInformationComponent} from '../personal-information/personal-information.component';
import {ApproveComponent} from '../approve/approve.component';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.css']
})
export class RegistrationContainerComponent extends TaminPageBaseComponent {
  @ViewChild('processIndicator') processIndicator: TaminProcessIndicatorComponent;
  @ViewChild('stepsContainer', {read: ViewContainerRef}) container;
  theCurrentUser: any;
  currentHeader: string;
  currentStepNumber: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  nextStepButtonTitle: string;
  prevStepButtonTitle: string;
  personalId: string;
  private _overlay: any;
  private _currentStep: ComponentRef<any>;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }


  loadCurrentUser() {
    this._overlay = this.showOverlay();
    this.securityService.getCurrentUser()
      .then(value => {
        this.hideOverlay(this._overlay);
        this.theCurrentUser = value;
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showRetryBox(
          'پیام سیستم', this.constants.getNetworkErrorMessage()
          , () => {
            this.loadCurrentUser();
          }, () => {
            this.redirectTo('');
          });
      });
  }

  initializePage() {
    this.processIndicator.steps = [
      'ثبت اطلاعات هویتی',
      'ثبت اطلاعات بیمه ای',
      'افراد تحت پوشش',
      'اطلاعات تکمیلی',
      'بارگذاری مدارک',
      'بازبینی و تایید اطلاعات'
    ];

    this.loadCurrentUser();

    this.createStep(0, 'forward');
  }

  createStep(step: number, direction: 'forward' | 'backward') {
     
    switch (step) {
      case 0:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory0 = this.componentFactoryResolver.resolveComponentFactory(PersonalComponent);
        const componentRef0 = this.container.createComponent(componentFactory0);
        componentRef0.instance.personalid = this.personalId;
        this._currentStep = componentRef0;
        // componentRef0.instance.initializePage();
        this.hasNextStep = true;
        this.hasPrevStep = false;
        this.nextStepButtonTitle = 'مرحله بعد'; // this.processIndicator.steps[1];
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 1:
        if (direction === 'backward') {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
          const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(RequestRelationTaminComponent);
          const componentRef1 = this.container.createComponent(componentFactory1);
          this._currentStep = componentRef1;
          componentRef1.instance.initialize(this.personalId);
          this.hasNextStep = true;
          this.hasPrevStep = true;
          this.nextStepButtonTitle = 'مرحله بعد'; // this.processIndicator.steps[2];
          this.prevStepButtonTitle = 'مرحله قبل'; // this.processIndicator.steps[0];
          this.currentStepNumber = step;
          this.processIndicator.currentStep = step;
          this.currentHeader = this.processIndicator.steps[step];
        }
        if (direction === 'forward') {
          (<PersonalComponent>this._currentStep.instance)
            .confirmStepOneClick().then(value => {
            this.personalId = value;
            this.container.clear();
            if (this._currentStep) {
              this._currentStep.destroy();
            }
            const componentFactory11 = this.componentFactoryResolver.resolveComponentFactory(RequestRelationTaminComponent);
            const componentRef11 = this.container.createComponent(componentFactory11);
            this._currentStep = componentRef11;
            componentRef11.instance.initialize(this.personalId);
            this.hasNextStep = true;
            this.hasPrevStep = true;
            this.nextStepButtonTitle = 'مرحله بعد'; // this.processIndicator.steps[2];
            this.prevStepButtonTitle = 'مرحله قبل'; // this.processIndicator.steps[0];
            this.currentStepNumber = step;
            this.processIndicator.currentStep = step;
            this.currentHeader = this.processIndicator.steps[step];
          })
            .catch(reason => {
              // console.log(reason);
            });
        }
        break;
      case 2:

        if (direction === 'backward') {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
          const componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(SubdomainListComponent);
          const componentRef2 = this.container.createComponent(componentFactory2);
          this._currentStep = componentRef2;
          componentRef2.instance.initialize(this.personalId);
          this.hasNextStep = true;
          this.hasPrevStep = true;
          /*this.nextStepButtonTitle = this.processIndicator.steps[3];
          this.prevStepButtonTitle = this.processIndicator.steps[1];*/
          this.nextStepButtonTitle = 'مرحله بعد';
          this.prevStepButtonTitle = 'مرحله قبل';
          this.currentStepNumber = step;
          this.processIndicator.currentStep = step;
          this.currentHeader = this.processIndicator.steps[step];
        }
        if (direction === 'forward') {
          (<RequestRelationTaminComponent>this._currentStep.instance).confirmStepOneClick(this.personalId).then(value => {
            this.container.clear();
            if (this._currentStep) {
              this._currentStep.destroy();
            }

            const componentFactory22 = this.componentFactoryResolver.resolveComponentFactory(SubdomainListComponent);
            const componentRef22 = this.container.createComponent(componentFactory22);
            this._currentStep = componentRef22;
            componentRef22.instance.initialize(this.personalId);
            this.hasNextStep = true;
            this.hasPrevStep = true;
            /*this.nextStepButtonTitle = this.processIndicator.steps[3];
            this.prevStepButtonTitle = this.processIndicator.steps[1];*/
            this.nextStepButtonTitle = 'مرحله بعد';
            this.prevStepButtonTitle = 'مرحله قبل';
            this.currentStepNumber = step;
            this.processIndicator.currentStep = step;
            this.currentHeader = this.processIndicator.steps[step];
          })
            .catch(reason => {
            });
        }

        break;
      case 3:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory4 = this.componentFactoryResolver.resolveComponentFactory(PersonalInformationComponent);
        const componentRef4 = this.container.createComponent(componentFactory4);
        this._currentStep = componentRef4;
        componentRef4.instance.initialize(this.personalId);
        this.hasNextStep = true;
        this.hasPrevStep = true;
        /*this.nextStepButtonTitle = this.processIndicator.steps[4];
        this.prevStepButtonTitle = this.processIndicator.steps[2];*/
        this.nextStepButtonTitle = 'مرحله بعد';
        this.prevStepButtonTitle = 'مرحله قبل';
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 4:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory3 = this.componentFactoryResolver.resolveComponentFactory(DocumentComponent);
        const componentRef3 = this.container.createComponent(componentFactory3);
        this._currentStep = componentRef3;
        componentRef3.instance.initialize(this.personalId);
        this.hasNextStep = true;
        this.hasPrevStep = true;
        /*this.nextStepButtonTitle = this.processIndicator.steps[5];
        this.prevStepButtonTitle = this.processIndicator.steps[3];*/
        this.nextStepButtonTitle = 'مرحله بعد';
        this.prevStepButtonTitle = 'مرحله قبل';
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 5:
        (<DocumentComponent>this._currentStep.instance).saveForm(this.personalId).then(value => {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
          const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(ApproveComponent);
          const componentRef5 = this.container.createComponent(componentFactory5);
          this._currentStep = componentRef5;
          componentRef5.instance.initialize(this.personalId);
          this.hasNextStep = false;
          this.hasPrevStep = true;
          // this.prevStepButtonTitle = this.processIndicator.steps[4];
          this.prevStepButtonTitle = 'مرحله قبل';
          this.currentStepNumber = step;
          this.processIndicator.currentStep = step;
          this.currentHeader = this.processIndicator.steps[step];
        })
          .catch(reason => {
          });
        break;
    }
  }
}
