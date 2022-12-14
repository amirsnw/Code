import {Component, Injector, ViewChild} from '@angular/core';
import {OverlayService, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-sso-debit-objection',
  templateUrl: './sso-debit-objection.component.html',
  styleUrls: ['./sso-debit-objection.component.css']
})
export class SsoDebitObjectionComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  modalForm: FormGroup;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  private objectionId: any;
  private _overlay: any;
  private dataBack: any;
  private objectionType: any;
  private investigationType: any;
  private overlay: any;
  isDisabled: boolean;
  isHidden = false;
  isBtnHidden = false;
  isDefectHide = false;
  private photoTilte: string;

  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.restService.getAll('assets/data/objection-type.json')
      .then(value => {
        this.objectionType = value.items;
        this.investigationType = value.investigationItems;
      })
      .catch(reason => {
      });
    this.modalForm = this.formBuilder.group({
      defectDesc: ['', [Validators.required]],
    });
    this.theForm = this.formBuilder.group({
      objectionDesc: ['']
    });
    this.objectionId = this.route.snapshot.params['id'];
    this.imageGallery.getUrl = Urls.UploadImage;
    this.isDisabled = false;
  }

  loadPageData() {
    this.overlay = this.showOverlay();
    this.restService.getById(Urls.ObjectionRequest, this.objectionId.toString())
      .then(value => {
        this.hideOverlay(this.overlay);
        if (value.data.objectionPhotos.length > 0) {
          this.dataBack = value.data;
          this.theForm.get('objectionDesc').setValue(value.data.objectionDesc);
          value.data.status === '1' ? this.isDisabled = false : this.isDisabled = true;
          (<Array<any>>value.data.objectionPhotos).forEach((item) => {
            switch (value.data.objectionType) {
              case '1':
              case '2':
                this.photoTilte = item.type !== '19' ? this.objectionType.find(x => x.value === item.type).name : 'لایحه اعتراض سازمان به رای بدوی';
                this.imageGallery.downloadImage(item.guid, this.photoTilte, '0', '0');
                this.isBtnHidden = false;
                break;
              case '3':
                if (value.data.defectFlag !== '1') {
                  this.isDefectHide = true;
                }
                this.imageGallery.downloadImage(item.guid, this.investigationType.find(x => x.value === item.type).name, '0', '0');
                this.isHidden = true;
                this.isBtnHidden = true;
                break;
            }
          });
        }
      })
      .catch(reason => {
        this.hideOverlay(this.overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage(), () => {
          this.redirectTo('/sso/request');
        });
      });
  }

  onAnswer(status: string) {
    this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
      let url;
      switch (this.dataBack.objectionType) {
        case '1':
        case '2':
          url = Urls.SSO_Objection + '/request-update' + '/' + this.objectionId;
          break;
        case '3':
          url = Urls.SSO_Objection + '/request-comitte-update' + '/' + this.objectionId;
          break;
      }
      this._overlay = this.showOverlay();
      this.restService.update(url, status, {})
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'با موفقیت ارسال گردید.', () => {
            this.redirectTo('/sso/request');
          });
        }).catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    }, () => {
    });
  }

  onShowDefect() {
    this.theModal.width = '50%';
    this.theModal.show();
  }

  onHideDefect() {
    this.theModal.hide();
  }

  onSaveDefect() {
    if (!this.modalForm.valid) {
      this.markFormGroupAsTouched(this.modalForm);
      return;
    }
    const request = {
      status: '2604',
      defectDesc: this.modalForm.get('defectDesc').value,
    };
    this.theModal.showOverlay();
    this.restService.update(Urls.SSO_Objection + '/request-comitte-update/' + this.objectionId.toString(), '2604', request)
      .then(value => {
        this.theModal.hideOverlay();
        this.theModal.hide();
        this.showInfoMessageBox('پیام سیستم', 'با موفقیت ثبت گردید.', () => {
          this.redirectTo('/sso/request');
        });
      })
      .catch((reason) => {
        this.theModal.hideOverlay();
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
}

