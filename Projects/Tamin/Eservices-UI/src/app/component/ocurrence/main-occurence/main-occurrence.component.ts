import {ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Injector, Output, Type, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {OccurrenceFormComponent} from '../occurrence-form/occurrence-form.component';
import {OccurDirective} from '../directive/occurdirective.directive';
import {Urls} from '../../../settings/urls';
import {OccurenceMeta} from '../occurence-meta';
import {ActivatedRoute, Router} from '@angular/router';
import {OccurrenceAgreementComponent} from '../occurrence-agreement/occurrence-agreement.component';

class OccurrenceItem {
  constructor(public component: Type<any>, public meta: any) {
  }
}

@Component({
  selector: 'main-occurrence-committee',
  templateUrl: './main-occurrence.component.html',
  styleUrls: ['./main-occurrence.component.css']
})
export class MainOccurrenceComponent extends TaminPageBaseComponent {

  private _overlay: any;
  private looper;
  private _case: number;
  form: any;
  componentRef: any;
  isLegal: boolean;
  @ViewChild(OccurDirective) OccurDirective: OccurDirective;

  meta: OccurenceMeta;

  // birthDateTimeStamp: any;

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver, private router: Router,
              private changeDetector: ChangeDetectorRef) {
    super(injector);
    this.meta = new OccurenceMeta();
    changeDetector.detach();
    this.looper = setInterval(() => {
      try {
        this.changeDetector.checkNoChanges();
      } catch (err) {
        this.changeDetector.detectChanges();
      }
    }, 200);
  }

  set case(num: number) {
    switch (num) {
      case 1:
        this.displayComponent(OccurrenceFormComponent);
        break;
      default:
        this.displayComponent(OccurrenceAgreementComponent);
        this.componentRef.instance.introApproved.subscribe(
          (status: any) => {
            if (status) {
              this.case = 1;
            } else {
              this.redirectTo('/');
            }
          }
        );
    }
  }

  get case() {
    return this._case;
  }

  displayComponent(component: any) {
    let componentFactory;
    let viewContainerRef;

    const committeeItem = new OccurrenceItem(component, this.meta);
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(committeeItem.component);
    viewContainerRef = this.OccurDirective.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.isLegal = this.isLegal;
    this.componentRef.instance.meta = committeeItem.meta;
  }

  protected loadPageData(): void {
    /* Rest Services Using Promise */
    this.isLegal = this.router.url.includes('legal');
    const restUserInfo = this.securityService.getCurrentUser();
    this._overlay = this.showOverlay();
    restUserInfo.then(res => {
      const searchParam = new SearchParam();
      searchParam.value = res.nationalCode;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'nationalCode';
      return this.restService.getAll(Urls.OccurrenceCase, [searchParam]);
    }).then(data => {
      this.hideOverlay(this._overlay);
      const response = data.data;
      if (response != null) {
        if (this.isLegal && response.isuStatus !== '03') {
          throw {noCase: 'شما کارفرما نمی باشید. جهت ثبت حادثه لطفا از طریق منوی "بیمه شدگان" اقدام نمایید.'};
        } else {
          this.case = 0;
        }
      } else {
        throw {noCase: 'اطلاعاتی یافت نشد'};
      }
    }).catch(error => {
      this.hideOverlay(this._overlay);
      if (error.noCase !== undefined) {
        this.showInfoMessageBox('پیام سیستم', error.noCase, () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
        return;
      }
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    });
  }

  onSubmit() {
    const component = this.componentRef.instance;
    const documentFileList = Array(0);
    if (!component.validate) {
      return;
    }
    for (const image of component.occurrenceDocumentGallery.images) {
      documentFileList.push({
        'ocurrenceDocumentType': {
          docTypeId: image.tag
        },
        'documentFile': {
          id: image.guid
        }
      });
    }

    const jsondata = Object.assign(component.formOne.getRawValue(), component.formTwo.getRawValue(), component.formThree.getRawValue());

    if (jsondata.birthDate !== undefined) {
      jsondata.birthDate = new Date(jsondata.birthDate).getTime().toString();
    }
    jsondata.employeeDate = new Date(jsondata.employeeDate).getTime().toString();
    jsondata.occurrenceDate = new Date(jsondata.occurrenceDate).getTime().toString();
    delete jsondata.occurDocumentType;
    delete jsondata.genderDesc;
    if (this.router.url.includes('legal')) {
      jsondata.reporterType = '2';
    } else {
      jsondata.reporterType = '1';
    }

    jsondata['occurrenceDocumentList'] = documentFileList;

    this._overlay = this.showOverlay();
    this.restService.create(Urls.OccurrenceDataSubmit, jsondata)
      .then(result => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', ` درخواست شما با شماره رهگیری ${result.data.reportRefrenceNumber}  ثبت شد. نتیجه از طریق پیامک به اطلاع شما خواهد رسید.
حداکثر تا 10 روز، نتیجه بررسی به شما اعلام خواهد شد.`, () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data && reason.error.data.message) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          return;
        }
        this.showInfoMessageBox('پیام سیستم', 'در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
      });
  }

  protected destroyPage() {
    clearInterval(this.looper);
    this.changeDetector.reattach();
  }
}
