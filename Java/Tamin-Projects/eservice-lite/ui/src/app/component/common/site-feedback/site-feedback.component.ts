import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminPageBaseComponent} from 'tamin-framework';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Urls} from '../../../settings/urls';
import {FormGroup, Validators} from '@angular/forms';

declare let html2canvas: any;
declare var alertify: any;

@Component({
  selector: 'app-site-feedback',
  templateUrl: './site-feedback.component.html',
  styleUrls: ['./site-feedback.component.css']
})
export class SiteFeedbackComponent extends TaminPageBaseComponent {
  @ViewChild('content') content: ElementRef;
  @ViewChild('note') note: ElementRef;
  snapshot: any;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  routeData: string;
  private _overlay: any;
  private alertifyRef = null;
  theForm: FormGroup;
  questions = [];
  info: any;

  constructor(injector: Injector, public deviceService: DeviceDetectorService) {
    super(injector);
  }

  protected initializePage(): void {
    this.createDialog();
    this.theForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: [''],
      problem: ['', Validators.required]
    });
    this.theForm.get('question').valueChanges.subscribe(value => {
      if (value) {
        const selectedItem = this.questions.find(c => c.id === value);
        this.theForm.get('answer').setValue(selectedItem.answer);
      }
    });
    this.theForm.get('question').valueChanges.subscribe(value => {
      if (value) {
        const selectedItem = this.questions.find(c => c.id === value);
        this.theForm.get('answer').setValue(selectedItem.answer);
      }
    });

    // http://l_eivazi_pc.tamin.org:7001/eservices-develop/api/crm-tiket/info?filter=[{%22property%22:%22componentUrl%22,%22operator%22:%22eq%22,%22value%22:%22/stp/marriage%22}]


  }

  protected loadPageData(): void {
    this.os = this.deviceService.os;
    this.osVersion = this.deviceService.os_version;
    this.browser = this.deviceService.browser;
    this.browserVersion = this.deviceService.browser_version;
    if (this.deviceService.isDesktop()) {
      this.device = 'کامپیوتر / لپ تاپ';
    } else if (this.deviceService.isMobile()) {
      this.device = 'موبایل';
    } else if (this.deviceService.isTablet()) {
      this.device = 'تبلت';
    }
  }

  show(canvas) {
    this.routeData = window.location.hash;
    this.snapshot = canvas;

    if (this.alertifyRef) {
      this.alertifyRef.destroy();
      this.alertifyRef = null;
    }
    this.content.nativeElement.style.display = 'block';
    this.alertifyRef = alertify.siteFeedbackDialog(this.content.nativeElement);
    const filter = [{
      property: 'crmMapping.componentUrl',
      operator: 'eq',
      value: this.routeData.replace('#', '')
    }];
    const theUrl = Urls.crm_question + '?filter=' + JSON.stringify(filter);
    this.restService.getAll(theUrl)
      .then(value => {
        this.questions = value.data.list;
      }).catch(reason => {
    });

    this.restService.getAll(
      Urls.crm_question_info +
      '?filter=[{"property":"componentUrl","operator":"eq","value":"' + this.routeData.replace('#', '') + '"}]')
      .then(value => {
        this.info = value.data;
      }).catch(reason => {
    });


  }

  onSubmit() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    const tmp = 'دستگاه: ' + this.device + '\n' +
      'سیستم عامل: ' + this.os + '\n' +
      'نسخه سیستم عامل: ' + this.osVersion + '\n' +
      'مرورگر: ' + this.browser + '\n' +
      'نسخه مرورگر: ' + this.browserVersion + '\n' +
      'آدرس: ' + this.routeData;

    const description =
      'سوال: ' + this.questions.find(c => c.id === this.theForm.get('question').value).question + '\n' +
      'توضیحات: ' + this.theForm.get('problem').value;


    const toBeSaved = {
      image: this.snapshot,
      serviceItemId: this.routeData,
      description: description,
      additionalInformation: tmp,
      questionId: this.theForm.get('question').value
    };

    this._overlay = this.showOverlay();
    fetch(this.snapshot)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        fd.append('image', new File([blob], 'scrennshot.jpeg'));
        fd.append('serviceItemId', this.routeData);
        fd.append('description', description);
        fd.append('additionalInformation', tmp);
        fd.append('questionId', this.theForm.get('question').value);
        this.restService
          .create(Urls.SITE_FEEDBACK + '/multipart', fd)
          .then(value => {
            this.hideOverlay(this._overlay);
            this.alertifyRef.destroy();
            this.alertifyRef = null;
            if (value.data === '-1') {
              this.showInfoMessageBox('پیام سیستم', 'کاربر گرامی: درخواست شما توسط تیم فنی بررسی خواهد شد.');
            } else {
              this.showInfoMessageBox('پیام سیستم', '\'کاربر گرامی: درخواست شما با شماره پیگیری ' + value.data + ' ' + 'ثبت شد.');
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      });
  }

  private createDialog() {
    const me = this;
    if (!alertify.siteFeedbackDialog) {
      const buttons = [];
      alertify.dialog('siteFeedbackDialog', function () {
        return {
          main: function (content) {
            this.setting('title', 'ثبت اشکال عملکرد سیستم');
            this.setting('width', '80%');
            this.setting('maximizable', true);
            this.setContent(content);
          },
          setup: function () {
            return {
              buttons: buttons,
              options: {
                resizable: false,
                padding: false,
                frameless: false,
                autoReset: false,
                closableByDimmer: false
              }
            };
          },
          callback: function (closeEvent) {
          },
          settings: {
            width: '',
            onClose: undefined
          },
          hooks: {
            onrestore: function () {
              this.elements.dialog.style.width = this.get('width');
            },
            onshow: function () {
              this.elements.dialog.style.maxWidth = 'none';
              this.elements.dialog.style.width = this.get('width');
            }
          }
        };
      });
    }
  }
}
