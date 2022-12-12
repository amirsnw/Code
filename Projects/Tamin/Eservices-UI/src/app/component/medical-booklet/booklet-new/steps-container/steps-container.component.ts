import {Component, ComponentFactoryResolver, ComponentRef, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../../settings/urls';
import {Subscription} from 'rxjs';
import {BookletDataComponent} from '../booklet-data/booklet-data.component';
import {HasPhotoStepComponent} from '../has-photo-step/has-photo-step.component';
import {NoPhotoStepComponent} from '../no-photo-step/no-photo-step.component';
import {ChooseRecieverStepComponent} from '../choose-reciever-step/choose-reciever-step.component';

@Component({
  selector: 'app-steps-container',
  templateUrl: './steps-container.component.html',
  styleUrls: ['./steps-container.component.css']
})
export class StepsContainerComponent extends TaminPageBaseComponent {

  @ViewChild('stepsContainer', {read: ViewContainerRef}) container;
  public currentHeader: string;
  public currentStepNumber: number;
  public hasNextStep: boolean;
  public hasPrevStep: boolean;
  public nextStepButtonTitle: string;
  public prevStepButtonTitle: string;
  // private recieverFullName: any;
  // private recieverNationalId: any;
  private _overlay: any;
  private _currentStep: ComponentRef<any>;
  private usePhoto = false;
  private subscriptions: Array<Subscription> = [];
  private hasPhoto = false;
  private photoSource: any;
  currentReciever: any;


  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  private _unsubscribeAll() {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }

  protected destroyPage(): void {
    this._unsubscribeAll();
  }

  protected initializePage(): void {
    this.createStep(0, 'forward');
  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.checkEligibleTo()
      .then(value => {
        this.hideOverlay(this._overlay);
        if (!value) {
          this.showErrorMessageBox('پیام سیستم', 'شما شرایط لازم برای دریافت دفترچه را احراز ننموده اید', () => {
            this.redirectTo('/');
          });
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  private createStep(step: number, direction: 'forward' | 'backward') {
    switch (step) {
      case 0:
        this._createChooseReviever(step);
        break;
      case 1:
        this._overlay = this.showOverlay();
        this.userHasPhoto()
          .then(value => {
            this.hideOverlay(this._overlay);
            if (this.hasPhoto) {
              this._createHasPhotoStep(step);
            } else {
              this._createStepNoPhotoStep(step);
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
        break;
      case 2:
        this._createRecieverDataStep(step);
        break;
    }
  }

  private _createChooseReviever(step) {
    this.container.clear();
    if (this._currentStep) {
      this._currentStep.destroy();
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChooseRecieverStepComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this._currentStep = componentRef;
    this._unsubscribeAll();
    this.subscriptions.push((<ChooseRecieverStepComponent>componentRef.instance).nextStep.subscribe(data => {
      this.currentReciever  = data;
      this.createStep(++this.currentStepNumber, 'forward');
    }));
    this.hasNextStep = true;
    this.hasPrevStep = false;
    this.nextStepButtonTitle = 'مرحله بعد';
    this.currentStepNumber = step;
    this.currentHeader = '';
  }

  private _createHasPhotoStep(step) {
    this.container.clear();
    if (this._currentStep) {
      this._currentStep.destroy();
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HasPhotoStepComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this._currentStep = componentRef;
    this._unsubscribeAll();
    this.subscriptions.push((<HasPhotoStepComponent>componentRef.instance).nextStep.subscribe(data => {
      this.usePhoto = data;
      this.createStep(++this.currentStepNumber, 'forward');
    }));
    this.subscriptions.push((<HasPhotoStepComponent>componentRef.instance).prevStep.subscribe(data => {
      this.createStep(--this.currentStepNumber, 'backward');
    }));

    componentRef.instance.initialize(this.photoSource);
    this.hasNextStep = true;
    this.hasPrevStep = false;
    // this.nextStepButtonTitle = 'انصراف از ت';
    this.currentStepNumber = step;
    this.currentHeader = '';
  }

  private _createStepNoPhotoStep(step) {
    this.container.clear();
    if (this._currentStep) {
      this._currentStep.destroy();
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NoPhotoStepComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this._currentStep = componentRef;
    this._unsubscribeAll();
    this.subscriptions.push((<NoPhotoStepComponent>componentRef.instance).nextStep.subscribe(data => {
      this.createStep(++this.currentStepNumber, 'forward');
    }));
    // componentRef.instance.setUserData(this.recieverFullName, this.recieverNationalId);
    this.hasNextStep = true;
    this.hasPrevStep = false;
    this.nextStepButtonTitle = 'انصراف از ت';
    this.currentStepNumber = step;
    this.currentHeader = '';
  }

  private _createRecieverDataStep(step) {
    this.container.clear();
    if (this._currentStep) {
      this._currentStep.destroy();
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BookletDataComponent);
    const componentRef = this.container.createComponent(componentFactory);
    this._currentStep = componentRef;
    this._unsubscribeAll();
    // this.subscriptions.push((<BookletDataComponent>componentRef.instance).nextStep.subscribe(data => {
    //   this.createStep(++this.currentStepNumber, 'forward');
    // }));

    componentRef.instance.initialize(this.usePhoto, this.photoSource, this.currentReciever);
    this.hasNextStep = true;
    this.hasPrevStep = false;
    this.nextStepButtonTitle = 'انصراف از ت';
    this.currentStepNumber = step;
    this.currentHeader = '';
  }

  private checkEligibleTo(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.restService.getAll(Urls.BookletEligibleTo)
        .then(data => {
          if (((data.data as any).list).length !== 0) {
            resolve(!data.data.list[0].healthBookletDate.startsWith('00') && !data.data.list[0].healthBookletDate.startsWith('11'));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private userHasPhoto(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const thrUrl = Urls.BookletPhoto + '?identityCode=' + this.currentReciever.nationalId + '&serialNumber=123';
      this.restService.getAll(thrUrl)
        .then(value => {
          this.hasPhoto = value.data;
          this.changeDetectorRef.detectChanges();
          if (value.data) {
            const theUrl = `${Urls.BookletPicture}?nationalId=${this.currentReciever.nationalId}&serialNumber=`;
            this.restService.getAll(theUrl)
              .then(data => {
                this.photoSource = 'data:image/jpeg;base64,' + data.data;
                resolve();
              })
              .catch(error => {
                reject();
              });
          } else {
            resolve();
          }
        })
        .catch(reason => {
          reject();
        });
    });
  }

}
