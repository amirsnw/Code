import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ImageModelManaged, OverlayService, SearchOperator, SearchParam, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ObjectionDebitNewComponent} from '../../../../../../component/objection/objection-debit-new/objection-debit-new.component';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../../../settings/urls';
declare var alertify: any;

@Component({
  selector: 'app-sso-debit-objection-badvi',
  templateUrl: './sso-debit-objection-badvi.component.html',
  styleUrls: ['./sso-debit-objection-badvi.component.css']
})
export class SsoDebitObjectionBadviComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('typeCombo') typeCombo: TaminFieldComboBoxStaticComponent;
  @ViewChild('objectionDebitNewComponent') objectionDebitNewComponent: ObjectionDebitNewComponent;
  private debitNumber: any;
  private debitRemain: number;
  private workshopId: any;
  private brchCode: any;
  private nationalId: any;
  private ticketCode: any;
  private debitStepCode: any;
  private debitStatCode: any;
  private badviDate: any;
  searchParams: SearchParam[];
  filter: SearchParam[];
  private overlay: any;
  private _overlay: any;
  isDescHide: boolean;

  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.restService.getAll('assets/data/objection-type.json')
      .then(value => {
        this.typeCombo.dataItems = value.items;
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
      badviNo: [''],
      badviDate: [''],
      numObj: [''],
      type: [''],
      objectionDesc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2000), Validators.pattern('[^,;\']+$')]],
      seporde: [''],
      accept: [''],
    });
    this.isDescHide = true;
    this.imageGallery.saveUrl = Urls.UploadImage;
    this.imageGallery.getUrl = Urls.UploadImage;
    this.debitNumber = this.route.snapshot.params['debitNumber'];
    this.workshopId = this.route.snapshot.params['workshopId'];
    this.brchCode = this.route.snapshot.params['brchCode'];
    this.nationalId = this.route.snapshot.params['nationalCode'];
    this.ticketCode = this.route.snapshot.params['ticketCode'];
    this.typeCombo.dataItems = this.objectionDebitNewComponent.typeCombo.dataItems;
  }

  loadPageData() {

    this.securityService.getCurrentUser()
      .then(value => {
        this.theForm.get('name').setValue(value.displayName);
      })
      .catch(reason => {
      });
    this.overlay = this.showOverlay();
    this.restService.getById(Urls.SSO_WorkshopsInfo, this.workshopId + '/' + this.brchCode + '/' + this.nationalId)
      .then(value => {
        this.theForm.get('workshopName').setValue(value.data.workshopName);
        this.theForm.get('workshopAddress').setValue(value.data.lastAddress);
        this.theForm.get('debitNumber').setValue(this.debitNumber);
        this.theForm.get('workshopId').setValue(this.workshopId);
        this.searchParams = [];
        this.searchParams.push({
          property: 'debitNumber',
          value: this.debitNumber,
          operator: SearchOperator.EQ
        });
        this.searchParams.push({
          property: 'nationalCode',
          value: this.nationalId,
          operator: SearchOperator.EQ
        });
        this.searchParams.push({
          property: 'serviceName',
          value: 'debitObjection',
          operator: SearchOperator.EQ
        });
        this.searchParams.push({
          property: 'ticketCode',
          value: this.ticketCode,
          operator: SearchOperator.EQ
        });
        this.restService.getAll(Urls.SSO_ObjectionWorkshopsDebit + '/' + this.workshopId + '/' + this.brchCode, this.searchParams)
          .then(result => {
            this.hideOverlay(this.overlay);
            this.theForm.get('debitStartDate').setValue(this.getPersianDateFormat(result.data.list[0].debitStartDate));
            this.theForm.get('debitEndDate').setValue(this.getPersianDateFormat(result.data.list[0].debitEndDate));
            this.theForm.get('badviNo').setValue(result.data.list[0].badviNo);
            this.theForm.get('peymanSequence').setValue(result.data.list[0].peymanSequence);
            this.theForm.get('badviDate').setValue(this.getPersianDateFormat(result.data.list[0].badviDate));
            this.badviDate = (result.data.list[0].badviDate);
            this.debitStepCode = (result.data.list[0].debitStepCode);
            this.debitStatCode = (result.data.list[0].debitStatCode);
            this.debitRemain = (result.data.list[0].debitRemain);
          })
          .catch(reason => {
            this.hideOverlay(this.overlay);
            if (reason.error && reason.error.data) {
              this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
                this.redirectTo('/sso/debit-objection-request');
              });
            } else {
              this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
                this.redirectTo('/sso/debit-objection-request');
              });
            }
          });
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        if (reason.error && reason.error.data) {
          this.showErrorMessageBox('پیام سیستم', reason.error.data.message, () => {
            this.redirectTo('/sso/debit-objection-request');
          });
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
            this.redirectTo('/sso/debit-objection-request');
          });
        }
      });
  }

  getPersianDateFormat(item) {
    if (item != null && item !== '') {
      return item.substr(0, 4) + '/' + item.substr(4, 2) + '/' + item.substr(6, 2);
    } else {
      return '';
    }
  }

  addImage() {
    const theform = this.theForm.getRawValue();
    if (theform.type == null || theform.type === '') {
      alert('انتخاب نوع مدرک الزامیست');
      return;
    }
    this.imageGallery.selectImage(this.typeCombo.dataItems.find(x => x.value === theform.type).name, theform.type);

  }

  onAfterRemoveImage(imageModel: ImageModelManaged) {
    let flag = true;
    this.imageGallery.images.forEach(value => {
      if (value.tag === '18') {
        flag = false;
      }
    });
    if (flag) {
      this.isDescHide = true;
    }
  }

  onAfterInsertImage(imageModel: ImageModelManaged) {
    switch (imageModel.tag) {
      case '18':
        this.isDescHide = false;
        break;
    }
  }

  onCheckRequest() {
    const check = this.theForm.get('accept').value as boolean;
    const seporde = this.theForm.get('seporde').value as boolean;
    const theform = this.theForm.getRawValue();
    if (theform.type == null || theform.type === '') {
      alert('انتخاب نوع مدرک الزامیست');
      return;
    }
    if (check === false) {
      alert('چک تایید انتخاب نشده است');
      return;
    }
    if (seporde && this.debitRemain < 0) {
      alert('برای مبلغ مانده منفی، تیک سپرده قابل انتخاب نمی باشد.');
      return;
    }
    if (!this.theForm.valid) {
      this.markFormGroupAsTouched(this.theForm);
      alert('شرح اعتراض با فرمت صحیح وارد شود.');
      return;
    }
    if (this.theForm.get('objectionDesc').value.toString().length > 2000) {
      alert('طول شرح اعتراض معتبر نمی باشد. ');
      return;
    }

    if (!this.imageGallery.areAllImagesUploaded()) {
      alert('تصاویر در حال بارگذاری می باشند. پس از اتمام بارگذاری تصاویر، درخواست را ارسال نمایید.');
      return;
    }

    if (this.imageGallery.images.length === 0) {
      alert('مدرکی بارگزاری نگردیده است.');
      return;
    }
    const message = 'کارفرمای محترم مدارک و مستندات ارائه شده توسط شعبه بررسی و در صورت تایید آنها،' +
      ' اصلاح بدهی بدون حضور در جلسه هیات بدوی انجام میگردد.' +
      ' بدیهی است در صورت عدم کافی بودن مستندات و یا عدم تایید آنها' +
      ' توسط شعبه حق اعتراض به بدهی و طرح آن در هیات بدوی محفوظ می باشد.' +
      ' لذا پس از بررسی های معمول، نتیجه ' + '<b>' +
      'ظرف مهلت یک هفته' + '</b>' +
      ' به جنابعالی اطلاع رسانی خواهد شد.' + '<br/>' + '<br/>' +
      'نتیجه بررسی های معمول و وضعیت رسیدگی به بدهی مورد اعتراض کارفرما پس از ثبت و تایید نهایی از طریق منوی پیگیری وضعیت اعتراض و درخواست رسیدگی این سامانه قابل مشاهده خواهد بود.';
    alertify.confirm('توجه', message, () => {
        this.onSendRequest();
      },
      () => {
      })
      .set({
        labels: {ok: 'تایید و ثبت نهایی', cancel: 'انصراف'},
        'closable': false
      });
  }

  onSendRequest() {
    const data = {
      objectionPhotos: [],
      debitNumber: this.debitNumber,
      workshopId: this.workshopId,
      branchCode: this.brchCode,
      objectionType: '2',
      objectionDate: '',
      objectionDesc: this.theForm.get('objectionDesc').value,
      peymanSequence: this.theForm.get('peymanSequence').value,
      type1: '0',
      type2: '0',
      type3: '0',
      type4: '0',
      type5: '0',
      type6: '0',
      type7: '0',
      type8: '0',
      type9: '0',
      type10: '0',
      type11: '0',
      type12: '0',
      type13: '0',
      type14: '0',
      type15: '0',
      type16: '0',
      type17: '0',
      type18: '0',
      type19: '0',
      status: '1',
      seporde: this.theForm.get('seporde').value === true ? '1' : '',
      debitStepCode: this.debitStepCode,
      debitStatCode: this.debitStatCode,
      badviNo: this.theForm.get('badviNo').value,
      badviDate: this.badviDate
    };

    this.imageGallery.images.forEach(value => {
      switch (value.tag) {
        case '1':
          data.type1 = '1';
          break;
        case '2':
          data.type2 = '1';
          break;
        case '3':
          data.type3 = '1';
          break;
        case '4':
          data.type4 = '1';
          break;
        case '5':
          data.type5 = '1';
          break;
        case '6':
          data.type6 = '1';
          break;
        case '7':
          data.type7 = '1';
          break;
        case '8':
          data.type8 = '1';
          break;
        case '9':
          data.type9 = '1';
          break;
        case '10':
          data.type10 = '1';
          break;
        case '11':
          data.type11 = '1';
          break;
        case '12':
          data.type12 = '1';
          break;
        case '13':
          data.type13 = '1';
          break;
        case '14':
          data.type14 = '1';
          break;
        case '15':
          data.type15 = '1';
          break;
        case '16':
          data.type16 = '1';
          break;
        case '17':
          data.type17 = '1';
          break;
        case '18':
          data.type18 = '1';
          data.status = '3';
          break;
      }

      data.objectionPhotos.push(
        {
          guid: value.guid,
          type: value.tag,
        }
      );
    });
    this.overlay = this.showOverlay();
    this.restService.create(Urls.SSO_ObjectionSave + '/' + this.ticketCode + '/' + this.nationalId, data)
      .then(value => {
        this.hideOverlay(this.overlay);
        this.showInfoMessageBox('پیام سیستم', 'درخواست با شماره پیگیری' + '<b>' + value.data.refId + '<b>' + 'موفقیت ذخیره گردید و بعد از رسیدگی، نتیجه از طریق پیامک یا منو درخواست های من اعلام می شود.', () => {
          this.redirectTo('/sso/debit-objection-request');
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
  }
}
