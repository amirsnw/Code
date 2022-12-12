import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { ImageModelManaged, TaminImageGalleryManagedComponent, TaminPageBaseComponent, TaminValidators } from 'tamin-framework';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../../../settings/urls';
import { StpHeaderNewComponent } from '../../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-pregnancy-new',
  templateUrl: './pregnancy-new.component.html',
  styleUrls: ['./pregnancy-new.component.css']
})
export class PregnancyNewComponent extends TaminPageBaseComponent {
  @ViewChild('header') header: StpHeaderNewComponent;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('dataPanel') dataPanel: ElementRef;
  theForm: FormGroup;
  requestId = '';
  barTypes = [];
  barChild = [];
  // pageMode: 'add' | 'edit' = 'add';
  hasImage1 = false;
  hasImage2 = false;
  hasImage3 = false;
  hasImage4 = false;
  hasImage5 = false;
  hasImage6 = false;
  private _overlay: any;
  private _subscription = new Subscription();

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.getBarType();
    this.getBarChild();

    this.theForm = this.formBuilder.group({
      barSDateTimeStamp: ['', Validators.required],
      barEDateTimeStamp: ['', Validators.required],
      barDemDatTimeStamp: ['', Validators.required],
      barDrname: ['', [Validators.required, Validators.maxLength(25)]],
      barDRid: ['', [Validators.required, Validators.maxLength(10)]],
      barDd: ['', [Validators.required, Validators.max(999)]],
      barType: ['', Validators.required],
      barChild: ['', Validators.required],
      branchCode: ['', Validators.required],
      babyNationalCode: ['', [Validators.required, TaminValidators.nationalId]]
    });

