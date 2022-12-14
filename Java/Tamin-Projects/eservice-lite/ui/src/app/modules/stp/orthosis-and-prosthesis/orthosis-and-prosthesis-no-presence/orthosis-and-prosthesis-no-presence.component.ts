import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ImageModelManaged, SearchOperator, SearchParam, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {StpUrls} from '../../stp-urls';
import {OrthosisAndProsthesisNoPresenceHeaderComponent} from '../orthosis-and-prosthesis-no-presence-header/orthosis-and-prosthesis-no-presence-header.component';
import {OrthosisAndProsthesisNoPresenceSearchComponent} from '../orthosis-and-prosthesis-no-presence-search/orthosis-and-prosthesis-no-presence-search.component';

@Component({
  selector: 'app-orthosis-and-prosthesis-no-presence',
  templateUrl: './orthosis-and-prosthesis-no-presence.component.html',
  styleUrls: ['./orthosis-and-prosthesis-no-presence.component.css']
})
export class OrthosisAndProsthesisNoPresenceComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private data: any;
  mainAndSubdominantData = [];
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('search') search: OrthosisAndProsthesisNoPresenceSearchComponent;
  @ViewChild('header') header: OrthosisAndProsthesisNoPresenceHeaderComponent;
  @ViewChild('dataPanle') dataPanel: ElementRef;
  hasImage1 = false;
  hasImage2 = false;
  showPanel = false;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }


  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      risuid: ['', Validators.required],
      useTajTimeStamp: ['', Validators.required],
      risuFname: [''],
      risuseLName: [''],
      relationShip: [''],
      risuIdNo: [''],
      cityName: [''],
      brithDate: [''],
      noteBookDate: [''],
      relationShipCode: [''],
      nationalityCode: [''],
      branchCode: ['', Validators.required]
    });

    this.theForm.get('risuid').valueChanges.subscribe(value => {
      if (value) {
        const data = this.mainAndSubdominantData.filter(c => c.value === value)[0].original;
        this.theForm.get('risuFname').setValue(data.risuFname);
        this.theForm.get('risuseLName').setValue(data.risuLName);
        this.theForm.get('relationShip').setValue(data.relationShip);
        this.theForm.get('risuIdNo').setValue(data.risuIdNo);
        this.theForm.get('cityName').setValue(data.cityName);
        this.theForm.get('brithDate').setValue(`${data.brithDate.substr(0, 4)}/${data.brithDate.substr(4, 2)}/${data.brithDate.substr(6, 2)}`);
        this.theForm.get('noteBookDate').setValue(data.bletenddate);
        this.theForm.get('relationShipCode').setValue(data.relationShipCode);
        this.theForm.get('nationalityCode').setValue(data.nationCode);
      }
    });
    this.imageGallery.saveUrl = StpUrls.STP_NEW_SAVE_IMAGE;
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;

  }

  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
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

    if (this.imageGallery.images.length !== 2) {
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
          requestHelpType: '04',
          mobilNumber: tmp.mobilNumber,
          serviceDateTimeStamp: (new Date(tmp.serviceDateTimeStamp)).getTime(),
          branchCode: this.theForm.get('branchCode').value,
          branchName: ''
        },
      useRel: this.theForm.get('relationShipCode').value,
      useRelationShip: this.theForm.get('relationShip').value,
      useRfName: this.theForm.get('risuFname').value,
      useRisuId: this.theForm.get('risuid').value,
      useRlName: this.theForm.get('risuseLName').value,
      useTajTimeStamp: new Date(this.theForm.get('useTajTimeStamp').value).getTime(),
      useNationalid: this.theForm.get('nationalityCode').value,
    };

    this.imageGallery.images.forEach(value => {
      let type = '';
      switch (value.tag) {
        case 'image1':
          type = '0401';
          break;
        case 'image2':
          type = '0402';
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
    this.restService.create(StpUrls.STP_NEW_ORTHOSIS_AND_PROSTHESIS_SSO + '/' + this.data.nationalCode + '/' + this.data.ticketCode, data)
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
    }
  }

  getMainAndSubdominantData(data) {
    return new Promise<boolean>((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.operator = SearchOperator.EQUAL;
      searchParam.property = 'risuId';
      searchParam.value = data.risuid;
      const searchParams = [searchParam];
      this.restService.getPage(StpUrls.STP_ORTHOSIS_VIEW_NEW_SSO + '/' + data.nationalCode, 1, 1000, /*searchParams*/)
        .then(value => {
          (<Array<any>>(value.data.list)).forEach(item => {
            this.mainAndSubdominantData.push({
              name: this.getPersianNumber(`${item.risuId} - ${item.relationShip}`),
              value: item.risuId,
              original: item
            });
          });
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  onInsertImage(imageModel: ImageModelManaged) {
    switch (imageModel.tag) {
      case 'image1':
        this.hasImage1 = true;
        break;
      case 'image2':
        this.hasImage2 = true;
        break;
    }
  }

  onSearchSubmit(param: any) {
    this._overlay = this.showOverlay();
    this.data = param;
    this.restService.getAll(StpUrls.STP_NEW_VALIDATE_SHORTTREM_ORTHOSIS + '/' + param.nationalCode)
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
            this.showPanel = true;
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
}
