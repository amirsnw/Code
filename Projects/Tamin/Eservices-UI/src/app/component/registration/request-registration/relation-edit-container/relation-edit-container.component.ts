import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RequestRelationTaminComponent} from '../request-relation-tamin/request-relation-tamin.component';
import {ApproveComponent} from '../approve/approve.component';
import {TaminProcessIndicatorComponent, TaminSecurityService, TaminWizardComponent, WizardNavigationData} from 'tamin-framework';
import {PersonalComponent} from '../personal/personal.component';
import {DocumentComponent} from '../document/document.component';


@Component({
  selector: 'app-relation-edit-container',
  templateUrl: './relation-edit-container.component.html',
  styleUrls: ['./relation-edit-container.component.css']
})
export class RelationEditContainerComponent implements OnInit {
  currentUser: any;
  /*@ViewChild('stepTwo') stepTwo: RequestRelationTaminComponent;
  @ViewChild('stepSix') stepSix: ApproveComponent;
  @ViewChild('theWizard') theWizard: TaminWizardComponent;*/

  @ViewChild('processIndicator') processIndicator: TaminProcessIndicatorComponent;
  @ViewChild('stepsContainer', {read: ViewContainerRef}) container;

  private _currentStep: ComponentRef<any>;
  currentHeader: string;
  currentStepNumber: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  nextStepButtonTitle: string;
  prevStepButtonTitle: string;
  personalId: string;

  constructor(private taminSecurity: TaminSecurityService, private componentFactoryResolver: ComponentFactoryResolver) {

  }

  createStep(step: number, direction: 'forward' | 'backward') {
    switch (step) {

      case 0:
        if (direction === 'backward') {
          this.container.clear();
          if (this._currentStep) {
            this._currentStep.destroy();
          }
        }
        const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(RequestRelationTaminComponent);
        const componentRef1 = this.container.createComponent(componentFactory1);
        this._currentStep = componentRef1;
        componentRef1.instance.initialize(this.personalId);
        this.hasNextStep = true;
        this.hasPrevStep = false;
        this.nextStepButtonTitle = this.processIndicator.steps[1];
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 1:
        (<RequestRelationTaminComponent> this._currentStep.instance).confirmStepOneClick(this.personalId).then(value => {

          this.personalId = this._currentStep.instance.personalId;
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
        })
          .catch(reason => {
          });
        break;
      case 2:
        (<DocumentComponent>this._currentStep.instance).saveForm(this.personalId).then(value => {
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(ApproveComponent);
        const componentRef5 = this.container.createComponent(componentFactory5);
        this._currentStep = componentRef5;
        // this.personalId = this.personalId;
        componentRef5.instance.initialize(this.personalId);
        this.hasNextStep = false;
        this.hasPrevStep = true;
        this.prevStepButtonTitle = this.processIndicator.steps[0];
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        })
          .catch(reason => {
          });
        break;
    }

  }


  ngOnInit() {
    this.processIndicator.steps = ['ثبت اطلاعات بیمه ای', 'بازبینی و تایید اطلاعات'];
    this.taminSecurity.getCurrentUser().then(value => {
      this.currentUser = value;
    });
    this.createStep(0, 'forward');
  }
}
