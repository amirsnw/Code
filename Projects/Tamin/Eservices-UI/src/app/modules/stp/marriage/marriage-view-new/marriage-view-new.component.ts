import {Component, Injector, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {StpHeaderViewComponent} from '../../stp-header-view/stp-header-view.component';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';
import {StpHeaderNewComponent} from '../../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-marriage-view-new',
  templateUrl: './marriage-view-new.component.html',
  styleUrls: ['./marriage-view-new.component.css']
})
export class MarriageViewNewComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  private _overlay: any;
  requestId = '';
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header:  StpHeaderNewComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      weddingDateTimeStamp: [''],
      mariageCerDateTimeStamp: [''],
      mariageNum: [''],
      sabtNumber: [''],
      partnerRisuId: [''],
      partnerName: [''],
      partnerLname: [''],
      partnerIdNumber: [''],
      resultMessage: [''],
      branchName: ['']
    });
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
  }

  protected loadPageData(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.requestId = params['id'];
        this._overlay = this.showOverlay();
        this.header
          .loadData()
          .then(value => {
            this.loadData()
              .then(value1 => {
                this.hideOverlay(this._overlay);
              })
              .catch(reason => {
                this.hideOverlay(this._overlay);
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              });
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      } else {
        this.redirectTo('/');
      }
    });

  }

  getImageTitle(index) {
    switch (index) {
      case '0501':
        return 'تصویر صفحه اول شناسنامه بیمه شده اصلی';
      case '0502':
        return 'تصویر صفحه مشخصات همسر در شناسنامه بیمه شده اصلی';
      case '0503':
        return 'تصویر صفحه اول شناسنامه همسر';
      case '0504':
        return 'تصویر صفحه مشخصات بیمه شده اصلی در شناسنامه همسر';
      case '0505':
        return 'تصویر مشخصات زوج در عقدنامه';
      case '0506':
        return 'تصویر صفحه مشخصات زوجه در عقدنامه';
      case '0507':
        return 'تصویر صفحه نوع عقد در عقدنامه';
    }
  }

  private loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.getById(StpUrls.STP_LOAD_DATA, this.requestId.toString())
        .then(value => {
          this.hideOverlay(this._overlay);
          this.theForm.get('weddingDateTimeStamp').setValue(new Date(value.data.list[0].shorttermMariage[0].weddingDate));
          this.theForm.get('mariageCerDateTimeStamp').setValue(new Date(value.data.list[0].shorttermMariage[0].mariageCerDate));
          this.theForm.get('mariageNum').setValue(value.data.list[0].shorttermMariage[0].mariageNum);
          this.theForm.get('sabtNumber').setValue(value.data.list[0].shorttermMariage[0].sabtNumber);
          this.theForm.get('partnerRisuId').setValue(value.data.list[0].shorttermMariage[0].partnerRisuId);
          this.theForm.get('partnerName').setValue(value.data.list[0].shorttermMariage[0].partnerName);
          this.theForm.get('partnerLname').setValue(value.data.list[0].shorttermMariage[0].partnerLname);
          this.theForm.get('partnerIdNumber').setValue(value.data.list[0].shorttermMariage[0].partnerIdNumber);
          this.theForm.get('resultMessage').setValue(value.data.list[0].shorttermMariage[0].shorttermRequest.resultMessage);
          this.theForm.get('branchName').setValue(value.data.list[0].shorttermMariage[0].shorttermRequest.branchName);
          if (value.data.list[0].shorttermMariage) {
            (<Array<any>>value.data.list[0].shorttermMariage[0].shorttermRequest.requestFileList).forEach((item) => {
              this.imageGallery.downloadImage(item.documentFile, this.getImageTitle(item.documentType), '0', '0');
            });
          }
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
