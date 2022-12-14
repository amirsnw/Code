import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { ImageModelManaged, TaminImageGalleryManagedComponent, TaminPageBaseComponent } from 'tamin-framework';
import { Urls } from '../../../../settings/urls';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StpHeaderNewComponent } from '../../stp-header-new/stp-header-new.component';
import { StpUrls } from '../../stp-urls';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indemnity-new',
  templateUrl: './indemnity-new.component.html',
  styleUrls: ['./indemnity-new.component.css']
})
export class IndemnityNewComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private data: any;
  requestId = '';
  pageMode: 'add' | 'edit' = 'add';
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('dataPanel') dataPanel: ElementRef;
  @ViewChild('header') header: StpHeaderNewComponent;
  private _subscription = new Subscription();
  get imageCountdown(): number {
    return this.imageGallery.images.length;
  }

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {

    this.theForm = this.formBuilder.group({
      bimSdateTimeStamp: [''],//, Validators.required
      bimEdateTimeStamp: [''],//, Validators.required
      bimDrname: ['', Validators.required],
      bimDrid: ['', Validators.required],
      branchCode: ['', Validators.required],
      covid: [''],
      sdate: [''],
      edate: [''],
      covidOffCheck: ['']
    });
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
    this.onChanges();
  }
  sdate = false;
  edate = false;
  sdate1 = true;
  edate1 = true;
  covidOn = true;
  covidOff = false;
  protected loadPageData(): void {
    this._overlay = this.showOverlay();

    this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_ILLNESS)
      .then(value => {
        if (value.data) {
          this.hideOverlay(this._overlay);

          this.showErrorMessageBox('پیام سیستم', value.data, () => {
            this.redirectTo('/');
          });
          return;
        }
        this.header
          .loadData()
          .then(value1 => {
            this.hideOverlay(this._overlay);
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
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

  addImage(title: string) {
    this.imageGallery.selectImage(title);
  }

  onCreate() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    this._overlay = this.showOverlay();
    this.validateData()
      .then(value => {
        if (value) {
          this.restService.create(StpUrls.STP_SaveShorttremIllness, this.getData(false))
            .then(value1 => {
              this.hideOverlay(this._overlay);
              if (value1.data !== null && value1.data !== undefined && value1.data.shorttermRequest.request.status === 'NEW_REQUEST') {
                this.showInfoMessageBox('پیام سیستم', value1.data.shorttermRequest.resultMessage, () => {
                  this.requestId = value1.data.shorttermRequest.request.requestId;
                });
              }
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        } else {
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  onUpdate() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      return;
    }

    // if (this.imageGallery.images.length === 0) {
    //   this.showErrorMessageBox('پیام سیستم', 'حداقل یک تصویر می بایست انتخاب شود');
    //   return;
    // }

    this._overlay = this.showOverlay();

    this.validateData()
      .then(value => {
        if (value) {
          this.restService.update(StpUrls.STP_UpdateShorttremIllness, this.requestId.toString(), this.getData(true))
            .then(value1 => {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ذخیره شد.', () => {
                this.redirectTo('stp');
              });
            })
            .catch(reason => {
              this.hideOverlay(this._overlay);
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            });
        } else {
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  private validateData(): Promise<boolean> {
    if (this.theForm.get('bimSdateTimeStamp').value != null && this.theForm.get('bimSdateTimeStamp').value != ''
      && this.theForm.get('bimEdateTimeStamp').value != null && this.theForm.get('bimEdateTimeStamp').value != '') {
      return new Promise<boolean>((resolve, reject) => {
        this.getTime().then(value => {
          const startDate = new Date(this.theForm.get('bimSdateTimeStamp').value);
          const endDate = new Date(this.theForm.get('bimEdateTimeStamp').value);
          const today = value;

          if (startDate > today) {
            this.showErrorMessageBox('پیام سیستم', 'تاریخ شروع استراحت نمی تواند از تاریخ امروز بزرگتر باشد.');
            resolve(false);
            return;
          }

          if (startDate > endDate) {
            this.showErrorMessageBox('پیام سیستم', 'تاریخ شروع استراحت نمی تواند از تاریخ خاتمه استراحت بزرگتر باشد.');
            resolve(false);
          }
          resolve(true);
        }).catch(reason => {
          reject(reason);
        });
      });
    } else if (this.theForm.get('covidOffCheck').value == false &&(
      this.theForm.get('bimSdateTimeStamp').value === null || this.theForm.get('bimSdateTimeStamp').value === ''
      && this.theForm.get('bimEdateTimeStamp').value === null || this.theForm.get('bimEdateTimeStamp').value === '') ) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ شروع و پایان استراحت را وارد نمایید.');
      return;

    }
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

  private loadEditData() {
    this.changeDetectorRef.detectChanges();
    this._overlay = this.showOverlay(this.dataPanel.nativeElement);
    this.restService.getById(StpUrls.STP_ShorttermRequestLoadData, this.requestId.toString())
      .then(value => {
        this.hideOverlay(this._overlay);
        this.theForm.get('bimSdateTimeStamp').setValue(new Date(value.data.list[0].shorttermIllness[0].bimSDate));
        this.theForm.get('bimEdateTimeStamp').setValue(new Date(value.data.list[0].shorttermIllness[0].bimEdate));
        this.theForm.get('bimDrname').setValue(value.data.list[0].shorttermIllness[0].bimDrname);
        this.theForm.get('bimDrid').setValue(value.data.list[0].shorttermIllness[0].bimDrid);
        if (value.data.list[0].stringDocFiles) {
          (<Array<any>>value.data.list[0].stringDocFiles).forEach((item) => {
            const model = new ImageModelManaged();
            model.title = 'تجویز پزشک';
            model.source = 'data:image/jpeg;base64,' + item;
            this.imageGallery.addImage(model);
          });
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('stp');
        });
      });
  }

  private getData(withImages: boolean): any {
    const tmp = this.header.getData();
    const covid = this.theForm.get('covid').value as string;
    const data = {
      shorttermRequest:
      {
        request: {},
        risuid: tmp.risuid,
        insuranceFirstName: tmp.insuranceFirstName,
        insuranceLastName: tmp.insuranceLastName,
        nationalCode: tmp.nationalCode,
        requestHelpType: '01',
        mobilNumber: tmp.mobilNumber,
        serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
        branchCode: this.theForm.get('branchCode').value,
        branchName: ''
      },
      bimSdateTimeStamp: (new Date(this.theForm.get('bimSdateTimeStamp').value)).getTime(),
      bimEdateTimeStamp: (new Date(this.theForm.get('bimEdateTimeStamp').value)).getTime(),
      bimDrid: this.theForm.get('bimDrid').value,
      bimDrname: this.theForm.get('bimDrname').value,
      bimKind: covid
    };

    if (withImages) {
      data.shorttermRequest['requestFileList1'] = this.getImages();
    }
    return data;
  }


  onSendRequest() {
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      this.showInfoMessageBox('پیام سیستم', 'اطلاعات وارد شده کامل نمی باشند.');
      return;
    }

    if (!this.imageGallery.areAllImagesUploaded()) {
      this.showInfoMessageBox('پیام سیستم', 'تصاویر در حال بارگذاری می باشند. پس از اتمام بارگذاری تصاویر، درخواست را ارسال نمایید.');
      return;
    }
    debugger;
    if (this.imageGallery.images.length === 0 && this.theForm.get('covidOffCheck').value == false) {
      this.showInfoMessageBox('پیام سیستم', 'تمامی تصاویر مدارک ضمیمه درخواست نشده اند.');
      return;
    }
     if (this.theForm.get('covidOffCheck').value == false &&(
      this.theForm.get('bimSdateTimeStamp').value === null || this.theForm.get('bimSdateTimeStamp').value === ''
      && this.theForm.get('bimEdateTimeStamp').value === null || this.theForm.get('bimEdateTimeStamp').value === '') ) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ شروع و پایان استراحت را وارد نمایید.');
      return;

    }

    const tmp = this.header.getData();
    const covid = this.theForm.get('covidOffCheck').value as string;
    const data = {
      shorttermRequest:
      {
        request: {},
        requestFileList: [],
        risuid: tmp.risuid,
        insuranceFirstName: tmp.insuranceFirstName,
        insuranceLastName: tmp.insuranceLastName,
        nationalCode: tmp.nationalCode,
        requestHelpType: '01',
        mobilNumber: tmp.mobilNumber,
        serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
        branchCode: tmp.branchCode,
        branchName: tmp.branchName
      },
      bimSdateTimeStamp: (new Date(this.theForm.get('bimSdateTimeStamp').value)).getTime(),
      bimEdateTimeStamp: (new Date(this.theForm.get('bimEdateTimeStamp').value)).getTime(),
      bimDrid: this.theForm.get('bimDrid').value,
      bimDrname: this.theForm.get('bimDrname').value,
      bimKind: covid
    };


    let index = 0;
    this.imageGallery.images.forEach(value => {
      ++index;
      data.shorttermRequest.requestFileList.push(
        {
          id: '',
          shorttermRequest: { request: { id: '' } },
          documentFile: value.guid,
          documentType: '010' + index.toString(),
          editDate: '',
          editUser: ''
        }
      );
    });

    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_NEW_INDEMNITY, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ذخیره شد.', () => {
          this.redirectTo('/');
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
  onChanges() {
    this._subscription.add(this.theForm.get('covid').valueChanges.subscribe(val => {
      switch (val) {
        case false:
          this.sdate = false;
          this.edate = false;
          this.sdate1 = true;
          this.edate1 = true;
          this.covidOn = true;
          this.covidOff = false;
          break;
        case true:
          debugger;
          this.covidOn = false;
          this.covidOff = true;
          return new Promise<any>((resolve, reject) => {
            this.restService.getAll(StpUrls.STP_GET_COVID_RESULT).then(value => {
              this.theForm.patchValue(value.data);
              this.data = value.data;
              // (<Array<any>>value.data.branchWorkshop).forEach(value1 => {
              //   this.branchWorkshop.push({
              //     name: this.getPersianNumber(value1.branchName + ' - ' + value1.workshopName),
              //     value: value1.branchCode
              //   });
              // });
              // this.dataLoaded.emit(value.data);
              this.theForm.get('sdate').setValue(value.data[0]);
              this.theForm.get('edate').setValue(value.data[1]);
              resolve();
              this.sdate = true;
              this.edate = true;
              this.sdate1 = false;
              this.edate1 = false;
              this.theForm.get('covidOffCheck').setValue(true);
            }).catch(reason => {
              // reject(reason);
              debugger;
              this.covidOn = false;
              this.covidOff = true;
              this.sdate = false;
              this.edate = false;
              this.sdate1 = true;
              this.edate1 = true;
              if (reason.error && reason.error.data) {
                this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
              } else {
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              }
            });
          });
        default:

      }
    }));
  }
}
