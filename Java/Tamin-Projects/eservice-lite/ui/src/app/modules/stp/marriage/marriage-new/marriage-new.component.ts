import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ImageModelManaged, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {StpHeaderNewComponent} from '../../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../stp-urls';


@Component({
  selector: 'app-marriage-new',
  templateUrl: './marriage-new.component.html',
  styleUrls: ['./marriage-new.component.css']
})
export class MarriageNewComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  hasImage1 = false;
  hasImage2 = false;
  hasImage3 = false;
  hasImage4 = false;
  hasImage5 = false;
  hasImage6 = false;
  hasImage7 = false;
  isEligible = false;
  private _overlay: any;

  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header: StpHeaderNewComponent;

  protected initializePage(): void {
    this._initializeForm();
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
  }


  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_MARIAGE)
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

  private _initializeForm() {
    this.theForm = this.formBuilder.group({
      weddingDateTimeStamp: ['', Validators.required],
      mariageCerDateTimeStamp: ['', Validators.required],
      mariageNum: ['', [Validators.required, Validators.maxLength(15)]],
      sabtNumber: ['', [Validators.required]],
      partnerRisuId: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      partnerName: ['', [Validators.required, Validators.maxLength(50)]],
      partnerLname: ['', [Validators.required, Validators.maxLength(50)]],
      partnerIdNumber: ['', [Validators.required, Validators.maxLength(12)]],
      branchCode: ['', Validators.required]
    });


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

    if (this.imageGallery.images.length !== 7) {
      this.showInfoMessageBox('پیام سیستم', 'تمامی تصاویر مدارک ضمیمه درخواست نشده اند.');
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
          branchCode: this.theForm.get('branchCode').value,
          branchName: ''
        },
      weddingDateTimeStamp: new Date(this.theForm.get('weddingDateTimeStamp').value).getTime(),
      mariageCerDateTimeStamp: new Date(this.theForm.get('mariageCerDateTimeStamp').value).getTime(),
      mariageNum: this.theForm.get('mariageNum').value,
      sabtNumber: this.theForm.get('sabtNumber').value,
      partnerName: this.theForm.get('partnerName').value,
      partnerLname: this.theForm.get('partnerLname').value,
      partnerRisuId: this.theForm.get('partnerRisuId').value,
      partnerIdNumber: this.theForm.get('partnerIdNumber').value
    };

    this.imageGallery.images.forEach(value => {
      let type = '';
      switch (value.tag) {
        case 'image1':
          type = '0501';
          break;
        case 'image2':
          type = '0502';
          break;
        case 'image3':
          type = '0503';
          break;
        case 'image4':
          type = '0504';
          break;
        case 'image5':
          type = '0505';
          break;
        case 'image6':
          type = '0506';
          break;
        case 'image7':
          type = '0507';
          break;
      }

      data.shorttermRequest.requestFileList.push(
        {
          id: '',
          shorttermRequest: {request: {id: ''}},
          documentFile: value.guid,
          documentType: type,
          editDate: '',
          editUser: ''
        }
      );
    });

    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_NEW_MARRIAGE, data)
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

  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
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
      case 'image7':
        this.hasImage7 = false;
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
      case 'image7':
        this.hasImage7 = true;
        break;
    }
  }

  onValidateRequest() {
    const val = this.theForm.get('weddingDateTimeStamp').value;


    if (!this.theForm.get('weddingDateTimeStamp').valid) {
      this.showInfoMessageBox('پیام سیستم', 'تاریخ عقد وارد نشده است.');
      return;
    }

    this._overlay = this.showOverlay();
    const theUrl = StpUrls.STP_Verify_Marriage + '/' + new Date(this.theForm.get('weddingDateTimeStamp').value).getTime().toString();
    this.restService.getAll(theUrl)
      .then(value => {
        this.hideOverlay(this._overlay);
        let message = '';
        switch (value.data.toString()) {
          case '0' :
            message = 'با توجه به شرایط ماده 85 تامین اجتماعی، ظرف پنج سال قبل از تاریخ عقد فاقد 720 روز سابقه اجباری می باشید و پرداخت کمک هزینه ازدواج میسر نمی باشد.';
            this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message));
            break;
          case '1' :
            message = 'شما حائز شرایط ماده 85 تامین اجتماعی می باشید و پرداخت کمک هزینه ازدواج میسر می باشد.';
            this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message), () => {
              // this.redirectTo('stp_old/marriage');
            });
            break;
          case '2' :
            message = 'با توجه به شرایط ماده 85 تامین اجتماعی، در تاریخ وقوع عقد حق بیمه پرداخت نگردیده و تا زمان وصول حق بیمه، پرداخت کمک هزینه ازدواج میسر نمی باشد.';
            this.showInfoMessageBox('پیام سیستم', this.getPersianNumber(message));
            break;
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
     if (reason.error.data && reason.error.data.message) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      });
  }
}
