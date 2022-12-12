import {Component, Injector, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../settings/urls';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-guardian-request-cardboard',
  templateUrl: './guardian-request-cardboard.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianRequestCardBoardComponent extends TaminPageBaseComponent {

  private _overlay: any;

  model: any;
  theForm: FormGroup;

  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  guardianDocumentMissing = false;

  editingMode: boolean;
  requestId: any;
  message: string;
  typeComboList: any[];

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
    /*this.activeRoute.paramMap.pipe(
      switchMap(params => {
        this.requestId = params['id'];
    }));*/
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.requestId = params['id'];
      } else {
        this.showErrorMessageBox('پیام سیستم', 'شماره درخواست کمیسیون پزشکی شناسایی نشد.', () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      }
    });
  }

  protected initializePage(): void {
    this.editingMode = true;
    this.typeComboList = Array(0);

    this.theForm = this.formBuilder.group({
      requestType: ['', Validators.required],
      type: ['', ],
    });

    this.theForm.get('requestType').valueChanges.subscribe(select => {
      switch (select) {
        case '01':
          this.typeComboList = [
            {
              name: 'گواهی پزشک معالج (در صورت عدم احراز شرایط سنی والدین)',
              value: '03'
            },
            {
              name: 'صفحه مشخصات فرزندان شناسنامه پدر',
              value: '07'
            },
            {
              name: 'صفحه مشخصات فرزندان شناسنامه مادر',
              value: '08'
            },
            {
              name: 'صفحه اول شناسنامه بیمه شده اصلی',
              value: '04'
            }
          ];
          break;
        case '05':
          this.typeComboList = [
            {
              name: ' گواهی پزشک معالج (در صورت عدم احراز شرایط سنی والدین)',
              value: '03'
            },
            {
              name: 'صفحه مشخصات فرزندان شناسنامه پدر',
              value: '07'
            },
            {
              name: 'صفحه اول شناسنامه بیمه شده اصلی',
              value: '04'
            }
          ];
          break;
        case '06':
          this.typeComboList = [
            {
              name: ' گواهی پزشک معالج (در صورت عدم احراز شرایط سنی والدین)',
              value: '03'
            },
            {
              name: 'گواهی فوت پدر(درصورت فوت)',
              value: '01'
            },
            {
              name: 'طلاق نامه (در صورت جدایی والدین)',
              value: '02'
            },
            {
              name: 'صفحه مشخصات فرزندان شناسنامه مادر',
              value: '08'
            },
            {
              name: 'صفحه اول شناسنامه بیمه شده اصلی',
              value: '04'
            }
          ];
          break;
        case '03':
          this.typeComboList = [
            {
              name: ' گواهی پزشک معالج',
              value: '03'
            },
            {
              name: 'صفحه اول شناسنامه فرزند ذکور',
              value: '09'
            },
            {
              name: 'صفحه مشخصات فرزندان شناسنامه بیمه شده اصلی',
              value: '10'
            }
          ];
          break;
        case '02':
          this.typeComboList = [
            {
              name: ' گواهی پزشک معالج',
              value: '03'
            },
            {
              name: 'صفحه اول شناسنامه همسر',
              value: '11'
            },
            {
              name: 'صفحه مشخصات زوج بیمه شده اصلی',
              value: '12'
            }
          ];
          break;
      }
    });
  }

  loadPageData() {
    this.imageGallery.getUrl = Urls.UploadImage;
    this.imageGallery.saveUrl = Urls.UploadImage;

    this._overlay = this.showOverlay();
    this.restService.getAll(`${Urls.GUARDIAN_REQUEST}/${this.requestId}`, )
      .then(value => {
        this.model = value.data.list[0];
        const listSize = this.model.guardianRelationlistList.length;
        if (this.model.status !== '5' && this.model.status !== '05') {
          this.editingMode = false;
          this.message = this.model.inspectorNote;
          this.hideOverlay(this._overlay);
          return;
        }

        switch (listSize) {
          case 1:
            this.theForm.get('requestType').setValue(this.model.guardianRelationlistList[0].depperrelTypeCode);
            break;
          case 2:
            this.theForm.get('requestType').setValue('01');
            break;
            default:
              this.editingMode = false;
        }
        this.message = this.model.inspectorNote;
        this.hideOverlay(this._overlay);
      }).catch(error => {
      this.hideOverlay(this._overlay);
      this.showInfoMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
        this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
      });
    });
  }

  saveData() {
    const missingStatus = this.checkImageMissingStatus();
    if (!this.theForm.valid || missingStatus) {
      this.markFormGroupAsTouched(this.theForm);
      this.hideOverlay(this._overlay);
      return;
    }

    this._overlay = this.showOverlay();
    const data = this.model;
    data.guardionDocLists = Array(0);

    this.imageGallery.images.forEach(value => {
      data['guardionDocLists'].push({
          documentFile: {id: value.guid},
          docTypeCode: value.tag,
        }
      );
    });

    this.restService.update(Urls.GUARDIAN_REQUEST, this.requestId, data)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.showInfoMessageBox('پیام سیستم', 'مدارک فرد تحت کفالت با موفقیت ثبت و ارسال شد.', () => {
          this.redirectTo('/');
          setTimeout(function () {
            location.reload();
          }, 500);
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

  return() {
    this.redirectTo('/');
  }

  addImage() {
    const type = this.theForm.getRawValue().type;
    if (type == null || type === '') {
      this.showErrorMessageBox('خطا', 'انتخاب نوع مدرک الزامیست.');
      return;
    }
    this.imageGallery.selectImage(this.gridCellRequestTypeTranslator(type), type);
  }

  gridCellRequestTypeTranslator(item) {
    switch (item) {
      case '01':
        return 'گواهی فوت پدر';
      case '02':
        return 'طلاق نامه';
      case '03':
        return ' گواهی پزشک معالج';
      case '04':
        return 'صفحه اول شناسنامه بیمه شده اصلی';
      case '07':
        return 'صفحه مشخصات فرزندان شناسنامه پدر';
      case '08':
        return 'صفحه مشخصات فرزندان شناسنامه مادر';
      case '09':
        return 'صفحه اول شناسنامه فرزند ذکور';
      case '10':
        return 'صفحه مشخصات فرزندان شناسنامه بیمه شده اصلی';
      case '11':
        return 'صفحه اول شناسنامه همسر';
      case '12':
        return 'صفحه مشخصات زوج بیمه شده اصلی';
    }
  }

  private checkImageMissingStatus() {
    this.guardianDocumentMissing = false;
    if (this.imageGallery.images.length === 0
      || !this.imageGallery.areAllImagesUploaded()) {
      this.guardianDocumentMissing = true;
      return true;
    }
    return false;
  }

  onBack() {
    location.href = '/#/app-request';
  }
}
