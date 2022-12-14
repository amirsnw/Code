
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { TaminPageBaseComponent, TaminProcessIndicatorComponent } from 'tamin-framework';
import { UploadFromFileComponent } from './upload-from-file/upload-from-file.component';
import { LoadFormFileDisplayedComponent } from './load-form-file-displayed/load-form-file-displayed.component';
import { ProcessingFormComponent } from './processing-form/processing-form.component';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-load-from-file',
  templateUrl: './load-from-file.component.html',
  styleUrls: ['./load-from-file.component.css']
})
export class LoadFromFileComponent extends TaminPageBaseComponent {

  @ViewChild('processIndicator') processIndicator: TaminProcessIndicatorComponent;
  @ViewChild('stepsContainer', { read: ViewContainerRef }) container;
  theCurrentUser: any;
  currentHeader: string;
  currentStepNumber: number;
  approveAndExportationn: boolean;
  dataWorker: boolean;
  paymentReport: boolean;
  backToPrivisPanell: boolean;
  showErroree: boolean;
  hasPrevStep: boolean;
  nextStepButtonTitle: string;
  prevStepButtonTitle: string;
  personalId: string;
  private _overlay: any;
  private _currentStep: ComponentRef<any>;
  public router: ActivatedRoute;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
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
  // redirectTo(arg0: string): any {
  //   throw new Error("Method not implemented.");
  // }
  // showRetryBox(arg0: string, arg1: any, arg2: () => void, arg3: () => void): any {
  //   throw new Error("Method not implemented.");
  // }
  // hideOverlay(_overlay: any): any {
  //   throw new Error("Method not implemented.");
  // }
  // showOverlay(): any {
  //   throw new Error("Method not implemented.");
  // }

  initializePage() {
    this.processIndicator.steps = [
      'بارگذاری فایل ها',
      'مشاهده اطلاعات لیست',
      'بررسی لیست',
      'فرم برگ پرداخت',
      'صدور فیش',
      'نتیچه تراکنش بانک'
    ];
    //this.loadCurrentUser();

    if (!this.router.snapshot.params['tracecode'])
      this.createStep(0);
    else this.createStep(parseInt(this.router.snapshot.params['status']));
  }

  createStep(step: number) {
    switch (step) {
      case 0:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory0 = this.componentFactoryResolver.resolveComponentFactory(UploadFromFileComponent);
        const componentRef0 = this.container.createComponent(componentFactory0);
        //componentRef0.instance.personalid = this.personalId;
        this._currentStep = componentRef0;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];
        break;
      case 1:
        const componentFactory1 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef1 = this.container.createComponent(componentFactory1);
        this._currentStep = componentRef1;
         this.approveAndExportationn = true;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step;
        this.processIndicator.currentStep = step;
        this.currentHeader = this.processIndicator.steps[step];

        break;
      case 2:
        const componentFactory2 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef2 = this.container.createComponent(componentFactory2);
        this._currentStep = componentRef2;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step-1;
        this.processIndicator.currentStep = step-1;
        this.currentHeader = this.processIndicator.steps[step-1];
        break;
      case 3:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory3 = this.componentFactoryResolver.resolveComponentFactory(ProcessingFormComponent);
        const componentRef3 = this.container.createComponent(componentFactory3);
        this._currentStep = componentRef3;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step-1;
        this.processIndicator.currentStep = step-1;
        this.currentHeader = this.processIndicator.steps[step-1];
        break;
      case 4:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory4 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef4 = this.container.createComponent(componentFactory4);
        this._currentStep = componentRef4;
        this.approveAndExportationn = false;
        this.backToPrivisPanell = true;
        this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step-1;
        this.processIndicator.currentStep = step-1;
        this.currentHeader = this.processIndicator.steps[step-1];
        this.processIndicator.steps[step-1]='فرم برگ پرداخت'
        break;
      case 5:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory5 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef5 = this.container.createComponent(componentFactory5);
        this._currentStep = componentRef5;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = false;
         this.currentStepNumber = step-2;
        this.processIndicator.currentStep = step-2;
        this.currentHeader = this.processIndicator.steps[step-2];
        this.processIndicator.steps[step-2]="نمایش خطاها"
        break;
      case 6:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory6 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef6 = this.container.createComponent(componentFactory6);
        this._currentStep = componentRef6;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = true;
         this.dataWorker = true;
         this.paymentReport = true;
         this.currentStepNumber = step-1;
        this.processIndicator.currentStep = step-1;
        this.currentHeader = this.processIndicator.steps[step-1];
        break;
        case 8:
        this.container.clear();
        if (this._currentStep) {
          this._currentStep.destroy();
        }
        const componentFactory8 = this.componentFactoryResolver.resolveComponentFactory(LoadFormFileDisplayedComponent);
        const componentRef8 = this.container.createComponent(componentFactory8);
        this._currentStep = componentRef8;
         this.approveAndExportationn = false;
         this.backToPrivisPanell = true;
         this.showErroree = false;
         this.dataWorker = true;
         this.paymentReport = false;
         this.currentStepNumber = step-1;
        this.processIndicator.currentStep = step-1;
        this.currentHeader = this.processIndicator.steps[step-1];
        break;
    }
  }
  backToPrivisPanel(){
    this.redirectTo('/il/pursue-list');
  }
  showErrore(){
    this._currentStep.instance.showErrore();
  }
  approveAndExportation(){
    this._currentStep.instance.approveAndExportation();
  }
  dataWorkerr(){
    this._currentStep.instance.dataWorker();
  }
  paymentReportt(){
    this._currentStep.instance.paymentReportt();
  }
}

