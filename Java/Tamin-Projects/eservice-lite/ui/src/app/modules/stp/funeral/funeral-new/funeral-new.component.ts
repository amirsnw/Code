import {Component, Injector, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';
import {StpHeaderNewComponentFuneral} from '../stp-header-new-funeral/stp-header-new-funeral.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-funeral',
  templateUrl: './funeral-new.component.html',
  styleUrls: ['./funeral-new.component.css']
})
export class FuneralNewComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private data: any;
  spouses = [];
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header: StpHeaderNewComponentFuneral;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      // kddateTimeStamp: ['', Validators.required],
      kdno: ['', Validators.required],
      dtype: [''],
      branchCode: ['', Validators.required]
    });
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
  }

  protected loadPageData(): void {
    this._overlay = this.showOverlay();
    this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_BURRY)
      .then(value => {
        if (value.data) {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', value.data, () => {
            this.redirectTo('/');
          });
        } else {
          this.header
            .loadData()
            .then(value1 => {
              this.restService
                .getAll(StpUrls.STP_NEW_SPOUSE_LIST)
                .then(value2 => {
                  this.hideOverlay(this._overlay);
                  console.log(value2);

                  (<Array<any>>value2.data.list).forEach(item => {
                    this.spouses.push(
                      {
                        fullName: item.risuFname + ' ' + item.risuLName,
                        risuId: item.risuId,
                        nationCode: item.nationCode
                      }
                    );
                  });
                  // this.spouses = value2.data.list;
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
            this.hideOverlay(this._overlay);
               if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
                this.redirectTo('/');
              });
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
            }
            });
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  addImage(title: string) {
    this.imageGallery.selectImage(title);
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

    if (this.imageGallery.images.length === 0) {
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
          requestHelpType: '07',
          mobilNumber: tmp.mobilNumber,
          serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
          branchCode: this.theForm.get('branchCode').value,
          branchName: ''
        },
      kdno: this.theForm.get('kdno').value,
      // kddateTimeStamp:'',// new Date(this.theForm.get('kddateTimeStamp').value).getTime(),
      dtype:this.theForm.get('dtype').value,//'a000372245',// '0o04669616',
      deadnationalId:this.spouses.filter(c => c.risuId === this.theForm.get('dtype').value)[0].nationCode//'0065913035',//
    };

    let index = 0;
    this.imageGallery.images.forEach(value => {
      ++index;
      data.shorttermRequest.requestFileList.push(
        {
          id: '',
          shorttermRequest: {request: {id: ''}},
          documentFile: value.guid,
          documentType: '010' + index.toString(),
          editDate: '',
          editUser: ''
        }
      );
    });

    this._overlay = this.showOverlay();
    this.restService.create(StpUrls.STP_NEW_FUNERAL, data)
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
}