    this._subscription.add(this.theForm.get('barSDateTimeStamp').valueChanges.subscribe(value => {
      this.calculateRestDays();
    }));
    this._subscription.add(this.theForm.get('barEDateTimeStamp').valueChanges.subscribe(value => {
      this.calculateRestDays();
    }));

    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;

  }

  calculateRestDays() {
    const start = this.theForm.get('barSDateTimeStamp').value;
    const end = this.theForm.get('barEDateTimeStamp').value;

    if (start === undefined || start === null || start === '' || end === undefined || end === null || end === '') {
      this.theForm.get('barDd').setValue('0');
      return;
    }

    if (start > end) {
      this.theForm.get('barDd').setValue('0');
      return;
    }


    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = (Math.round(Math.abs(((new Date(start)).getTime() - (new Date(end)).getTime()) / (oneDay)))) + 1;
    this.theForm.get('barDd').setValue(diffDays.toString());
  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.chackGender();
    this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_PRAGNENT)
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
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
                this.redirectTo('/');
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

  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
  }

  private getData(withImages): any {
    const tmp = this.header.getData();
    const data = {
      shorttermRequest:
      {
        request: {},
        risuid: tmp.risuid,
        insuranceFirstName: tmp.insuranceFirstName,
        insuranceLastName: tmp.insuranceLastName,
        nationalCode: tmp.nationalCode,
        requestHelpType: '02',
        mobilNumber: tmp.mobilNumber,
        serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
        branchCode: this.theForm.get('branchCode').value,
        branchName: ''
      },
      barSDateTimeStamp: new Date(this.theForm.get('barSDateTimeStamp').value).getTime(),
      barEDateTimeStamp: new Date(this.theForm.get('barEDateTimeStamp').value).getTime(),
      barType: this.theForm.get('barType').value,
      barDrname: this.theForm.get('barDrname').value,
      barDRid: this.theForm.get('barDRid').value,
      barChild: this.theForm.get('barChild').value,
      barDd: this.theForm.get('barDd').value,
      barDemDatTimeStamp: new Date(this.theForm.get('barDemDatTimeStamp').value).getTime()
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

    if (this.imageGallery.images.length !== 4) {
      this.showInfoMessageBox('پیام سیستم', 'تمامی تصاویر مدارک ضمیمه درخواست نشده اند.');
      return;
    }
    if (this.theForm.get('barDd').value > 276) {
      this.showInfoMessageBox('پیام سیستم', 'حداکثر دوره ی مجاز استراحت بارداری نه ماه می باشد');
      return;
    }
    const start = this.theForm.get('barSDateTimeStamp').value;
    const birthDate = this.theForm.get('barDemDatTimeStamp').value;
    if (start !== undefined && start !== null && start !== '' && birthDate !== undefined && birthDate !== null && birthDate !== '') {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = (Math.round(Math.abs(((new Date(start)).getTime() - (new Date(birthDate)).getTime()) / (oneDay)))) + 1;
      if (diffDays > 94) {
        this.showInfoMessageBox('پیام سیستم', 'شروع تاریخ استراحت زایمان حداکثر می تواند سه ماه قبل از تاریخ تولد نوزاد باشد');
        return;
      }
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
        requestHelpType: '02',
        mobilNumber: tmp.mobilNumber,
        serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
        branchCode: tmp.branchCode,
        branchName: tmp.branchName
      },
      barSDateTimeStamp: new Date(this.theForm.get('barSDateTimeStamp').value).getTime(),
      barEDateTimeStamp: new Date(this.theForm.get('barEDateTimeStamp').value).getTime(),
      barType: this.theForm.get('barType').value,
      barDrname: this.theForm.get('barDrname').value,
      barDRid: this.theForm.get('barDRid').value,
      barChild: this.theForm.get('barChild').value,
      barDd: this.theForm.get('barDd').value,
      barDemDatTimeStamp: new Date(this.theForm.get('barDemDatTimeStamp').value).getTime(),
      childNationalId: this.theForm.get('babyNationalCode').value
    };


    this.imageGallery.images.forEach(value => {
      let type = '';
      switch (value.tag) {
        case 'image1':
          type = '0201';
          break;
        case 'image2':
          type = '0202';
          break;
        case 'image3':
          type = '0203';
          break;
        case 'image4':
          type = '0204';
          break;
        case 'image5':
          type = '0205';
          break;
        case 'image6':
          type = '0206';
          break;
      }

      data.shorttermRequest.requestFileList.push(
        {
          id: '',
          shorttermRequest: { request: { id: '' } },
          documentFile: value.guid,
          documentType: type,
          editDate: '',
          editUser: ''
        }
      );
    });

    this._overlay = this.showOverlay();
    this.validateData();
    this.restService.create(StpUrls.STP_NEW_PREGNANCY, data)
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

  onRemoveImage(imageModel: ImageModelManaged) {
    switch (imageModel.tag) {
      case 'image1':
        this.hasImage1 = false;
        break;
      case 'image2':
        this.hasImage2 = false;
        break;
      case 'image3':
        this.hasImage3 = false;
        break;
      case 'image4':
        this.hasImage4 = false;
        break;
      case 'image5':
        this.hasImage5 = false;
        break;
      case 'image6':
        this.hasImage6 = false;
        break;
    }
  }

  onInsertImage(imageModel: ImageModelManaged) {
    switch (imageModel.tag) {
      case 'image1':
        this.hasImage1 = true;
        break;
      case 'image2':
        this.hasImage2 = true;
        break;
      case 'image3':
        this.hasImage3 = true;
        break;
      case 'image4':
        this.hasImage4 = true;
        break;
      case 'image5':
        this.hasImage5 = true;
        break;
      case 'image6':
        this.hasImage6 = true;
        break;
    }

  }

  getBarType() {
    this.restService.getAll(StpUrls.STP_NEW_ORTHOSIS_BAR_TYPES)
      .then(value => {
        (<Array<any>>(value.data.list)).forEach(item => {
          this.barTypes.push({
            name: item.name,
            value: item.code,
          });
        });
      })
      .catch(reason => {
      });
  }

  getBarChild() {
    this.restService.getAll(StpUrls.STP_NEW_ORTHOSIS_BAR_CHILD)
      .then(value => {
        (<Array<any>>(value.data.list)).forEach(item => {
          this.barChild.push({
            name: item.name,
            value: item.code,
          });
        });
      })
      .catch(reason => {
      });
  }

  private validateData(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getTime().then(value => {
        const startdate = this.theForm.get('barSDateTimeStamp').value;
        const endtdate = this.theForm.get('barEDateTimeStamp').value;
        const bardate = this.theForm.get('barDemDatTimeStamp').value;
        const today = value;
        if ((bardate > endtdate) || (bardate < startdate)) {
          this.showErrorMessageBox('پیام سیستم', 'تاریخ زایمان باید در محدوده تاریخ استراحت  بوده و با تاریخ تولد نوزاد یکسان باشد.');
          resolve(false);
          return;
        }
        resolve(true);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  private getImages(): Array<any> {
    const detectImageType = (item: ImageModelManaged): string => {
      switch (item.tag) {
        case 'image1':
          return '0201';
        case 'image2':
          return '0202';
        case 'image3':
          return '0203';
        case 'image4':
          return '0204';
        case 'image5':
          return '0205';
        case 'image6':
          return '0206';
      }
    };

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
        documentType: detectImageType(item),
        documentString: '',
        documentImage: item.source.split(',')[1]
      });
    });
    return images;
  }

  private getTime() {
    return new Promise<Date>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_GetTime)
        .then(value => {
          resolve(new Date(value.data));
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  chackGender() {
    this.securityService.getCurrentUser()
      .then(value => {
        if (value.gender === 'm') {
          this.showErrorMessageBox('پیام سیستم', 'کاربر گرامی، شما دارای شرایط لازم جهت دسترسی به این قسمت نمی باشید', () => {
            this.redirectTo('stp');
          });
        }
      })
      .catch(reason => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('stp');
        });
      });
  }
}
