import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TaminPageBaseComponent, TaminProcessIndicatorComponent} from "tamin-framework";
import {PersonalComponent} from "../../request-registration/personal/personal.component";
import {RequestRelationTaminComponent} from "../../request-registration/request-relation-tamin/request-relation-tamin.component";
import {SubdomainListComponent} from "../../request-registration/subdomain/subdomain-list/subdomain-list.component";
import {PersonalInformationComponent} from "../../request-registration/personal-information/personal-information.component";
import {DocumentComponent} from "../../request-registration/document/document.component";
import {EmployeePersonalComponent} from "../employee-personal/employee-personal.component";
import {EmployeeApproveComponent} from "../employee-approve/employee-approve.component";
import {Urls} from "../../../../settings/urls";

@Component({
  selector: 'app-employee-registration-container',
  templateUrl: './employee-registration-container.component.html',
  styleUrls: ['./employee-registration-container.component.css']
})
export class EmployeeRegistrationContainerComponent extends TaminPageBaseComponent {
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
  requestId: string;
  private _overlay: any;
  private _currentStep: ComponentRef<any>;
  isNew: boolean;

  constructor(injector: Injector,  private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  initializePage() {
    this.processIndicator.steps = [
      'ثبت اطلاعات هویتی',
      'بارگذاری مدارک',
      'بازبینی و تایید اطلاعات'
    ];

    this.createStep(0, 'forward');
  }

  createStep(step: number, direction: 'forward' | 'backward') {
    switch (step) {
      case 0:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }

        const componentFactory0 = this.componentFactoryResolver.resolveComponentFactory(EmployeePersonalComponent);
        const componentRef0 = this.container.createComponent(componentFactory0);
        componentRef0.instance.personalid = this.personalId;
        componentRef0.instance.requestid = this.requestId;
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

          if (this.isNew === true) {
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
          }
          else {
            const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(EmployeeApproveComponent);
            const componentRef5 = this.container.createComponent(componentFactory5);
            this._currentStep = componentRef5;
            componentRef5.instance.initialize(this.requestId);
            this.hasNextStep = false;
            this.hasPrevStep = true;
            // this.prevStepButtonTitle = this.processIndicator.steps[4];
            this.prevStepButtonTitle = 'مرحله قبل';
            this.currentStepNumber = step;
            this.processIndicator.currentStep = step;
            this.currentHeader = this.processIndicator.steps[step];
          }
        }
        if (direction === 'forward') {
          (<EmployeePersonalComponent>this._currentStep.instance)
            .confirmStepOneClick().then(value => {
            this.personalId = value.id.toString();
            this.requestId = value.request.id;
            this.container.clear();
            if (this._currentStep) {
              this._currentStep.destroy();
            }
            this.container.clear();
            if (this._currentStep) {
              this._currentStep.destroy();
            }

            this.restService.getById(Urls.IsPersonalNew, value.nationalId.toString()).then(result => {
                this.isNew = result.data;
                if (result.data === true) {
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
                }
                else {
                  const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(EmployeeApproveComponent);
                  const componentRef5 = this.container.createComponent(componentFactory5);
                  this._currentStep = componentRef5;
                  componentRef5.instance.initialize(this.requestId);
                  this.hasNextStep = false;
                  this.hasPrevStep = true;
                  // this.prevStepButtonTitle = this.processIndicator.steps[4];
                  this.prevStepButtonTitle = 'مرحله قبل';
                  this.currentStepNumber = step;
                  this.processIndicator.currentStep = step;
                  this.currentHeader = this.processIndicator.steps[step];
                }
              }
            ).catch(reason => {
            })

          })
            .catch(reason => {
              // console.log(reason);
            });
        }
        break;
      case 2:
        (<DocumentComponent>this._currentStep.instance).saveForm(this.personalId).then(value => {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
          const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(EmployeeApproveComponent);
          const componentRef5 = this.container.createComponent(componentFactory5);
          this._currentStep = componentRef5;
          componentRef5.instance.initialize(this.requestId);
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

