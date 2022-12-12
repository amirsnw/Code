import {Component, Injector, ViewChild} from '@angular/core';
import {OverlayService, SearchOperator, SearchParam, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-edit-debit-investigation',
  templateUrl: './edit-debit-investigation.component.html',
  styleUrls: ['./edit-debit-investigation.component.css']
})
export class EditDebitInvestigationComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('typeCombo') typeCombo: TaminFieldComboBoxStaticComponent;
  private debitNumber: any;
  private workshopId: any;
  private brchCode: any;
  private data: any;
  searchParams: SearchParam[];
  filter: SearchParam[];
  private overlay: any;
  private _overlay: any;
  private debitStatCode: any;
  isDescHide: boolean;
  private _subscription = new Subscription();

  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.restService.getAll('assets/data/objection-type.json')
      .then(value => {
        this.typeCombo.dataItems = value.investigationItems;
      })
      .catch(reason => {
      });
    this.theForm = this.formBuilder.group({
      name: [''],
      workshopId: [''],
      workshopName: [''],
      workshopAddress: [''],
      debitNumber: [''],
      peymanSequence: [''],
      debitStartDate: [''],
      debitEndDate: [''],
      debitStepCode: [''],
      docNoEjra: [''],
      docDateEjra: [''],
      docDateEblaghEjra: [''],
      docNoBadvi: [''],
      docDateBadvi: [''],
      docNoTajdid: [''],
      docDateTajdid: [''],
      mad42: [''],
      mad43: [''],
      mad44: [''],
      type: [''],
      accept: [''],
    });
    this._subscription.add(this.theForm.get('type').valueChanges.subscribe(value => {
      if (value) {
        this.imageGallery.clearImages();
      }
    }));
    this.isDescHide = true;
    this.imageGallery.saveUrl = Urls.UploadImage;
    this.imageGallery.getUrl = Urls.UploadImage;
    this.debitNumber = this.route.snapshot.params['debitNumber'];
    this.workshopId = this.route.snapshot.params['workshopId'];
    this.brchCode = this.route.snapshot.params['brchCode'];
  }

  loadPageData() {

    this.securityService.getCurrentUser()
      .then(value => {
        this.theForm.get('name').setValue(value.displayName);
      })
      .catch(reason => {
      });
    this.overlay = this.showOverlay();
    this.restService.getById(Urls.WorkshopsInfo, this.workshopId + '/' + this.brchCode)
      .then(value => {
        this.theForm.get('debitNumber').setValue(this.debitNumber);
        this.theForm.get('workshopId').setValue(this.workshopId);
        this.theForm.get('workshopName').setValue(value.data.workshopName);
        this.theForm.get('workshopAddress').setValue(value.data.lastAddress);
        this.restService.getAll(Urls.ManagementWorkshopsDebit + '/' + this.workshopId + '/' + this.brchCode, this.searchParams)
          .then(result => {
            this.hideOverlay(this.overlay);
            switch (result.data.list[0].kindDoc) {
              case '1':
                this.theForm.get('mad42').setValue(true);
                break;
              case '2':
                this.theForm.get('mad43').setValue(true);
                break;
              case '3':
                this.theForm.get('mad44').setValue(true);
                break;
            }
            this.data = result.data.list[0];
            this.theForm.get('debitStartDate').setValue(this.getPersianDateFormat(result.data.list[0].debitStartDate));
            this.theForm.get('debitEndDate').setValue(this.getPersianDateFormat(result.data.list[0].debitEndDate));
            this.theForm.get('docDateEjra').setValue(this.getPersianDateFormat(result.data.list[0].docDateEjra));
            this.theForm.get('docDateEblaghEjra').setValue(this.getPersianDateFormat(result.data.list[0].docDateEblaghEjra));
            this.theForm.get('docDateBadvi').setValue(this.getPersianDateFormat(result.data.list[0].docDateBadvi));
            this.theForm.get('docDateTajdid').setValue(this.getPersianDateFormat(result.data.list[0].docDateTajdid));
            this.theForm.get('peymanSequence').setValue(result.data.list[0].peymanSequence);
            this.theForm.get('debitStepCode').setValue(result.data.list[0].debitStepCode);
            this.theForm.get('docNoEjra').setValue(result.data.list[0].docNoEjra);
            this.theForm.get('docNoBadvi').setValue(result.data.list[0].docNoBadvi);
            this.theForm.get('docNoTajdid').setValue(result.data.list[0].docNoTajdid);
            this.debitStatCode = (result.data.list[0].debitStatCode);
            const message = 'کارفرمای گرامی ارسال مجدد مستندات در خصوص بدهی صرفا برای یکبار امکان پذیر می باشد لذا خواهشمند است' +
               '<b>' + ' دقت لازم ' + '</b>' +
              'را در این خصوص معمول دارید.';
            this.showInfoMessageBox('پیام سیستم', message);
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
                this.redirectTo('/debit-management');
              });
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
                this.redirectTo('/debit-management');
              });
            }
          });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('/debit-management');
          });
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/debit-management');
          });
        }
      });
    this.searchParams = [];
    this.searchParams.push({
      property: 'debitNumber',
      value: this.debitNumber,
      operator: SearchOperator.EQ

    });

  }

  getPersianDateFormat(item) {
    return item ? item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2) : '';
  }

  addImage() {
    const theform = this.theForm.getRawValue();
    if (theform.type == null || theform.type === '') {
      alert('انتخاب نوع مدرک الزامیست');
      return;
    }
    this.imageGallery.selectImage(this.typeCombo.dataItems.find(x => x.value === theform.type).name, theform.type);

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
      this.showInfoMessageBox('پیام سیستم', 'مدرکی بارگزاری نگردیده است.');
      return;
    }
    const data = {
      objectionPhotos: [],
      serialNo: this.data.seqNo
    };

    this.imageGallery.images.forEach(value => {
      data.objectionPhotos.push(
        {
          guid: value.guid,
          type: value.tag,
        }
      );
    });
    this.showQuestionBox('پیام سیستم', 'آیا برای ثبت درخواست اطمینان دارید؟', () => {
      this.overlay = this.showOverlay();
      this.restService.update(Urls.DebitComitteUpdate, this.data.seqNo.toString(), data)
        .then(value => {
          this.hideOverlay(this.overlay);
          this.showInfoMessageBox('پیام سیستم', 'درخواست شما با شماره پیگیری ' + '<b>' + value.data.refId + '</b>' + ' اصلاح گردید و بعد از رسیدگی، نتیجه از طریق پیامک یا منو درخواست های من اعلام می شود.', () => {
            this.redirectTo('/debit-management');
          });
        })
        .catch(reason => {
          this.hideOverlay(this.overlay);
          if (reason.error && reason.error.data) {
            this.showErrorMessageBox('پیام سیستم', reason.error.data.message);
          } else {
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          }
        });
    }, () => {
    });
  }
}
