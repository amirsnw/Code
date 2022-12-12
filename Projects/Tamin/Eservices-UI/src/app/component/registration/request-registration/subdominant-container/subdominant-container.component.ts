import {Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent, TaminProcessIndicatorComponent, TaminSecurityService} from 'tamin-framework';
import {SubdomainListComponent} from '../subdomain/subdomain-list/subdomain-list.component';
import {ApproveComponent} from '../approve/approve.component';
import {Urls} from '../../../../settings/urls';
import {ActivatedRoute} from '@angular/router';
import {SubdomainApproveComponent} from '../subdomain/subdomain-approve/subdomain-approve.component';

@Component({
  selector: 'app-subdominant-container',
  templateUrl: './subdominant-container.component.html',
  styleUrls: ['./subdominant-container.component.css']
})
export class SubdominantContainerComponent extends TaminPageBaseComponent {
  currentUser: any;
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
  private componentFactoryResolver: ComponentFactoryResolver;
  private router: ActivatedRoute;

  /*
    constructor(private taminSecurity: TaminSecurityService, private componentFactoryResolver: ComponentFactoryResolver) {

    }
  */

  constructor(injector: Injector) {
    super(injector);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
    this.router = injector.get(ActivatedRoute);
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
        const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(SubdomainListComponent);
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
        this.container.clear();
        if (this._currentStep) {
          this.personalId=this._currentStep.instance.personalId;
          this._currentStep.destroy();
        }
        const componentFactory4 = this.componentFactoryResolver.resolveComponentFactory(SubdomainApproveComponent);
        const componentRef4 = this.container.createComponent(componentFactory4);
        this._currentStep = componentRef4;
        componentRef4.instance.initialize(this.personalId);
        this.hasPrevStep = true;
        this.hasNextStep = false;
        this.prevStepButtonTitle = this.processIndicator.steps[0];
        this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
    }

  }


  initializePage() {
    this.processIndicator.steps = ['افراد تحت پوشش', 'بازبینی و تایید اطلاعات'];
    this.securityService.getCurrentUser().then(value => {
      this.currentUser = value;
    });
    this.createStep(0, 'forward');
  }

  /*
    ngOnInit() {
      this.processIndicator.steps = ['افراد تحت پوشش', 'بازبینی و تایید اطلاعات'];
      this.taminSecurity.getCurrentUser().then(value => {
        this.currentUser = value;
      });
      this.createStep(0, 'forward');
    }
  */

}
