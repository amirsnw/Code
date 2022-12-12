import { Component, ViewChild, Injector, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ImageModelManaged, TaminImageGalleryManagedComponent, TaminPageBaseComponent, TaminValidators } from 'tamin-framework';
import { MarriageNoPresenceHeaderComponent } from '../marriage-no-presence-header/marriage-no-presence-header.component';
import { MarriageNoPresenceSearchComponent } from '../marriage-no-presence-search/marriage-no-presence-search.component';
import { StpUrls } from '../../stp-urls';
import { Subscription } from "rxjs";
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';
import { Urls } from "../../../../settings/urls";

declare let html2canvas: any;
@Component({
  selector: 'app-marriage-no-presence',
  templateUrl: './marriage-no-presence.component.html',
  styleUrls: ['./marriage-no-presence.component.css']
})
export class MarriageNoPresenceComponent extends TaminPageBaseComponent {
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  // @ViewChild('dataPanel') dataPanel: ElementRef;
  @ViewChild('header') header: MarriageNoPresenceHeaderComponent;
  @ViewChild('search') search: MarriageNoPresenceSearchComponent;
  theForm: FormGroup;
  showCRM = false;
  marEdit = false;
  marNew = true;
  crmReason = [];
  answer = [];
  showAnswer: boolean;
  showImage = false;
  requestId: any;
  private _overlay: any;
  private _subscription = new Subscription();
  private answerEnd: any;
  snapshot: any;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  routeData: string;
  private alertifyRef = null;



  constructor(injector: Injector, public deviceService: DeviceDetectorService) {
    super(injector);
  }

  get imageCountdown(): number {
    return this.imageGallery.images.length;
  }


  protected initializePage(): void {
    debugger
    this.getCRMRequestReason();
    this._initializeForm();
    this._initializeFormGroup();
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
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
    // this.content.nativeElement.style.display = 'block';
    // this.alertifyRef = alertify.siteFeedbackDialog(this.content.nativeElement);
  }
  // constructor(injector: Injector, private activeRoute: ActivatedRoute) {
  //   super(injector);
  // }

  addImage(title: string) {
    debugger;
    this.imageGallery.selectImage(title);
  }
  private getImages(): Array<any> {
    let count = 0;
    const images = [];
    this.imageGallery.images.forEach((item) => {
      ++count;
      images.push({
        shorttermRequest: {
          request: {
            requestId: this.requestId
          }
        },
        documentType: '010' + count.toString(),
        documentString: '',
        documentImage: item.source.split(',')[1]
      });
    });
    return images;
  }
  private sendImages(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.restService.create(StpUrls.STP_SaveFiles, this.getImages())
        .then(value1 => {
          this.showInfoMessageBox('پیام سیستم', value1.data.entity);
          resolve(true);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
  // private getImages(): Array<any> {
  //   let count = 0;
  //   const images = [];
  //   this.imageGallery.images.forEach((item) => {
  //     ++count;
  //     images.push({
  //       shorttermRequest: {
  //         request: {
  //           requestId: this.requestId
  //         }
  //       },
  //       documentType: '010' + count.toString(),
  //       documentString: '',
  //       documentImage: item.source.split(',')[1]
  //     });
  //   });
  //   return images;
  // }
  protected loadPageData(): void {
    // this._overlay = this.showOverlay();
    // this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_MARIAGE)
    //   .then(value => {
    //     if (value.data) {
    //       this.hideOverlay(this._overlay);
    //       this.showErrorMessageBox('پیام سیستم', value.data, () => {
    //         // this.redirectTo('/');
    //       });
    //       return;
    //     }
    //     this.header
    //       .loadData()
    //       .then(value1 => {
    //         this.hideOverlay(this._overlay);
    //         this.marEdit = this.header.getData().flag;
    //         this.marNew = !this.header.getData().flag;
    //         if (this.header.getData().flag) {
    //           debugger;
    //           this.theForm.get('partnerNationalId').setValue(this.header.getData().partnerNationalId);
    //           this.theForm.get('weddingDateTimeStamp').setValue(this.header.getData().weddingTimestamp);
    //         }
    //       })
    //       .catch(reason => {
    //         this.hideOverlay(this._overlay);
    //         if (reason.error && reason.error.data) {
    //           this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
    //             // this.redirectTo('/');
    //           });
    //         } else {
    //           this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    //         }
    //       });
    //   })
    //   .catch(reason => {
    //     this.hideOverlay(this._overlay);
    //     this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    //   });

  }

  private _initializeForm() {
    this.theForm = this.formBuilder.group({
      weddingDateTimeStamp: ['', Validators.required],
      agreement: [''],
      partnerNationalId: ['', [Validators.required, TaminValidators.nationalId]],
      branchName: [''],
      crmReason: [''],
      answer: [''],
      comment: ['']
    });


  }

  onSendRequest() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }
    const tmp = this.header.getData();
    const data = {
      shorttermRequest:
      {
        request: {},
        requestFileList: [],
        risuid: tmp.risuid,
        insuranceFirstName: tmp.insuranceFirstName,
        insuranceLastName: tmp.insuranceLastName,
        nationalCode: tmp.nationalCode,
        requestHelpType: '05',
        mobilNumber: tmp.mobilNumber,
        serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
        branchCode: tmp.branchCode,
        branchName: this.theForm.get('branchName').value,
      },

      weddingDateTimeStamp: new Date(this.theForm.get('weddingDateTimeStamp').value).getTime(),
      partnerNationalId: this.theForm.get('partnerNationalId').value
    };
    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_Marriage_Post_NOPRESENCE, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
          if (reason.error && reason.error.data.message != undefined) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } 
        else if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }

  onReConfirmRequest() {
    const tmp = this.header.getData();
    debugger;
    this._overlay = this.showOverlay();
    var theUrl = StpUrls.STP_Marriage_CONFIRM_NOPRESENCE + '/' + tmp.request.id;
    this.restService.create(theUrl, null)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', value.data, () => {
          this.redirectTo('/');
        });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
  onValidateRequest() {
    if (!this.theForm.get('weddingDateTimeStamp').valid) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ عقد را وارد نمایید.');
      return;
    }
    if (!this.theForm.get('partnerNationalId').valid) {
      this.showInfoMessageBox('پیام سیستم', 'کد ملی همسر را وارد  نمایید.');
      return;
    }
    const marDate = new Date(this.theForm.get('weddingDateTimeStamp').value).getTime().toString();
    const spouseNationalId = this.theForm.get('partnerNationalId').value.toString();
      const nationalId = this.search.searchForm.get('nationalCode').value.toString()
    // const startDate = new Date(this.theForm.get('bimSdateTimeStamp').value);
    // const today = this.getTime;
    // if (startDate > today) {
    //   this.showErrorMessageBox('پیام سیستم', 'تاریخ شروع استراحت نمی تواند از تاریخ امروز بزرگتر باشد.');
    //   return;
    // }

    this._overlay = this.showOverlay();
    const theUrl = StpUrls.STP_VERIFY_MARRIAGE_Date + '/' + marDate + '/' + spouseNationalId+ '/' + nationalId;
    this.restService.getAll(theUrl)
      .then(value => {
        if (value.data) {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', value.data, () => {
            // this.redirectTo('/');
          });
          return;
        }
        // this.header
        //   .loadData()
        //   .then(value1 => {
        //     this.hideOverlay(this._overlay);
        //     if (value.data) {
        //       this.showInfoMessageBox('پیام سیستم', value.data.message, () => {
        //         // this.redirectTo('/');
        //       });
        //     }
        //   })
        //   .catch(reason => {
        //     this.hideOverlay(this._overlay);
        //     if (reason.error && reason.error.data) {
        //       this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
        //         // this.redirectTo('/');
        //       });
        //     } else {
        //       this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        //     }
        //   });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  onCRMRequest() {
    this.showCRM = true;
    // debugger;
    // this.container.clear();
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StpCrmRequestComponent);
    // const componentRef = this.container.createComponent(componentFactory);
    // this.changeDetectorRef.detectChanges();
    // componentRef.instance.show();

  }
  onCRMRequestCancel() {
    this.showCRM = false;
    this.showImage = false;
  }

  getCRMRequestReason() {
    var theUrl = StpUrls.STP_CRMReason;//+ '/13';//crm reasons for stp marriage
    this.restService.getAll(theUrl).then(value => {
      (<Array<any>>(value.data.list)).forEach(item => {
        this.crmReason.push({
          name: item.crmReason,
          value: item.crmRequestReasonID,
        });
        this.answer.push({
          name: item.answer,
          value: item.crmRequestReasonID,
        });
      });
    })
      .catch(reason => {
      });
  }
  private _initializeFormGroup() {
    this._subscription.add(this.theForm.get('crmReason').valueChanges.subscribe(value => {
      if (value == 7 || value == 5) {
        this.showImage = true;
      } else {
        this.showImage = false;
      }
      this.showAnswer = true;
      this.answerEnd = this.answer.find(c => c.value === value);
      this.theForm.get('answer').setValue(this.answerEnd.name);

    }));
  }
  onCRMRequestSend() {
    // if (!this.imageGallery.areAllImagesUploaded()) {
    //   this.showInfoMessageBox('پیام سیستم', 'تصاویر در حال بارگذاری می باشند. پس از اتمام بارگذاری تصاویر، درخواست را ارسال نمایید.');
    //   return;
    // }

    // if (this.imageGallery.images.length === 0) {
    //   this.showInfoMessageBox('پیام سیستم', ' تصاویر مدارک ضمیمه درخواست نشده اند.');
    //   return;
    // }

    const tmp = this.header.getData();
    var requestId = null;
    var refCode = null;
    var crmRefCode = null;
    if (tmp.request != null) {
      requestId = tmp.request.id;
      refCode = tmp.request.id;
    }
    const data = {
      requestFileList: [],
      // crmRequestReason:{ crmRequestReasonID:this.theForm.get('crmReason').value},
      crmRequestReasonId: this.theForm.get('crmReason').value,
      comment: this.theForm.get('comment').value,
      requestId: requestId,
      refCode: refCode,
      userIP: this.routeData,
      userNationalId: tmp.nationalCode,
      mobile: tmp.mobilNumber,
      crmRefCode: crmRefCode
    };


    let index = 0;
    this.imageGallery.images.forEach(value => {
      ++index;
      data.requestFileList.push(
        {
          id: '',
          crmRequest: { request: { id: '' } },
          documentFile: value.guid,
          documentType: '100' + index.toString(),
          editDate: '',
          editUser: ''
        }
      );
    });
    // this.onSubmit();
    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_POST_CRM, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        // this.onSubmit();
        this.showInfoMessageBox('پیام سیستم', "درخواست شما با شماره پیگیری " + value.data.crmRefCode + " ذخیره شد ", () => {
          // this.redirectTo('/');
        });

      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
  onFeedbackClick() {
    const me = this;
    this._overlay = this.showOverlay();
    try {
      html2canvas(document.body, {
        ignoreElements: element => element.classList.contains('plainoverlay')
      }).then(canvas => {
        try {
          this.hideOverlay(this._overlay);
          setTimeout(() => {
            me.show(canvas.toDataURL('image/jpeg', 0.2));
          }, 0);
        } catch {
        }
      });
    } catch {
      this.hideOverlay(this._overlay);
    }
  }
  onSubmit() {
    debugger;
    this.onFeedbackClick();
    this.routeData = window.location.hash;
    const tmp = 'دستگاه: ' + this.device + '\n' +
      'سیستم عامل: ' + this.os + '\n' +
      'نسخه سیستم عامل: ' + this.osVersion + '\n' +
      'مرورگر: ' + this.browser + '\n' +
      'نسخه مرورگر: ' + this.browserVersion + '\n' +
      'آدرس: ' + this.routeData;

    this._overlay = this.showOverlay();

    const toBeSaved = {
      image: this.snapshot,
      serviceItemId: this.routeData,
      description: this.theForm.get('comment').value,
      additionalInformation: tmp
    };

    this.restService.create(Urls.SITE_FEEDBACK, toBeSaved)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.alertifyRef.destroy();
        this.alertifyRef = null;
        this.showInfoMessageBox('پیام سیستم', 'درخواست شما با شماره پیگیری ' + this.getPersianNumber(value.data) + ' ' + 'ثبت شد.');

      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });



    //fetch(this.snapshot)
    //  .then(res => res.blob())
    //  .then(blob => {
    // const fd = new FormData();
    // fd.append('image', new File([blob], 'scrennshot.jpeg'));
    // fd.append('serviceItemId', this.routeData);
    // fd.append('description', this.note.nativeElement.value);
    // fd.append('additionalInformation', tmp);
    //    this.restService
    // .create(Urls.SITE_FEEDBACK + '/multipart', fd)
    //     .create(Urls.SITE_FEEDBACK, toBeSaved)
    //     .then(value => {
    //       this.hideOverlay(this._overlay);
    //       this.alertifyRef.destroy();
    //       this.alertifyRef = null;
    //       this.showInfoMessageBox('پیام سیستم', 'درخواست شما با شماره پیگیری ' + this.getPersianNumber(value.data) + ' ' + 'ثبت شد.');
    //     })
    //    .catch(reason => {
    //      this.hideOverlay(this._overlay);
    //      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    //   });
    //});
  }
  private getTime() {
    return new Promise<Date>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_GetTime)
        .then(value => {
          resolve(new Date(value));
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
  onSearchSubmit(param: any) {
    debugger;
    this._overlay = this.showOverlay();
    // this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_MARIAGE)
      var theUrl = StpUrls.STP_NEW_VALIDATE_SHORTTREM_MARIAGE + '/' + param.nationalCode;
      this.restService.getAll(theUrl, null)
      .then(value => {
        if (value.data) {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', value.data, () => {
            // this.redirectTo('/');
          });
          return;
        }
        this.header
          .loadData(param)
          .then(value1 => {
            this.hideOverlay(this._overlay);
            this.marEdit = this.header.getData().flag;
            this.marNew = !this.header.getData().flag;
            if (this.header.getData().flag) {
              debugger;
              this.theForm.get('partnerNationalId').setValue(this.header.getData().partnerNationalId);
              this.theForm.get('weddingDateTimeStamp').setValue(this.header.getData().weddingTimestamp);
            }
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
                // this.redirectTo('/');
              });
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            }
          });
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  showError(message) {
    this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
      this.redirectTo('/');
    });
  }

  backToPanelClick() {
    this.redirectTo('/sso/sso-history');
  }
}
